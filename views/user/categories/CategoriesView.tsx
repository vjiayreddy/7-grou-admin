"use client";
import React, { useEffect } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useLazyFetchMarketCategoryNumberQuery } from "@/redux/apis/marketApi";
import { useSearchParams } from "next/navigation";
import LoadingIndicator from "@/components/loading-indicator/LoadingIndicator";

const StyledCategoriesView = styled(Box)(({ theme }) => ({
  "& .section-heading": {
    width: "100%",
    height: 40,
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
    padding: 10,
    color: theme.palette.common.white,
  },
}));

const CategoriesView = () => {
  const searchParams = useSearchParams();
  const gameRateId = searchParams.get("gameRateId");
  const [fetchMarketCategoryNumber, { isLoading, isError, isFetching, data }] =
    useLazyFetchMarketCategoryNumberQuery();

  useEffect(() => {
    if (gameRateId) {
      fetchMarketCategoryNumber({
        gameRateId: gameRateId,
      });
    }
  }, [gameRateId]);

  return (
    <StyledCategoriesView>
      {isLoading && !data && <LoadingIndicator calcHeight={64} />}
      {!isFetching && data && (
        <>
          <Box component="div" className="section-heading">
            <Typography variant="subtitle1" textAlign="center">
              Bet Single Panna
            </Typography>
          </Box>
          <Box p={1}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <img width={90} height={90} src="/icons/1.webp" />
                      </Grid>
                      <Grid item>
                        <Typography
                          fontSize={14}
                          variant="body1"
                          fontWeight={500}
                        >
                          Single Ank
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Box component="div" className="section-heading">
            <Typography variant="subtitle1" textAlign="center">
              Bet On Jodi
            </Typography>
          </Box>
          <Box p={1}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <img width={90} height={90} src="/icons/1.webp" />
                      </Grid>
                      <Grid item>
                        <Typography
                          fontSize={14}
                          variant="body1"
                          fontWeight={500}
                        >
                          Jodi
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <img width={90} height={90} src="/icons/1.webp" />
                      </Grid>
                      <Grid item>
                        <Typography
                          fontSize={14}
                          variant="body1"
                          fontWeight={500}
                        >
                          Family Jodi
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Box component="div" className="section-heading">
            <Typography variant="subtitle1" textAlign="center">
              Bet On Panna
            </Typography>
          </Box>
          <Box p={1}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <img width={90} height={90} src="/icons/1.webp" />
                      </Grid>
                      <Grid item>
                        <Typography
                          fontSize={14}
                          variant="body1"
                          fontWeight={500}
                        >
                          Single Panna
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <img width={90} height={90} src="/icons/1.webp" />
                      </Grid>
                      <Grid item>
                        <Typography
                          fontSize={14}
                          variant="body1"
                          fontWeight={500}
                        >
                          Double Panna
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </StyledCategoriesView>
  );
};

export default CategoriesView;
