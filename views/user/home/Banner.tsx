"use client";
import React from "react";
import { Box, styled } from "@mui/material";
import NextImage from "next/image";

const StyledHomeBannerView = styled(Box)(({ theme }) => ({
  minHeight: 160,
  position: "relative",
  width: "100%",
  "& .next-image": {
    objectFit:"cover",
    transform: `scale(1)`
  },
}));

const HomeBannerView = () => {
  return (
    <StyledHomeBannerView>
      <NextImage
        className="next-image"
        src="/banners/home_banner.svg"
        fill={true}
        alt="banner"
      />
    </StyledHomeBannerView>
  );
};

export default HomeBannerView;
