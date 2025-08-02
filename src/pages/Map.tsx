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
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSelectedCity(searchQuery);
      // Here you would typically integrate with a mapping API
      console.log(`Searching for: ${searchQuery}`);
    }
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
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore cities around the world with our interactive mapping technology. 
            Discover new places and plan your next adventure.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search for a city, country, or landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <Button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/80"
                size="sm"
              >
                Search
              </Button>
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
                  
                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <Button size="sm" variant="ghost" className="bg-black/20 hover:bg-black/40">
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="bg-black/20 hover:bg-black/40">
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="bg-black/20 hover:bg-black/40">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Selected City Indicator */}
                  {selectedCity && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-primary/80 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {selectedCity}
                      </div>
                    </div>
                  )}
                </div>
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
    </div>
  );
};

export default Map; 