import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <header className="relative z-20 w-full">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">ProjectRed</h1>
          </div>
          
          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="/intro" className="text-muted-foreground hover:text-primary transition-colors">
              Introduction
            </a>
            <a href="#map" className="text-muted-foreground hover:text-primary transition-colors">
              Map
            </a>
            <a href="#team" className="text-muted-foreground hover:text-primary transition-colors">
              Team
            </a>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}; 