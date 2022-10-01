import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.css';

export default function Navbar(){
  const dispatch = useDispatch()
  const formStatus = useSelector((state) => state.openForm)

  function openForm() {
    dispatch({
      type: 'OPEN_FORM',
      payload: !formStatus
    })
  }

  return (
    <div className="heading">
      <h1>Concept3D Map Challenge</h1>
      <button onClick={openForm}>Add Location</button>
    </div>
  );
}
