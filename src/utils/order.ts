import { components } from "@/api/schema";
import { ChipOwnProps } from "@mui/material";

export const formatStatus = (
  status: components["schemas"]["OrderStatus"],
): string => {
  switch (status) {
    case "delivered":
      return "Delivered";
    case "ready_for_pickup":
      return "Ready for Pickup";
    case "accepted":
      return "Accepted";
    case "in_transit":
      return "In Transit";
    case "pending":
      return "Pending";
    case "cancelled":
      return "Cancelled";
  }
};

export const getStatusColor = (
  status: components["schemas"]["OrderStatus"],
): ChipOwnProps["color"] => {
  switch (status) {
    case "delivered":
      return "success";
    case "ready_for_pickup":
      return "success";
    case "accepted":
      return "info";
    case "in_transit":
      return "primary";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};
