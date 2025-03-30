import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  GridColDef,
  GridRowModel,
  GridSingleSelectColDef,
} from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Formik, FormikValues } from "formik";
import { useCrud } from "./providers/CrudProvider";

interface FormProps {
  data?: GridRowModel;
  onSubmit: (values: FormikValues) => void;
  submitButtonLabel: string;
}

export function Form(props: FormProps) {
  const { data, submitButtonLabel, onSubmit } = props;
  const { fields, validationSchema } = useCrud();

  const initialValues = data
    ? Object.fromEntries(
        fields.map(({ field }) => [field, data[field] ?? null]),
      )
    : Object.fromEntries(fields.map(({ field }) => [field, null]));

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => {
          const renderField = (formField: GridColDef) => {
            const { type, headerName } = formField;
            const fieldName = String(formField.field);
            const value = formikProps.values[fieldName];
            const error =
              formikProps.touched[fieldName] && formikProps.errors[fieldName];

            switch (type) {
              case "string":
                return (
                  <TextField
                    fullWidth
                    key={fieldName}
                    name={fieldName}
                    label={headerName}
                    value={value ?? ""}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={Boolean(error)}
                    helperText={error ? String(error) : undefined}
                  />
                );
              case "number":
                return (
                  <TextField
                    fullWidth
                    key={fieldName}
                    name={fieldName}
                    type="number"
                    label={headerName}
                    value={value ?? ""}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={Boolean(error)}
                    helperText={error ? String(error) : undefined}
                  />
                );
              case "boolean":
                return (
                  <FormControl key={fieldName} fullWidth>
                    <FormControlLabel
                      name={fieldName}
                      control={
                        <Checkbox
                          size="medium"
                          checked={Boolean(value)}
                          onChange={formikProps.handleChange}
                          onBlur={formikProps.handleBlur}
                        />
                      }
                      label={headerName}
                    />
                    <FormHelperText error={Boolean(error)}>
                      {error ? String(error) : " "}
                    </FormHelperText>
                  </FormControl>
                );
              case "date":
                return (
                  <DatePicker
                    key={fieldName}
                    value={value ? dayjs(value as string) : null}
                    onChange={(newValue) => {
                      if (newValue?.isValid()) {
                        formikProps.setFieldValue(
                          fieldName,
                          newValue.toISOString(),
                        );
                      } else {
                        formikProps.setFieldValue(fieldName, null);
                      }
                    }}
                    label={headerName}
                    slotProps={{
                      textField: {
                        name: fieldName,
                        fullWidth: true,
                        error: Boolean(error),
                        helperText: error ? String(error) : " ",
                        onBlur: formikProps.handleBlur,
                      },
                    }}
                  />
                );
              case "dateTime":
                return (
                  <DateTimePicker
                    key={fieldName}
                    value={value ? dayjs(value as string) : null}
                    onChange={(newValue) => {
                      if (newValue?.isValid()) {
                        formikProps.setFieldValue(
                          fieldName,
                          newValue.toISOString(),
                        );
                      } else {
                        formikProps.setFieldValue(fieldName, null);
                      }
                    }}
                    label={headerName}
                    slotProps={{
                      textField: {
                        name: fieldName,
                        fullWidth: true,
                        error: Boolean(error),
                        helperText: error ? String(error) : " ",
                        onBlur: formikProps.handleBlur,
                      },
                    }}
                  />
                );
              case "singleSelect":
                const { valueOptions, getOptionValue, getOptionLabel } =
                  formField as GridSingleSelectColDef;

                if (valueOptions && Array.isArray(valueOptions)) {
                  const labelId = `${fieldName}-label`;
                  return (
                    <FormControl
                      key={fieldName}
                      error={Boolean(error)}
                      fullWidth
                    >
                      <InputLabel id={labelId}>{headerName}</InputLabel>
                      <Select
                        value={value ?? ""}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        labelId={labelId}
                        name={fieldName}
                        label={headerName}
                        fullWidth
                      >
                        {valueOptions.map((option) => {
                          let optionValue: string | number = option as
                            | string
                            | number;
                          let optionLabel: string | number = option as
                            | string
                            | number;

                          if (
                            typeof option !== "string" &&
                            typeof option !== "number"
                          ) {
                            optionValue = getOptionValue
                              ? getOptionValue(option)
                              : option.value;
                            optionLabel = getOptionLabel
                              ? getOptionLabel(option)
                              : option.label;
                          }

                          return (
                            <MenuItem key={optionValue} value={optionValue}>
                              {optionLabel}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText>
                        {error ? String(error) : " "}
                      </FormHelperText>
                    </FormControl>
                  );
                }
                return null;
              default:
                return (
                  <TextField
                    fullWidth
                    key={fieldName}
                    id={fieldName}
                    name={fieldName}
                    label={headerName}
                    value={value ?? ""}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={Boolean(error)}
                    helperText={error ? String(error) : undefined}
                    margin="normal"
                  />
                );
            }
          };

          return (
            <Box
              component="form"
              onSubmit={formikProps.handleSubmit}
              noValidate
              autoComplete="off"
              onReset={formikProps.handleReset}
              sx={{ width: "100%" }}
            >
              <FormGroup>
                <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
                  {fields
                    .filter(({ field }) => field !== "id")
                    .map((field) => (
                      <Grid size={6} key={field.field}>
                        {renderField(field)}
                      </Grid>
                    ))}
                </Grid>
              </FormGroup>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={formikProps.isSubmitting}
                >
                  {submitButtonLabel}
                </Button>
              </Box>
            </Box>
          );
        }}
      </Formik>
    </>
  );
}
