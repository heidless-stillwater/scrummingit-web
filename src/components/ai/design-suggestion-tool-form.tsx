"use client";

import { useState }
from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getDesignSuggestions, type GetDesignSuggestionsInput, type GetDesignSuggestionsOutput } from '@/ai/flows/get-design-suggestions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { fileToBase64 } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  portfolioSampleFile: z
    .custom<FileList>()
    .refine((files) => files && files.length === 1, "Portfolio sample image is required.")
    .refine((files) => files && files[0].size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => files && ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  designPreferences: z.string().min(10, 'Design preferences must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export function DesignSuggestionToolForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GetDesignSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const file = data.portfolioSampleFile[0];
      const base64Image = await fileToBase64(file);

      const input: GetDesignSuggestionsInput = {
        portfolioSamples: base64Image,
        designPreferences: data.designPreferences,
      };
      const result = await getDesignSuggestions(input);
      setSuggestions(result);
      toast({
        title: "Suggestions Generated!",
        description: "Design suggestions have been successfully generated.",
      });
      reset(); // Reset form fields after successful submission
    } catch (error) {
      console.error('Error generating design suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to generate design suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Design Suggestion Tool</CardTitle>
        <CardDescription>Upload a portfolio sample and describe your preferences to get AI-powered design suggestions.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="portfolioSampleFile">Portfolio Sample Image</Label>
            <Input
              id="portfolioSampleFile"
              type="file"
              {...register('portfolioSampleFile')}
              className="mt-1"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
            />
            {errors.portfolioSampleFile && <p className="text-sm text-destructive mt-1">{errors.portfolioSampleFile.message}</p>}
          </div>
          <div>
            <Label htmlFor="designPreferences">Design Preferences</Label>
            <Textarea
              id="designPreferences"
              {...register('designPreferences')}
              placeholder="e.g., Modern, minimalist, dark theme, focus on typography..."
              className="mt-1"
            />
            {errors.designPreferences && <p className="text-sm text-destructive mt-1">{errors.designPreferences.message}</p>}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Get Suggestions
          </Button>
        </form>

        {suggestions && (
          <div className="mt-8 p-6 border rounded-md bg-muted/50">
            <h3 className="text-xl font-semibold mb-4 text-primary">Generated Suggestions:</h3>
            <p className="text-muted-foreground whitespace-pre-line">{suggestions.suggestions}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
