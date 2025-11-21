import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, MapPin, CheckCircle2 } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Licensed & Certified",
    description: "Fully licensed by the Pest Control Products Board (PCPB) of Kenya with certified technicians.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "We use only approved, eco-friendly products and follow international pest control standards.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. We stand behind every service with our guarantee.",
  },
  {
    icon: MapPin,
    title: "Local Experts",
    description: "Based in Nairobi, we understand local pest challenges and provide fast, reliable service.",
  },
];

const coverage = [
  "Westlands", "Kilimani", "Karen", "Lavington", "Parklands",
  "Kileleshwa", "Runda", "Muthaiga", "South B", "South C",
  "Langata", "Embakasi", "Kasarani", "Ruaka", "Kitisuru"
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">About Killpezts</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Nairobi's trusted pest control experts since 2015
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Killpezts Fumigation and Pest Control was founded in 2015 with a simple mission: to provide Nairobi residents and businesses with safe, effective, and eco-friendly pest control solutions.
              </p>
              <p>
                Over the years, we've grown from a small local operation to one of Nairobi's most trusted pest control companies, serving hundreds of satisfied customers across the city. Our success is built on three pillars: expertise, quality, and customer service.
              </p>
              <p>
                We understand that dealing with pests can be stressful. That's why we've invested in the best training, equipment, and eco-friendly products to ensure every job is done right the first time. Our team of certified technicians brings years of experience and a commitment to excellence to every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card 
                  key={value.title} 
                  className="hover:shadow-lg transition-shadow animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <value.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Licenses & Certifications</h2>
            <Card className="bg-primary/5">
              <CardContent className="pt-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">PCPB Licensed</p>
                      <p className="text-sm text-muted-foreground">
                        Licensed by the Pest Control Products Board of Kenya
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Certified Technicians</p>
                      <p className="text-sm text-muted-foreground">
                        All our technicians are trained and certified in integrated pest management
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Insured</p>
                      <p className="text-sm text-muted-foreground">
                        Fully insured for your peace of mind
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Eco-Friendly Standards</p>
                      <p className="text-sm text-muted-foreground">
                        We use only approved, low-toxicity products safe for families and pets
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Areas We Serve in Nairobi</h2>
            <p className="text-center text-muted-foreground mb-8">
              We provide fast, reliable pest control services across Nairobi
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {coverage.map((area) => (
                <span 
                  key={area}
                  className="bg-background px-4 py-2 rounded-full border border-border hover:border-primary transition-colors text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8">
              Don't see your area? <a href="/contact" className="text-primary hover:underline font-semibold">Contact us</a> - we may still be able to help!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
