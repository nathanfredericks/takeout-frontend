import { Box, Typography, Paper, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { auth } from "@/auth";

export default async function Profile() {
  const session = await auth();

  return (
    <DashboardLayout>
      <PageContainer breadcrumbs={[]}>
        <Paper sx={{ p: 3 }} variant="outlined">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ width: 100, height: 100, mb: 2, fontSize: "75px" }}>
              <PersonIcon fontSize="inherit" />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {session?.user.name}
            </Typography>
          </Box>
        </Paper>
      </PageContainer>
    </DashboardLayout>
  );
}
