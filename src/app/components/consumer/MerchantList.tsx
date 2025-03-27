"use client";

import { useRouter } from "next/navigation";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { components } from "@/api/schema";

interface MerchantListProps {
  merchants: components["schemas"]["MerchantReadSchema"][];
}

export default function MerchantList(props: MerchantListProps) {
  const { merchants } = props;
  const router = useRouter();

  return (
    <>
      <Grid container spacing={3}>
        {merchants.map((merchant) => (
          <Grid item xs={12} sm={6} md={4} key={merchant.id}>
            <Card variant="outlined">
              <CardActionArea
                onClick={() => router.push(`/merchants/${merchant.id}`)}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    {merchant.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {merchant.description}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ mt: 1 }}
                    alignItems="center"
                  >
                    <LocationOnIcon
                      sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {merchant.location}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
