"use client";

import { cancelOrder } from "@/app/components/consumer/actions";
import StatusChip from "@/app/components/OrderStatusChip";
import { components } from "@/api/schema";
import { formatDate } from "@/utils/format";
import { formatCurrency } from "@/utils/format";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface OrderProps {
  order: components["schemas"]["OrderReadSchema"];
}

export default function Order(props: OrderProps) {
  const { order } = props;
  const router = useRouter();

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Typography variant="body2" color="text.secondary">
          {formatDate(order.created_at)}
          <br />
          {order.delivery_address}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            variant="h6"
            component="span"
            fontWeight="bold"
            color="primary"
          >
            {order.total ? formatCurrency(order.total) : null}
          </Typography>
          <StatusChip status={order.status} />
        </Stack>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.item.name}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">
                {formatCurrency(item.quantity * item.item.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {order.status === "pending" && (
        <Button
          color="error"
          variant="text"
          size="small"
          sx={{ width: "auto", alignSelf: "flex-start", mt: 2 }}
          onClick={async () => {
            await cancelOrder(order.merchant_id, order.id);
            router.refresh();
          }}
        >
          Cancel
        </Button>
      )}
    </>
  );
}
