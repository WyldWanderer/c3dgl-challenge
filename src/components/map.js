import React, {useEffect, useRef, useState} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useDispatch, useSelector} from 'react-redux';

export default function Map() {
  const mapContainerRef = useRef();
  const map = useRef(null);
  const lng = useSelector((state) => state.mapViewLng ? +state.mapViewLng : -104.991531);
  const lat = useSelector((state) => state.mapViewLat ? +state.mapViewLat :  39.742043);
  const [style] = useState('https://devtileserver2.concept3d.com/styles/c3d_default_style/style.json');
  const [zoom] = useState(14);
  const locations = useSelector((state) => state.locations)
  const dispatch = useDispatch()

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style,
      center: [lng, lat],
      zoom, 
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
        point: true
      }
    });
    map.current.addControl(draw, 'top-left');
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    
    map.current.on('draw.create', newDraw);
    map.current.on('draw.delete', newDraw);
    map.current.on('draw.update', newDraw);

    function newDraw(e) {
      const data = draw.getAll();
      console.log("data:", data);
      const coords = data.features[0].geometry.coordinates[0]
      dispatch({
        type:'UPDATE_POLYGON_COORDINATES',
        payload: coords
      })
    }

    locations.forEach((location) => new maplibregl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current))
    
    return () => {
      map.current.remove();
    }
  }, [lat, lng, style, zoom, locations]);

  

  return (
      <div className="map-wrap">
        <a href="https://www.maptiler.com" className="watermark"><img
            src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/></a>
        <div ref={mapContainerRef} className="map"/>
      </div>
  );
}
