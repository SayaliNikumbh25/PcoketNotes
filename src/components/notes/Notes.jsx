import './Notes.css';
import React, { useState, useEffect } from 'react';
import image from '../images/Vector.png';
import backgroundImage from '../images/background_image.png'
import backButton from '../images/backButton.png'

function Notes({ selectedGroup , selectedIcon, handleSelection}) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(selectedGroup)) || [];
    setNotes(storedNotes);
  }, [selectedGroup]);


    const sicon = JSON.parse(localStorage.getItem("selectedIcon")) || [];

  
  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      const newNoteObj = {
        content: newNote.trim(),
        timestamp: new Date().toLocaleString(),
      };
      setNotes([...notes, newNoteObj]);
      setNewNote('');
      localStorage.setItem(selectedGroup, JSON.stringify([...notes, newNoteObj]));
    }
  };
  
  function getGroupIcon(name) {
    const words = name.split(' ');
    let icon = '';
    if (words.length >= 2) {
      icon = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else if (words.length === 1) {
      icon = words[0].charAt(0).toUpperCase()+words[0].charAt(1).toUpperCase();
    }
    return icon;
  }

  // function toggleSubmitButton() {
  //   if (inputField.value.trim() !== '') {
  //     submitButton.removeAttribute('disabled');
  //   } else {
  //     submitButton.setAttribute('disabled', 'true');
  //   }
  // }

  //toggleSubmitButton()
  if(!selectedGroup){
    return(
      <div className='alternate_Notes_container'>
        <div className='alternate_div_notes'>
          <img src={backgroundImage} alt="Background image" />
          <h1>Pocket Notes</h1>
          <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
      </div>
    );
  }else{
    return (
      <div className="Notes_container">
        <div className='notes-header'>
          <button className='back-button' onClick={() => {handleSelection(false)}}>
            <img className='back-button-image' src={backButton} alt="Back button" />
          </button>
         <div
            className="header-group-icon"
            style={{ backgroundColor: sicon.color }}
          >
              {getGroupIcon(sicon.name)}
          </div>
          <h2 style={{margin:'5px 20px'}}>{selectedGroup}</h2>
        </div>   
        
        <div className=" note-list scroll">
          {notes.map((note, index) => (
            <div key={index} className="note">
              <p className='note-paragraph'>{note.content}</p>
              <p className='note-time'>{note.timestamp}</p>
            </div>
          ))}
        </div>
        <div className="add-note">
          <div className='add-note-container'>
            <textarea 
              placeholder="Enter your text here..........."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            > 
            </textarea>
            
            <button className='note-submit-button' onClick={handleAddNote} disabled={!newNote.trim()}>
              <img src={image} alt="Button"/> 
            </button>
            
          </div>
              
              
        </div>
      </div>
    );
  }
 
}

export default Notes;
