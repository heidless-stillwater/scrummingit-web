
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PortfolioSectionProps {
  id: string;
}

interface PortfolioItem {
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
  href?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: 'Accounting',
    description: 'Business Info & AI Functionality covering all things Accountancy',
    imageUrl: 'https://storage.googleapis.com/rsr_accounting/rsr_graphic_0.png',
    aiHint: 'website store',
    href: 'https://idx-studio-4949958677-877690100053.europe-west2.run.app',
  },
  {
    title: 'Fast Food',
    description: 'Resource to promote your restaurant and menu. AI Enabled for recommendations',
    imageUrl: 'https://storage.googleapis.com/fast-food-assets/best_kebab_site_1.png',
    aiHint: 'corporate website',
  },
  {
    title: 'Creative Agency Portfolio',
    description: 'Resource to promote your Personal Training Practice. AI Enabled.',
    imageUrl: 'https://storage.googleapis.com/paula-personal-trainer-0/%40iampowerbuilt_page_0.png',
    aiHint: 'art portfolio',
  },
  {
    title: 'Dental Practice',
    description: 'Resource to promote your Dental Practice. AI Enabled',
    imageUrl: 'https://storage.googleapis.com/the_green_dental_surgery/the_green_dental_page_0.png',
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
          {portfolioItems.map((item, index) => {
            const cardContent = (
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
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
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="text-xl font-semibold mb-2">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            );

            if (item.href) {
              return (
                <Link key={index} href={item.href} passHref target="_blank" rel="noopener noreferrer" className="block h-full">
                  {cardContent}
                </Link>
              );
            }

            return <div key={index} className="h-full">{cardContent}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
