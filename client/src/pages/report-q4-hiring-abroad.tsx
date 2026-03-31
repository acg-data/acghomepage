import { Link } from 'wouter';
import { useState } from 'react';
import { ChevronRight, Globe, Users, DollarSign, Briefcase, CheckCircle } from 'lucide-react';
import { RelatedPages } from '@/components/related-pages';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PageLayout } from '@/components/layout';
import { SEO, breadcrumbSchema, webPageSchema } from '@/components/seo';

const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const reportHighlights = [
  {
    icon: Globe,
    title: "Global Market Analysis",
    description: "Comprehensive coverage of talent markets across Asia, Africa, Europe, and Latin America"
  },
  {
    icon: DollarSign,
    title: "Compensation Benchmarks",
    description: "Detailed salary data by expertise level and geographic region"
  },
  {
    icon: Users,
    title: "Hiring Platforms",
    description: "Curated list of top platforms for finding and hiring international talent"
  },
  {
    icon: Briefcase,
    title: "Payment Solutions",
    description: "Best practices and platforms for paying global contractors and employees"
  }
];

export default function ReportQ4HiringAbroad() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const seoContent = (
    <SEO 
      title="Q4 Hiring Abroad Report | Aryo Consulting Group"
      description="Download our guide to global talent, costs, and collaboration. Build effective international teams with insights from Aryo Consulting Group."
      canonical="https://aryocg.com/reports/q4-hiring-abroad"
      jsonLd={[
        webPageSchema({ name: "Q4 Hiring Abroad Report", description: "Download our guide to global talent, costs, and collaboration.", url: "https://aryocg.com/reports/q4-hiring-abroad" }),
        breadcrumbSchema([
          { name: "Home", url: "https://aryocg.com" },
          { name: "Q4 Hiring Abroad Report", url: "https://aryocg.com/reports/q4-hiring-abroad" },
        ]),
      ]}
    />
  );

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      return apiRequest('POST', '/api/reports/q4-hiring-abroad/signup', data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Report sent",
        description: "Check your email for the report.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SignupFormData) => {
    mutation.mutate(data);
  };

  return (
    <PageLayout>
      {seoContent}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">Q4 Hiring Abroad Report</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Free Report</span>
            <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6">
              Outsourcing Smartly
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              An American Business's Guide to Global Talent, Costs, and Collaboration
            </p>
            <p className="text-slate-600 mb-8">
              In an era defined by globalization and technological advancement, the art of outsourcing 
              has evolved beyond a mere cost-cutting strategy. This comprehensive guide helps American 
              businesses navigate the complexities of international hiring, offering in-depth analysis 
              of how to harness the global workforce effectively.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {reportHighlights.map((highlight, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-aryo-teal/10 rounded-md flex items-center justify-center">
                    <highlight.icon className="w-5 h-5 text-aryo-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-aryo-deepBlue mb-1">{highlight.title}</h3>
                    <p className="text-sm text-slate-500">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-aryo-offWhite rounded-md p-6 border border-aryo-lightGrey">
              <p className="text-sm text-slate-600">
                <strong className="text-aryo-deepBlue">What's included:</strong> 35+ pages of research, 
                compensation data across 15+ countries, hiring platform comparisons, and actionable 
                strategies for building high-performing global teams.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            {submitted ? (
              <div className="bg-white border border-aryo-lightGrey rounded-md p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-serif text-aryo-deepBlue mb-4">Check Your Email</h2>
                <p className="text-slate-600 mb-6">
                  We've sent the Q4 Hiring Abroad Report to your inbox. If you don't see it within 
                  a few minutes, please check your spam folder.
                </p>
                <Link href="/" className="text-aryo-teal hover:text-aryo-deepBlue font-medium">
                  Return to Home
                </Link>
              </div>
            ) : (
              <div className="bg-white border border-aryo-lightGrey rounded-md p-8">
                <h2 className="text-2xl font-serif text-aryo-deepBlue mb-2">Get Your Free Report</h2>
                <p className="text-slate-500 mb-6">
                  Enter your details below and we'll send the report directly to your inbox.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} data-testid="input-first-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith" {...field} data-testid="input-last-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="john.smith@company.com" 
                              {...field} 
                              data-testid="input-email" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-aryo-deepBlue hover:bg-[#1a3668] text-white"
                      disabled={mutation.isPending}
                      data-testid="button-submit-report"
                    >
                      {mutation.isPending ? 'Sending...' : 'Send Me the Report'}
                    </Button>

                    <p className="text-xs text-slate-400 text-center">
                      By submitting, you agree to receive communications from Aryo Consulting Group. 
                      We respect your privacy and will never share your information.
                    </p>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <RelatedPages
          heading="Related Insights"
          pages={[
            { title: "Talent & Organization", description: "Leadership development, culture transformation, organization design, and talent strategy consulting.", href: "/talent-organization" },
            { title: "Insights & Blog", description: "Strategic insights and thought leadership on M&A, digital transformation, and corporate strategy.", href: "/insights" },
            { title: "About Us", description: "Meet our team, learn about our mission, and see how we share in our clients' outcomes.", href: "/about" },
          ]}
        />
      </div>
    </PageLayout>
  );
}
