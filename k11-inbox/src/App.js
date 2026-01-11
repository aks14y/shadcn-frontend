import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import { ThemeProvider, Button, Card } from "k11_war/DesignSystem";

function App() {
  return (
    <ThemeProvider>
      <Box
        sx={{
          minHeight: "100vh",
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
          padding: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", color: "white", mb: 4 }}>
            <Typography variant="h1" gutterBottom>
              K11 Inbox
            </Typography>
            <Typography variant="h5">
              Remote Application Consuming Design System
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, opacity: 0.9 }}>
              This application consumes the design-system from k11-war via Module Federation
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                title="Consumed Button Component"
                content="This button is loaded from k11-war's design-system. It uses the same theme and styling!"
              >
                <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button variant="contained" onClick={() => alert("Button clicked!")}>
                    Click Me
                  </Button>
                  <Button variant="outlined">Outlined</Button>
                  <Button gradient>Gradient Style</Button>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                title="Consumed Card Component"
                content="This card component is also from k11-war's design-system. Notice how it maintains the same design language and theme consistency across both applications!"
              />
            </Grid>

            <Grid item xs={12}>
              <Card
                title="Uniform Design System"
                content="Both k11-war and k11-inbox use the same design-system components, ensuring visual consistency across all applications. The theme, colors, typography, and component styles are all shared."
              >
                <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button variant="contained" size="small">Small</Button>
                  <Button variant="contained" size="medium">Medium</Button>
                  <Button variant="contained" size="large">Large</Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
