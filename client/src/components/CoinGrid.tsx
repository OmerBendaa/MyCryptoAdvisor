
import { Grid, Card, Typography,CardContent, Box, IconButton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import geckoClient from '../httpClients/coinGeckoClient'
import { ThumbDown, ThumbUp } from '@mui/icons-material'
import {Asset} from "../common/types";
type CoinGridProps={
    selectedAssets: Asset[];
}
const CoinGrid = ({ selectedAssets }: CoinGridProps) => {
    const { data:coinData, isLoading:coinIsLoading, isError } = useQuery({queryKey: ["coins", selectedAssets],
        queryFn: () => geckoClient.fetchCoins(selectedAssets),
        enabled: selectedAssets.length > 0})
  return (
  <Grid container spacing={3}>
            {coinData?.map((content) => (
              <Grid key={content.id} size={4} >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1.5px solid black",
                    borderRadius: "10px",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {content.id}
                    </Typography>
                    <img src={content.image.small} alt={content.id} style={{marginBottom:"10px"}} />
                    
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mb: 2 }}
                    >
                      {content.market_data.current_price["usd"] ? `Current Price: $${content.market_data.current_price["usd"]}` : "Price data not available"}
                    </Typography>
                     <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mb: 2 }}
                    >
                      {content.market_data.current_price["ils"] ? `Current Price: ₪${content.market_data.current_price["ils"]}` : "Price data not available"}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-start",
                      }}
                    >
                      <IconButton
                        aria-label="like"
                        sx={{
                          border: "1px solid rgba(0, 0, 0, 0.23)",
                          borderRadius: "50%",
                          "&:hover": {
                            backgroundColor: "rgba(76, 175, 80, 0.08)",
                            borderColor: "rgba(76, 175, 80, 0.5)",
                          },
                        }}
                      >
                        <ThumbUp />
                      </IconButton>
                      <IconButton
                        aria-label="dislike"
                        sx={{
                          border: "1px solid rgba(0, 0, 0, 0.23)",
                          borderRadius: "50%",
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.08)",
                            borderColor: "rgba(244, 67, 54, 0.5)",
                          },
                        }}
                      >
                        <ThumbDown />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
  
  )
}

export default CoinGrid