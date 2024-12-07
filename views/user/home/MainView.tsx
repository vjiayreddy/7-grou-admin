"use client";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import HomeBannerView from "./Banner";
import LiveResults from "./LiveResults";
import HomeInfoSection from "./InfoSection";
import ListView from "./MarketListView";
import { useLazyFetchMarketsByFiltersQuery } from "@/redux/apis/marketApi";
import LoadingIndicator from "@/components/loading-indicator/LoadingIndicator";
import _ from "lodash";
import NoDataFoundComponent from "@/components/no-data-found/NoDataFound";

const StyledMainView = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  backgroundColor: theme.palette.grey[100],
  flexDirection: "column",

  "& .section-content": {
    flex: 1,
    overflow: "auto",
    position: "relative",
  },
}));

const MainView = () => {
  const [
    fetchMarketsByFilters,
    { isLoading, isFetching, isError, data, isSuccess },
  ] = useLazyFetchMarketsByFiltersQuery();

  useEffect(() => {
    fetchMarketsByFilters({})
      .then((response) => {})
      .catch((error) => {});
  }, []);

  return (
    <StyledMainView>
      <HomeBannerView />
      <LiveResults />
      <HomeInfoSection />
      <Box className="section-content">
        {isLoading && isFetching && !data && <LoadingIndicator />}
        {!isLoading &&
          !isFetching &&
          isSuccess &&
          _.isEmpty(data?.data?.markets) && (
            <NoDataFoundComponent message="No Markets Data Found" />
          )}
        {!isLoading &&
          !isFetching &&
          isSuccess &&
          !_.isEmpty(data?.data?.markets) && (
            <ListView data={data?.data?.markets || []} />
          )}
      </Box>
    </StyledMainView>
  );
};

export default MainView;
