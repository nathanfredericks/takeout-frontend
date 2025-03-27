"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";

const checkoutSchema = yup.object({
  deliveryAddress: yup.string().required("Delivery address is required"),
  orderInstructions: yup.string(),
});

interface CheckoutFormValues {
  deliveryAddress: string;
  orderInstructions: string;
}

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (deliveryAddress: string, orderInstructions: string) => void;
  total: number;
}

export default function CheckoutModal({
  open,
  onClose,
  onSubmit,
}: CheckoutModalProps) {
  const handleSubmit = (
    values: CheckoutFormValues,
    { setSubmitting }: FormikHelpers<CheckoutFormValues>,
  ) => {
    onSubmit(values.deliveryAddress, values.orderInstructions);
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Checkout</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Formik
        initialValues={{
          deliveryAddress: "",
          orderInstructions: "",
        }}
        validationSchema={checkoutSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent dividers>
              <Field
                as={TextField}
                fullWidth
                label="Delivery Address"
                variant="outlined"
                name="deliveryAddress"
                error={
                  touched.deliveryAddress && Boolean(errors.deliveryAddress)
                }
                helperText={touched.deliveryAddress && errors.deliveryAddress}
                sx={{ mb: 3 }}
                required
              />

              <Field
                as={TextField}
                fullWidth
                label="Delivery Instructions"
                variant="outlined"
                name="orderInstructions"
                placeholder=""
                multiline
                rows={3}
              />
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button onClick={onClose} color="inherit">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Checkout
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
