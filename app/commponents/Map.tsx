"use client";
// npm install leaflet and then
// npm install -D @types/leaflet and then
// npm install react-leaflet

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
// these 3 markers are needed to ensure the leaflet works because leaflet package is not really supported by react. Its an open source project so we need to do a bit more work to make it functional
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore /**this makes the red underline for _getIconUrl to be ignored */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}
const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={
        (center as L.LatLngExpression) || [51, -0.09]
      } /**the cordinates can be modified */
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg" /**we also modified the global.css file */
    >
      {/* google react leaflet, then go to their site and copy this code */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* to indicate user location on the map using location symbol */}
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
