import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  iconColor?: string;
}

export const ServiceCard = ({ icon: Icon, title, description, link, iconColor = "text-primary" }: ServiceCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
      <CardHeader>
        <div className={`w-16 h-16 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors ${iconColor}`}>
          <Icon className="h-8 w-8 group-hover:scale-110 transition-transform" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
          <Link to={link}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
