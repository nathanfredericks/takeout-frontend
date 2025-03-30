import { GridRowModel } from "@mui/x-data-grid";
import { Form } from "./Form";
import { FormikValues } from "formik";

interface EditProps {
  data: GridRowModel;
  onSubmit: (values: FormikValues) => void;
}

export function Edit(props: EditProps) {
  const { onSubmit } = props;

  return (
    <>
      <Form onSubmit={onSubmit} submitButtonLabel="Edit" />
    </>
  );
}
