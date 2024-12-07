"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { showAuthModel } from "@/redux/reducers/authSlice";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import FormMobileInput from "@/components/form-fields/PhoneInput";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/form-fields/TextInputField";
import FormButton from "@/components/form-fields/FormButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidationschema } from "@/utils/validations";
import { getSession, signIn } from "next-auth/react";
import { parsePhoneNumber } from "libphonenumber-js";
import { toast } from "react-toastify";
import _ from "lodash";

const StyledLoginDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    height: "100vh",
    width: "100vw",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& .close-icon": {
      position: "absolute",
      top: 20,
      right: 20,
      "& svg": {
        fontSize: 25,
        color: theme.palette.grey[500],
      },
    },
  },
}));

interface LoginModelProps {
  open: boolean;
}

const LoginModel = ({ open }: LoginModelProps) => {
  const dispatch = useDispatch();
  const [isSubmit,setIsSubmit] = useState<boolean>(false)
  const { control, handleSubmit } = useForm({
    mode: "all",
    resolver: yupResolver(loginFormValidationschema),
  });
  const onSubmit = (data: any) => {
    const parseNumber = parsePhoneNumber(data?.mobile);
    setIsSubmit(true)
    signIn("credentials", {
      mobile: parseNumber.nationalNumber as string,
      password: data.password,
      redirect: false,
    })
      .then(async (response: any) => {
        setIsSubmit(false)
        const session = await getSession();
        if (!_.isEmpty(session?.user?.token)) {
          dispatch(showAuthModel(false));
        } else {
          toast.error("Invalid  credentials Please try again...");
        }
      })
      .catch((error) => {
        setIsSubmit(false)
        toast.error("Invalid  credentials Please try again...");
      });
  };
  return (
    <StyledLoginDialog fullScreen={true} open={open}>
      <Box component="div" className="close-icon">
        <IconButton onClick={() => dispatch(showAuthModel(false))}>
          <Icon icon="mingcute:close-fill" />
        </IconButton>
      </Box>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <img width={250} alt="logo" src="/icons/logo.png" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormMobileInput
              control={control}
              name="mobile"
              id="input-mobile"
              defaultValue=""
              size="medium"
              label="Mobile"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextInput
              control={control}
              id="input-password"
              name="password"
              label="Password"
              defaultValue=""
              textFieldProps={{
                fullWidth: true,
                type: "password",
                size: "medium",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormButton
              onClick={handleSubmit(onSubmit)}
              fullWidth={true}
              size="large"
              variant="contained"
              disabled={isSubmit}
            >
              Login
            </FormButton>
          </Grid>
        </Grid>
      </Box>
    </StyledLoginDialog>
  );
};

export default LoginModel;
