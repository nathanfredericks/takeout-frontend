import {
  DataGrid,
  DataGridProps,
  GridActionsCellItem,
  GridColDef,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCrud } from "./providers/CrudProvider";
import { useState, useEffect, useRef } from "react";

interface ListProps {
  data: DataGridProps["rows"];
  slotProps?: {
    dataGrid?: Partial<Omit<DataGridProps, "rows" | "columns">>;
  };
  onRowClick?: (id: string) => void;
  onCreateClick?: () => void;
  onEditClick?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function List(props: ListProps) {
  const router = useRouter();
  const { fields } = useCrud();
  const [gridData, setGridData] = useState<DataGridProps["rows"]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  const { data, slotProps, onRowClick, onCreateClick, onEditClick, onDelete } =
    props;

  const showActions = onEditClick || onDelete;

  useEffect(() => {
    // Mark component as mounted
    setIsLoaded(true);

    // Set grid data only if component is mounted
    if (isMountedRef.current) {
      setGridData(data || []);
    }

    // Cleanup function that runs when component unmounts
    return () => {
      isMountedRef.current = false;
    };
  }, [data]);

  // If not yet loaded, render a placeholder or nothing to prevent premature DataGrid initialization
  if (!isLoaded) {
    return (
      <Stack sx={{ flex: 1, width: "100%" }}>
        <Box sx={{ flex: 1, position: "relative", width: "100%" }}></Box>
      </Stack>
    );
  }

  return (
    <Stack sx={{ flex: 1, width: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Tooltip title="Reload data" placement="right" enterDelay={1000}>
          <div>
            <IconButton aria-label="refresh" onClick={() => router.refresh()}>
              <RefreshIcon />
            </IconButton>
          </div>
        </Tooltip>
        {onCreateClick ? (
          <Button
            variant="contained"
            onClick={onCreateClick}
            startIcon={<AddIcon />}
          >
            Create New
          </Button>
        ) : null}
      </Stack>
      <Box sx={{ flex: 1, position: "relative", width: "100%" }}>
        <DataGrid
          rows={gridData}
          columns={[
            ...fields,
            ...(showActions
              ? [
                  {
                    field: "actions",
                    type: "actions",
                    align: "right",
                    getActions: ({ id }) => [
                      ...(onEditClick
                        ? [
                            <GridActionsCellItem
                              key="edit-item"
                              icon={<EditIcon />}
                              label="Edit"
                              onClick={() => onEditClick(String(id))}
                            />,
                          ]
                        : []),
                      ...(onDelete
                        ? [
                            <GridActionsCellItem
                              key="delete-item"
                              icon={<DeleteIcon />}
                              label="Delete"
                              onClick={() => onDelete(String(id))}
                            />,
                          ]
                        : []),
                    ],
                  } as GridColDef,
                ]
              : []),
          ]}
          {...(slotProps?.dataGrid || {})}
          onRowClick={
            onRowClick ? (params) => onRowClick(String(params.id)) : undefined
          }
        />
      </Box>
    </Stack>
  );
}
