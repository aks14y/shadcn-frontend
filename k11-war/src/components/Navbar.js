import React from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { shadow, fontWeight, fontSize, borderWidth, opacity } from "../design-system/utils/themeHelpers";

/**
 * Navbar component combining styled-components, MUI, and sx props
 * with CSP-safe nonce support
 */
const StyledAppBar = styled(AppBar)`
  background: ${(props) => props.theme.palette.primary.main};
  box-shadow: ${(props) => shadow('sm')(props.theme)};
`;

const Navbar = ({ currentView, onViewChange }) => {
  const handleNavClick = (view) => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={(theme) => ({
              fontWeight: fontWeight('bold')(theme),
              cursor: "pointer",
              "&:hover": {
                opacity: opacity('hover')(theme),
              },
            })}
            onClick={() => handleNavClick("home")}
          >
            K11 WAR
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => handleNavClick("home")}
              sx={(theme) => ({
                fontWeight: fontWeight(currentView === "home" ? 'bold' : 'normal')(theme),
                textTransform: "none",
                fontSize: fontSize('base')(theme),
                borderBottom: currentView === "home"
                  ? `${borderWidth('medium')(theme)} solid white`
                  : `${borderWidth('medium')(theme)} solid transparent`,
                borderRadius: 0,
                "&:hover": {
                  backgroundColor: `rgba(255, 255, 255, ${opacity('overlay')(theme)})`,
                },
              })}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavClick("inbox")}
              sx={(theme) => ({
                fontWeight: fontWeight(currentView === "inbox" ? 'bold' : 'normal')(theme),
                textTransform: "none",
                fontSize: fontSize('base')(theme),
                borderBottom: currentView === "inbox"
                  ? `${borderWidth('medium')(theme)} solid white`
                  : `${borderWidth('medium')(theme)} solid transparent`,
                borderRadius: 0,
                "&:hover": {
                  backgroundColor: `rgba(255, 255, 255, ${opacity('overlay')(theme)})`,
                },
              })}
            >
              Inbox
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
