// pages/index.jsx
import { useEffect, useMemo, useState, useRef } from "react";
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
const LOCALSTORAGE_KEY = "killpezts_acf_page_9_v1";
const REVALIDATE_INTERVAL_MS = 30 * 1000; // auto-update every 30s (adjustable)

/**
 * Utility: shallow stringify for change detection
 */
function hashData(obj) {
  try {
    return JSON.stringify(obj);
  } catch {
    return String(obj);
  }
}

/**
 * Map the ACF schema (from your ACF export) to the shape the layout expects.
 * Uses optional chaining and safe fallbacks (so missing fields won't break layout).
 */
function mapAcfToUi(acf = {}) {
  const hero = acf.hero_section || {};
  const pest = acf.pest_services_section || {};
  const cleaning = acf.cleaning_services_section || {};
  const about = acf.about_section || {};
  const process = acf.process_section || {};
  const serviceArea = acf.service_area_section || {};
  const testimonials = acf.testimonials_section || {};
  const residential = acf.residential_and_commercial_services_section || {};
  const cta = acf.cta_section || {};

  // Build services array by checking pest + residential + cleaning groups
  const services = [];

  // Pest Service 1
  if (pest.service_1_heading || pest.service_1_subheading) {
    services.push({
      title: pest.service_1_heading || "Service",
      description: pest.service_1_subheading || "",
      link: pest.service_1_button_link || "/services",
      // pick an icon heuristically; consumers can change icons easily
      icon: Waves,
    });
  }

  // Pest Service 2
  if (pest.service_2_heading || pest.service_2_subheading) {
    services.push({
      title: pest.service_2_heading || "Service",
      description: pest.service_2_subheading || "",
      link: pest.service_2_button_link || "/services",
      icon: Bug,
    });
  }

  // Residential/commercial services (two)
  if (residential.service_1_heading || residential.service_1_description) {
    services.push({
      title: residential.service_1_heading || "Residential Service",
      description: residential.service_1_description || "",
      link: "#",
      icon: HomeIcon,
      image: residential.service_1_image || null,
    });
  }
  if (residential.service_2_heading || residential.service_2_description) {
    services.push({
      title: residential.service_2_heading || "Commercial Service",
      description: residential.service_2_description || "",
      link: "#",
      icon: Shield,
      image: residential.service_2_image || null,
    });
  }

  // Cleaning services (if present)
  if (cleaning.service_1_heading || cleaning.service_1_description) {
    services.push({
      title: cleaning.service_1_heading || "Cleaning Service",
      description: cleaning.service_1_description || "",
      link: cleaning.service_1_button_link || "#",
      icon: Leaf,
    });
  }
  if (cleaning.service_2_heading || cleaning.service_2_description) {
    services.push({
      title: cleaning.service_2_heading || "Cleaning Service",
      description: cleaning.service_2_description || "",
      link: cleaning.service_2_button_link || "#",
      icon: CheckCircle2,
    });
  }

  // WhyChooseUs mapped from about features
  const whyChooseUs = [
    about.feature_1_heading ? { icon: Leaf, text: about.feature_1_heading } : null,
    about.feature_2_heading ? { icon: Shield, text: about.feature_2_heading } : null,
  ].filter(Boolean);

  // Testimonials - convert individual fields into array if present
  const testimonialArray = [];
  if (testimonials.testimonial_1_text || testimonials.testimonial_1_name) {
    testimonialArray.push({
      name: testimonials.testimonial_1_name || "Customer",
      location: "", // location not present in schema export for testimonials group
      rating: 5,
      text: testimonials.testimonial_1_text || "",
    });
  }
  if (testimonials.testimonial_2_text || testimonials.testimonial_2_name) {
    testimonialArray.push({
      name: testimonials.testimonial_2_name || "Customer",
      location: "",
      rating: 5,
      text: testimonials.testimonial_2_text || "",
    });
  }

  // Badges in hero
  const badges = [
    hero.badge_1_title ? { title: hero.badge_1_title, text: hero.badge_1_text } : null,
    hero.badge_2_title ? { title: hero.badge_2_title, text: hero.badge_2_text } : null,
    hero.badge_3_title ? { title: hero.badge_3_title, text: hero.badge_3_text } : null,
  ].filter(Boolean);

  // Service Area list
  const serviceAreas = [
    serviceArea.area_1_name,
    serviceArea.area_2_name,
    serviceArea.area_3_name,
  ].filter(Boolean);

  return {
    hero: {
      title: hero.hero_title || "Professional Pest Control Services in Nairobi",
      subtitle:
        hero.hero_subtitle || "Safe, effective, and eco-friendly pest elimination for your home and business",
      button1Text: hero.buton_1_text || "Call Now",
      button1Link: hero.button_1_link || "tel:+254700000000",
      button2Text: hero.buton_2_text || "Get Free Quote",
      button2Link: hero.button_2_link || "#quote-form",
      backgroundImage: hero.hero_background_image || null,
      badges,
    },
    servicesTitle: pest.services_title || cleaning.services_title || "Our Services",
    servicesSubtitle: pest.services_subtitle || cleaning.services_subtitle || "",
    services,
    whyChooseUs,
    testimonials: testimonialArray,
    about: {
      title: about.about_title || "",
      desc: about.about_description || "",
      buttonText: about.about_button_text || "",
      buttonLink: about.about_button_link || "#",
    },
    process: {
      heading: process.process_heading || "",
      steps: [
        { title: process.process_1_title || "", subtitle: process.process_1_subtitle || "" },
        { title: process.process_2_title || "", subtitle: process.process_2_subtitle || "" },
      ].filter((s) => s.title || s.subtitle),
    },
    serviceAreas,
    cta: {
      title: cta.cta_section_title || "",
      subtitle: cta.cta_section_subtitle || "",
      button1Text: cta.button_1_text || "",
      button1Link: cta.button_1_link || "#",
      button2Text: cta.button_2_text || "",
      button2Link: cta.button_2_link || "#",
    },
    rawAcf: acf,
  };
}

