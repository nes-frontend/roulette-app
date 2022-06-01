import { Box, Button, Grid } from "@mui/material";
import shuffle from "lodash.shuffle";
import React, { useEffect, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { PersonData } from "../hooks/useMembers";

type sortMemberProps = {
  members: PersonData[];
  startRollAndStop: () => void;
};

function SortMember({ members, startRollAndStop }: sortMemberProps) {
  const [shuffledMembers, setShuffledMembers] = useState<PersonData[]>([]);

  useEffect(() => {
    setShuffledMembers(members);
  }, [members]);

  const startShuffle = async () => {
    startRollAndStop();
    for (let i = 0; i < 5; i++) {
      setShuffledMembers(shuffle(members));
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={2}>
        <Button variant="contained" onClick={startShuffle} sx={{ mr: 2 }}>
          Go!
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Flipper flipKey={shuffledMembers.map((v) => v.option).join("")}>
          {shuffledMembers.map((v: PersonData, index: number) => (
            <Flipped key={v.option} flipId={v.option}>
              <Box
                sx={{
                  width: 250,
                  height: 45,
                  backgroundColor: "#FFF",
                  color: "#6091d3",
                  fontWeight: "bold",
                  borderRadius: 2,
                  border: 3,
                  borderColor: "#6091d3",
                  textAlign: "center",
                  lineHeight: 2.5,
                  mt: 3,
                }}
              >
                {index + 1} : {v.option}
              </Box>
            </Flipped>
          ))}
        </Flipper>
      </Grid>
    </Grid>
  );
}

export default SortMember;
