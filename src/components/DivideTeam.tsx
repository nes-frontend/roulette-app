import React, { useState } from "react";
import { Button, Grid, TextField, Paper } from "@mui/material";
import { PersonData } from "../hooks/useMembers";
import shuffle from "lodash.shuffle";

type divideTeamProps = {
  members: PersonData[];
  backgroundColors: string[];
};

function DivideTeam({ members, backgroundColors }: divideTeamProps) {
  const [teamNum, setTeamNum] = useState(1);
  const [teamUsers, setTeamUsers] = useState<string[]>([]);

  const shuffleList = () => {
    setTeamUsers(shuffle(members.map((v) => v.option)));
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={6}>
        <TextField
          id="standard-number"
          label="チーム数(最大4)"
          type="number"
          defaultValue={1}
          InputProps={{
            inputProps: {
              max: 4,
              min: 1,
            },
          }}
          variant="standard"
          style={{ width: 100 }}
          onChange={(event) => setTeamNum(Number(event.target.value))}
        />
        <Button variant="contained" onClick={shuffleList} sx={{ ml: 2 }}>
          Go!
        </Button>
      </Grid>
      {teamUsers.length !== 0 &&
        [...Array(teamNum)].map((_, i) => (
          <Grid item xs={12} key={i}>
            <h3>チーム{i + 1}</h3>
            <Grid container>
              {teamUsers.map(
                (user: string, index) =>
                  i === index % teamNum && (
                    <Grid item xs={4} key={user}>
                      <Paper
                        key={user}
                        sx={{
                          m: 1,
                          backgroundColor: backgroundColors[i % 4],
                          color: "white",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          height: 60,
                          lineHeight: "60px",
                        }}
                      >
                        {user}
                      </Paper>
                    </Grid>
                  )
              )}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default DivideTeam;
