import { ServiceCard } from "@/components/ServiceCard";
import { 
  Waves, 
  Bug, 
  Shield, 
  Home as HomeIcon, 
  Rat,
  Droplets
} from "lucide-react";

const allServices = [
  {
    icon: Waves,
    title: "Fumigation Services",
    description: "Complete fumigation for homes and commercial spaces using safe, eco-friendly chemicals. Perfect for comprehensive pest elimination.",
    link: "/services",
  },
  {
    icon: HomeIcon,
    title: "General Pest Control",
    description: "Comprehensive pest management for all common household and commercial pests including cockroaches, ants, spiders, and more.",
    link: "/services",
  },
  {
    icon: Shield,
    title: "Termite Control",
    description: "Advanced termite detection and elimination using industry-leading treatments. Protect your property from structural damage.",
    link: "/services",
  },
  {
    icon: Bug,
    title: "Bed Bug Control",
    description: "Expert bed bug elimination with guaranteed results and follow-up treatments. Say goodbye to sleepless nights.",
    link: "/services/bed-bug-control",
  },
  {
    icon: Rat,
    title: "Rodent Control",
    description: "Effective rat and mouse control solutions with humane trapping, prevention, and long-term management strategies.",
    link: "/services",
  },
  {
    icon: Droplets,
    title: "Disinfection Services",
    description: "Professional disinfection and sanitization for homes, offices, and commercial spaces. Hospital-grade solutions.",
    link: "/services",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Professional pest control solutions for every need. Licensed, insured, and guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allServices.map((service, index) => (
              <div 
                key={service.title}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Need Custom Pest Control Solutions?</h2>
            <p className="text-lg text-muted-foreground">
              Every pest problem is unique. Contact us for a customized treatment plan tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="tel:+254700000000"
                className="inline-flex items-center justify-center gap-2 h-11 rounded-md px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 shadow-md hover:shadow-xl transition-all duration-300 font-medium"
              >
                Call for Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
