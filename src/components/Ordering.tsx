import React, { useRef, useState } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Grid,
  Button,
  FormControl,
  Tab,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useSound from "use-sound";
import RollSound from "../assets/roll.mp3";
import StopSound from "../assets/stop.mp3";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Roulette from "./Roulette";
import DivideTeam from "./DivideTeam";
import SortMember from "./SortMember";

//custom hooks
import { useMembers } from "../hooks/useMembers";

const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#A1341B"];

export default function Ordering() {
  // variables & hooks
  const [userName, setUserName] = useState("");

  const [playRollSound] = useSound(RollSound);
  const [playStopSound] = useSound(StopSound);

  const { width, height } = useWindowSize();
  const [confetti, setConfetti] = useState(false);

  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);
  const [inputErrorText, setInputErrorText] = useState("");

  const [value, setValue] = useState("1");

  const [members, { addMember, deleteMember, resetMember }] = useMembers();

  // functions
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePersonAddEvent = () => {
    if (userName === "") {
      setInputError(true);
      setInputErrorText("入力必須です");
      return;
    } else if (members.findIndex(({ option }) => option === userName) !== -1) {
      setInputError(true);
      setInputErrorText("同じ名前が存在します");
      return;
    }
    setUserName("");
    setInputError(false);
    setInputErrorText("");
    addMember({ option: userName });
  };

  const handleDeletePerson = (index: number) => {
    deleteMember(index);
  };

  const reset = () => {
    resetMember();
  };

  const startRoll = () => {
    playRollSound();
    setConfetti(false);
  };

  const stopRoll = () => {
    playStopSound();
    setConfetti(true);
  };

  const startRollAndStop = async () => {
    setConfetti(false);
    playRollSound();
    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    playStopSound();
    setConfetti(true);
  };

  return (
    <React.Fragment>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={5}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            候補者を入力してください。
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <FormControl fullWidth>
                <TextField
                  id="inputPerson"
                  label="候補者"
                  variant="standard"
                  value={userName}
                  onChange={handleUserNameChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.keyCode === 13) {
                      handlePersonAddEvent();
                    }
                  }}
                  error={inputError}
                  inputRef={inputRef}
                  helperText={inputErrorText}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="large"
                edge="start"
                onClick={handlePersonAddEvent}
              >
                <PersonAddAlt1Icon />
              </IconButton>
            </Grid>
          </Grid>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            候補者リスト
          </Typography>

          <Grid item xs={8}>
            <List>
              {members.map((v, i) => (
                <ListItem
                  key={v.option}
                  divider={true}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePerson(i)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={v.option} />
                </ListItem>
              ))}
            </List>
            <Button size="small" variant="contained" onClick={reset} sx={{ mt: 1 }}>
              Reset
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} centered>
                <Tab value="1" label="ルーレット" />
                <Tab value="2" label="チーム決め" />
                <Tab value="3" label="順番決め" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Roulette members={members} backgroundColors={backgroundColors} startRoll={startRoll} stopRoll={stopRoll} />
            </TabPanel>
            <TabPanel value="2">
              <DivideTeam members={members} backgroundColors={backgroundColors} />
            </TabPanel>
            <TabPanel value="3">
              {members.length > 0 && <SortMember members={members} startRollAndStop={startRollAndStop} />}
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
      {confetti && <Confetti width={width} height={height} recycle={false} />}
    </React.Fragment>
  );
}
