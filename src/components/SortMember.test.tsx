import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import SortMember from "./SortMember";
import { PersonData } from "../hooks/useMembers";

const members: PersonData[] = [{ option: "test" }];
const startRollAndStop = jest.fn();

afterEach(() => cleanup());

describe("描画", () => {
  test("GOボタンとBoxが表示される", () => {
    render(<SortMember members={members} startRollAndStop={startRollAndStop} />);
    // screen.debug();
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByText("Go!")).toBeTruthy();
    expect(screen.getByText("1 : test")).toBeTruthy();
  });
});

describe("Goボタンクリック", () => {
  test("クリック(シャッフル)後もGOボタンとBoxが表示される", async () => {
    render(<SortMember members={members} startRollAndStop={startRollAndStop} />);
    // screen.debug();
    const button = screen.getByRole("button");
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeTruthy();
      expect(screen.getByText("Go!")).toBeTruthy();
      expect(screen.getByText("1 : test")).toBeTruthy();
    });
  });
});
