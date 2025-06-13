import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PortfolioSectionProps {
  id: string;
}

const portfolioItems = [
  {
    title: 'Accounting',
    description: 'A sleek and responsive e-commerce site with advanced features.',
    imageUrl: 'https://storage.googleapis.com/rsr_accounting/rsr_graphic_0.png',
    aiHint: 'website store',
  },
  {
    title: 'Corporate Rebranding Website',
    description: 'Complete website redesign for a major corporation.',
    imageUrl: 'https://storage.googleapis.com/rsr_accounting/rsr_graphic_0.png',
    aiHint: 'corporate website',
  },
  {
    title: 'Creative Agency Portfolio',
    description: 'A visually stunning portfolio for a creative agency.',
    imageUrl: 'https://storage.googleapis.com/rsr_accounting/rsr_graphic_0.png',
    aiHint: 'art portfolio',
  },
  {
    title: 'New Project Showcase',
    description: 'An exciting new project highlighting innovative solutions.',
    imageUrl: 'https://storage.googleapis.com/rsr_accounting/rsr_graphic_0.png',
    aiHint: 'new project',
  },
];

export function PortfolioSection({ id }: PortfolioSectionProps) {
  return (
    <section id={id} className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          Our <span className="text-primary">Portfolio</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover aspect-[3/2]"
                  data-ai-hint={item.aiHint}
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold mb-2">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
