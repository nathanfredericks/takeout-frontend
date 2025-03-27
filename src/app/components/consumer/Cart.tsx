"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  Divider,
  Paper,
  ListItemText,
  Stack,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "@/contexts/CartContext";
import CheckoutModal from "./CheckoutModal";
import { formatCurrency } from "@/utils/format";

interface CartProps {
  onCheckout: (deliveryAddress: string, orderInstructions: string) => void;
  merchantId: number;
}

export default function Cart({ onCheckout, merchantId }: CartProps) {
  const {
    updateQuantity,
    removeItem,
    getTotal,
    getTotalItems,
    setMerchantId,
    getMerchantItems,
  } = useCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const items = getMerchantItems(merchantId);

  useEffect(() => {
    setMerchantId(merchantId);
  }, [merchantId, setMerchantId]);

  const handleOpenCheckoutModal = () => {
    setCheckoutModalOpen(true);
  };

  const handleCloseCheckoutModal = () => {
    setCheckoutModalOpen(false);
  };

  const handleCheckout = (
    deliveryAddress: string,
    orderInstructions: string,
  ) => {
    onCheckout(deliveryAddress, orderInstructions);
    setCheckoutModalOpen(false);
  };

  return (
    <>
      <Paper variant="outlined" sx={{ height: "100%", display: "flex" }}>
        <Stack
          direction="column"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          {!items.length && (
            <Alert severity="info" sx={{ m: 2 }}>
              Your cart is empty
            </Alert>
          )}
          <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            <List>
              {items.map((item) => (
                <ListItem key={item.id}>
                  <Stack direction="column" width="100%">
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
                            {formatCurrency(item.price * item.quantity)}
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
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          aria-label="decrease quantity"
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                          sx={{
                            mx: 1,
                            minWidth: "24px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          aria-label="increase quantity"
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeItem(item.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2">
                Subtotal ({getTotalItems()} item
                {getTotalItems() !== 1 ? "s" : ""})
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {formatCurrency(getTotal())}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                {formatCurrency(getTotal())}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleOpenCheckoutModal}
                disabled={!items.length}
              >
                Place Order
              </Button>
            </Box>
          </Box>
        </Stack>
      </Paper>

      <CheckoutModal
        open={checkoutModalOpen}
        onClose={handleCloseCheckoutModal}
        onSubmit={handleCheckout}
        total={getTotal()}
      />
    </>
  );
}
