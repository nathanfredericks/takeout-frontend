"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";
import { login } from "./actions";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    setLoading(true);
    setError("");

    const response = await login(values.email, values.password);

    if (response?.error) {
      setError(response.error);
      setLoading(false);
      setSubmitting(false);
      return;
    }
  };

  return (
    <DashboardLayout
      hideNavigation
      slotProps={{
        toolbarAccount: {
          slots: {
            signInButton: () => null,
          },
        },
      }}
    >
      <Container maxWidth="sm">
        <PageContainer title="Login" breadcrumbs={[]}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
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
                      autoComplete="current-password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                </Grid>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="end"
                  justifyContent="flex-end"
                  sx={{ mt: 3 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || isSubmitting}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                  <Button
                    onClick={() => router.push("/register")}
                    variant="text"
                  >
                    Register
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
