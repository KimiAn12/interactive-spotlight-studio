
import { Button } from "@/components/ui/button";
import { FloatingParticles } from "./FloatingParticles";
import { InteractiveTitle } from "./InteractiveTitle";
import { GlowingCard } from "./GlowingCard";
import { Navigation } from "./Navigation";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export const HeroScreen = () => {
  const handleGetStarted = () => {
    console.log("Get Started clicked!");
  };

  const handleLearnMore = () => {
    console.log("Learn More clicked!");
  };

  const scrollToYapYap = () => {
    const yapYapSection = document.getElementById('yap-yap-section');
    if (yapYapSection) {
      yapYapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden hero-gradient">
      <FloatingParticles />
      
      <Navigation />
      
             {/* Main Hero Content */}
       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
         <div className="max-w-6xl mx-auto">
           {/* Interactive Title - Centered in middle of screen */}
           <div className="flex justify-center items-center min-h-screen">
             <div className="text-center">
               <InteractiveTitle 
                 text="ProjectRed"
                 className="text-center"
               />
               
                               {/* Scroll Button below title */}
                <div className="mt-40">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={scrollToYapYap}
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 animate-bounce"
                  >
                    <ArrowRight className="w-6 h-6 rotate-90 text-primary" />
                  </Button>
                </div>
             </div>
           </div>

          {/* Subtitle */}
          <p id="yap-yap-section" className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
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
          <div id="feature-cards-section" className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
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


          
        </div>
      </div>
    </div>
  );
};