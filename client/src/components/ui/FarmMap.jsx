import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const FARM_LOCATIONS = [
  {
    name: "Alabira Plateau Farm",
    type: "Primary Farm — Organic Produce",
    position: [9.8965, 8.8583],
  },
  {
    name: "Alabira Abuja Distribution",
    type: "Distribution Hub",
    position: [9.0765, 7.3986],
  },
  {
    name: "Kwara Partner Farm",
    type: "Partner Farm — Cassava & Maize",
    position: [8.4966, 4.5421],
  },
  {
    name: "Kano Partner Farm",
    type: "Partner Farm — Sesame & Grains",
    position: [12.0022, 8.5919],
  },
];

const MARKER_STYLE = {
  radius: 10,
  color: "#2E6B3E",
  fillColor: "#2E6B3E",
  fillOpacity: 0.85,
  weight: 2,
};

export default function FarmMap() {
  return (
    <MapContainer
      center={[9.082, 8.6753]}
      zoom={6}
      style={{ height: "450px", width: "100%", borderRadius: "16px" }}
      className="shadow-md"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {FARM_LOCATIONS.map((loc) => (
        <CircleMarker
          key={loc.name}
          center={loc.position}
          pathOptions={MARKER_STYLE}
        >
          <Popup>
            <strong className="font-sans font-semibold text-brand-green">
              {loc.name}
            </strong>
            <br />
            <span className="font-sans text-xs text-brand-clay">{loc.type}</span>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
