import { WebsiteCopyGeneratorForm } from '@/components/ai/website-copy-generator-form';
import { DesignSuggestionToolForm } from '@/components/ai/design-suggestion-tool-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface AiToolsSectionProps {
  id: string;
}

export function AiToolsSection({ id }: AiToolsSectionProps) {
  return (
    <section id={id} className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          AI-Powered <span className="text-primary">Tools</span>
        </h2>
        <Tabs defaultValue="copy-generator" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="copy-generator">Website Copy Generator</TabsTrigger>
            <TabsTrigger value="design-suggestions">Design Suggestion Tool</TabsTrigger>
          </TabsList>
          <TabsContent value="copy-generator">
            <WebsiteCopyGeneratorForm />
          </TabsContent>
          <TabsContent value="design-suggestions">
            <DesignSuggestionToolForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
