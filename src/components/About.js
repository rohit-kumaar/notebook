import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function About() {
  let a = useContext(noteContext);
  return (
    <div>
      My name is {a.name} and im a {a.work}
    </div>
  );
}

export default About;
