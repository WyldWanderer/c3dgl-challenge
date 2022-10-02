import React, { useEffect } from 'react';
import Map from './components/map.js';
import Navbar from './components/navbar.js';
import { AddLocation } from './components/addLocation.js';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const dispatch = useDispatch()
  const formStatus = useSelector((state) => state.openForm)

  useEffect(() => {
    fetch("http://localhost:3001/locations")
      .then((response) => {
        if(response.ok) {
          return response.json()
        } else {
          throw response.status;
        }
      })
      .then((data) => {
        dispatch({
          type: 'GET_LOCATIONS',
          payload: data.locations
        })
      })
  }, []);

  return (
    <div className="App">
      <Navbar/>
      {formStatus ? <AddLocation /> : null}
      <Map />
    </div>
  );
}

export default App;
