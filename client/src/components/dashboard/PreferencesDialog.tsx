import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { Asset, ContentPreference, InvestorType } from "../../common/types";
import { ASSET_SUGGESTIONS, CONTENT_OPTIONS, INVESTOR_OPTIONS } from "../../common/constants";

interface PreferencesDialogProps {
  open: boolean;
  onClose: () => void;
  selectedAssets: Asset[];
  setSelectedAssets: (values: Asset[]) => void;
  selectedInvestorTypes: InvestorType[];
  setSelectedInvestorTypes: (values: InvestorType[]) => void;
  selectedContent: ContentPreference[];
  setSelectedContent: (values: ContentPreference[]) => void;
  onSave: () => void;
}

const PreferencesDialog = ({
  open,
  onClose,
  selectedAssets,
  setSelectedAssets,
  selectedInvestorTypes,
  setSelectedInvestorTypes,
  selectedContent,
  setSelectedContent,
  onSave,
}: PreferencesDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Edit your preferences-custom your experience
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            border: "1.5px solid black",
            borderRadius: "10px",
            px: 3,
            pb: 3,
            pt: 2,
            mt: 2,
            overflow: "visible",
          }}
        >
          <Stack spacing={3} sx={{ mt: 2, width: "100%" }}>
            <FormControl
              fullWidth
              sx={{
                mt: 2,
                overflow: "visible",
                "& .MuiInputLabel-root": { backgroundColor: "#fff", px: 0.5 },
                "& .MuiInputLabel-shrink": { transform: "translate(14px, -9px) scale(0.75)" },
              }}
            >
              <InputLabel id="assets-label" sx={{ fontWeight: 700, fontSize: 18 }}>
                What crypto assets are you interested in?
              </InputLabel>
              <Select
                labelId="assets-label"
                multiple
                value={selectedAssets}
                onChange={(e) =>
                  setSelectedAssets(
                    typeof e.target.value === "string"
                      ? (e.target.value.split(",") as Asset[])
                      : (e.target.value as Asset[])
                  )
                }
                input={<OutlinedInput label="What crypto assets are you interested in?" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as Asset[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDelete={() => {
                          setSelectedAssets(selectedAssets.filter((v) => v !== value));
                        }}
                        sx={{
                          "& .MuiChip-deleteIcon": { color: "#9e9e9e", transition: "color 0.2s ease" },
                          "& .MuiChip-deleteIcon:hover": {
                            color: "#616161",
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                            borderRadius: "50%",
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              >
                {ASSET_SUGGESTIONS.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                mt: 2,
                overflow: "visible",
                "& .MuiInputLabel-root": { backgroundColor: "#fff", px: 0.5 },
                "& .MuiInputLabel-shrink": { transform: "translate(14px, -9px) scale(0.75)" },
              }}
            >
              <InputLabel id="investor-label" sx={{ fontWeight: 700, fontSize: 18 }}>
                What type of investor are you?
              </InputLabel>
              <Select
                labelId="investor-label"
                multiple
                value={selectedInvestorTypes}
                onChange={(e) =>
                  setSelectedInvestorTypes(
                    typeof e.target.value === "string"
                      ? (e.target.value.split(",") as InvestorType[])
                      : (e.target.value as InvestorType[])
                  )
                }
                input={<OutlinedInput label="What type of investor are you?" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as InvestorType[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDelete={() => {
                          setSelectedInvestorTypes(selectedInvestorTypes.filter((v) => v !== value));
                        }}
                        sx={{
                          "& .MuiChip-deleteIcon": { color: "#9e9e9e", transition: "color 0.2s ease" },
                          "& .MuiChip-deleteIcon:hover": {
                            color: "#616161",
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                            borderRadius: "50%",
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              >
                {INVESTOR_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                mt: 2,
                overflow: "visible",
                "& .MuiInputLabel-root": { backgroundColor: "#fff", px: 0.5 },
                "& .MuiInputLabel-shrink": { transform: "translate(14px, -9px) scale(0.75)" },
              }}
            >
              <InputLabel id="content-label" sx={{ fontWeight: 700, fontSize: 18 }}>
                What kind of content would you like to see?
              </InputLabel>
              <Select
                labelId="content-label"
                multiple
                value={selectedContent}
                onChange={(e) =>
                  setSelectedContent(
                    typeof e.target.value === "string"
                      ? (e.target.value.split(",") as ContentPreference[])
                      : (e.target.value as ContentPreference[])
                  )
                }
                input={<OutlinedInput label="What kind of content would you like to see?" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as ContentPreference[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDelete={() => {
                          setSelectedContent(selectedContent.filter((v) => v !== value));
                        }}
                        sx={{
                          "& .MuiChip-deleteIcon": { color: "#9e9e9e", transition: "color 0.2s ease" },
                          "& .MuiChip-deleteIcon:hover": {
                            color: "#616161",
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                            borderRadius: "50%",
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              >
                {CONTENT_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" sx={{ width: "60%", mt: 1 }} onClick={onSave}>
                Save Preferences
              </Button>
            </Box>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesDialog;


