import { Box, Container } from "@mui/material";
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
import MarketNewsGrid from "../components/MarketNewsGrid";
import Meme from "../components/Meme";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import EditPreferencesButton from "../components/dashboard/EditPreferencesButton";
import PreferencesDialog from "../components/dashboard/PreferencesDialog";
import ConfirmIncompleteDialog from "../components/dashboard/ConfirmIncompleteDialog";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
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

  const fetchUserPreferences = async () => {
    try{
    const user = await fetchUser();
    const userPrefrence = user?.userPreferences || null;
    userPrefrence ? navigate("/myDashboard") : navigate("/OnboardingQuiz");
    }catch(error){
      message.error("failed to fetch user preferences")
    }
    
  };
  useEffect(() => {
    fetchUserPreferences()
  }, []);

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowConfirm(false);
  };

  return (
    <Loader isLoading={isLoading}>
      <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
        <DashboardHeader userName={userName} />

        <EditPreferencesButton onClick={handleOpenModal} />
        <InsightOfTheDay selectedInvestorTypes={selectedInvestorTypes} />
        <CoinGrid selectedAssets={selectedAssets} />
        <MarketNewsGrid />
        <Meme />
        <PreferencesDialog
          open={isModalOpen}
          onClose={handleCloseModal}
          selectedAssets={selectedAssets}
          setSelectedAssets={(v) => setSelectedAssets(v)}
          selectedInvestorTypes={selectedInvestorTypes}
          setSelectedInvestorTypes={(v) => setSelectedInvestorTypes(v)}
          selectedContent={selectedContent}
          setSelectedContent={(v) => setSelectedContent(v)}
          onSave={handleSave}
        />

        {/* Confirmation Dialog */}
        <ConfirmIncompleteDialog
          open={showConfirm}
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            submitPreferences();
          }}
        />
      </Container>
    </Loader>
  );
};

export default DashboardPage;
