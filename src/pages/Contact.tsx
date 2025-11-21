import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+254 700 000 000",
    link: "tel:+254700000000",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: "+254 700 000 000",
    link: "https://wa.me/254700000000",
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@killpezts.co.ke",
    link: "mailto:info@killpezts.co.ke",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Nairobi, Kenya",
    link: null,
  },
  {
    icon: Clock,
    title: "Hours",
    details: "Mon-Sat: 7AM - 7PM\nSun: 8AM - 5PM",
    link: null,
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Get in touch for a free quote or to schedule your pest control service
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.title}
                  className="hover:shadow-lg transition-shadow animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="pt-6 text-center">
                    <info.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-muted-foreground whitespace-pre-line">{info.details}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form and we'll get back to you within 24 hours. For urgent pest issues, please call us directly.
                </p>
                <Card>
                  <CardContent className="pt-6">
                    <ContactForm showServiceField />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                        <MapPin className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Our office is centrally located in Nairobi for easy access. Drop by during business hours for consultations or to discuss your pest control needs.
                      </p>
                      <p className="font-semibold mb-1">Office Hours:</p>
                      <p className="text-muted-foreground text-sm">
                        Monday - Saturday: 7:00 AM - 7:00 PM<br/>
                        Sunday: 8:00 AM - 5:00 PM
                      </p>
                      <p className="text-sm text-muted-foreground mt-4">
                        <strong>Emergency Services:</strong> Available 24/7
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-secondary/10 border-secondary">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">Why Choose Killpezts?</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Fast response times across Nairobi</li>
                      <li>✓ Licensed & certified technicians</li>
                      <li>✓ Eco-friendly, odorless treatments</li>
                      <li>✓ Satisfaction guaranteed</li>
                      <li>✓ Competitive pricing with no hidden fees</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
