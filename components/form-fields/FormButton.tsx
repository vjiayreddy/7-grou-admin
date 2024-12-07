import React, { Fragment } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { styled } from "@mui/material/styles";

const StyledButton=styled(Button)(({theme})=>({
  
}))

interface FormButton extends ButtonProps {
  iconName?: string;
  startIconName?: string;
}

const FormButton = ({ startIconName, iconName, ...rest }: FormButton) => {
  return (
    <StyledButton
      startIcon={startIconName ? <Icon icon={startIconName} /> : <Fragment />}
      endIcon={iconName ? <Icon icon={iconName} /> : <Fragment />}
      {...rest}
    />
  );
};

export default FormButton;
