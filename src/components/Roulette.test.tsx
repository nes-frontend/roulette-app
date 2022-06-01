import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Roulette from "./Roulette";
import { PersonData } from "../hooks/useMembers";

const members: PersonData[] = [{ option: "test" }];
const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#A1341B"];
const startRoll = jest.fn();
const stopRoll = jest.fn();

afterEach(() => cleanup());

describe("描画", () => {
  test("GOボタンとBoxが表示される", () => {
    render(<Roulette members={members} backgroundColors={backgroundColors} startRoll={startRoll} stopRoll={stopRoll} />);
    // screen.debug();
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByText("Go!")).toBeTruthy();
  });
});

describe("Goボタンクリック", () => {
  test("クリック(シャッフル)後もGOボタンが表示される", async () => {
    render(<Roulette members={members} backgroundColors={backgroundColors} startRoll={startRoll} stopRoll={stopRoll} />);
    // screen.debug();
    const button = screen.getByRole("button");
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeTruthy();
      expect(screen.getByText("Go!")).toBeTruthy();
    });
  });
});
