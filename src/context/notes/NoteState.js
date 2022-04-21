import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "62173762aw1799652c245aaa1fc",
      user: "6215e6a623c60f1f5eb9e490",
      title: "Javascript",
      description: "Prototype",
      tag: "Personal",
      date: "2022-02-24T07:44:34.577Z",
      __v: 0,
    },
    {
      _id: "62173762ad1799652cdf245a1fe",
      user: "6215e6a623c60f1f5eb9e490",
      title: "Javascript",
      description: "Prototype",
      tag: "Personal",
      date: "2022-02-24T07:44:34.748Z",
      __v: 0,
    },
    {
      _id: "62173762af179fg9652c245a200",
      user: "6215e6a623c60f1f5eb9e490",
      title: "Javascript",
      description: "Prototype",
      tag: "Personal",
      date: "2022-02-24T07:44:34.960Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;