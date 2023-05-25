import React, {useContext} from "react";
import noteContext from "../Context/Notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div>
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <i className="fa-solid fa-trash-can me-3" onClick={() => {deleteNote(note._id)}}></i>
          <i className="fa-solid fa-pen-to-square me-3" onClick={() => {updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
