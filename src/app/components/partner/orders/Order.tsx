"use client";
import {
  cancelOrder,
  acceptOrder,
  readyForPickup,
} from "@/app/components/partner/actions";
import { components } from "@/api/schema";
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
import { Show } from "@toolpad/core";

interface OrderProps {
  order: components["schemas"]["OrderReadSchema"];
}

export default function Order(props: OrderProps) {
  const { order } = props;

  return (
    <Stack direction="column">
      <Show id={order.id} />
      <Typography variant="h5" component="div">
        Items
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.item.name}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
        {(order.status === "pending" ||
          order.status === "accepted" ||
          order.status === "ready_for_pickup") && (
          <Button
            color="error"
            variant="text"
            size="small"
            sx={{ width: "auto", alignSelf: "flex-start" }}
            onClick={async () => {
              await cancelOrder(order.merchant_id, order.id);
            }}
          >
            Cancel
          </Button>
        )}

        {order.status === "pending" && (
          <Button
            color="info"
            variant="text"
            size="small"
            sx={{ width: "auto", alignSelf: "flex-start" }}
            onClick={async () => {
              await acceptOrder(order.merchant_id, order.id);
            }}
          >
            Accept
          </Button>
        )}

        {order.status === "accepted" && (
          <Button
            color="success"
            variant="text"
            size="small"
            sx={{ width: "auto", alignSelf: "flex-start" }}
            onClick={async () => {
              await readyForPickup(order.merchant_id, order.id);
            }}
          >
            Mark as Ready for Pickup
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
