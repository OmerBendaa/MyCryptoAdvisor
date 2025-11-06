import { ThumbUp, ThumbDown } from '@mui/icons-material'
import { Grid, Card, Typography ,CardContent, Box, IconButton } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import cryptoPanicClient from '../httpClients/cryptoPanicClient';
type MarketNewsDataType={
    id:number,
    title:string,
    description:string,
}


const MarketNewsGrid = () => {
    const {data:marketNewsData,isLoading,isError}=useQuery({
        queryKey:["market_news"],
        queryFn:()=>  cryptoPanicClient.getMarketNews()
    })
  return (
      <Grid container spacing={3}>
                {marketNewsData?.data.results.slice(0,4).map((content:MarketNewsDataType) => (
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
                          {content.title}
                        </Typography>    
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          {content.description}
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

export default MarketNewsGrid;