import React from "react";
// import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Header from "./components/Header";
import OrderingPage from "./pages/Ordering";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Dialog
        open
        disableEscapeKeyDown
        onClose={() => {
          console.log("nothing to do");
        }}
      >
        <DialogTitle>{"引っ越ししました"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            このサイトは間もなく利用できなくなります。<br></br>
            以下のサイトをブックマークし利用してください。
            <br />
            <br />
            <a href="https://roulette.iwa-hiro.com/">
              https://roulette.iwa-hiro.com/
            </a>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Container component="main" maxWidth="lg">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <OrderingPage />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
