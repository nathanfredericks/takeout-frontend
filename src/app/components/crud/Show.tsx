import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { GridRowModel } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCrud } from "./providers/CrudProvider";

interface ShowProps {
  data: GridRowModel;
  onEditClick?: () => void;
  onDelete?: () => void;
}

export default function Show(props: ShowProps) {
  const { fields } = useCrud();
  const { data, onEditClick, onDelete } = props;

  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Grid container spacing={2} sx={{ width: "100%" }}>
          {fields
            .filter(({ type }) => type !== "actions" && type !== "custom")
            .map((showField) => {
              const { field, headerName } = showField;

              return (
                <Grid key={field} size={{ xs: 12, sm: 6 }}>
                  <Paper variant="outlined" sx={{ px: 2, py: 1 }}>
                    <Typography variant="overline">{headerName}</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {data[field] ?? "-"}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onEditClick ? (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => onEditClick()}
            >
              Edit
            </Button>
          ) : null}
          {onDelete ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete()}
            >
              Delete
            </Button>
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
}
