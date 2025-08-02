import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowLeft,
  Sparkles,
  MapPin,
  Zap,
  Code,
  Palette,
  Database
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Lead Developer",
      avatar: "👨‍💻",
      bio: "Full-stack developer with 8+ years of experience in React, Node.js, and cloud architecture. Passionate about creating scalable solutions and mentoring junior developers.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
      location: "San Francisco, CA",
      email: "alex@projectred.com",
      github: "https://github.com/alexchen",
      twitter: "https://twitter.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
      icon: Code
    },
    {
      id: 2,
      name: "Sarah Kim",
      role: "UI/UX Designer",
      avatar: "👩‍🎨",
      bio: "Creative designer focused on user-centered design principles. Specializes in creating intuitive interfaces and memorable brand experiences.",
      skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"],
      location: "New York, NY",
      email: "sarah@projectred.com",
      github: "https://github.com/sarahkim",
      twitter: "https://twitter.com/sarahkim",
      linkedin: "https://linkedin.com/in/sarahkim",
      icon: Palette
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      role: "Data Engineer",
      avatar: "👨‍🔬",
      bio: "Data enthusiast with expertise in building robust data pipelines and analytics systems. Loves turning complex data into actionable insights.",
      skills: ["Python", "SQL", "Apache Spark", "Machine Learning", "Data Visualization"],
      location: "Austin, TX",
      email: "marcus@projectred.com",
      github: "https://github.com/marcusrodriguez",
      twitter: "https://twitter.com/marcusrodriguez",
      linkedin: "https://linkedin.com/in/marcusrodriguez",
      icon: Database
    },
    {
      id: 4,
      name: "Emma Thompson",
      role: "Product Manager",
      avatar: "👩‍💼",
      bio: "Strategic product leader with a track record of launching successful digital products. Bridges the gap between business goals and technical execution.",
      skills: ["Product Strategy", "Agile", "User Research", "Analytics", "Stakeholder Management"],
      location: "Seattle, WA",
      email: "emma@projectred.com",
      github: "https://github.com/emmathompson",
      twitter: "https://twitter.com/emmathompson",
      linkedin: "https://linkedin.com/in/emmathompson",
      icon: Zap
    }
  ];

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

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
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Meet Our Team
            </h1>
          </div>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            The passionate minds behind ProjectRed. We're a diverse team of innovators, 
            creators, and problem-solvers dedicated to building the future of interactive mapping.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member) => {
            const IconComponent = member.icon;
            return (
              <Card key={member.id} className="bg-black/20 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="text-4xl">{member.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <div className="flex items-center text-white/60 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {member.location}
                      </div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white/90 mb-3 uppercase tracking-wide">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full border border-white/20 hover:border-primary/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/50 hover:text-primary hover:bg-primary/10 w-8 h-8 p-0"
                        onClick={() => handleExternalLink(member.github)}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/50 hover:text-accent hover:bg-accent/10 w-8 h-8 p-0"
                        onClick={() => handleExternalLink(member.twitter)}
                      >
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/50 hover:text-primary hover:bg-primary/10 w-8 h-8 p-0"
                        onClick={() => handleExternalLink(member.linkedin)}
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/50 hover:text-accent hover:bg-accent/10 w-8 h-8 p-0"
                        onClick={() => handleExternalLink(`mailto:${member.email}`)}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">Join Our Mission</h2>
            <p className="text-white/70 mb-6">
              We're always looking for talented individuals who share our passion for innovation 
              and creating meaningful digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => handleExternalLink('mailto:careers@projectred.com')}
                className="animate-pulse-glow"
              >
                Join Our Team
                <Mail className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="hero-outline" 
                size="lg"
                onClick={() => navigate('/')}
              >
                Learn More
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team; 