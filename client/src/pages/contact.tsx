import { Link } from 'wouter';
import { useState } from 'react';
import { ArrowRight, ChevronRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageLayout } from '@/components/layout';
import { SEO, breadcrumbSchema, webPageSchema } from '@/components/seo';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().min(1, 'Company is required'),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  message: z.string().min(10, 'Please provide more details'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const offices = [
  {
    city: "Boston",
    type: "Global Headquarters",
    address: "One Financial Center, Suite 2500",
    addressLine2: "Boston, MA 02111",
    phone: "+1 (617) 555-0100",
    email: "boston@aryoconsulting.com"
  },
  {
    city: "New York",
    type: "East Coast Hub",
    address: "1 World Trade Center, Floor 85",
    addressLine2: "New York, NY 10007",
    phone: "+1 (212) 555-0100",
    email: "newyork@aryoconsulting.com"
  }
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const seoContent = (
    <SEO 
      title="Contact Us | Aryo Consulting Group"
      description="Get in touch with Aryo Consulting Group. Contact our Boston headquarters or New York office to discuss how we can help transform your business."
      canonical="https://aryocg.com/contact"
      jsonLd={[
        webPageSchema({ name: "Contact Aryo Consulting Group", description: "Get in touch with our Boston headquarters or New York office.", url: "https://aryocg.com/contact", type: "ContactPage" }),
        breadcrumbSchema([
          { name: "Home", url: "https://aryocg.com" },
          { name: "Contact", url: "https://aryocg.com/contact" },
        ]),
      ]}
    />
  );

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      inquiryType: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const nameParts = data.name.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';
      
      return apiRequest('POST', '/api/contact', {
        firstName,
        lastName,
        email: data.email,
        company: data.company,
        message: data.message,
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Message sent",
        description: "We'll be in touch within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <PageLayout>
      {seoContent}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Link href="/" className="hover:text-aryo-deepBlue">Home</Link>
          <ChevronRight size={14} />
          <span className="text-aryo-deepBlue">Contact</span>
        </div>

        <div className="mb-16">
          <span className="text-xs font-bold text-aryo-greenTeal uppercase tracking-widest">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-serif text-aryo-deepBlue mt-4 mb-6">Contact Us</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Ready to discuss how we can help? Our partners respond to every inquiry within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white border border-aryo-lightGrey p-12 text-center">
                <div className="w-16 h-16 bg-aryo-greenTeal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="text-aryo-greenTeal" size={32} />
                </div>
                <h2 className="text-2xl font-serif text-aryo-deepBlue mb-4">Thank you for reaching out</h2>
                <p className="text-slate-600 mb-8">
                  We've received your message and a partner will be in touch within 24 hours to discuss your needs.
                </p>
                <Link href="/" className="inline-flex items-center gap-2 text-aryo-deepBlue hover:text-aryo-teal transition-colors">
                  Return to Home <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="bg-white border border-aryo-lightGrey p-8 lg:p-10">
                <h2 className="text-2xl font-serif text-aryo-deepBlue mb-8">Send us a message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest">Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@company.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest">Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company" {...field} data-testid="input-company" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest">Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest">Inquiry Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-inquiry-type">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="consulting">Consulting Engagement</SelectItem>
                              <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                              <SelectItem value="careers">Career Inquiry</SelectItem>
                              <SelectItem value="media">Media / Press</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-aryo-deepBlue uppercase tracking-widest">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your situation and how we might help..." 
                              className="min-h-[150px]"
                              {...field} 
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={mutation.isPending}
                      className="w-full bg-aryo-deepBlue hover:bg-[#1a3668] text-white py-6 text-xs font-bold uppercase tracking-widest"
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? 'Sending...' : 'Send Message'}
                      {!mutation.isPending && <ArrowRight size={14} className="ml-2" />}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {offices.map((office, i) => (
              <div key={i} className="bg-white border border-aryo-lightGrey p-6" data-testid={`card-office-${i}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-aryo-deepBlue flex items-center justify-center">
                    <MapPin className="text-white" size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-aryo-deepBlue">{office.city}</h3>
                    <p className="text-xs text-aryo-teal">{office.type}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>{office.address}<br />{office.addressLine2}</p>
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-aryo-lightGrey" />
                    {office.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={14} className="text-aryo-lightGrey" />
                    {office.email}
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-aryo-deepBlue p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-aryo-greenTeal" size={20} />
                <h3 className="font-serif font-bold">Response Time</h3>
              </div>
              <p className="text-aryo-lightBlue/80 text-sm">
                A partner will personally respond to your inquiry within 24 hours. For urgent matters, 
                please call our Boston headquarters directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
