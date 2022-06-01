import { Button, Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { PersonData } from "../hooks/useMembers";

const textColors = ["#FFFFFF"];
const outerBorderColor = "#eeeeee";
const outerBorderWidth = 10;
const innerBorderColor = "#30261a";
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = "#eeeeee";
const radiusLineWidth = 8;
const fontSize = 19;
const textDistance = 60;

type rouletteProps = {
  members: PersonData[];
  backgroundColors: string[];
  startRoll: () => void;
  stopRoll: () => void;
};

export default function Roulette({ members, backgroundColors, startRoll, stopRoll }: rouletteProps) {
  // variables & hooks
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const processing = useRef(false);

  const startRouletto = () => {
    if (processing.current) return;
    processing.current = true;
    handleSpinClick();
    startRoll();
  };

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * members.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={2}>
        <Button variant="contained" onClick={startRouletto} sx={{ mr: 2 }}>
          Go!
        </Button>
      </Grid>
      <Grid item xs={12}>
        {members.length > 0 && (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={members}
            backgroundColors={backgroundColors}
            textColors={textColors}
            fontSize={fontSize}
            outerBorderColor={outerBorderColor}
            outerBorderWidth={outerBorderWidth}
            innerRadius={innerRadius}
            innerBorderColor={innerBorderColor}
            innerBorderWidth={innerBorderWidth}
            radiusLineColor={radiusLineColor}
            radiusLineWidth={radiusLineWidth}
            // perpendicularText
            textDistance={textDistance}
            onStopSpinning={() => {
              setMustSpin(false);
              stopRoll();
              processing.current = false;
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
