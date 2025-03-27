"use client";
import { components } from "@/api/schema";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StatusChip from "../OrderStatusChip";
import { formatDate } from "@/utils/format";
import { useRouter } from "next/navigation";

interface OrderListProps {
  orders: components["schemas"]["OrderReadSchema"][];
}

export default function OrderList(props: OrderListProps) {
  const { orders } = props;
  const router = useRouter();

  return (
    <Stack direction="column" spacing={1}>
      {orders.map((order) => (
        <Card key={order.id} variant="outlined">
          <CardActionArea onClick={() => router.push(`/orders/${order.id}`)}>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <Typography variant="h6" component="div">
                  {order.merchant_name} #{order.id}
                </Typography>
                <StatusChip status={order.status} />
              </Stack>

              {order.status !== "delivered" && (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    {formatDate(order.created_at)}
                    <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                      <LocationOnIcon sx={{ color: "#1976d2", fontSize: 18 }} />
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          Pickup at
                        </Box>{" "}
                        {order.merchant_location}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                      <LocationOnIcon sx={{ color: "#d32f2f", fontSize: 18 }} />
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          Deliver to
                        </Box>{" "}
                        {order.delivery_address}
                      </Typography>
                    </Stack>
                  </Typography>
                </>
              )}

              {order.status === "delivered" && (
                <Typography variant="body2" color="text.secondary">
                  {formatDate(order.created_at)}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
}
