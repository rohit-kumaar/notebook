import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get All Note
  const getNotes = async () => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNWU2YTYyM2M2MGYxZjVlYjllNDkwIn0sImlhdCI6MTY0NTYxMjUxN30.jcKEo7i-GwidnHzqrwOmiQLzDT3GBvnFGkUkGBpC6hk",
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNWU2YTYyM2M2MGYxZjVlYjllNDkwIn0sImlhdCI6MTY0NTYxMjUxN30.jcKEo7i-GwidnHzqrwOmiQLzDT3GBvnFGkUkGBpC6hk",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Your note is added");
    const note = {
      _id: "62173762aw1799652c245aaa1fcw",
      user: "6215e6a623c60f1f5eb9e490a",
      title: title,
      description: description,
      tag: tag,
      date: "2022-02-24T07:44:34.577Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete Note
  const deleteNote = (id) => {
    console.log("deleted" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // TODO: API call

    const response = await fetch(
      `${host}/api/notes/updatenote/6217369fa1799652c245a1f9`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNWU2YTYyM2M2MGYxZjVlYjllNDkwIn0sImlhdCI6MTY0NTYxMjUxN30.jcKEo7i-GwidnHzqrwOmiQLzDT3GBvnFGkUkGBpC6hk",
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
