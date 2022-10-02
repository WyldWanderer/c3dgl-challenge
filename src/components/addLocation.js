import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export function AddLocation() {
    const [locName, setName] = useState("")
    const [newLat, setLat] = useState()
    const [newLng, setLng] = useState()
    const [validLat, checkLat] = useState(true)
    const [validLng, checkLng] = useState(true)

    const dispatch = useDispatch()

    function onNameChange(e) {setName(e.target.value)}
    function onLatChange(e) {setLat(e.target.value)}
    function onLngChange(e) {setLng(e.target.value)}

    function onSaveLocation() {
        checkLat(true)
        checkLng(true) 
        if (locName && newLat && newLng){
            fetch(`http://localhost:3001/${locName}/${newLat}/${newLng}`)
                .then((response) => {
                    if(response.ok) {
                    return response.json()
                    } else {
                    throw response.status;
                    }
                })
                .then((data) => {
                    if (data.status === "success") {
                        dispatch({
                            type: 'ADD_LOCATION',
                            payload: {
                                id: data.id,
                                name: locName,
                                lat: newLat,
                                lng: newLng
                            }
                        })
                        dispatch({
                            type: 'UPDATE_VIEW',
                            payload: {
                                lat: newLat,
                                lng: newLng
                            }
                        })
                    } else if (data.status === "lat invalid") {
                        checkLat(false)
                    } else if (data.status === "lng invalid") {
                        checkLng(false)
                    }
                })
        }
    }

    return (
        <section>
            <form>
                <label>Location Name:</label>
                <input type="test" value={locName} onChange={onNameChange} />
                <label>Latitude:</label>
                <input type="test" value={newLat} onChange={onLatChange} />
                <label>Longitude:</label>
                <input type="test" value={newLng} onChange={onLngChange} />
                <button type="button" onClick={onSaveLocation}>
                    Save Location
                </button>
            </form>
            {!validLat ? <h2 color='red'>Your latitude is incorrect, please enter a number between -90 and 90</h2> : null}
            {!validLng ? <h2 color='red'>Your Longitude is incorrect, please enter a number between -180 and 180</h2> : null}
        </section>
    )
}