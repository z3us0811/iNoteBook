import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [
    {
      _id: "6461e2f26f4c305fb46dad1640",
      user: "64536209ce61f670b639c817",
      title: "My title 1",
      description: "Wakeup",
      tag: "Personal ",
      date: "2023-05-15T07:44:50.417Z",
      __v: 0,
    },
    {
      _id: "6461e3016f4c305fb4av6d16442",
      user: "64536209ce61f670b639c817",
      title: "My title 2",
      description: "Wakeup",
      tag: "Personal ",
      date: "2023-05-15T07:45:05.978Z",
      __v: 0,
    },
    {
      _id: "6461e301ds6f4c305fb46d16443",
      user: "64536209ce61f670b639c817",
      title: "My title 3",
      description: "Wakeup",
      tag: "Personal ",
      date: "2023-05-15T07:45:05.978Z",
      __v: 0,
    },
    {
      _id: "6461e3016f4dc305fb46d16445",
      user: "64536209ce61f670b639c817",
      title: "My title 4",
      description: "Wakeup",
      tag: "Personal ",
      date: "2023-05-15T07:45:05.978Z",
      __v: 0,
    },
    {
      _id: "6461e3016f4c30a5fb46d16446",
      user: "64536209ce61f670b639c817",
      title: "My title 5",
      description: "Wakeup",
      tag: "Personal ",
      date: "2023-05-15T07:45:05.978Z",
      __v: 0,
    },
    {
      _id: "6461ev3016f4c305fb46d16447",
      user: "64536209ce61f670b639c817",
      title: "My title 6",
      description: "Wakeup",
      tag: "Personal ",
      date: "2023-05-15T07:45:05.978Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    //API Call

    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      }
    );

    const json = await response.json()
    setNotes(json)
  };

  const addNote = async (title, description, tag) => {
    //API Call

    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      }
    );

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    //API call
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      }
    );
    const json = response.json();
    console.log(json)
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    const json = response.json();
    console.log(json)
    props.showAlert("Updated Successfully", "success")

    //Logic for editing a note
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
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
