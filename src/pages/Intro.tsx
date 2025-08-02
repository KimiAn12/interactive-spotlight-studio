import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { 
  Building2, 
  Users, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Activity,
  Database,
  Brain,
  Target,
  Map,
  Calendar,
  Code,
  TestTube,
  Rocket,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export const HowAIWorks = () => {
  const dataFactors = [
    {
      icon: Users,
      title: "Population Density",
      description: "Analyzing current and projected population distribution to identify high-need areas."
    },
    {
      icon: TrendingUp,
      title: "Predicted Urban Growth",
      description: "Using demographic trends to forecast future population shifts and development patterns."
    },
    {
      icon: Building2,
      title: "Current Hospital Coverage",
      description: "Mapping existing healthcare facilities to identify service gaps and overlaps."
    },
    {
      icon: Clock,
      title: "Emergency Response Times",
      description: "Evaluating ambulance response times and emergency service accessibility."
    },
    {
      icon: Activity,
      title: "Socioeconomic Data",
      description: "Incorporating income levels, insurance coverage, and health indicators."
    },
    {
      icon: MapPin,
      title: "Historical Call Volumes",
      description: "Analyzing past emergency calls to predict future healthcare demand patterns."
    }
  ];

  const modelSteps = [
    {
      icon: Database,
      title: "Collect and Clean Data",
      description: "Gather comprehensive datasets from multiple sources and ensure data quality through rigorous cleaning processes.",
      code: "// Data preprocessing\nconst cleanData = (rawData) => {\n  return rawData.filter(valid => valid)\n    .map(transform => transform)\n    .validate(quality);\n};"
    },
    {
      icon: Brain,
      title: "Train Model",
      description: "Apply machine learning algorithms including logistic regression and clustering to identify patterns.",
      code: "// Model training\nconst model = new LogisticRegression({\n  features: ['density', 'growth', 'coverage'],\n  target: 'optimal_location'\n});"
    },
    {
      icon: Target,
      title: "Predict Underserved Zones",
      description: "Identify areas with insufficient healthcare access and high predicted demand.",
      code: "// Prediction\nconst predictions = model.predict({\n  population_density: 0.8,\n  growth_rate: 0.12,\n  current_coverage: 0.3\n});"
    },
    {
      icon: Map,
      title: "Visualize on City Map",
      description: "Generate interactive maps showing recommended hospital locations with detailed analytics.",
      code: "// Visualization\nconst map = new HospitalMap({\n  predictions: results,\n  overlay: 'heatmap',\n  markers: 'recommendations'\n});"
    }
  ];

  const mvpJourney = [
    {
      date: "Q1 2024",
      title: "Dataset Collection",
      description: "Gathered comprehensive healthcare and demographic data from multiple sources.",
      icon: Database
    },
    {
      date: "Q2 2024",
      title: "Model Design + Training",
      description: "Developed and trained machine learning models using historical healthcare data.",
      icon: Brain
    },
    {
      date: "Q3 2024",
      title: "First Test City",
      description: "Successfully tested our model in a mid-sized city with promising results.",
      icon: TestTube
    },
    {
      date: "Q4 2024",
      title: "MVP Launch",
      description: "Launched our first public version with interactive mapping capabilities.",
      icon: Rocket
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Building2 className="w-16 h-16 mx-auto text-primary mb-6 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Introduction
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From data to decision — see how our model recommends new hospital sites
          </p>
        </div>
      </section>

      {/* Inputs We Analyze */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Inputs We Analyze
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataFactors.map((factor, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <factor.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {factor.title}
                </h3>
                <p className="text-gray-300">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Our Model Works */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            How Our Model Works
          </h2>
          <div className="space-y-8">
            {modelSteps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {step.description}
                  </p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-gray-700">
                    <pre>{step.code}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our MVP Journey */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Our MVP Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden lg:block"></div>
            
            <div className="space-y-8">
              {mvpJourney.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <milestone.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary bg-primary/20 px-3 py-1 rounded-full">
                        {milestone.date}
                      </span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion / Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Explore Our Map?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            See our AI recommendations in action and explore optimal hospital locations for your city.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg"
          >
            View Map
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}; 