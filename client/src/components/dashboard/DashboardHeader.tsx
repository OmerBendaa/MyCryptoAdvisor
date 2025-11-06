import { Box, Typography } from "@mui/material";

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
        {userName ? `${userName}'s Crypto Dashboard` : "Crypto Dashboard"}
      </Typography>
    </Box>
  );
};

export default DashboardHeader;