export default function Home({ initialData }) {
  // initialData is the ACF payload (acf object) fetched at build-time
  const [data, setData] = useState(() => {
    // Instant render: prefer localStorage cache if exists (fast navigation)
    try {
      const cached = typeof window !== "undefined" && localStorage.getItem(LOCALSTORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        // If cache exists, prefer it (keeps instant nav), but still keep initialData fallback
        return parsed.data || mapAcfToUi(initialData?.acf || initialData || {});
      }
    } catch (e) {
      // ignore parse errors
    }
    // fallback to static initialData
    return mapAcfToUi(initialData?.acf || initialData || {});
  });

  // Keep a ref of initial hash to avoid unnecessary updates
  const lastHashRef = useRef(hashData(initialData?.acf || initialData || {}));
  const mountedRef = useRef(false);

  // Save initial static result into localStorage for instant loads later
  useEffect(() => {
    try {
      const toStore = { data, fetchedAt: Date.now() };
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(toStore));
    } catch (e) {
      // ignore storage errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // background revalidation function
  useEffect(() => {
    mountedRef.current = true;

    let cancelled = false;
    async function revalidate() {
      try {
        const res = await fetch(ACF_ENDPOINT, { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        const acf = json.acf || json;
        const newHash = hashData(acf);

        if (newHash !== lastHashRef.current) {
          lastHashRef.current = newHash;
          const mapped = mapAcfToUi(acf);
          if (!cancelled) {
            setData(mapped);
            try {
              localStorage.setItem(
                LOCALSTORAGE_KEY,
                JSON.stringify({ data: mapped, fetchedAt: Date.now() })
              );
            } catch (e) {
              // ignore
            }
          }
        }
      } catch (err) {
        // network failed or offline -> silently ignore (keeps user experience)
      }
    }

    // Immediately revalidate once on mount (to pick up any changes since build)
    revalidate();

    // Poll at interval
    const id = setInterval(revalidate, REVALIDATE_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
      mountedRef.current = false;
    };
  }, []);

  // Memoized UI-friendly values
  const ui = useMemo(() => mapAcfToUi(data.rawAcf || data), [data]);

  // Keep layout identical to your original structure (only data sources changed)
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-20 md:py-32"
        style={{
          backgroundImage: ui.hero.backgroundImage ? `url(${ui.hero.backgroundImage})` : undefined,
          backgroundSize: ui.hero.backgroundImage ? "cover" : undefined,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {ui.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">{ui.hero.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="call" size="lg" asChild className="text-lg">
                <a href={ui.hero.button1Link || "tel:+254700000000"}>
                  <Phone className="h-5 w-5" /> {ui.hero.button1Text}
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background hover:text-foreground"
              >
                <a href={ui.hero.button2Link || "#quote-form"}>{ui.hero.button2Text}</a>
              </Button>
            </div>

            {/* badges (if any) */}
            {ui.hero.badges?.length ? (
              <div className="flex gap-4 justify-center pt-6 flex-wrap">
                {ui.hero.badges.map((b, i) => (
                  <div key={i} className="px-4 py-2 bg-white/10 rounded">
                    <div className="font-semibold">{b.title}</div>
                    {b.text ? <div className="text-sm text-muted-foreground">{b.text}</div> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{ui.servicesTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{ui.servicesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {(ui.services || []).map((service, index) => (
              <div
                key={service.title + index}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* ServiceCard expects icon prop and title/description/link */}
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
            {(ui.whyChooseUs || []).map((item, index) => (
              <Card
                key={item.text + index}
                className="text-center hover:shadow-lg transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-8 pb-8">
                  {item.icon ? <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" /> : null}
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
            {(ui.testimonials || []).map((testimonial, index) => (
              <Card
                key={testimonial.name + index}
                className="hover:shadow-xl transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    {testimonial.location ? (
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    ) : null}
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

      {/* CTA */}
      {ui.cta && (ui.cta.title || ui.cta.subtitle) ? (
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold">{ui.cta.title}</h3>
            <p className="mt-2">{ui.cta.subtitle}</p>
            <div className="mt-4 flex gap-3 justify-center">
              {ui.cta.button1Text ? (
                <Button asChild>
                  <a href={ui.cta.button1Link || "#"}>{ui.cta.button1Text}</a>
                </Button>
              ) : null}
              {ui.cta.button2Text ? (
                <Button variant="outline" asChild>
                  <a href={ui.cta.button2Link || "#"}>{ui.cta.button2Text}</a>
                </Button>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

/**
 * getStaticProps fetches ACF at build time for instant static load.
 * If you want more frequent rebuilds instead of client revalidation, set `revalidate` (ISR).
 */
export async function getStaticProps() {
  try {
    const res = await fetch(ACF_ENDPOINT);
    if (!res.ok) {
      // keep build from failing — return empty acf fallback
      return { props: { initialData: {} }, revalidate: 60 };
    }
    const json = await res.json();
    // json has fields like { id, acf: { ... } } per WP ACF REST response
    return {
      props: { initialData: json || {} },
      // optional ISR: if you want the server to rebuild every N seconds (in addition to client auto-update)
      revalidate: 60, // rebuild on server at most once a minute (optional)
    };
  } catch (err) {
    // network error — return blank initialData so client code still works
    return { props: { initialData: {} }, revalidate: 60 };
  }
}
