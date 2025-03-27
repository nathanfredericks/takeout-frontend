"use client";

import { Chip } from "@mui/material";
import { formatStatus, getStatusColor } from "@/utils/order";
import { components } from "@/api/schema";

interface OrderStatusChipProps {
  status: components["schemas"]["OrderStatus"];
}

export default function OrderStatusChip({ status }: OrderStatusChipProps) {
  return <Chip label={formatStatus(status)} color={getStatusColor(status)} />;
}
