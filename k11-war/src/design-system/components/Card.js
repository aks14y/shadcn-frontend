import React from "react";
import styled from "styled-components";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { fontSize } from "../utils/themeHelpers";

const StyledCard = styled(MuiCard)``;

const StyledCardHeader = styled(CardHeader)`
  background: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
  
  & .MuiCardHeader-title {
    color: ${(props) => props.theme.palette.primary.contrastText};
    font-size: ${(props) => fontSize('lg')(props.theme)};
  }
`;

const Card = ({ title, content, children, headerAction, sx, headerSx, ...props }) => {
  return (
    <StyledCard
      sx={sx}
      {...props}
    >
      {title && (
        <StyledCardHeader
          title={title}
          action={headerAction}
          sx={headerSx}
        />
      )}
      <CardContent>
        {content && (
          <Typography variant="body1" color="text.secondary">
            {content}
          </Typography>
        )}
        {children}
      </CardContent>
    </StyledCard>
  );
};

export default Card;
