import React, { useState } from "react";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import axios from "axios";
import TextField from "@material-ui/core/TextField";


function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [expanded, setExpand] = useState(false);
  const [error, setError] = useState(false);

  function handleClick() {
    setExpand(true);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5000/notes/add", note)
      .then((res) => {
        console.log(res.data);
        props.onAdd(note);
        setError(false);
      })
      .catch((err) => setError(true));
    setNote({
      title: "",
      content: "",
    });
    setExpand(false);
  }

  return (
    <div>
      <form className="create-note">
        {error ? (
          <TextField
            error
            id="standard-error-helper-text"
            label="Error"
            helperText="Already Exisiting entry."
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : (
          <TextField
            type={!expanded ? "hidden" : "none"}
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={handleClick}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={expanded ? "3" : "1"}
        />
        <Zoom in={expanded}>
          <Fab onClick={submitNote}>
            <NoteAddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
