import React, { useEffect, useState } from "react";
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
 * Full dynamic homepage driven by ACF JSON structure exported in:
 * /mnt/data/scf-export-2025-11-23.json (used to validate field names). :contentReference[oaicite:1]{index=1}
 *
 * Notes:
 * - This component expects the WP ACF REST endpoint to be available at WP_URL below.
 * - If you'd rather load a local JSON during development, replace `fetch(WP_URL)` with a local import/fetch.
 */

const iconMap: Record<string, any> = {
  Leaf,
  Shield,
  Clock,
  CheckCircle2,
  Waves,
  Bug,
  HomeIcon,
  // you can add more icon keys here and use the same string in ACF when you add the icon field
};

const fallbackIcons = [Leaf, Shield, Clock, CheckCircle2, Waves, Bug, HomeIcon];

function getIconByName(name?: string, fallbackIndex = 0) {
  if (!name) return fallbackIcons[fallbackIndex % fallbackIcons.length];
  const key = name.replace(/\s+/g, "").replace(/-/g, "");
  return iconMap[key] ?? fallbackIcons[fallbackIndex % fallbackIcons.length];
}

function safeArray<T>(maybe: any): T[] {
  return Array.isArray(maybe) ? maybe : [];
}

export default function Home(): JSX.Element {
  const [acf, setAcf] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // primary WP ACF endpoint used previously — keep as default:
    const WP_URL = "https://cms.killpeztsfumigation.co.ke/wp-json/acf/v3/pages/9";

    // If you want to load the local JSON during dev, change this URL to a local served path.
    (async () => {
      try {
        const res = await fetch(WP_URL);
        if (!res.ok) throw new Error(`WP fetch failed: ${res.status}`);
        const json = await res.json();
        // some WP sites return data.acf, some return data[0].acf — handle both defensively:
        const acfData = json?.acf ?? (json?.[0]?.acf ?? json);
        setAcf(acfData);
      } catch (err) {
        console.error("Failed to fetch ACF data:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!acf) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-muted-foreground">
          Failed to load content. Please check your WP ACF endpoint and CORS settings.
        </p>
      </div>
    );
  }

  //
  // SECTION: Hero (note field names contain underscores in your export)
  //
  const hero = acf.hero_section_ ?? {};
  const heroBadges = safeArray(hero.hero_badges_list);

  //
  // SECTION: Pest Services
  //
  const pest = acf.pest_services_section ?? {};
  const pestServices = safeArray(pest.services_list);

  //
  // SECTION: About -> Features
  //
  const about = acf.about_section ?? {};
  const aboutFeatures = safeArray(about.features_list);

  //
  // Cleaning services section
  //
  const cleaning = acf.cleaning_services_section ?? {};
  const cleaningServices = safeArray(cleaning.services_list);

  //
  // Process section
  //
  const process = acf.process_section ?? {};
  const processList = safeArray(process.process_list);

  //
  // Service areas
  //
  const areas = acf.service_areas_section ?? {};
  const areasList = safeArray(areas.areas_list);

  //
  // Testimonials
  //
  const testimonialSection = acf.testimonial_section ?? {};
  const testimonialsList = safeArray(testimonialSection.testimonials_list);

  //
  // Residential & Commercial
  //
  const resCom = acf["residential_&_commercial_section"] ?? {};

  //
  // CTA section
  //
  const cta = acf.cta_section ?? {};

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section
        className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-20 md:py-32"
        style={{
          backgroundImage: hero.hero_background_image
            ? `url(${hero.hero_background_image})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {hero.hero_title_ ?? "Welcome"}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              {hero.hero_subtitle ?? ""}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {heroBadges.map((b: any, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {/* If ACF had separate badge_title & badge_text we show text */}
                  {b.badge_text ?? b.badge_title ?? ""}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="call" size="lg" asChild className="text-lg">
                <a href={hero.hero_button_1_link ?? "#"}>
                  <Phone className="h-5 w-5 inline-block mr-2" />
                  {hero.hero_button_1_text ?? "Call us"}
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background hover:text-foreground"
              >
                <a href={hero.hero_button_2_link ?? "#"}>
                  {hero.hero_button_2_text ?? "Learn more"}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PEST SERVICES */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {pest.services_title ?? "Our Services"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {pest.services_subtitle ?? ""}
          </p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pestServices.length === 0 ? (
            // fallback: show top-level fields (if any) as one ServiceCard
            <div>
              <ServiceCard
                title={pest.services_title ?? "Service"}
                description={pest.services_subtitle ?? ""}
                link={pest.button_link ?? "/services"}
                icon={Bug}
              />
            </div>
          ) : (
            pestServices.map((s: any, idx: number) => {
              // if you later add an icon field to this repeater, you can use it here
              const Icon = getIconByName(s.icon, idx);
              return (
                <div key={idx} className="animate-fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <ServiceCard
                    title={s.service_title ?? `Service ${idx + 1}`}
                    description={s.service_description ?? ""}
                    link={s.service_button_link ?? "#"}
                    icon={Icon}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* optional global button for services */}
        {(pest.button_text || pest.button_link) && (
          <div className="container mx-auto px-4 text-center mt-8">
            <Button asChild>
              <a href={pest.button_link ?? "#"}>{pest.button_text ?? "View all services"}</a>
            </Button>
          </div>
        )}
      </section>

      {/* ABOUT / FEATURES */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {about.about_title ?? "About Us"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {about.about_subtitle ?? ""}
          </p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutFeatures.map((f: any, idx: number) => {
            const Icon = getIconByName(f.icon, idx);
            return (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="mx-auto mb-4">
                    <Icon className="h-10 w-10 mx-auto" />
                  </div>
                  <h3 className="font-semibold">{f.feature_title ?? `Feature ${idx + 1}`}</h3>
                  <p className="text-muted-foreground mt-2">{f.feature_description ?? ""}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CLEANING SERVICES */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{cleaning.title ?? "Cleaning Services"}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{cleaning.subtitle ?? ""}</p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cleaningServices.map((s: any, idx: number) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow animate-fade-up">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">{s.heading ?? `Service ${idx + 1}`}</h3>
                <p className="text-muted-foreground mb-4">{s.description ?? ""}</p>
                {s.button_text && (
                  <Button asChild size="sm">
                    <a href={s.button_link ?? "#"}>{s.button_text}</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {(cleaning.button_text || cleaning.button_link) && (
          <div className="container mx-auto px-4 text-center mt-8">
            <Button asChild>
              <a href={cleaning.button_link ?? "#"}>{cleaning.button_text ?? "Learn more"}</a>
            </Button>
          </div>
        )}
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{process.title ?? "Our Process"}</h2>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {processList.map((p: any, idx: number) => (
            <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8">
                <div className="mb-4">
                  {/* use a sequential icon */}
                  {React.createElement(getIconByName(p.icon, idx), { className: "h-8 w-8 mx-auto" })}
                </div>
                <h3 className="font-semibold">{p.heading ?? `Step ${idx + 1}`}</h3>
                <p className="text-muted-foreground mt-2">{p.description ?? ""}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{areas.title ?? "Service Areas"}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{areas.subtitle ?? ""}</p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {areasList.map((a: any, idx: number) => (
            <div key={idx} className="p-4 bg-muted/10 rounded-md text-center">
              {a.location_name ?? `Area ${idx + 1}`}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{testimonialSection.title ?? "Testimonials"}</h2>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsList.map((t: any, idx: number) => (
            <Card key={idx} className="hover:shadow-xl transition-shadow animate-fade-up">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(Number(t.rating) || 5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{t.testimonial ?? ""}"</p>
                <p className="font-semibold">{t.name ?? "Anonymous"}</p>
                {t.profession && <p className="text-sm text-muted-foreground">{t.profession}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* RESIDENTIAL & COMMERCIAL */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{resCom.title ?? "Residential & Commercial"}</h2>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">{resCom.service_1_title ?? ""}</h3>
            <div className="text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: resCom.service_1_description ?? "" }} />
            {resCom.service_1_image && <img src={resCom.service_1_image} alt={resCom.service_1_title ?? "Service image"} className="w-full rounded" />}
          </div>

          <div>
            <h3 className="font-semibold mb-2">{resCom.service_2_title ?? ""}</h3>
            <div className="text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: resCom.service_2_description ?? "" }} />
            {resCom.service_2_image && <img src={resCom.service_2_image} alt={resCom.service_2_title ?? "Service image"} className="w-full rounded" />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.title ?? ""}</h2>
          <p className="mb-6">{cta.subtitle ?? ""}</p>

          <div className="flex gap-4 justify-center">
            {cta.button_1_link && (
              <Button asChild>
                <a href={cta.button_1_link}>{cta.button_1_text ?? "Get Quote"}</a>
              </Button>
            )}
            {cta.button_2_link && (
              <Button variant="outline" asChild>
                <a href={cta.button_2_link}>{cta.button_2_text ?? "Learn More"}</a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="quote-form" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Free Quote</h2>
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
      </section>
    </div>
  );
}
