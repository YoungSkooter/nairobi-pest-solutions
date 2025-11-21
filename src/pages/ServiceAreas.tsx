import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceAreas = [
  {
    area: "Westlands & Parklands",
    neighborhoods: ["Westlands", "Parklands", "Highridge", "Mountain View"],
    response: "30-60 minutes",
  },
  {
    area: "Kilimani & Lavington",
    neighborhoods: ["Kilimani", "Lavington", "Kileleshwa", "Hurlingham"],
    response: "30-60 minutes",
  },
  {
    area: "Karen & Langata",
    neighborhoods: ["Karen", "Langata", "Hardy", "Otiende"],
    response: "45-90 minutes",
  },
  {
    area: "Upperhill & South C",
    neighborhoods: ["Upperhill", "South B", "South C", "Nyayo Estate"],
    response: "30-60 minutes",
  },
  {
    area: "Muthaiga & Runda",
    neighborhoods: ["Muthaiga", "Runda", "Kitisuru", "Spring Valley"],
    response: "45-90 minutes",
  },
  {
    area: "Embakasi & Eastlands",
    neighborhoods: ["Embakasi", "Donholm", "Buruburu", "Umoja"],
    response: "60-90 minutes",
  },
];

const ServiceAreas = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Service Areas in Nairobi</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Fast, reliable pest control across Nairobi and surrounding areas
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Where We Serve</h2>
              <p className="text-lg text-muted-foreground">
                We provide comprehensive pest control services across all major Nairobi neighborhoods
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceAreas.map((location, index) => (
                <Card 
                  key={location.area}
                  className="hover:shadow-xl transition-all duration-300 hover:border-primary cursor-pointer group animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-8 w-8 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                          {location.area}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {location.neighborhoods.join(" • ")}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-secondary" />
                          <span className="font-medium">Response time: {location.response}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Service Coverage Details</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Response Times
                  </h3>
                  <p className="text-muted-foreground">
                    We pride ourselves on fast response times. For most areas within central Nairobi, we can arrive within 30-60 minutes for emergency services. Areas further from the city center may take up to 90 minutes, but we always aim to be there as quickly as possible.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Coverage Area
                  </h3>
                  <p className="text-muted-foreground">
                    We serve all of Nairobi County and select areas in Kiambu County. If your area isn't listed above, please contact us - we're always expanding our service area and may be able to accommodate you.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Emergency Services
                  </h3>
                  <p className="text-muted-foreground">
                    We offer 24/7 emergency pest control services for urgent situations. Whether it's a severe infestation or a pest-related health hazard, we're here to help anytime, day or night.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 bg-primary/5 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold">Not Sure if We Serve Your Area?</h2>
            <p className="text-lg text-muted-foreground">
              Contact us today to confirm coverage and get a free quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="call" size="lg" asChild>
                <a href="tel:+254700000000">
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </Button>
              <Button variant="default" size="lg" asChild>
                <a href="/contact">Get Free Quote</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreas;
