import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Phone,
  Droplet,
  Wrench,
  Shield,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://cms.headlesstest.online/wp-json/acf/v3/pages/254")
      .then((res) => res.json())
      .then((json) => {
        if (json?.acf) setData(json.acf);
      })
      .catch((err) => console.error(err));
  }, []);

  // -----------------------------
  // SKELETON LOADER
  // -----------------------------
  if (!data) {
    return (
      <div className="container py-20 grid md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-8">
            <Skeleton className="w-16 h-16 mb-6" />
            <Skeleton className="w-2/3 h-6 mb-4" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-5/6 h-4 mb-4" />
            <Skeleton className="w-32 h-10" />
          </Card>
        ))}
      </div>
    );
  }

  // -----------------------------
  // HERO
  // -----------------------------
  const hero = data.hero_section || {};
  const heroImage = hero.hero_image?.url || null;

  // -----------------------------
  // ABOUT
  // -----------------------------
  const about = data.about_section || {};

  // -----------------------------
  // DYNAMIC SERVICES
  // -----------------------------
  const services_section = data.services_section || {};
  const services = [];

  Object.keys(services_section).forEach((key) => {
    const match = key.match(/^service_label_(\d+)$/);
    if (match) {
      const index = match[1];
      services.push({
        title: services_section[`service_label_${index}`],
        description: services_section[`service_description_${index}`],
        button_text: services_section[`service_button_text_${index}`],
        button_link: services_section[`service_button_link_${index}`],
      });
    }
  });

  const servicesList = services.filter((s) => s.title);
  const serviceIcons = [Droplet, Wrench, Shield, CheckCircle];

  // -----------------------------
  // DYNAMIC TESTIMONIALS
  // -----------------------------
  const testimonials_section = data.testimonials_section || {};
  const testimonials = [];

  Object.keys(testimonials_section).forEach((key) => {
    const match = key.match(/^testimonial_name_(\d+)$/);
    if (match) {
      const index = match[1];
      testimonials.push({
        name: testimonials_section[`testimonial_name_${index}`],
        text: testimonials_section[`testimonial_text_${index}`],
      });
    }
  });

  const testimonialsList = testimonials.filter((t) => t.name);

  // -----------------------------
  // CTA
  // -----------------------------
  const cta = data.call_to_action_section || {};

  return (
    <div className="min-h-screen">

      {/* Preload Hero Background Image (fetchpriority=high) */}
      {heroImage && (
        <img
          src={heroImage}
          alt=""
          fetchpriority="high"
          className="hidden"
        />
      )}

      {/* HERO */}
      <section
        className="relative min-h-[80vh] flex items-center"
        style={{
          backgroundImage: heroImage ? `url(${heroImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="container relative z-10 text-white px-4">
          <h1 className="text-5xl font-bold">{hero.hero_title}</h1>

          {hero.hero_subtitle && (
            <div
              className="text-xl mt-4"
              dangerouslySetInnerHTML={{ __html: hero.hero_subtitle }}
            />
          )}

          <div className="flex gap-4 flex-wrap mt-6">
            {hero.hero_button_text && (
              <Button asChild size="lg" className="bg-accent">
                <a href={hero.hero_button_link}>
                  <Phone className="w-5 h-5 mr-2" />
                  {hero.hero_button_text}
                </a>
              </Button>
            )}

            {hero.button_text_2 && (
              <Button asChild size="lg" variant="outline">
                <a href={hero.button_link_2}>{hero.button_text_2}</a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 bg-gray-50">
        <div className="container grid lg:grid-cols-2 gap-12 px-4">
          {about.about_image && (
            <img
              src={about.about_image}
              alt={about.about_title}
              loading="lazy"
              fetchpriority="low"
              className="rounded-xl"
            />
          )}

          <div>
            <h2 className="text-4xl font-bold mb-4">{about.about_title}</h2>

            {about.about_description && (
              <div
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: about.about_description }}
              />
            )}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      {servicesList.length > 0 && (
        <section className="py-20">
          <div className="container px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>

            <div className="grid md:grid-cols-3 gap-10">
              {servicesList.map((s, i) => {
                const Icon = serviceIcons[i % serviceIcons.length];

                return (
                  <Card key={i} className="p-8 shadow hover:shadow-xl transition">
                    <div className="w-16 h-16 flex items-center justify-center bg-accent/10 rounded-xl mb-6">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{s.title}</h3>

                    {s.description && (
                      <div
                        className="text-muted-foreground mb-4"
                        dangerouslySetInnerHTML={{ __html: s.description }}
                      />
                    )}

                    {s.button_link && (
                      <Button asChild variant="outline">
                        <a href={s.button_link}>{s.button_text}</a>
                      </Button>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonialsList.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonialsList.map((t, i) => (
                <Card key={i} className="p-6 shadow">
                  <div
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: t.text }}
                  />
                  <p className="font-semibold mt-4">{t.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {(cta.cta_title || cta.cta_button_text) && (
        <section className="py-20 bg-primary text-white text-center">
          <h2 className="text-4xl font-bold mb-4">{cta.cta_title}</h2>

          {cta.cta_body && (
            <div
              className="text-lg mb-8 max-w-xl mx-auto"
              dangerouslySetInnerHTML={{ __html: cta.cta_body }}
            />
          )}

          {cta.cta_button_text && (
            <Button asChild size="lg" className="bg-accent">
              <a href={cta.cta_button_link}>{cta.cta_button_text}</a>
            </Button>
          )}
        </section>
      )}
    </div>
  );
}
