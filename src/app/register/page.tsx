"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";
import { register } from "./actions";

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  phoneNumber: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  role: yup
    .string()
    .oneOf(["consumer", "partner", "courier"], "Please select a valid role")
    .required("Role is required"),
});

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "consumer" | "partner" | "courier";
}

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>,
  ) => {
    setLoading(true);
    setError("");

    const response = await register(
      values.name,
      values.email,
      values.password,
      values.phoneNumber,
      values.role,
    );

    if (response?.error) {
      setError(response.error);
      setLoading(false);
      setSubmitting(false);
      return;
    }
  };

  return (
    <DashboardLayout hideNavigation>
      <Container maxWidth="sm">
        <PageContainer title="Register" breadcrumbs={[]}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              phoneNumber: "",
              role: "consumer" as "consumer" | "partner" | "courier",
            }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
          >
            {({ errors, touched, isSubmitting, values, handleChange }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Phone"
                      name="phoneNumber"
                      autoComplete="tel"
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={touched.role && Boolean(errors.role)}
                    >
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={values.role}
                        label="Role"
                        onChange={handleChange}
                      >
                        <MenuItem value="consumer">Consumer</MenuItem>
                        <MenuItem value="partner">Partner</MenuItem>
                        <MenuItem value="courier">Courier</MenuItem>
                      </Select>
                      {touched.role && errors.role && (
                        <Box
                          component="div"
                          sx={{
                            color: "error.main",
                            mt: 0.5,
                            fontSize: "0.75rem",
                          }}
                        >
                          {errors.role}
                        </Box>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{ mt: 3 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || isSubmitting}
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>
                  <Button onClick={() => router.push("/login")} variant="text">
                    Login
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </PageContainer>
      </Container>
    </DashboardLayout>
  );
}
