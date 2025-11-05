import { useMemo, useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import fetchUser from "../utills/fetchUser";
import { Asset, InvestorType, ContentPreference } from "../common/types";
import {
  ASSET_SUGGESTIONS,
  INVESTOR_OPTIONS,
  CONTENT_OPTIONS,
} from "../common/constants";
interface QuizPreferences {
  assets: Asset[];
  investorTypes: InvestorType[];
  contentPreferences: ContentPreference[];
}

const OnBoardingQuizPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const [selectedInvestorTypes, setSelectedInvestorTypes] = useState<
    InvestorType[]
  >([]);
  const [selectedContent, setSelectedContent] = useState<ContentPreference[]>(
    []
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const answeredCount = useMemo(() => {
    let count = 0;
    if (selectedAssets.length > 0) count += 1;
    if (selectedInvestorTypes.length > 0) count += 1;
    if (selectedContent.length > 0) count += 1;
    return count;
  }, [selectedAssets, selectedInvestorTypes, selectedContent]);

  const handleSave = () => {
    if (answeredCount === 0) {
      message.error("Please answer at least one question to continue.");
      return;
    }
    if (answeredCount < 3) {
      setShowConfirm(true);
      return;
    }
    submitPreferences();
  };

  const submitPreferences = () => {
    const preferences: QuizPreferences = {
      assets: selectedAssets,
      investorTypes: selectedInvestorTypes,
      contentPreferences: selectedContent,
    };
    message.success(`Preferences saved. Welcome aboard ${userName}!`);
    navigate("/myDashboard");
  };

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const user = await fetchUser();
      setUserName(user?.name || "");
      setIsLoading(false);
    };
    getUser();
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Container component="main" maxWidth="sm" sx={{ overflow: "visible" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1.5px solid black",
            borderRadius: "10px",
            px: 3,
            pb: 3,
            pt: 2,
            overflow: "visible",
          }}
        >
          <Typography variant="h5" sx={{ mt: 1, textAlign: "center" }}>
            Welcome aboard {userName} 👋
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1, textAlign: "center" }}
          >
            Let’s tailor your experience with a quick, friendly quiz.
          </Typography>

          <Stack spacing={3} sx={{ mt: 4, width: "100%" }}>
            <FormControl
              fullWidth
              sx={{
                mt: 2,
                overflow: "visible",
                "& .MuiInputLabel-root": {
                  backgroundColor: "#fff",
                  px: 0.5,
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              }}
            >
              {" "}
              <InputLabel
                id="assets-label"
                sx={{ fontWeight: 700, fontSize: 18 }}
              >
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
                input={
                  <OutlinedInput label="What crypto assets are you interested in?" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as Asset[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDelete={() => {
                          setSelectedAssets((prev) =>
                            prev.filter((v) => v !== value)
                          );
                        }}
                        sx={{
                          "& .MuiChip-deleteIcon": {
                            color: "#9e9e9e",
                            transition: "color 0.2s ease",
                          },
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
                "& .MuiInputLabel-root": {
                  backgroundColor: "#fff",
                  px: 0.5,
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              }}
            >
              <InputLabel
                id="investor-label"
                sx={{ fontWeight: 700, fontSize: 18 }}
              >
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
                          setSelectedInvestorTypes((prev) =>
                            prev.filter((v) => v !== value)
                          );
                        }}
                        sx={{
                          "& .MuiChip-deleteIcon": {
                            color: "#9e9e9e",
                            transition: "color 0.2s ease",
                          },
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
                "& .MuiInputLabel-root": {
                  backgroundColor: "#fff",
                  px: 0.5,
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              }}
            >
              <InputLabel
                id="content-label"
                sx={{ fontWeight: 700, fontSize: 18 }}
              >
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
                input={
                  <OutlinedInput label="What kind of content would you like to see?" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as ContentPreference[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDelete={() => {
                          setSelectedContent((prev) =>
                            prev.filter((v) => v !== value)
                          );
                        }}
                        sx={{
                          "& .MuiChip-deleteIcon": {
                            color: "#9e9e9e",
                            transition: "color 0.2s ease",
                          },
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
              <Button
                variant="contained"
                sx={{ width: "60%", mt: 1 }}
                onClick={handleSave}
              >
                Save Preferences
              </Button>
            </Box>
          </Stack>

          <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
            <DialogTitle>Continue with incomplete answers?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You didn’t answer all the questions. You can continue now and
                update your preferences later.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={() => {
                  setShowConfirm(false);
                  submitPreferences();
                }}
              >
                Yes, save anyway
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </Loader>
  );
};

export default OnBoardingQuizPage;
