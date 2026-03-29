"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Circle, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

// Fix marker icons Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface Zone {
  id: string;
  radius: number; // metres
  color: string;
  fillColor: string;
  label: string;
  description: string;
}

interface MapNucleaireProps {
  center: [number, number];
  zones: Zone[];
  onMapClick: (lat: number, lng: number) => void;
}

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function FlyToCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { duration: 0.5 });
  }, [center, map]);
  return null;
}

export default function MapNucleaire({ center, zones, onMapClick }: MapNucleaireProps) {
  // Zoom auto selon la plus grande zone
  const maxRadius = Math.max(...zones.map((z) => z.radius), 1000);
  let zoom = 12;
  if (maxRadius > 200000) zoom = 6;
  else if (maxRadius > 100000) zoom = 7;
  else if (maxRadius > 50000) zoom = 8;
  else if (maxRadius > 20000) zoom = 9;
  else if (maxRadius > 10000) zoom = 10;
  else if (maxRadius > 5000) zoom = 11;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onMapClick={onMapClick} />
      <FlyToCenter center={center} />

      {/* Zones du plus grand au plus petit pour le rendu */}
      {[...zones].reverse().map((zone) => (
        <Circle
          key={zone.id}
          center={center}
          radius={zone.radius}
          pathOptions={{
            color: zone.color,
            fillColor: zone.fillColor,
            fillOpacity: 0.25,
            weight: 2,
          }}
        >
          <Popup>
            <strong>{zone.label}</strong>
            <br />
            <span style={{ fontSize: "12px" }}>{zone.description}</span>
            <br />
            <span style={{ fontSize: "11px", color: "#666" }}>
              Rayon : {zone.radius >= 1000 ? `${(zone.radius / 1000).toFixed(1)} km` : `${zone.radius} m`}
            </span>
          </Popup>
        </Circle>
      ))}

      <Marker position={center}>
        <Popup>Point d&apos;impact</Popup>
      </Marker>
    </MapContainer>
  );
}
