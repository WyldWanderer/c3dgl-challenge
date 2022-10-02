import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.css';

export default function Navbar(){
  const dispatch = useDispatch()
  const formStatus = useSelector((state) => state.openForm)
  const polygonCoords = useSelector((state) => state.polygonCoordsToSave)

  function openForm() {
    dispatch({
      type: 'OPEN_FORM',
      payload: !formStatus
    })
  }

  function savePolygon() {
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(polygonCoords),
      headers: {
        'Content-Type': 'application/json'
      }

    }
    fetch(`http://localhost:3001/new_polygon`, fetchOptions)
      .then((response) => {
          if(response.ok) {
          return response.json()
          } else {
          throw response.status;
          }
      })
  }

  return (
    <div className="heading">
      <h1>Concept3D Map Challenge</h1>
      <button onClick={openForm}>Add Location</button>
      {polygonCoords ? <button onClick={savePolygon}>Save Polygon</button> : null}
    </div>
  );
}
