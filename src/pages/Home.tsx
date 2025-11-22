// pages/index.jsx
import { useEffect, useMemo, useState } from "react";
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
  Star,
} from "lucide-react";

const ACF_ENDPOINT = "https://cms.killpeztsfumigation.co.ke/wp-json/acf/v3/pages/9";
const CACHE_KEY = "killpezts_home_acf_v1";
const POLL_INTERVAL = 30 * 1000; // 30s - adjust as needed

// Helper: safely render WYSIWYG (HTML) from ACF
const Html = ({ html }) => {
  if (!html) return null;
  // NOTE: We assume the ACF WYSIWYG is trusted (coming from your CMS).
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default function Home({ initialData }) {
  // initialData comes from getStaticProps at build time (instant static load).
  // We also prefer localStorage cache for immediate render on repeat visits.
  const [data, setData] = useState(() => {
    try {
      const cached = typeof window !== "undefined" && localStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch (e) {
      // ignore parse errors
    }
    // fall back to build-time initialData (may be undefined in pure CSR setups)
    return initialData || {};
  });

  // version/hash of data to compare quickly
  const dataHash = useMemo(() => JSON.stringify(data || {}), [data]);

  // Fetch function: fetch ACF JSON and update state + cache if changed
  const fetchAndUpdate = async () => {
    try {
      const res = await fetch(ACF_ENDPOINT, { cache: "no-store" });
      if (!res.ok) return;
      const payload = await res.json();

      // The ACF endpoint wraps fields under .acf (WP REST + ACF plugin)
      const incoming = payload?.acf || payload;

      const incomingStr = JSON.stringify(incoming);
      if (incomingStr !== dataHash) {
        // update UI and localStorage
        setData(incoming);
        try {
          localStorage.setItem(CACHE_KEY, incomingStr);
        } catch (e) {
          // ignore storage quota errors
        }
      }
    } catch (err) {
      // network error - keep existing UI (no loading screen)
      console.warn("Could not fetch ACF:", err);
    }
  };

  // On mount: try to fetch fresh copy and start polling
  useEffect(() => {
    // Always attempt a fetch on mount (non-blocking)
    fetchAndUpdate();

    // Poll for changes periodically
    const id = setInterval(fetchAndUpdate, POLL_INTERVAL);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // Immediately persist any initialData to localStorage for next visit
  useEffect(() => {
    if (!data && initialData) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(initialData));
      } catch (e) {}
    }
  }, [initialData, data]);

  // --- Safe getters that map to your ACF fields (from your ACF export). ---
  // Using optional chaining; if fields are missing we fallback to the original
  // static content structure (so your layout won't break).
  const hero = data?.hero_section || {};
  const pestServices = data?.pest_services_section || {};
  const cleaningServices = data?.cleaning_services_section || {};
  const about = data?.about_section || {};
  const process = data?.process_section || {};
  const serviceArea = data?.service_area_section || {};
  const testimonialsSection = data?.testimonials_section || {};
  const residential = data?.residential_and_commercial_services_section || {};
  const cta = data?.cta_section || {};

  // Map your old arrays to ACF fields (if you prefer to keep static fallback,
  // update the fallback values below)
  const services = [
    {
      icon: Waves,
      title: pestServices.services_title || "Fumigation Services",
      description: pestServices.services_subtitle || "Complete fumigation for homes and commercial spaces using safe, eco-friendly chemicals.",
      link: pestServices.service_1_button_link || "/services",
      buttonText: pestServices.service_1_button_text || "Learn more",
    },
    {
      icon: Bug,
      title: pestServices.service_2_heading || "Bed Bug Control",
      description: pestServices.service_2_subheading || "Expert bed bug elimination with guaranteed results and follow-up treatments.",
      link: pestServices.service_2_button_link || "/services/bed-bug-control",
      buttonText: pestServices.service_2_button_text || "Learn more",
    },
    {
      icon: HomeIcon,
      title: residential.service_1_heading || "General Pest Control",
      description: residential.service_1_description || "Comprehensive pest management for all common household and commercial pests.",
      link: cta.button_1_link || "/services",
      buttonText: residential.service_1_button_text || "Learn more",
    },
  ];

  const testimonials = [
    {
      name: testimonialsSection.testimonial_1_name || "Sarah Mwangi",
      location: "Westlands",
      rating: 5,
      text: testimonialsSection.testimonial_1_text || "Killpezts did an amazing job with our bed bug problem. Professional, punctual, and thorough!",
    },
    {
      name: testimonialsSection.testimonial_2_name || "John Kamau",
      location: "Karen",
      rating: 5,
      text: testimonialsSection.testimonial_2_text || "Best pest control service in Nairobi. They were fast, effective, and very affordable.",
    },
    // Keep a third static testimonial as fallback
    {
      name: "Grace Wanjiru",
      location: "Kilimani",
      rating: 5,
      text: "Eco-friendly products that actually work! No harsh smells and the results were instant.",
    },
  ];

  const whyChooseUs = [
    { icon: Leaf, text: about?.feature_1_heading || "100% Eco-friendly & Odorless" },
    { icon: Shield, text: about?.feature_2_heading || "Licensed & Insured" },
    { icon: Clock, text: "24/7 Emergency Response" },
    { icon: CheckCircle2, text: "Satisfaction Guaranteed" },
  ];

  // Render — same layout as your original file, fully dynamic
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-20 md:py-32"
        style={{
          backgroundImage: hero.hero_background_image ? `url(${hero.hero_background_image})` : undefined,
          backgroundSize: hero.hero_background_image ? "cover" : undefined,
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {hero.hero_title || "Professional Pest Control Services in Nairobi"}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              {hero.hero_subtitle || "Safe, effective, and eco-friendly pest elimination for your home and business"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="call" size="lg" asChild className="text-lg">
                <a href={hero.button_1_link || "tel:+254700000000"}>
                  <Phone className="h-5 w-5" /> {hero.buton_1_text || "Call Now"}
                </a>
              </Button>

              <Button variant="outline" size="lg" asChild className="bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background hover:text-foreground">
                <a href={hero.button_2_link || "#quote-form"}>{hero.buton_2_text || "Get Free Quote"}</a>
              </Button>
            </div>

            {/* optional badges from ACF */}
            <div className="flex justify-center gap-4 pt-6">
              {hero.badge_1_title && (
                <div className="text-sm bg-white/10 px-3 py-2 rounded">
                  <strong>{hero.badge_1_title}</strong> — {hero.badge_1_text}
                </div>
              )}
              {hero.badge_2_title && (
                <div className="text-sm bg-white/10 px-3 py-2 rounded">
                  <strong>{hero.badge_2_title}</strong> — {hero.badge_2_text}
                </div>
              )}
              {hero.badge_3_title && (
                <div className="text-sm bg-white/10 px-3 py-2 rounded">
                  <strong>{hero.badge_3_title}</strong> — {hero.badge_3_text}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{pestServices.services_title || "Our Services"}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{pestServices.services_subtitle || "Comprehensive pest control solutions tailored to your needs"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={service.title + index}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{about.about_title || "Why Choose Killpezts?"}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={item.text + index} className="text-center hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{testimonialsSection.testimonial_heading || "What Our Clients Say"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name + index} className="hover:shadow-xl transition-shadow animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.cta_section_title || "Get Your Free Quote"}</h2>
              <p className="text-muted-foreground text-lg">{cta.cta_section_subtitle || "Fill out the form and we'll get back to you within 24 hours"}</p>
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

// Next.js SSG: getStaticProps fetches the ACF payload at build-time so the page is instant
export async function getStaticProps() {
  try {
    const res = await fetch(ACF_ENDPOINT);
    if (!res.ok) {
      return { props: { initialData: null }, revalidate: 30 };
    }
    const payload = await res.json();
    const acf = payload?.acf || payload || null;

    return {
      props: {
        initialData: acf,
      },
      // revalidate so builds pick up changes if you use Next ISR (optional)
      revalidate: 60,
    };
  } catch (err) {
    console.warn("getStaticProps failed to fetch ACF:", err);
    return { props: { initialData: null }, revalidate: 60 };
  }
}
