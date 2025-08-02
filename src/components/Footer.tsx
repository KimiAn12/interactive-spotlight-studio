import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUp,
  Sparkles,
  MapPin,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <footer className="relative bg-gradient-to-t from-black/40 via-black/20 to-transparent backdrop-blur-sm border-t border-white/10 text-white/80 overflow-hidden">
      {/* Subtle gradient overlay matching hero theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-accent/5 to-transparent" />
      
      {/* Minimal floating particles matching hero */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-6 w-1 h-1 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute bottom-4 right-8 w-0.5 h-0.5 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-3">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ProjectRed
              </h3>
            </div>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              Interactive spotlight studio creating immersive digital experiences 
              that connect people with their cities through innovative mapping technology.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/50 hover:text-primary hover:bg-primary/10 w-8 h-8 p-0"
                onClick={() => handleExternalLink('https://github.com')}
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/50 hover:text-accent hover:bg-accent/10 w-8 h-8 p-0"
                onClick={() => handleExternalLink('https://twitter.com')}
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/50 hover:text-primary hover:bg-primary/10 w-8 h-8 p-0"
                onClick={() => handleExternalLink('https://linkedin.com')}
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/50 hover:text-accent hover:bg-accent/10 w-8 h-8 p-0"
                onClick={() => handleExternalLink('mailto:hello@projectred.com')}
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white/90 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-primary hover:bg-transparent p-0 h-auto font-normal text-sm"
                  onClick={() => handleNavigation('yap-yap-section')}
                >
                  About
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-accent hover:bg-transparent p-0 h-auto font-normal text-sm"
                  onClick={() => handleNavigation('feature-cards-section')}
                >
                  Features
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-primary hover:bg-transparent p-0 h-auto font-normal text-sm"
                  onClick={() => navigate('/team')}
                >
                  Team
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-accent hover:bg-transparent p-0 h-auto font-normal text-sm"
                  onClick={() => handleExternalLink('/map')}
                >
                  Map Your City
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-accent hover:bg-transparent p-0 h-auto font-normal text-sm"
                  onClick={() => handleExternalLink('/documentation')}
                >
                  Documentation
                </Button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white/90 uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-primary hover:bg-transparent p-0 h-auto font-normal text-sm"
                  onClick={() => handleExternalLink('/api')}
                >
                  API Reference
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-accent hover:bg-transparent p-0 h-auto font-normal text-sm"
                  onClick={() => handleExternalLink('/tutorials')}
                >
                  Tutorials
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-primary hover:bg-transparent p-0 h-auto font-normal text-sm"
                  onClick={() => handleExternalLink('/community')}
                >
                  Community
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-accent hover:bg-transparent p-0 h-auto font-normal text-sm"
                  onClick={() => handleExternalLink('/support')}
                >
                  Support
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white/90 uppercase tracking-wide">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-white/60 text-xs">
                  123 Innovation Street<br />
                  Tech City, TC 12345
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-white/60 text-xs">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-white/60 text-xs">hello@projectred.com</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 mb-4" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="text-white/50 text-xs">
            © {currentYear} ProjectRed. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4 text-xs">
            <Button
              variant="ghost"
              className="text-white/50 hover:text-primary hover:bg-transparent p-0 h-auto font-normal"
              onClick={() => handleExternalLink('/privacy')}
            >
              Privacy Policy
            </Button>
            <Button
              variant="ghost"
              className="text-white/50 hover:text-accent hover:bg-transparent p-0 h-auto font-normal"
              onClick={() => handleExternalLink('/terms')}
            >
              Terms of Service
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-white/50 hover:text-primary hover:bg-primary/10 rounded-full w-8 h-8 p-0"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}; 