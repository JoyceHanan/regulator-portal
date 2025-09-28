import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Batch, BatchStatus } from '../types';

interface ComplianceMapProps {
  batches: Batch[];
}

const getPinColorClass = (status: BatchStatus): string => {
  switch (status) {
    case BatchStatus.RECALLED: return 'bg-red-500';
    case BatchStatus.TESTING:
    case BatchStatus.COLLECTED: return 'bg-yellow-500';
    case BatchStatus.PROCESSED:
    case BatchStatus.SHIPPED: return 'bg-green-500';
    default: return 'bg-gray-400';
  }
};

const createCustomIcon = (status: BatchStatus) => {
    const colorClass = getPinColorClass(status);
    return L.divIcon({
        html: `<div class="w-3 h-3 ${colorClass} rounded-full border-2 border-white shadow-md"></div>`,
        className: 'bg-transparent border-0',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });
};


export const ComplianceMap: React.FC<ComplianceMapProps> = ({ batches }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
          center: [22.5937, 78.9629],
          zoom: 5
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
      
      markersRef.current = L.layerGroup().addTo(mapRef.current);
    }
    // Cleanup on unmount
    return () => {
        mapRef.current?.remove();
        mapRef.current = null;
    };
  }, []);

  // Update markers when batches change
  useEffect(() => {
    if (mapRef.current && markersRef.current) {
        markersRef.current.clearLayers();

        batches.forEach(batch => {
            const popupContent = `
                <div class="text-sm">
                    <p class="font-bold">${batch.id} - ${batch.plantType}</p>
                    <p><b>Farmer:</b> ${batch.farmerName}</p>
                    <p><b>Status:</b> ${batch.status}</p>
                </div>
            `;
            const marker = L.marker([batch.location.lat, batch.location.lng], {
                icon: createCustomIcon(batch.status)
            }).bindPopup(popupContent);
            markersRef.current?.addLayer(marker);
        });
    }
  }, [batches]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Compliance Map</h3>
      <div ref={mapContainerRef} className="h-96 w-full rounded-md z-0" />
    </div>
  );
};