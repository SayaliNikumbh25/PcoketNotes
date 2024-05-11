// App.js
import './components/app1.css';
import React, { useState, useEffect, useRef } from 'react';


function App() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  
  const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);

  const popupRef = useRef(null);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);
  }, []);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(selectedGroup)) || [];
    setNotes(storedNotes);
  }, [selectedGroup]);

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
  };

  const handleAddGroup = () => {
    if (newGroupName.trim() !== '' && selectedColor !== '') {
      const newGroup = {
        name: newGroupName.trim(),
        color: selectedColor,
      };
      setGroups([...groups, newGroup]);
      setNewGroupName('');
      setSelectedColor('');
      setShowCreateGroupPopup(false);
      localStorage.setItem('groups', JSON.stringify([...groups, newGroup]));
    }
  };

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowCreateGroupPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Note Taking App</h1>
      </header>
      <div className="container">
        <div className="sidebar">
          <h2>Groups</h2>
          <div className="group-list">
            {groups.map((group, index) => (
              <div
                key={index}
                className="group"
                onClick={() => handleGroupChange(group.name)}
              >
                <div
                  className="group-icon"
                  style={{ backgroundColor: group.color }}
                >
                  {getGroupIcon(group.name)}
                </div>
                <div className="group-name">{group.name}</div>
              </div>
            ))}
            <button className="add-group-btn" onClick={() => setShowCreateGroupPopup(true)}>+</button>
          </div>
        </div>
        <div className="main-content">
          <h2>Notes ({selectedGroup})</h2>
          <div className="note-list">
            {notes.map((note, index) => (
              <div key={index} className="note">
                <p>{note.content}</p>
                <p>{note.timestamp}</p>
              </div>
            ))}
          </div>
          <div className="add-note">
            <input
              type="text"
              placeholder="Add Note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={handleAddNote} disabled={!newNote.trim()}>
              Add Note
            </button>
          </div>
        </div>
      </div>

      {showCreateGroupPopup && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <span className="close-btn" onClick={() => setShowCreateGroupPopup(false)}>&times;</span>
            <h2>Create New Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <div className="color-options">
              <button
                className="color-option"
                style={{ backgroundColor: 'red' }}
                onClick={() => setSelectedColor('red')}
              ></button>
              <button
                className="color-option"
                style={{ backgroundColor: 'blue' }}
                onClick={() => setSelectedColor('blue')}
              ></button>
              <button
                className="color-option"
                style={{ backgroundColor: 'green' }}
                onClick={() => setSelectedColor('green')}
              ></button>
              <button
                className="color-option"
                style={{ backgroundColor: 'pink' }}
                onClick={() => setSelectedColor('pink')}
              ></button>
              <button
                className="color-option"
                style={{ backgroundColor: 'yellow' }}
                onClick={() => setSelectedColor('yellow')}
              ></button>
              <button
                className="color-option"
                style={{ backgroundColor: 'orange' }}
                onClick={() => setSelectedColor('orange')}
              ></button>
            </div>
            <button onClick={handleAddGroup}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
}

function getGroupIcon(name) {
  const words = name.split(' ');
  let icon = '';
  if (words.length >= 2) {
    icon = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  } else if (words.length === 1) {
    icon = words[0].charAt(0).toUpperCase();
  }
  return icon;
}

export default App;
