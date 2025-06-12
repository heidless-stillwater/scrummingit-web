import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, Globe } from "lucide-react";

interface ContactSectionProps {
  id: string;
}

const contactDetails = [
  { icon: MapPin, label: "Address", value: "703a Seven Sisters Road, London" },
  { icon: Mail, label: "Email", value: "test@test.com", href: "mailto:test@test.com" },
  { icon: Phone, label: "Phone", value: "01234567890", href: "tel:01234567890" },
  { icon: Globe, label: "Website", value: "scrummingit.test", href: "http://scrummingit.test" },
];

export function ContactSection({ id }: ContactSectionProps) {
  return (
    <section id={id} className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          Get in <span className="text-primary">Touch</span>
        </h2>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              {contactDetails.map((item, index) => (
                <li key={index} className="flex items-start">
                  <item.icon className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">{item.label}</h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
         <p className="text-center mt-8 text-muted-foreground">
            We're excited to hear about your project. Reach out to us today!
          </p>
      </div>
    </section>
  );
}
