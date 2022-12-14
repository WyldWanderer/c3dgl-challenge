const initialState = {
  locations: [],
  polygons: [],
  filters: {
    status: 'All',
  }
}

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case 'GET_LOCATIONS': {
      return {
        ...state,
        locations: action.payload
      }
    }
    case 'GET_POLYGONS': {
      return {
        ...state,
        polygons: action.payload
      }
    }
    case 'ADD_LOCATION': {
      console.log("location added")
      return {
        ...state,
        locations: [...state.locations, action.payload],
        openForm: false
      }
    }
    case 'OPEN_FORM': {
      return {
        ...state,
        openForm: action.payload
      }
    }
    case 'UPDATE_VIEW': {
      return {
        ...state,
        mapViewLat: action.payload.lat,
        mapViewLng: action.payload.lng
      }
    }
    case 'UPDATE_POLYGON_COORDINATES': {
      return {
        ...state,
        polygonCoordsToSave: action.payload
      }
    }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}