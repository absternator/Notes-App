import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  // each time its upadated return notes
  useEffect(() => {
    axios
      .get("http://localhost:5000/notes/")
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      console.log("clean on notes List");
    };
  }, [notes.length]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    axios
      .delete("http://localhost:5000/notes/" + id)
      .then((res) => console.log(res.data));
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
