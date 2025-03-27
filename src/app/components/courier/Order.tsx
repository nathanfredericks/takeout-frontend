"use client";

import { deliverOrder, pickupOrder } from "@/app/components/courier/actions";
import StatusChip from "@/app/components/OrderStatusChip";
import DeliveryMap from "@/app/components/courier/DeliveryMap";
import { components } from "@/api/schema";
import { formatDate } from "@/utils/format";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LocationOn } from "@mui/icons-material";

interface OrderProps {
  order: components["schemas"]["OrderReadSchema"];
}

export default function Order(props: OrderProps) {
  const { order } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePickup = async () => {
    setLoading(true);
    setError(null);
    try {
      await pickupOrder(order.merchant_id, order.id);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to pickup order");
    } finally {
      setLoading(false);
    }
  };

  const handleDelivery = async () => {
    setLoading(true);
    setError(null);
    try {
      await deliverOrder(order.merchant_id, order.id);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to mark order as delivered",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {formatDate(order.created_at)}
          {order.status !== "delivered" && (
            <>
              <Stack direction="row" spacing={0.5} sx={{ mt: 1.5 }}>
                <LocationOn color="info" sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    Pickup at
                  </Box>{" "}
                  {order.merchant_location}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                <LocationOn color="error" sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    Deliver to
                  </Box>{" "}
                  {order.delivery_address}
                </Typography>
              </Stack>
            </>
          )}
        </Typography>
        <StatusChip status={order.status} />
      </Stack>

      {order.status !== "delivered" && (
        <>
          {(order.status === "ready_for_pickup" ||
            order.status === "in_transit") && (
            <DeliveryMap
              address={order.delivery_address}
              merchantAddress={order.merchant_location}
            />
          )}
        </>
      )}

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {order.status === "ready_for_pickup" && (
        <Button
          color="primary"
          size="small"
          sx={{ width: "auto", alignSelf: "flex-start" }}
          onClick={handlePickup}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Pick Up Order"}
        </Button>
      )}

      {order.status === "in_transit" && (
        <Button
          color="success"
          size="small"
          sx={{ width: "auto", alignSelf: "flex-start" }}
          onClick={handleDelivery}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Mark as Delivered"}
        </Button>
      )}
    </>
  );
}
