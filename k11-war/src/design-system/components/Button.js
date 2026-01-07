import React from "react";
import styled from "styled-components";
import MuiButton from "@mui/material/Button";

const StyledButton = styled(MuiButton)``;

const Button = ({ variant = "contained", children, sx, ...props }) => {
  return (
    <StyledButton
      variant={variant}
      sx={sx}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
