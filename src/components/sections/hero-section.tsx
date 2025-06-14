import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  id: string;
}

export function HeroSection({ id }: HeroSectionProps) {
  return (
    <section id={id} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Block - now first in DOM for left alignment on desktop */}
          <div className="order-first flex justify-center md:justify-start">
            <div className="rounded-lg overflow-hidden shadow-xl max-w-md w-full">
              <Image
                src="https://placehold.co/600x450.png"
                alt="Hero image illustrating web design concepts"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                data-ai-hint="web design agency"
                priority
              />
            </div>
          </div>
          {/* Text Content Block - now second in DOM for right alignment on desktop */}
          <div className="order-last text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6">
              <span className="text-primary">ScrummingIT</span> Web Design
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
              Crafting stunning, high-performance websites that elevate your brand and drive results. Let's build your digital future, together.
            </p>
            <div className="space-x-0 md:space-x-4 space-y-4 md:space-y-0 flex flex-col sm:flex-row items-center justify-center md:justify-start">
              <Link href="#portfolio" passHref>
                <Button size="lg" className="w-full sm:w-auto">View Our Work</Button>
              </Link>
              <Link href="#contact" passHref>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
