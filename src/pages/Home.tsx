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
import { useACF } from "@/hooks/useACF";

const API_URL = "https://cms.headlesstest.online/wp-json/acf/v3/pages/9";

const Home = () => {
  const acf = useACF(API_URL);   // 🚀 INSTANT LOAD from cache

  // prevent crashes if acf isn't loaded yet
  const safe = (v, f = "") => (v === undefined || v === null ? f : v);

  /* -------------------- DYNAMIC FIELDS -------------------- */

  // HERO
  const heroTitle = safe(acf?.hero_section?.hero_title, "Professional Pest Control Services in Nairobi");
  const heroSubtitle = safe(acf?.hero_section?.hero_subtitle, "Safe, effective, and eco-friendly pest elimination.");
  const heroBg = safe(acf?.hero_section?.hero_background_image, null);

  // SERVICES
  const services = [
    {
      icon: Waves,
      title: safe(acf?.pest_services_section?.service_1_heading, "Fumigation Services"),
      description: safe(acf?.pest_services_section?.service_1_subheading, ""),
      link: safe(acf?.pest_services_section?.service_1_button_link, "/services"),
    },
    {
      icon: Bug,
      title: safe(acf?.pest_services_section?.service_2_heading, "Bed Bug Control"),
      description: safe(acf?.pest_services_section?.service_2_subheading, ""),
      link: safe(acf?.pest_services_section?.service_2_button_link, "/services/bed-bug-control"),
    },
    {
      icon: HomeIcon,
      title: safe(acf?.pest_services_section?.service_3_heading, "General Pest Control"),
      description: safe(acf?.pest_services_section?.service_3_subheading, ""),
      link: safe(acf?.pest_services_section?.service_3_button_link, "/services"),
    },
  ].filter((s) => s.title); // prevents blank cards

  // WHY CHOOSE US
  const whyChooseUs = [
    { icon: Leaf, text: safe(acf?.about_section?.feature_1_heading, "100% Eco-friendly & Odorless") },
    { icon: Shield, text: safe(acf?.about_section?.feature_2_heading, "Licensed & Insured") },
    { icon: Clock, text: safe(acf?.about_section?.feature_3_heading, "24/7 Emergency Response") },
    { icon: CheckCircle2, text: safe(acf?.about_section?.feature_4_heading, "Satisfaction Guaranteed") },
  ];

  // TESTIMONIALS
  const testimonials = [
    {
      name: safe(acf?.testimonials_section?.testimonial_1_name),
      location: safe(acf?.testimonials_section?.testimonial_1_location),
      rating: 5,
      text: safe(acf?.testimonials_section?.testimonial_1_text),
    },
    {
      name: safe(acf?.testimonials_section?.testimonial_2_name),
      location: safe(acf?.testimonials_section?.testimonial_2_location),
      rating: 5,
      text: safe(acf?.testimonials_section?.testimonial_2_text),
    },
    {
      name: safe(acf?.testimonials_section?.testimonial_3_name),
      location: safe(acf?.testimonials_section?.testimonial_3_location),
      rating: 5,
      text: safe(acf?.testimonials_section?.testimonial_3_text),
    },
  ].filter((t) => t.name);

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-20 md:py-32"
        style={{
          backgroundImage: heroBg ? `url(${heroBg})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {heroTitle}
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="call" size="lg" asChild className="text-lg">
                <a href="tel:+254700000000">
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <a href="#quote-form">Get Free Quote</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {safe(acf?.pest_services_section?.services_title, "Our Services")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {safe(acf?.pest_services_section?.services_subtitle)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow animate-fade-up">
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
            {testimonials.map((t, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow animate-fade-up">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{t.text}"</p>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.location}</p>
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
