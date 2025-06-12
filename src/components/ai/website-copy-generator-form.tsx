"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateWebsiteCopy, type GenerateWebsiteCopyInput, type GenerateWebsiteCopyOutput } from '@/ai/flows/generate-website-copy';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  agencyDescription: z.string().min(10, 'Description must be at least 10 characters'),
  targetAudience: z.string().min(5, 'Target audience must be at least 5 characters'),
  websitePurpose: z.string().min(5, 'Website purpose must be at least 5 characters'),
});

type FormData = Omit<GenerateWebsiteCopyInput, 'agencyName'>;

export function WebsiteCopyGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCopy, setGeneratedCopy] = useState<GenerateWebsiteCopyOutput | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agencyDescription: '',
      targetAudience: '',
      websitePurpose: '',
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setGeneratedCopy(null);
    try {
      const input: GenerateWebsiteCopyInput = {
        ...data,
        agencyName: 'ScrummingIT Web Design',
      };
      const result = await generateWebsiteCopy(input);
      setGeneratedCopy(result);
      toast({
        title: "Copy Generated!",
        description: "Website copy has been successfully generated.",
      });
    } catch (error) {
      console.error('Error generating website copy:', error);
      toast({
        title: "Error",
        description: "Failed to generate website copy. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Website Copy Generator</CardTitle>
        <CardDescription>Fill in the details below to generate compelling website copy for ScrummingIT Web Design.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="agencyDescription">Agency Description</Label>
            <Textarea
              id="agencyDescription"
              {...register('agencyDescription')}
              placeholder="e.g., A dynamic web design agency specializing in modern, responsive websites..."
              className="mt-1"
            />
            {errors.agencyDescription && <p className="text-sm text-destructive mt-1">{errors.agencyDescription.message}</p>}
          </div>
          <div>
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input
              id="targetAudience"
              {...register('targetAudience')}
              placeholder="e.g., Startups, small businesses, creative professionals"
              className="mt-1"
            />
            {errors.targetAudience && <p className="text-sm text-destructive mt-1">{errors.targetAudience.message}</p>}
          </div>
          <div>
            <Label htmlFor="websitePurpose">Website Purpose</Label>
            <Input
              id="websitePurpose"
              {...register('websitePurpose')}
              placeholder="e.g., Showcase portfolio, attract new clients, provide information"
              className="mt-1"
            />
            {errors.websitePurpose && <p className="text-sm text-destructive mt-1">{errors.websitePurpose.message}</p>}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Copy
          </Button>
        </form>

        {generatedCopy && (
          <div className="mt-8 p-6 border rounded-md bg-muted/50">
            <h3 className="text-xl font-semibold mb-4 text-primary">Generated Copy:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Headline:</h4>
                <p className="text-muted-foreground">{generatedCopy.headline}</p>
              </div>
              <div>
                <h4 className="font-semibold">About Us Section:</h4>
                <p className="text-muted-foreground whitespace-pre-line">{generatedCopy.aboutUsSection}</p>
              </div>
              <div>
                <h4 className="font-semibold">Portfolio Section:</h4>
                <p className="text-muted-foreground whitespace-pre-line">{generatedCopy.portfolioSection}</p>
              </div>
              <div>
                <h4 className="font-semibold">Contact Us Section:</h4>
                <p className="text-muted-foreground whitespace-pre-line">{generatedCopy.contactUsSection}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
