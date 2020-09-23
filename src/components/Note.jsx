import React, { useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function Note(props) {
  const [editable, setEditable] = useState(false);
  const [note, setNote] = useState({
    title: props.title,
    content: props.content,
  });
  // handle channge
  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function handleEdit() {
    setEditable(!editable);
    if (editable) {
      axios
        .patch(
          "http://localhost:5000/notes/update/" + props.id,
          note
        )
        .then((res) => console.log(res.data));
    }
    console.log(editable);
  }
  return (
    <div className="note">
      {!editable ? (
        <div>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
        </div>
      ) : (
        <form>
          <TextField
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
          <TextField
            name="content"
            onChange={handleChange}
            value={note.content}
          />
        </form>
      )}
      <button onClick={handleEdit}>
        <EditIcon color="primary" />
      </button>
      <button
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        <DeleteForeverIcon style={{ color: "red" }} />
      </button>
    </div>
  );
}

export default Note;
