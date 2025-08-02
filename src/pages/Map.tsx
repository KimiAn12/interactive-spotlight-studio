import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { 
  Search,
  MapPin,
  Globe,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Navigation as NavigationIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Map = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [userAddress, setUserAddress] = useState("");
  
  // Debug: Log when userAddress changes
  useEffect(() => {
    console.log('userAddress state changed:', userAddress);
  }, [userAddress]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");

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
  };

  const handleAddressSearch = async () => {
    if (!userAddress.trim()) return;

    setIsGeocoding(true);
    setGeocodingError("");
    
    const coordinates = await geocodeAddress(userAddress);
    
    if (coordinates) {
      setUserLocation(coordinates);
      // Update map view to the new location
      const mapElement = document.querySelector('.leaflet-container');
      if (mapElement && (mapElement as any)._leaflet_map) {
        (mapElement as any)._leaflet_map.setView(coordinates, 16);
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
      handleSearch();
    }
  };

  const popularCities = [
    { name: "New York", country: "USA", coordinates: "40.7128° N, 74.0060° W" },
    { name: "London", country: "UK", coordinates: "51.5074° N, 0.1278° W" },
    { name: "Tokyo", country: "Japan", coordinates: "35.6762° N, 139.6503° E" },
    { name: "Paris", country: "France", coordinates: "48.8566° N, 2.3522° E" },
    { name: "Sydney", country: "Australia", coordinates: "33.8688° S, 151.2093° E" },
    { name: "São Paulo", country: "Brazil", coordinates: "23.5505° S, 46.6333° W" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden hero-gradient">
      {/* Navigation */}
      <Navigation />
      
      {/* Background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Globe className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Interactive World Map
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
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                  <input
                    type="text"
                    placeholder="Enter your address (e.g., 123 Queen St, Toronto)"
                    value={userAddress}
                    onChange={(e) => {
                      console.log('Input value changed:', e.target.value);
                      setUserAddress(e.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    style={{ 
                      position: 'relative', 
                      zIndex: 50,
                      backgroundColor: 'white',
                      color: 'black'
                    }}
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
              {/* Debug: Show current input value */}
              <p className="text-blue-600 text-sm mt-2">
                Debug - Current input value: "{userAddress}"
              </p>
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Map Area */}
          <div className="lg:col-span-2">
            <Card className="bg-black/20 backdrop-blur-sm border border-white/10 h-96 relative overflow-hidden">
              <CardContent className="p-0 h-full">
                {/* Placeholder World Map */}
                <div className="w-full h-full bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-cyan-900/20 relative">
                  {/* World Map SVG Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-24 h-24 text-primary/30 mx-auto mb-4" />
                      <p className="text-white/50 text-lg">Interactive World Map</p>
                      <p className="text-white/30 text-sm">Coming Soon</p>
                    </div>
                  </div>
                  
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
          <div className="space-y-6">
            {/* Popular Cities */}
            <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <NavigationIcon className="w-5 h-5 mr-2 text-primary" />
                  Popular Cities
                </h3>
                <div className="space-y-3">
                  {popularCities.map((city, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCity(city.name)}
                      className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-primary/30"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">{city.name}</p>
                          <p className="text-white/60 text-sm">{city.country}</p>
                        </div>
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-white/40 text-xs mt-1">{city.coordinates}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map Features */}
            <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary" />
                  Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-white/70 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Real-time navigation
                  </div>
                  <div className="flex items-center text-white/70 text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Interactive landmarks
                  </div>
                  <div className="flex items-center text-white/70 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Street view integration
                  </div>
                  <div className="flex items-center text-white/70 text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Custom routes
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to Explore?</h2>
            <p className="text-white/70 mb-6">
              Start mapping your journey and discover amazing places around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                className="animate-pulse-glow"
              >
                Start Mapping
                <NavigationIcon className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="hero-outline" 
                size="lg"
                onClick={() => navigate('/')}
              >
                Learn More
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