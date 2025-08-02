
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "./FloatingParticles";
import { InteractiveTitle } from "./InteractiveTitle";
import { GlowingCard } from "./GlowingCard";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export const HeroScreen = () => {
  const handleGetStarted = () => {
    console.log("Get Started clicked!");
  };

  const handleLearnMore = () => {
    console.log("Learn More clicked!");
  };

  return (
    <div className="min-h-screen relative overflow-hidden hero-gradient">
      <FloatingParticles />
      
      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Interactive Title - Centered in middle of screen */}
          <div className="flex justify-center items-center min-h-screen">
            <InteractiveTitle 
              text="Make Healthcare More Accessible"
              className="text-center"
            />
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Yap Yap, 
            Yap Yap.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="hero" 
              size="lg"
              onClick={handleGetStarted}
              className="animate-pulse-glow"
            >
              Map Your City
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="hero-outline" 
              size="lg"
              onClick={handleLearnMore}
            >
              Learn More
              <Zap className="w-5 h-5" />
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
            <GlowingCard className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Interactive Design</h3>
                <p className="text-muted-foreground text-sm">
                  Engage users with beautiful animations and interactive elements that respond to their actions.
                </p>
              </div>
            </GlowingCard>

            <GlowingCard className="animate-bounce-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground text-sm">
                  Built with modern technologies for optimal performance and smooth user experiences.
                </p>
              </div>
            </GlowingCard>

            <GlowingCard className="animate-bounce-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
                <p className="text-muted-foreground text-sm">
                  Intuitive interface design that makes complex interactions feel natural and effortless.
                </p>
              </div>
            </GlowingCard>
          </div>

          {/* Additional Content Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Platform?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Comprehensive Coverage</h3>
                <p className="text-muted-foreground">
                  Access to healthcare facilities, pharmacies, and emergency services across your entire city.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Real-time Updates</h3>
                <p className="text-muted-foreground">
                  Get live information about wait times, availability, and service status.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who are already mapping their healthcare journey.
            </p>
            <Button 
              variant="hero" 
              size="lg"
              onClick={handleGetStarted}
              className="animate-pulse-glow"
            >
              Start Mapping Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};