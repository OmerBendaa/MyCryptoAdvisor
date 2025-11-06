import huggingFaceClient from "../httpClients/huggingFaceClient";
import { useQuery } from "@tanstack/react-query";
import { InvestorType } from "../common/types";
import { Typography } from "@mui/material";

type insightOfTheDayPropsType={
    selectedInvestorTypes:InvestorType[];
}
const InsightOfTheDay = ({selectedInvestorTypes}:insightOfTheDayPropsType) => {

    const { data, isLoading, error } = useQuery({
        queryKey: ["cryptoInsightOfTheDay"],
        queryFn: () => huggingFaceClient.generateCryptoInsightOfTheDay(selectedInvestorTypes),
    });

   
  return (

      <Typography variant="body1" sx={{ whiteSpace: "pre-line", marginTop: 2 }}>
        {isLoading
          ? "Loading insight of the day..."
          : error
          ? "Error fetching insight of the day."
          : data || "No insight available."}
      </Typography>
    
  );
};

export default InsightOfTheDay;
