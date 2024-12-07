export type market = {
  _id: string;
  name: string;
  openTime: string;
  closeTime: string;
  isActive: string;
  isWeekEnabled: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  isHoliday: boolean;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  userId: string;
};

export type gameRateData = {
  _id: string;
  gameRateName: string;
  rate: string;
};

export type fetchMarketsByFiltersResponseType = {
  status: string;
  statusCode: number;
  data: {
    markets: market[];
  };
};

// export type fetchMarketsByFiltersResponseType = {
//   status: string;
//   statusCode: number;
//   data: {
//     markets: market[];
//   };
// };

export type fetchGameRateResponseType = {
  status: string;
  statusCode: number;
  data:gameRateData[];
};
