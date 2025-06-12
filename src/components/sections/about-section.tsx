import Image from 'next/image';

interface AboutSectionProps {
  id: string;
}

export function AboutSection({ id }: AboutSectionProps) {
  return (
    <section id={id} className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-primary">
              About ScrummingIT
            </h2>
            <p className="text-lg text-secondary-foreground mb-4">
              ScrummingIT Web Design is a passionate team of creative designers and expert developers dedicated to building exceptional online experiences. We believe in the power of great design and cutting-edge technology to transform businesses.
            </p>
            <p className="text-lg text-secondary-foreground mb-4">
              Our approach is collaborative and client-focused. We work closely with you to understand your vision, goals, and target audience, ensuring the final product not only looks amazing but also achieves tangible results.
            </p>
            <p className="text-lg text-secondary-foreground">
              From sleek portfolios to robust e-commerce platforms, we bring ideas to life with pixel-perfect precision and a commitment to excellence.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Web design team working"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint="team collaboration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
