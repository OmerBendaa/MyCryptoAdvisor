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
  Typography
} from "@mui/material";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  API_USER_BASE,
  ASSET_SUGGESTIONS,
  CONTENT_OPTIONS,
  INVESTOR_OPTIONS,
} from "../common/constants";
import {
  Asset,
  ContentPreference,
  InvestorType,
  IUserPreferences,
} from "../common/types";
import CoinGrid from "../components/CoinGrid";
import InsightOfTheDay from "../components/InsightOfTheDay";
import Loader from "../components/Loader/Loader";
import fetchUser from "../utills/fetchUser";
import cryptoPanicClient from "../httpClients/cryptoPanicClient";
import MarketNewsGrid from "../components/MarketNewsGrid";
import Meme from "../components/Meme";


const DashboardPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const [selectedInvestorTypes, setSelectedInvestorTypes] = useState<
    InvestorType[]
  >([]);
  const [selectedContent, setSelectedContent] = useState<ContentPreference[]>(
    []
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const answeredCount =
    (selectedAssets.length > 0 ? 1 : 0) +
    (selectedInvestorTypes.length > 0 ? 1 : 0) +
    (selectedContent.length > 0 ? 1 : 0);




    

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const user = await fetchUser();
        setUserId(user?._id || null);
        setUserName(user?.name || "");
        if (user?.userPreferences) {
          setSelectedAssets(
            (user.userPreferences.cryptoAssets as Asset[]) || []
          );
          setSelectedInvestorTypes(
            (user.userPreferences.investorTypes as InvestorType[]) || []
          );
          setSelectedContent(
            (user.userPreferences.contentTypes as ContentPreference[]) || []
          );
        }
      } catch (err) {
        message.error("Failed to load user data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

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

  const submitPreferences = async () => {
    const preferences: IUserPreferences = {
      cryptoAssets: selectedAssets,
      investorTypes: selectedInvestorTypes,
      contentTypes: selectedContent,
    };
    try {
      setIsLoading(true);
      await axios.put(`${API_USER_BASE}userPreferences`, {
        userId: userId,
        preferences: preferences,
      });
      setIsLoading(false);
      message.success(`Preferences saved successfully!`);
      setIsModalOpen(false);
      setShowConfirm(false);
    } catch (error) {
      message.error("Failed to save preferences. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowConfirm(false);
  };

  return (
    <Loader isLoading={isLoading}>
      <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            {userName ? `${userName}'s Crypto Dashboard` : "Crypto Dashboard"}
          </Typography>
        </Box>

        {/* Edit Preferences Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="outlined"
            onClick={handleOpenModal}
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
        <InsightOfTheDay selectedInvestorTypes={selectedInvestorTypes} />
        <CoinGrid selectedAssets={selectedAssets} />
        <MarketNewsGrid/>
        <Meme/>
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "10px",
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Edit Your Preferences
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
                    input={
                      <OutlinedInput label="What type of investor are you?" />
                    }
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
            </Box>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
          <DialogTitle>Continue with incomplete answers?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You didn't answer all the questions. You can continue now and
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
      </Container>
    </Loader>
  );
};

export default DashboardPage;