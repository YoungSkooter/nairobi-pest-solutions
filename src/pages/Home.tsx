// pages/[page].jsx
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { ServiceCard } from "@/components/ServiceCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Shield,
  Leaf,
  CheckCircle2,
  Bug,
  Waves,
  Home as HomeIcon,
  Star,
} from "lucide-react";

const ACF_ENDPOINT = "https://cms.killpeztsfumigation.co.ke/wp-json/acf/v3/pages/9";

// ---------- ACF MAP ----------
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

  const badges = [
    hero.badge_1_title && { title: hero.badge_1_title, text: hero.badge_1_text },
    hero.badge_2_title && { title: hero.badge_2_title, text: hero.badge_2_text },
    hero.badge_3_title && { title: hero.badge_3_title, text: hero.badge_3_text },
  ].filter(Boolean);

  const services = [];

  if (pest.service_1_heading)
    services.push({
      title: pest.service_1_heading,
      description: pest.service_1_subheading,
      link: pest.service_1_button_link,
      icon: Waves,
    });

  if (pest.service_2_heading)
    services.push({
      title: pest.service_2_heading,
      description: pest.service_2_subheading,
      link: pest.service_2_button_link,
      icon: Bug,
    });

  if (residential.service_1_heading)
    services.push({
      title: residential.service_1_heading,
      description: residential.service_1_description,
      link: "#",
      icon: HomeIcon,
      image: residential.service_1_image,
    });

  if (residential.service_2_heading)
    services.push({
      title: residential.service_2_heading,
      description: residential.service_2_description,
      link: "#",
      icon: Shield,
      image: residential.service_2_image,
    });

  if (cleaning.service_1_heading)
    services.push({
      title: cleaning.service_1_heading,
      description: cleaning.service_1_description,
      link: cleaning.service_1_button_link,
      icon: Leaf,
    });

  if (cleaning.service_2_heading)
    services.push({
      title: cleaning.service_2_heading,
      description: cleaning.service_2_description,
      link: cleaning.service_2_button_link,
      icon: CheckCircle2,
    });

  const whyChooseUs = [
    about.feature_1_heading && { icon: Leaf, text: about.feature_1_heading },
    about.feature_2_heading && { icon: Shield, text: about.feature_2_heading },
    about.feature_3_heading && { icon: Clock, text: about.feature_3_heading },
    about.feature_4_heading && { icon: CheckCircle2, text: about.feature_4_heading },
  ].filter(Boolean);

  const testimonialArray = [
    testimonials.testimonial_1_text && {
      text: testimonials.testimonial_1_text,
      name: testimonials.testimonial_1_name,
      rating: 5,
    },
    testimonials.testimonial_2_text && {
      text: testimonials.testimonial_2_text,
      name: testimonials.testimonial_2_name,
      rating: 5,
    },
    testimonials.testimonial_3_text && {
      text: testimonials.testimonial_3_text,
      name: testimonials.testimonial_3_name,
      rating: 5,
    },
  ].filter(Boolean);

  const serviceAreas = [
    serviceArea.area_1_name,
    serviceArea.area_2_name,
    serviceArea.area_3_name,
  ].filter(Boolean);

  return {
    hero: {
      title: hero.hero_title,
      subtitle: hero.hero_subtitle,
      button1Text: hero.buton_1_text,
      button1Link: hero.button_1_link,
      button2Text: hero.buton_2_text,
      button2Link: hero.button_2_link,
      backgroundImage: hero.hero_background_image,
      badges,
    },
    servicesTitle:
      pest.services_title ||
      cleaning.services_title ||
      residential.residential_and_commercial_services_title ||
      "Our Services",
    servicesSubtitle:
      pest.services_subtitle ||
      cleaning.services_subtitle ||
      "",
    services,
    whyChooseUs,
    testimonials: testimonialArray,
    about: {
      title: about.about_title,
      desc: about.about_description,
      buttonText: about.about_button_text,
      buttonLink: about.about_button_link,
    },
    process: {
      heading: process.process_heading,
      steps: [
        process.process_1_title && {
          title: process.process_1_title,
          subtitle: process.process_1_subtitle,
        },
        process.process_2_title && {
          title: process.process_2_title,
          subtitle: process.process_2_subtitle,
        },
        process.process_3_title && {
          title: process.process_3_title,
          subtitle: process.process_3_subtitle,
        },
        process.process_4_title && {
          title: process.process_4_title,
          subtitle: process.process_4_subtitle,
        },
      ].filter(Boolean),
    },
    serviceAreas,
    cta: {
      title: cta.cta_section_title,
      subtitle: cta.cta_section_subtitle,
      button1Text: cta.button_1_text,
      button1Link: cta.button_1_link,
      button2Text: cta.button_2_text,
      button2Link: cta.button_2_link,
    },
    rawAcf: acf,
  };
}

// ---------- PAGE ----------
export default function DynamicPage({ acf }) {
  const ui = useMemo(() => mapAcfToUi(acf), [acf]);

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section
        className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 md:py-32"
        style={{
          backgroundImage: ui.hero.backgroundImage
            ? `url(${ui.hero.backgroundImage})`
            : undefined,
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-5xl font-bold">{ui.hero.title}</h1>
          <p className="text-lg mt-4">{ui.hero.subtitle}</p>

          <div className="flex gap-4 justify-center mt-6 flex-col sm:flex-row">
            <Button variant="call" size="lg" asChild>
              <a href={ui.hero.button1Link}>
                <Phone className="h-5 w-5" /> {ui.hero.button1Text}
              </a>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <a href={ui.hero.button2Link}>{ui.hero.button2Text}</a>
            </Button>
          </div>

          {ui.hero.badges?.length > 0 && (
            <div className="flex gap-3 justify-center mt-8 flex-wrap">
              {ui.hero.badges.map((b, i) => (
                <div key={i} className="px-4 py-2 bg-white/10 rounded">
                  <h4 className="font-semibold">{b.title}</h4>
                  <p className="text-sm opacity-80">{b.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold">{ui.servicesTitle}</h2>
          <p className="text-muted-foreground mt-2">{ui.servicesSubtitle}</p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {ui.services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose Us?</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {ui.whyChooseUs.map((item, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-8 pb-8">
                  <item.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <p className="font-semibold">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Testimonials</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {ui.testimonials.map((t, i) => (
              <Card key={i} className="p-6">
                <CardContent>
                  <div className="flex gap-1 mb-4 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{t.text}"</p>
                  <p className="font-semibold">{t.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="quote-form" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold">Get a Free Quote</h2>
          </div>

          <Card>
            <CardContent className="pt-6">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      {ui.cta?.title && (
        <section className="py-16 bg-primary text-primary-foreground text-center">
          <h3 className="text-3xl font-bold">{ui.cta.title}</h3>
          <p className="mt-2">{ui.cta.subtitle}</p>

          <div className="mt-6 flex gap-3 justify-center">
            {ui.cta.button1Text && (
              <Button asChild>
                <a href={ui.cta.button1Link}>{ui.cta.button1Text}</a>
              </Button>
            )}

            {ui.cta.button2Text && (
              <Button variant="outline" asChild>
                <a href={ui.cta.button2Link}>{ui.cta.button2Text}</a>
              </Button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

// ---------- BUILD-TIME FETCH ----------
export async function getStaticProps() {
  try {
    const res = await fetch(ACF_ENDPOINT);
    const json = await res.json();

    return {
      props: {
        acf: json.acf || {},
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: { acf: {} },
      revalidate: 60,
    };
  }
}
