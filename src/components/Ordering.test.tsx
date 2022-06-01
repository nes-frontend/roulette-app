import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Ordering from "./Ordering";

afterEach(() => cleanup());

describe("描画", () => {
  test("初期表示", () => {
    render(<Ordering />);
    // screen.debug();
    expect(screen.getByText("候補者を入力してください。")).toBeTruthy();
    expect(screen.getByLabelText("候補者")).toBeTruthy();
    expect(screen.getByText("候補者リスト")).toBeTruthy();
    expect(screen.getByText("ルーレット")).toBeTruthy();
    expect(screen.getByText("チーム決め")).toBeTruthy();
    expect(screen.getByText("順番決め")).toBeTruthy();
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
    expect(screen.getByText("Go!")).toBeTruthy();
    expect(screen.getByText("Reset")).toBeTruthy();
  });
});
describe("候補者を入力", () => {
  test("候補者を入力", () => {
    render(<Ordering />);
    const input = screen.getByRole("textbox", { name: "候補者" });

    fireEvent.input(input, {
      target: {
        value: "test",
      },
    });
    expect(input.id).toBe("inputPerson");
    expect(input).toHaveValue("test");
  });

  test("候補者を入力して追加ボタンをクリック", () => {
    render(<Ordering />);
    const input = screen.getByRole("textbox", { name: "候補者" });

    fireEvent.input(input, {
      target: {
        value: "input_test",
      },
    });
    const button = screen.getByTestId("PersonAddAlt1Icon");
    fireEvent.click(button);
    // screen.debug();
    expect(screen.getByText("input_test")).toBeTruthy();
  });
  // test("候補者を入力して追加ボタンをクリックしてResetをクリック", () => {
  //   render(<Ordering />);
  //   const input = screen.getByRole("textbox", { name: "候補者" });

  //   fireEvent.input(input, {
  //     target: {
  //       value: "input_test",
  //     },
  //   });
  //   const button = screen.getByTestId("PersonAddAlt1Icon");
  //   fireEvent.click(button);
  //   expect(screen.getByText("input_test")).toBeTruthy();

  // const resetButton = screen.getAllByRole("button")[0];
  // fireEvent.click(resetButton);
  // screen.debug();
  // expect(screen.getByText("input_test")).toBeFalsy();
  // });
});

describe("候補者を入力のバリデーション", () => {
  test("候補者を入力せずに追加ボタンをクリック", () => {
    render(<Ordering />);
    const button = screen.getByTestId("PersonAddAlt1Icon");
    fireEvent.click(button);
    // screen.debug();
    expect(screen.getByText("入力必須です")).toBeTruthy();
  });
  test("候補者を入力して追加ボタンを２回クリック", () => {
    render(<Ordering />);
    const input = screen.getByRole("textbox", { name: "候補者" });

    fireEvent.input(input, {
      target: {
        value: "input_test",
      },
    });
    const button = screen.getByTestId("PersonAddAlt1Icon");
    fireEvent.click(button);
    fireEvent.input(input, {
      target: {
        value: "input_test",
      },
    });
    fireEvent.click(button);
    expect(screen.getByText("input_test")).toBeTruthy();
    expect(screen.getByText("同じ名前が存在します")).toBeTruthy();
  });
});
