// Home.dynamic.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
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

/**
 * IMPORTANT:
 * npm install dompurify
 * (or your project equivalent). If you don't want to install DOMPurify,
 * the code will fallback to a simple sanitizer (not as robust).
 */

const API_URL = process.env.NEXT_PUBLIC_ACF_HOME_ENDPOINT || "https://cms.headlesstest.online/wp-json/acf/v3/pages/9";
const CACHE_KEY = "acf_home_cache_v1";
const CACHE_META_KEY = "acf_home_cache_meta_v1";

/* ---------------------- small safe HTML sanitizer ---------------------- */
function simpleSanitize(html = "") {
  // quick fallback: remove <script> tags and on* attributes
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "");
}

/* ---------------------- useACFPage hook ---------------------- */
function useACFPage() {
  const mountedRef = useRef(true);
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [meta, setMeta] = useState(() => {
    try {
      const raw = localStorage.getItem(CACHE_META_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();
    let etag = meta?.etag || null;
    let lastmod = meta?.lastModified || null;

    async function fetchLatest() {
      try {
        const headers = {};
        if (etag) headers["If-None-Match"] = etag;
        if (lastmod) headers["If-Modified-Since"] = lastmod;

        const res = await fetch(API_URL, {
          method: "GET",
          headers,
          signal: controller.signal,
          cache: "no-cache",
        });

        // 304 Not Modified
        if (res.status === 304) {
          // nothing changed
          return;
        }

        if (!res.ok) {
          // non-breaking: don't wipe cache on fetch error
          console.warn("ACF fetch failed", res.status);
          return;
        }

        const newEtag = res.headers.get("ETag");
        const newLastMod = res.headers.get("Last-Modified");

        const json = await res.json();

        // validation: ensure it's an object with expected top-level ACF keys
        if (!json || typeof json !== "object" || (!json.acf && !json.ACF)) {
          console.warn("Unexpected ACF payload", json);
        } else {
          const payload = json.acf || json.ACF || json; // be lenient

          // Save cache and meta
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
            localStorage.setItem(CACHE_META_KEY, JSON.stringify({ etag: newEtag, lastModified: newLastMod, fetchedAt: Date.now() }));
          } catch (err) {
            console.warn("Could not write cache", err);
          }

          if (mountedRef.current) setData(payload);
          if (mountedRef.current) setMeta({ etag: newEtag, lastModified: newLastMod });
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("ACF fetch error", err);
      }
    }

    // fire-and-forget background update
    fetchLatest();

    return () => {
      mountedRef.current = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  return { data, meta };
}

/* ----------------------- SafeHTML component ----------------------- */
const SafeHTML = ({ html }) => {
  const [domPurify, setDomPurify] = useState(null);
  const sanitized = useMemo(() => {
    if (!html) return "";
    if (domPurify) return domPurify.sanitize(html);
    return simpleSanitize(html);
  }, [html, domPurify]);

  useEffect(() => {
    let mounted = true;
    // try dynamic import for DOMPurify (non-blocking)
    import("dompurify")
      .then((module) => {
        if (mounted && module && module.default) {
          setDomPurify(() => module.default);
        }
      })
      .catch(() => {
        // graceful fallback - we already have simpleSanitize
      });
    return () => (mounted = false);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};

/* ----------------------- Field helpers ----------------------- */
/* The uploaded ACF JSON used these group and field names (see file). */
function safeGet(obj, path, fallback = "") {
  try {
    return path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : null), obj) ?? fallback;
  } catch (e) {
    return fallback;
  }
}

/* ----------------------- Home Component ----------------------- */
const Home = () => {
  const { data } = useACFPage();

  /**
   * data corresponds to the ACF group object in your uploaded JSON
   * Example structure (based on your export): data.hero_section.hero_title, data.pest_services_section.services_title, etc.
   * See uploaded export for exact keys. :contentReference[oaicite:2]{index=2}
   */

  // FALLBACKS: If there is no cached data yet, we still render a minimal layout
  const heroTitle = safeGet(data, "hero_section.hero_title", "Professional Pest Control Services in Nairobi");
  const heroSubtitle = safeGet(data, "hero_section.hero_subtitle", "Safe, effective, and eco-friendly pest elimination for your home and business");
  const heroBg = safeGet(data, "hero_section.hero_background_image", null);

  // Services (mapping ACF separate fields into an array)
  const services = [
    {
      icon: Waves,
      title: safeGet(data, "pest_services_section.service_1_heading", "Fumigation Services"),
      description: safeGet(data, "pest_services_section.service_1_subheading", ""),
      link: safeGet(data, "pest_services_section.service_1_button_link", "/services"),
      buttonText: safeGet(data, "pest_services_section.service_1_button_text", "Learn More"),
    },
    {
      icon: Bug,
      title: safeGet(data, "pest_services_section.service_2_heading", "Bed Bug Control"),
      description: safeGet(data, "pest_services_section.service_2_subheading", ""),
      link: safeGet(data, "pest_services_section.service_2_button_link", "/services/bed-bug-control"),
      buttonText: safeGet(data, "pest_services_section.service_2_button_text", "Learn More"),
    },
    // add more service blocks from other groups if present (residential_and_commercial_services_section, cleaning_services_section, etc.)
  ];

  const whyChoose = [
    { icon: Leaf, text: safeGet(data, "about_section.feature_1_heading", "100% Eco-friendly & Odorless") },
    { icon: Shield, text: safeGet(data, "about_section.feature_2_heading", "Licensed & Insured") },
    { icon: Clock, text: safeGet(data, "cta_section.button_1_text", "24/7 Emergency Response") }, // example reuse
    { icon: CheckCircle2, text: safeGet(data, "about_section.feature_1_subheading", "Satisfaction Guaranteed") },
  ];

  const testimonials = [
    {
      name: safeGet(data, "testimonials_section.testimonial_1_name", "Sarah Mwangi"),
      text: safeGet(data, "testimonials_section.testimonial_1_text", "Killpezts did an amazing job with our bed bug problem."),
      rating: 5,
      location: "Nairobi",
    },
    {
      name: safeGet(data, "testimonials_section.testimonial_2_name", "John Kamau"),
      text: safeGet(data, "testimonials_section.testimonial_2_text", "Fast and affordable."),
      rating: 5,
      location: "Nairobi",
    },
  ];

  // Service Area
  const serviceAreas = [
    safeGet(data, "service_area_section.area_1_name", "Westlands"),
    safeGet(data, "service_area_section.area_2_name", "Karen"),
    safeGet(data, "service_area_section.area_3_name", "Kilimani"),
  ].filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative text-primary-foreground py-20 md:py-32"
        style={{
          backgroundImage: heroBg ? `url(${heroBg})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="hero"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up bg-background/40 p-8 rounded">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {heroTitle}
            </h1>

            {/* support WYSIWYG hero subtitle if admin used it */}
            <p className="text-lg md:text-xl text-primary-foreground/90">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="call" size="lg" asChild className="text-lg">
                <a href={`tel:+254700000000`}>
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </Button>

              <Button variant="outline" size="lg" asChild className="bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background hover:text-foreground">
                <a href="#quote-form">{safeGet(data, "hero_section.buton_1_text", "Get Free Quote")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-background" aria-label="services-preview">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{safeGet(data, "pest_services_section.services_title", "Our Services")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{safeGet(data, "pest_services_section.services_subtitle", "Comprehensive pest control solutions tailored to your needs")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <div key={s.title || i} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <ServiceCard
                  title={s.title}
                  description={s.description}
                  link={s.link}
                  buttonText={s.buttonText}
                  Icon={s.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-24 bg-muted/30" aria-label="why-choose">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{safeGet(data, "about_section.about_title", "Why Choose Killpezts?")}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, idx) => (
              <Card key={item.text + idx} className="text-center hover:shadow-lg transition-shadow animate-fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
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
      <section className="py-16 md:py-24 bg-background" aria-label="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{safeGet(data, "testimonials_section.testimonial_heading", "What Our Clients Say")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={t.name + i} className="hover:shadow-xl transition-shadow animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, idx) => <Star key={idx} className="h-5 w-5 fill-secondary text-secondary" />)}
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
      <section id="quote-form" className="py-16 md:py-24 bg-muted/30" aria-label="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{safeGet(data, "cta_section.cta_section_title", "Get Your Free Quote")}</h2>
              <p className="text-muted-foreground text-lg">{safeGet(data, "cta_section.cta_section_subtitle", "Fill out the form and we'll get back to you within 24 hours")}</p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas (small footer) */}
      <footer className="py-8 bg-background/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">We serve: {serviceAreas.join(" • ")}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
