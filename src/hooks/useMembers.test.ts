import { act, cleanup, renderHook } from "@testing-library/react";
import { useMembers } from "./useMembers";

afterEach(() => cleanup());

describe("useMembers", () => {
  test("初期状態は空", () => {
    const { result } = renderHook(() => useMembers());
    expect(result.current[0]).toStrictEqual([]);
  });

  test("addMember", () => {
    const { result } = renderHook(() => useMembers());
    const [members, { addMember }] = result.current;

    expect(members).toStrictEqual([]);
    act(() => {
      addMember({ option: "test" });
    });
    expect(result.current[0]).toStrictEqual([{ option: "test" }]);
  });

  test("deleteMember", () => {
    const { result } = renderHook(() => useMembers());
    const [, { addMember, deleteMember }] = result.current;

    act(() => {
      addMember({ option: "test" });
      deleteMember(0);
    });
    expect(result.current[0]).toStrictEqual([]);
  });

  test("resetMember", () => {
    const { result } = renderHook(() => useMembers());
    const [, { resetMember }] = result.current;

    act(() => {
      resetMember();
    });
    expect(result.current[0]).toStrictEqual([]);
  });
});
