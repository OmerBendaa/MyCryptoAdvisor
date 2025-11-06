import { Box, Button } from "@mui/material";

interface EditPreferencesButtonProps {
  onClick: () => void;
}

const EditPreferencesButton = ({ onClick }: EditPreferencesButtonProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{
          borderColor: "black",
          color: "black",
          "&:hover": {
            borderColor: "black",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        Edit Preferences
      </Button>
    </Box>
  );
};

export default EditPreferencesButton;


