"use client";

import { components } from "@/api/schema";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import StatusChip from "../OrderStatusChip";
import { formatDate } from "@/utils/format";
import { formatCurrency } from "@/utils/format";
import { cancelOrder } from "./actions";
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

              <Typography variant="body2" color="text.secondary">
                {formatDate(order.created_at)}
                <br />
                {order.status === "delivered" && order.delivered_at && (
                  <>
                    Delivered: {formatDate(order.delivered_at)}
                    <br />
                  </>
                )}
                {order.delivery_address}
              </Typography>

              <Table size="small">
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
            </CardContent>
          </CardActionArea>
          {order.status === "pending" && (
            <CardActions>
              <Button
                color="error"
                variant="text"
                size="small"
                onClick={async () => {
                  await cancelOrder(order.merchant_id, order.id);
                  router.refresh();
                }}
              >
                Cancel
              </Button>
            </CardActions>
          )}
        </Card>
      ))}
    </Stack>
  );
}
