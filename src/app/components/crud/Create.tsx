import { Form } from "./Form";
import { FormikValues } from "formik";

interface CreateProps {
  onSubmit: (values: FormikValues) => void;
}

export function Create(props: CreateProps) {
  const { onSubmit } = props;

  return (
    <>
      <Form onSubmit={onSubmit} submitButtonLabel="Create" />
    </>
  );
}
