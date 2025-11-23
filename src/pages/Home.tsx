import { useState, useEffect } from "react";
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

const iconMap = {
  Leaf,
  Shield,
  Clock,
  CheckCircle2,
  Waves,
  Bug,
  HomeIcon,
};

export default function Home() {
  const [acf, setAcf] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchACF = async () => {
      try {
        const WP_URL = "https://cms.killpeztsfumigation.co.ke/wp-json/acf/v3/pages/9";
        const res = await fetch(WP_URL);
        const data = await res.json();
        setAcf(data.acf);
      } catch (error) {
        console.error("Failed to fetch ACF data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchACF();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!acf) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Failed to load content. Please try again later.</p>
      </div>
    );
  }

  const hero = acf.hero_section;
  const pest = acf.pest_services_section;
  const testimonials = acf.testimonials_section;
  const whyChoose = [
    { icon: "Leaf", text: hero.badge_1_text },
    { icon: "Shield", text: hero.badge_2_text },
    { icon: "Clock", text: hero.badge_3_text },
  ];

  const services = [
    {
      icon: Waves,
      title: pest.service_1_heading,
      description: pest.service_1_subheading,
      link: pest.service_1_button_link,
    },
    {
      icon: Bug,
      title: pest.service_2_heading,
      description: pest.service_2_subheading,
      link: pest.service_2_button_link,
    },
    {
      icon: HomeIcon,
      title: pest.service_3_heading,
      description: pest.service_3_subheading,
      link: "/services",
    },
  ];

  const testimonialsList = [
    {
      name: testimonials.testimonial_1_name,
      text: testimonials.testimonial_1_text,
      rating: 5,
    },
    {
      name: testimonials.testimonial_2_name,
      text: testimonials.testimonial_2_text,
      rating: 5,
    },
    {
      name: testimonials.testimonial_3_name,
      text: testimonials.testimonial_3_text,
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-20 md:py-32"
        style={{
          backgroundImage: `url(${hero.hero_background_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {hero.hero_title}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              {hero.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="call" size="lg" asChild className="text-lg">
                <a href={hero.button_1_link}>
                  <Phone className="h-5 w-5" />
                  {hero.buton_1_text}
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background hover:text-foreground"
              >
                <a href={hero.button_2_link}>{hero.buton_2_text}</a>
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
              {pest.services_title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {pest.services_subtitle}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <Card
                  key={item.text}
                  className="text-center hover:shadow-lg transition-shadow animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-8 pb-8">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <p className="font-semibold">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {testimonials.testimonial_heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsList.map((t, index) => (
              <Card
                key={t.name}
                className="hover:shadow-xl transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "{t.text}"
                  </p>
                  <p className="font-semibold">{t.name}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get Your Free Quote
              </h2>
              <p className="text-muted-foreground text-lg">
                Fill out the form and we’ll get back to you within 24 hours.
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
}
