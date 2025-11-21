import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, AlertTriangle, Phone } from "lucide-react";

const process = [
  {
    title: "Inspection",
    description: "Thorough examination to identify infestation areas and severity level.",
  },
  {
    title: "Treatment Plan",
    description: "Customized treatment approach based on your specific situation.",
  },
  {
    title: "Execution",
    description: "Professional application of safe, effective bed bug elimination methods.",
  },
  {
    title: "Follow-up",
    description: "Post-treatment inspection and additional treatments if needed (guaranteed).",
  },
];

const faqs = [
  {
    question: "How long does bed bug treatment take?",
    answer: "Initial treatment takes 2-3 hours. Most infestations are eliminated after one treatment, but we provide follow-up visits to ensure complete eradication.",
  },
  {
    question: "Are your treatments safe for children and pets?",
    answer: "Yes! We use eco-friendly, low-toxicity products that are safe for your family and pets. We'll provide specific instructions for before and after treatment.",
  },
  {
    question: "How much does bed bug control cost?",
    answer: "Costs vary based on the size of the area and severity of infestation. Studio apartments start from KES 5,000. Contact us for a free quote.",
  },
  {
    question: "Do I need to leave during treatment?",
    answer: "For best results, we recommend being away for 3-4 hours during and immediately after treatment. We'll provide detailed preparation instructions.",
  },
  {
    question: "What's your guarantee?",
    answer: "We offer a 30-day guarantee. If bed bugs return within 30 days, we'll retreat at no additional cost.",
  },
];

const BedBugControl = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-destructive via-destructive/90 to-destructive/80 text-destructive-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-destructive-foreground/10 px-4 py-2 rounded-full mb-4">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Expert Bed Bug Elimination</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Bed Bug Control in Nairobi</h1>
            <p className="text-lg md:text-xl text-destructive-foreground/90">
              Fast, effective, and guaranteed bed bug removal. Sleep peacefully again.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">The Bed Bug Problem</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Bed bugs are small, nocturnal insects that feed on human blood. They hide in mattresses, bed frames, furniture, and cracks in walls. Their bites cause itchy welts and can lead to sleepless nights and anxiety.
              </p>
              <p>
                <strong>Common signs of bed bugs:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Red, itchy bites on your skin, often in a line or cluster</li>
                <li>Small blood stains on sheets or pillowcases</li>
                <li>Dark or rusty spots on bedding (bed bug excrement)</li>
                <li>A musty odor in the bedroom</li>
                <li>Live bed bugs or shed skins near sleeping areas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Solution</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Killpezts uses proven, eco-friendly methods to eliminate bed bugs completely.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {process.map((step, index) => (
                <Card key={step.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Pricing</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Transparent pricing based on your space size
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-shadow hover:border-primary">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-bold text-xl mb-2">Studio/1BR</h3>
                  <p className="text-3xl font-bold text-primary mb-4">KES 5,000</p>
                  <ul className="text-left space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Complete treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Follow-up inspection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>30-day guarantee</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-shadow hover:border-primary border-2 border-primary">
                <CardContent className="pt-6 text-center">
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">
                    POPULAR
                  </div>
                  <h3 className="font-bold text-xl mb-2">2-3 BR Apartment</h3>
                  <p className="text-3xl font-bold text-primary mb-4">KES 8,000</p>
                  <ul className="text-left space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Complete treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Follow-up inspection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>30-day guarantee</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-shadow hover:border-primary">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-bold text-xl mb-2">Large House</h3>
                  <p className="text-3xl font-bold text-primary mb-4">Custom</p>
                  <ul className="text-left space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Complete treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Follow-up inspection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>30-day guarantee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Free quote</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 bg-primary/5 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Eliminate Bed Bugs?</h2>
            <p className="text-lg text-muted-foreground">
              Call now for same-day or next-day service. Fast response guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="call" size="lg" asChild>
                <a href="tel:+254700000000">
                  <Phone className="h-5 w-5" />
                  Call Now: +254 700 000 000
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

export default BedBugControl;
