import './App.css';
import Groups from './components/groups/Groups';
import Notes from './components/notes/Notes';
import { useState, useEffect } from 'react';

function App() {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedIcon, setSelectedIcon] =useState({})

  const [selected, setSelceted] = useState(false);

  const handleSelection = (isSelected) => {
    setSelceted(isSelected);
    localStorage.setItem('selected',isSelected);
  };

  console.log(selected)

  const handleGroupChange = (group, groupIcon) => {
    setSelectedGroup(group);
    localStorage.setItem('selectedGroup',group)
    localStorage.setItem('selectedIcon',JSON.stringify(groupIcon) );
  };

  useEffect(() => {
    const storedGroup = localStorage.getItem('selectedGroup') || '';
    const icon = localStorage.getItem('selectedIcon');
    if (storedGroup) {
      setSelectedGroup(storedGroup);
    }

    if(icon){
      setSelectedIcon(selectedIcon)
    }
  }, []);
  
  console.log('Hello')

    if(window.innerWidth <= 576 ){
      if(!selected){
        return(
          <div className='container'>
            <Groups selectedGroup = {selectedGroup} selectedIcon={selectedIcon} handleGroupChange={handleGroupChange} handleSelection={handleSelection}/>
          </div>
        );
      }
      else{
        return(
          <div className='container'>
            <Notes selectedGroup = {selectedGroup} selectedIcon={selectedIcon} handleSelection = {handleSelection}/>
          </div>
        );
      }
      
    }
   else {
    return (
      <div className='container'>
        <Groups selectedGroup = {selectedGroup} selectedIcon={selectedIcon} handleGroupChange={handleGroupChange} handleSelection={handleSelection}/>
        <Notes selectedGroup = {selectedGroup} selectedIcon={selectedIcon}/>
      </div>
      
    );
  }
  
}

export default App
