import React from "react";
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function ChangeMapView({ coords, zoom,  caseType }) {
  console.log(coords);
  const map = useMap();
  map.setView([coords.lat, coords.lng], zoom,caseType);
  
  return null;
}

function MapData({ countries, caseType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/">CartoBaseMaps</a> contributors'
        />
        <ChangeMapView coords={center} zoom={zoom}/>

        {showDataOnMap(countries, caseType)}

      </LeafletMap>
    </div>
  );
}

export default MapData;
