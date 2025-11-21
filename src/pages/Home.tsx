import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { ServiceCard } from "@/components/ServiceCard";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Phone, 
  Shield, 
  Leaf, 
  Clock, 
  CheckCircle2, 
  Bug, 
  Waves, 
  Home as HomeIcon,
  Star
} from "lucide-react";

const services = [
  {
    icon: Waves,
    title: "Fumigation Services",
    description: "Complete fumigation for homes and commercial spaces using safe, eco-friendly chemicals.",
    link: "/services",
  },
  {
    icon: Bug,
    title: "Bed Bug Control",
    description: "Expert bed bug elimination with guaranteed results and follow-up treatments.",
    link: "/services/bed-bug-control",
  },
  {
    icon: HomeIcon,
    title: "General Pest Control",
    description: "Comprehensive pest management for all common household and commercial pests.",
    link: "/services",
  },
];

const testimonials = [
  {
    name: "Sarah Mwangi",
    location: "Westlands",
    rating: 5,
    text: "Killpezts did an amazing job with our bed bug problem. Professional, punctual, and thorough!",
  },
  {
    name: "John Kamau",
    location: "Karen",
    rating: 5,
    text: "Best pest control service in Nairobi. They were fast, effective, and very affordable.",
  },
  {
    name: "Grace Wanjiru",
    location: "Kilimani",
    rating: 5,
    text: "Eco-friendly products that actually work! No harsh smells and the results were instant.",
  },
];

const whyChooseUs = [
  { icon: Leaf, text: "100% Eco-friendly & Odorless" },
  { icon: Shield, text: "Licensed & Insured" },
  { icon: Clock, text: "24/7 Emergency Response" },
  { icon: CheckCircle2, text: "Satisfaction Guaranteed" },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Professional Pest Control Services in Nairobi
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Safe, effective, and eco-friendly pest elimination for your home and business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="call" size="lg" asChild className="text-lg">
                <a href="tel:+254700000000">
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background hover:text-foreground">
                <a href="#quote-form">Get Free Quote</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive pest control solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Killpezts?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card 
                key={item.text}
                className="text-center hover:shadow-lg transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-8 pb-8">
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <p className="font-semibold">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                className="hover:shadow-xl transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="quote-form" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Free Quote</h2>
              <p className="text-muted-foreground text-lg">
                Fill out the form and we'll get back to you within 24 hours
              </p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
