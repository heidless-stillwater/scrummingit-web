import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroSectionProps {
  id: string;
}

export function HeroSection({ id }: HeroSectionProps) {
  return (
    <section id={id} className="py-20 md:py-32 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6">
          <span className="text-primary">ScrummingIT</span> Web Design
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Crafting stunning, high-performance websites that elevate your brand and drive results. Let's build your digital future, together.
        </p>
        <div className="space-x-4">
          <Link href="#portfolio" passHref>
            <Button size="lg">View Our Work</Button>
          </Link>
          <Link href="#contact" passHref>
            <Button size="lg" variant="outline">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
