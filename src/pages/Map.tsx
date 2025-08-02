import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { 
  Search,
  MapPin,
  Building2,
  Phone,
  Globe,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Navigation as NavigationIcon,
  Cross,
  Heart,
  Clock,
  Target,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom hospital marker icon
const hospitalIcon = L.divIcon({
  className: 'custom-hospital-marker',
  html: '<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 12px; font-weight: bold;">🏥</span></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Custom user location marker icon
const userLocationIcon = L.divIcon({
  className: 'custom-user-marker',
  html: '<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 14px; font-weight: bold;">📍</span></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Toronto hospital data
const torontoHospitals = [
  {
    id: 1,
    name: "Toronto General Hospital",
    address: "200 Elizabeth St, Toronto, ON M5G 2C4",
    phone: "(416) 340-3111",
    coordinates: [43.6588, -79.3795],
    type: "General Hospital",
    emergency: true,
    rating: 4.5
  },
  {
    id: 2,
    name: "Mount Sinai Hospital",
    address: "600 University Ave, Toronto, ON M5G 1X5",
    phone: "(416) 596-4200",
    coordinates: [43.6578, -79.3872],
    type: "General Hospital",
    emergency: true,
    rating: 4.3
  },
  {
    id: 3,
    name: "St. Michael's Hospital",
    address: "30 Bond St, Toronto, ON M5B 1W8",
    phone: "(416) 360-4000",
    coordinates: [43.6548, -79.3789],
    type: "General Hospital",
    emergency: true,
    rating: 4.4
  },
  {
    id: 4,
    name: "Sunnybrook Health Sciences Centre",
    address: "2075 Bayview Ave, Toronto, ON M4N 3M5",
    phone: "(416) 480-6100",
    coordinates: [43.7189, -79.3764],
    type: "Health Sciences Centre",
    emergency: true,
    rating: 4.6
  },
  {
    id: 5,
    name: "Toronto Western Hospital",
    address: "399 Bathurst St, Toronto, ON M5T 2S8",
    phone: "(416) 603-3000",
    coordinates: [43.6532, -79.4012],
    type: "General Hospital",
    emergency: true,
    rating: 4.2
  },
  {
    id: 6,
    name: "Princess Margaret Cancer Centre",
    address: "610 University Ave, Toronto, ON M5G 2M9",
    phone: "(416) 946-2000",
    coordinates: [43.6582, -79.3878],
    type: "Cancer Centre",
    emergency: false,
    rating: 4.7
  },
  {
    id: 7,
    name: "Hospital for Sick Children",
    address: "555 University Ave, Toronto, ON M5G 1X8",
    phone: "(416) 813-1500",
    coordinates: [43.6572, -79.3865],
    type: "Children's Hospital",
    emergency: true,
    rating: 4.8
  },
  {
    id: 8,
    name: "Women's College Hospital",
    address: "76 Grenville St, Toronto, ON M5S 1B2",
    phone: "(416) 323-6400",
    coordinates: [43.6612, -79.3845],
    type: "Women's Hospital",
    emergency: false,
    rating: 4.4
  },
  {
    id: 9,
    name: "Baycrest Health Sciences",
    address: "3560 Bathurst St, Toronto, ON M6A 2E1",
    phone: "(416) 785-2500",
    coordinates: [43.7234, -79.4156],
    type: "Health Sciences",
    emergency: false,
    rating: 4.3
  },
  {
    id: 10,
    name: "North York General Hospital",
    address: "4001 Leslie St, Toronto, ON M2K 1E1",
    phone: "(416) 756-6000",
    coordinates: [43.7834, -79.3524],
    type: "General Hospital",
    emergency: true,
    rating: 4.1
  }
];

// Map controls component
const MapControls = () => {
  const map = useMap();

  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();
  const resetView = () => map.setView([43.6532, -79.3832], 12);

  return (
    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-[1000]">
      <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white shadow-lg" onClick={zoomIn}>
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white shadow-lg" onClick={zoomOut}>
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white shadow-lg" onClick={resetView}>
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  );
};

// Geocoding function using OpenStreetMap Nominatim API
const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Toronto, ON, Canada')}&limit=1`
    );
    const data = await response.json();
    
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

const Map = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [userAddress, setUserAddress] = useState("");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const mapRef = useRef<L.Map | null>(null);

  const filteredHospitals = torontoHospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || 
                         (filterType === "emergency" && hospital.emergency) ||
                         (filterType === "specialty" && !hospital.emergency);
    return matchesSearch && matchesFilter;
  });

  const handleHospitalClick = (hospital: any) => {
    setSelectedHospital(hospital);
    // Center map on selected hospital
    if (mapRef.current) {
      mapRef.current.setView(hospital.coordinates, 16);
    }
  };

  const handleAddressSearch = async () => {
    if (!userAddress.trim()) return;

    setIsGeocoding(true);
    setGeocodingError("");
    
    const coordinates = await geocodeAddress(userAddress);
    
    if (coordinates) {
      setUserLocation(coordinates);
      // Update map view to the new location
      if (mapRef.current) {
        mapRef.current.setView(coordinates, 16);
      }
    } else {
      setGeocodingError("Address not found. Please try a different address.");
    }
    
    setIsGeocoding(false);
  };

  const clearUserLocation = () => {
    setUserLocation(null);
    setUserAddress("");
    setGeocodingError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddressSearch();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <Navigation />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Toronto Hospitals Map
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
            Find hospitals and medical facilities across Toronto. Click on markers for detailed information.
          </p>

          {/* Address Input */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Find Your Location
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                    placeholder="Enter your address (e.g., 123 Queen St, Toronto)"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button
                  onClick={handleAddressSearch}
                  disabled={isGeocoding || !userAddress.trim()}
                  className="bg-primary hover:bg-primary/80 disabled:opacity-50"
                >
                  {isGeocoding ? "Searching..." : "Find Location"}
                </Button>
                {userLocation && (
              <Button
                    onClick={clearUserLocation}
                    variant="outline"
                size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {geocodingError && (
                <p className="text-red-600 text-sm mt-2">{geocodingError}</p>
              )}
              {userLocation && (
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  Location found! 50-meter radius shown on map.
                </p>
              )}
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search hospitals by name or address..."
                  value={searchQuery}
                  onChange={(e) => handleHospitalSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Hospitals</option>
                <option value="emergency">Emergency Only</option>
                <option value="specialty">Specialty Centers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] relative overflow-hidden">
              <CardContent className="p-0 h-full">
                <MapContainer
                  center={[43.6532, -79.3832]}
                  zoom={12}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* User Location Marker and Circle */}
                  {userLocation && (
                    <>
                      <Marker
                        position={userLocation as [number, number]}
                        icon={userLocationIcon}
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-semibold text-lg text-blue-600">Your Location</h3>
                            <p className="text-sm text-gray-600">{userAddress}</p>
                            <p className="text-sm text-gray-600 mt-2">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                50m radius
                              </span>
                            </p>
                  </div>
                        </Popup>
                      </Marker>
                      <Circle
                        center={userLocation as [number, number]}
                        radius={50}
                        pathOptions={{
                          color: '#3b82f6',
                          fillColor: '#3b82f6',
                          fillOpacity: 0.1,
                          weight: 2
                        }}
                      />
                    </>
                  )}

                  {/* Hospital Markers */}
                  {filteredHospitals.map((hospital) => (
                    <Marker
                      key={hospital.id}
                      position={hospital.coordinates as [number, number]}
                      icon={hospitalIcon}
                      eventHandlers={{
                        click: () => handleHospitalClick(hospital),
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold text-lg">{hospital.name}</h3>
                          <p className="text-sm text-gray-600">{hospital.address}</p>
                          <p className="text-sm text-gray-600">{hospital.phone}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {hospital.type}
                            </span>
                            {hospital.emergency && (
                              <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded ml-2">
                                Emergency
                              </span>
                            )}
                          </div>
                </div>
                      </Popup>
                    </Marker>
                  ))}
                  <MapControls />
                </MapContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Selected Hospital Details */}
            {selectedHospital && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-primary" />
                    Hospital Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedHospital.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedHospital.type}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{selectedHospital.address}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{selectedHospital.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Heart className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>Rating: {selectedHospital.rating}/5</span>
                      </div>
                      {selectedHospital.emergency && (
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-red-500" />
                          <span className="text-red-600 font-medium">24/7 Emergency</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hospital List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  Hospitals ({filteredHospitals.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {filteredHospitals.map((hospital) => (
                    <button
                      key={hospital.id}
                      onClick={() => handleHospitalClick(hospital)}
                      className={`w-full text-left p-3 rounded-lg transition-colors border ${
                        selectedHospital?.id === hospital.id
                          ? 'bg-primary/10 border-primary/30'
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{hospital.name}</p>
                          <p className="text-xs text-muted-foreground">{hospital.type}</p>
                          <p className="text-xs text-muted-foreground truncate">{hospital.address}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                              {hospital.rating}★
                            </span>
                            {hospital.emergency && (
                              <span className="text-xs bg-red-100 text-red-800 px-1 py-0.5 rounded">
                                ER
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary" />
                  Legend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-3 border-2 border-white shadow"></div>
                    <span>Hospital</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 border-2 border-white shadow"></div>
                    <span>Your Location</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 border-2 border-white shadow opacity-20"></div>
                    <span>50m Radius</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded mr-2">ER</span>
                    <span>Emergency Available</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">★</span>
                    <span>Rating</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Need Medical Assistance?</h2>
            <p className="text-muted-foreground mb-6">
              For emergencies, call 911 immediately. For non-emergency medical information, contact your local health authority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default" 
                size="lg"
                className="bg-red-600 hover:bg-red-700"
              >
                Emergency: 911
                <Phone className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for map markers */}
      <style>{`
        .custom-hospital-marker {
          background: transparent;
          border: none;
        }
        .custom-user-marker {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Map; 