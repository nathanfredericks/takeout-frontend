"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Alert,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "@/contexts/CartContext";
import Cart from "@/app/components/consumer/Cart";
import { components } from "@/api/schema";
import { PageContainer } from "@toolpad/core";
import { formatCurrency } from "@/utils/format";
import { checkout } from "./actions";

interface MerchantProps {
  merchant: components["schemas"]["MerchantReadSchema"];
  items: components["schemas"]["ItemReadSchema"][];
}

export default function Merchant(props: MerchantProps) {
  const { merchant, items } = props;
  const { addItem, items: cartItems, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async (
    deliveryAddress: string,
    orderInstructions: string,
  ) => {
    const orderItems = cartItems.map((item) => ({
      item_id: item.id,
      quantity: item.quantity,
    }));

    await checkout(merchant.id, deliveryAddress, orderInstructions, orderItems);

    clearCart();
    router.push(`/orders`);
  };

  return (
    <PageContainer
      title={merchant.name}
      breadcrumbs={[
        { title: "Merchants", path: "/merchants" },
        { title: merchant.name, path: `/merchants/${merchant.id}` },
      ]}
    >
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {/* Menu Column */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Items
          </Typography>
          <Paper variant="outlined">
            {items.length === 0 && (
              <Box sx={{ p: 2 }}>
                <Alert severity="info">No items available</Alert>
              </Box>
            )}
            <List>
              {items.map((item, index) => (
                <ListItem
                  key={item.id}
                  divider={index < items.length - 1}
                  secondaryAction={
                    <IconButton
                      color="primary"
                      onClick={() => {
                        addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          merchantId: merchant.id,
                          description: item.description || "-",
                        });
                      }}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mr: 2 }}
                      >
                        <Typography variant="h6" component="span">
                          {item.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="span"
                          fontWeight="bold"
                          color="primary"
                        >
                          {formatCurrency(item.price)}
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                      >
                        {item.description || "-"}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Cart
          </Typography>
          <Cart onCheckout={handleCheckout} merchantId={merchant.id} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
