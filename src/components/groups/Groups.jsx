import React from 'react'
import './Groups.css';
import { useState, useEffect, useRef } from 'react';


const Groups = ({handleGroupChange, handleSelection}) => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  
  const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);
  }, []);

  
  const popUPref = useRef()
 

 useEffect(()=>{
  let handler = (e) =>{
      if(!popUPref.current.contains(e.target)){
        setShowCreateGroupPopup(false)      
      }       
  }
  document.addEventListener('mousedown', handler);
 });



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


  return (
    <div className='container_groups'>
       
        <h1 className='notes_heading'>Pocket Notes</h1>
      
        <button className='add_button' onClick={() => setShowCreateGroupPopup(true)}>+</button>
        <div className='group_List scroll '>
            {groups.map((group, index) => (
                  <div
                    key={index}
                    className="group"
                    onClick={() => {
                    handleGroupChange(group.name, group);
                    handleSelection(true);

                    }}
                    
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
        </div> 
        
        {showCreateGroupPopup && (
          <div className="popup" >
            <div className="popup-content"  ref={popUPref}>
              
              <h2 className='popup-heading'>Create New Group</h2>
              <div className='popup-items'>
              <label className='popup-content-style'>Group Name </label>  
              <input
                className='popup-content-style'
                type="text"
                placeholder="Enter group Name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              </div>
                      
              <div className="color-options">
                <label className='popup-content-style'>Choose colour </label> 
                <div>
                  <button
                    className="color-option"
                    style={{ backgroundColor: '#B38BFA' }}
                    onClick={() => setSelectedColor('#B38BFA')}
                  ></button>
                  <button
                    
                    className="color-option "
                    style={{ backgroundColor: '#FF79F2' }}
                    onClick={() => setSelectedColor('#FF79F2')}
                  ></button>
                  <button

                    className="color-option "
                    style={{ backgroundColor: '#43E6FC' }}
                    onClick={() => setSelectedColor('#43E6FC')}
                  ></button>
                  <button
                    className="color-option "
                    style={{ backgroundColor: '#F19576' }}
                    onClick={() => setSelectedColor('#F19576')}
                  ></button>
                  <button
                    className="color-option "
                    style={{ backgroundColor: '#0047FF' }}
                    onClick={() => setSelectedColor('#0047FF')}
                  ></button>
                  <button
                    className="color-option "
                    style={{ backgroundColor: '#6691FF' }}
                    onClick={() => setSelectedColor('#6691FF')}
                  ></button>
                </div>
                
              </div>
              <button onClick={handleAddGroup} className='create-group-button'>Create</button>
            </div>
          </div>
        )}
      </div>
    
  )
}

export default Groups