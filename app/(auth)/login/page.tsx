"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Grid, Typography, styled } from "@mui/material";
import TextInputFieldComponent from "@/components/form-fields/TextInputField";
import FormMobileInput from "@/components/form-fields/PhoneInput";
import FormButton from "@/components/form-fields/FormButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidationschema } from "@/utils/validations";
import { parsePhoneNumber } from "libphonenumber-js";
import { APP_ROUTES } from "@/utils/routes";
import { toast } from "react-toastify";
import _ from "lodash";

const StyledLoginFormWrapper = styled(Box)(({ theme }) => ({
  width: 350,
  paddingLeft: 30,
  paddingRight: 30,
  "& .MuiFormLabel-root": {
    fontWeight: 600,
    fontSize: 14,
  },
  "& .MuiTypography-body1": {
    color: theme.palette.text.secondary,
  },
}));

const LoginPage = () => {
  const { control, handleSubmit } = useForm({
    mode: "all",
    resolver: yupResolver(loginFormValidationschema),
  });
  const router = useRouter();

  const onSubmit = (data: any) => {
    const parseNumber = parsePhoneNumber(data?.mobile);
    signIn("credentials", {
      mobile: parseNumber.nationalNumber as string,
      password: data.password,
      redirect: false,
    })
      .then(async (response: any) => {
        const session = await getSession();
        if (!_.isEmpty(session?.user?.token)) {
         
        } else {
          toast.error("Invalid  credentials Please try again...");
        }
      })
      .catch((error) => {
        toast.error("Invalid  credentials Please try again...");
      });
  };

  return (
    <StyledLoginFormWrapper>
      <Grid container spacing={2}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          item
          xs={12}
        >
          <img width="80%" src="/icons/logo.svg" />
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography variant="body1" textAlign="center">
              Welcome Back King Matka!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FormMobileInput
            control={control}
            name="mobile"
            id="mobile"
            label="Mobile"
            defaultValue=""
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputFieldComponent
            control={control}
            name="password"
            id="password"
            label="Password"
            defaultValue=""
            textFieldProps={{
              fullWidth: true,
              type: "text",
              size: "small",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormButton
            iconName="solar:arrow-right-line-duotone"
            size="large"
            fullWidth={true}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </FormButton>
        </Grid>
      </Grid>
    </StyledLoginFormWrapper>
  );
};

export default LoginPage;
