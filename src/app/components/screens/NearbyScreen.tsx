import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation, Phone, Clock, Star, MapPin, Locate, Cross, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { BottomNav } from '@/app/components/BottomNav';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Types for our places
interface HealthCenter {
    id: string;
    name: string;
    lat: number;
    lng: number;
    address: string;
    rating?: number;
    isOpen?: boolean;
    type: 'hospital' | 'clinic' | 'pharmacy';
    distance?: string;
    time?: string;
}

const defaultCenter = {
    lat: 28.6139,
    lng: 77.2090,
};

const MOCK_HOSPITALS: HealthCenter[] = [
    {
        id: '1',
        name: 'Apollo Hospital',
        lat: 28.6139,
        lng: 77.2090,
        address: 'Sarita Vihar, Delhi Mathura Road',
        rating: 4.5,
        isOpen: true,
        type: 'hospital',
        distance: '2.5 km',
        time: '12 mins',
    },
    {
        id: '2',
        name: 'Max Super Speciality Hospital',
        lat: 28.6200,
        lng: 77.2100,
        address: 'Saket, New Delhi',
        rating: 4.7,
        isOpen: true,
        type: 'hospital',
        distance: '3.8 km',
        time: '18 mins',
    },
];

export function NearbyScreen() {
    // Router Handling
    let location;
    try {
        location = useLocation();
    } catch (e) {
        location = { search: '' };
    }
    const searchParams = new URLSearchParams(location.search);
    const isEmergency = searchParams.get('emergency') === 'true';

    // State
    const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [nearbyPlaces, setNearbyPlaces] = useState<HealthCenter[]>(MOCK_HOSPITALS);
    const [selectedPlace, setSelectedPlace] = useState<HealthCenter | null>(null);

    // Refs for Leaflet
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.Marker[]>([]);

    // 1. Initialize Map
    useEffect(() => {
        if (!mapContainerRef.current) return;
        if (mapInstanceRef.current) return; // Already initialized

        console.log("Initializing Leaflet Map...");

        // FIX: Leaflet's default icon path issues in webpack/vite environments
        // We manually define the icons to ensure they load from CDN
        const DefaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        // Initialize Map instance
        const map = L.map(mapContainerRef.current).setView([defaultCenter.lat, defaultCenter.lng], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapInstanceRef.current = map;

        // Cleanup on unmount
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // 2. Get User Location and Fetch Hospitals
    useEffect(() => {
        if (!navigator.geolocation) {
            setCurrentPosition(defaultCenter);
            return;
        }

        const handleSuccess = async (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });

            if (mapInstanceRef.current) {
                mapInstanceRef.current.setView([latitude, longitude], 14);
            }

            // Fetch Real Data via Overpass API
            try {
                console.log("Fetching nearby hospitals...");
                // Query: nodes with amenity=hospital within 5000m radius
                const query = `
                    [out:json];
                    (
                      node["amenity"="hospital"](around:5000,${latitude},${longitude});
                      node["amenity"="clinic"](around:5000,${latitude},${longitude});
                    );
                    out body;
                `;
                const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
                const data = await response.json();

                if (data.elements) {
                    const places: HealthCenter[] = data.elements.map((el: any) => ({
                        id: el.id.toString(),
                        name: el.tags.name || 'Unnamed Health Center',
                        lat: el.lat,
                        lng: el.lon,
                        address: el.tags['addr:street'] || el.tags['addr:city'] || 'Address not available',
                        rating: 4.0 + Math.random(), // Mock rating as OSM doesn't have it
                        isOpen: true,
                        type: el.tags.amenity as any,
                        distance: `${(Math.random() * 5).toFixed(1)} km`, // Mock distance
                        time: `${Math.floor(Math.random() * 20) + 5} mins`, // Mock time
                    })).filter((p: HealthCenter) => p.name !== 'Unnamed Health Center').slice(0, 10); // Limit to 10 named places

                    if (places.length > 0) {
                        setNearbyPlaces(places);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch hospitals:", err);
                // Keep mock data or handle error
            }
        };

        const handleError = (error: GeolocationPositionError) => {
            console.warn("GPS Error:", error);
            setCurrentPosition(defaultCenter);
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, { enableHighAccuracy: false, timeout: 5000 });
    }, []);

    // 3. Update Markers (User + Hospitals)
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Define Icons
        const userIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        const hospitalIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Add User Marker
        if (currentPosition) {
            const userMarker = L.marker([currentPosition.lat, currentPosition.lng], { icon: userIcon })
                .addTo(map)
                .bindPopup('You are here');
            markersRef.current.push(userMarker);
        }

        // Add Hospital Markers
        nearbyPlaces.forEach(place => {
            // Create rich popup content with navigation link
            const popupContent = `
                <div style="min-width: 150px;">
                    <b style="font-size: 14px; color: #1f2937;">${place.name}</b><br/>
                    <span style="font-size: 12px; color: #6b7280;">${place.address}</span><br/>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style="display: inline-block; margin-top: 8px; color: #2563eb; font-size: 12px; font-weight: bold; text-decoration: none;">
                       Get Directions &#8594;
                    </a>
                </div>
            `;

            const marker = L.marker([place.lat, place.lng], { icon: hospitalIcon })
                .addTo(map)
                .bindPopup(popupContent);

            // Click listener
            marker.on('click', () => {
                setSelectedPlace(place);
            });

            markersRef.current.push(marker);
        });

    }, [currentPosition, nearbyPlaces]);


    const handleCall = () => window.open('tel:108', '_self');
    const handleNavigate = (place: HealthCenter) => {
        if (!place.lat || !place.lng) {
            console.error("Invalid coordinates for navigation");
            return;
        }
        const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
        window.open(url, '_blank');
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gray-50">
            {/* Map Container - DIRECT DOM REF */}
            <div className="w-full relative bg-gray-200" style={{ height: '60vh' }}>
                {/* Map Div - This is where Leaflet attaches */}
                <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />

                {!currentPosition && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 z-[400]">
                        <p className="font-medium text-gray-500">Acquiring GPS...</p>
                    </div>
                )}

                {/* Emergency Overlay */}
                {isEmergency && (
                    <div className="absolute top-4 left-4 right-4 z-[500] bg-red-600 text-white p-3 rounded-lg shadow-lg flex justify-between items-center animate-pulse pointer-events-none">
                        <div className="flex items-center gap-2">
                            <AlertCircle size={20} />
                            <span className="font-bold text-sm">Emergency Mode</span>
                        </div>
                        <Button
                            onClick={handleCall}
                            className="bg-white text-red-600 h-8 text-xs font-bold hover:bg-red-50 pointer-events-auto"
                        >
                            CALL 108
                        </Button>
                    </div>
                )}
            </div>

            {/* List View */}
            <div className="flex-1 bg-white overflow-hidden flex flex-col rounded-t-3xl -mt-4 z-[500] shadow-lg relative">
                <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0">
                    <h2 className="font-bold">Nearby Centers</h2>
                    <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">{nearbyPlaces.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4 bg-gray-50">
                    {nearbyPlaces.map(place => (
                        <div
                            key={place.id}
                            className={`p-3 bg-white rounded-xl border shadow-sm flex gap-3 ${selectedPlace?.id === place.id ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={() => {
                                setSelectedPlace(place);
                                if (mapInstanceRef.current) {
                                    mapInstanceRef.current.flyTo([place.lat, place.lng], 15);
                                }
                            }}
                        >
                            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                                <Cross className="text-red-500 w-5 h-5 rotate-45" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-sm">{place.name}</h3>
                                <p className="text-xs text-gray-500">{place.address}</p>
                            </div>
                            <Button size="icon" className="h-8 w-8 rounded-full bg-blue-600" onClick={(e) => {
                                e.stopPropagation();
                                handleNavigate(place);
                            }}>
                                <Navigation className="w-4 h-4 text-white" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
