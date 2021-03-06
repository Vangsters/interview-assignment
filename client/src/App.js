import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components';
import axios from 'axios';
import NewFlavorForm from './NewFlavorForm';
import FlavorsList from './FlavorsList';

const Wrapper = styled.div`
  padding: 32px;
`

function App() {
  const [ flavors, setFlavors ] = React.useState([]);

  React.useEffect(() => {
    const fetchFlavors = async () => {
      const { data } = await axios('/flavors').catch(err => ({ err }));
      setFlavors(data);
    }

    fetchFlavors();
  }, [])

  const addNewFlavor = async (newFlavor) => {
    const { data } = await axios('/flavors', {
      method: 'POST',
      data: newFlavor,
      headers:{
        'Content-Type': 'application/json'
      }
    }).catch(err => ({ err }));

    setFlavors(prev => ([
      ...prev,
      data,
    ]))
  }

  const updateFlavorRating = async ({ id, value }) => {
    const { data } = await axios('/flavors', {
      method: 'PUT',
      data: {
        id,
        rating: value,
      },
      headers:{
        'Content-Type': 'application/json'
      }
    }).catch(err => ({ err }));

    setFlavors(prev => prev.map(flavor => flavor.id === id ? data : flavor))
  }
  
  return (
    <Wrapper className="App">
      <center>
        <NewFlavorForm onClick={addNewFlavor}/>
        <FlavorsList 
          flavors={flavors} 
          onRatingSelect={updateFlavorRating}
        />
      </center>
    </Wrapper>
  );
}

export default App;
