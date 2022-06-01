import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import DivideTeam from "./DivideTeam";
import { PersonData } from "../hooks/useMembers";

const members: PersonData[] = [{ option: "test" }];
const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#A1341B"];

afterEach(() => cleanup());

describe("描画", () => {
  test("初期表示はGoボタンのみ表示", () => {
    render(<DivideTeam members={members} backgroundColors={backgroundColors} />);
    // screen.debug();
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByText("Go!")).toBeTruthy();
    expect(screen.getByLabelText("チーム数(最大4)")).toBeTruthy();
  });
});

describe("Goボタンクリック", () => {
  test("クリック(シャッフル)後はBoxが表示される", async () => {
    render(<DivideTeam members={members} backgroundColors={backgroundColors} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    // screen.debug();
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByText("Go!")).toBeTruthy();
    expect(screen.getByLabelText("チーム数(最大4)")).toBeTruthy();
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByText("チーム1")).toBeTruthy();
    expect(screen.getByText("test")).toBeTruthy();
  });
});
