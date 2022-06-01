import { useCallback, useEffect, useState } from "react";

export type PersonData = {
  option: string;
};

// type ReturnType = [PersonData[], void, void, void];
export const useMembers = () => {
  const [members, setMembers] = useState<PersonData[]>(() => {
    const saved = localStorage.getItem("personList");
    const initialValue = JSON.parse(saved || "[]");
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem("personList", JSON.stringify(members));
  }, [members]);

  const addMember = useCallback((member: PersonData) => setMembers([...members, member]), [members]);

  const deleteMember = useCallback(
    (index: number) => {
      const newMembers = [...members];
      newMembers.splice(index, 1);
      setMembers(newMembers);
    },
    [members]
  );

  const resetMember = useCallback(() => setMembers([]), [members]);

  return [members, { addMember, deleteMember, resetMember }] as const;
};
