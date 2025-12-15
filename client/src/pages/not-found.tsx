import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Building2, Briefcase, Phone, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-8xl md:text-9xl font-bold text-deep-blue dark:text-teal">404</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or may have been moved. 
            Let us help you find what you need.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link href="/">
              <Button data-testid="link-home">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" data-testid="link-contact">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground mb-6">Or explore our main sections:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/about">
                <div className="p-4 rounded-md border border-border hover-elevate cursor-pointer" data-testid="link-about">
                  <Building2 className="w-6 h-6 mx-auto mb-2 text-deep-blue dark:text-teal" />
                  <span className="text-sm font-medium text-foreground">About Us</span>
                </div>
              </Link>
              <Link href="/capabilities">
                <div className="p-4 rounded-md border border-border hover-elevate cursor-pointer" data-testid="link-capabilities">
                  <Briefcase className="w-6 h-6 mx-auto mb-2 text-deep-blue dark:text-teal" />
                  <span className="text-sm font-medium text-foreground">Capabilities</span>
                </div>
              </Link>
              <Link href="/industries">
                <div className="p-4 rounded-md border border-border hover-elevate cursor-pointer" data-testid="link-industries">
                  <Building2 className="w-6 h-6 mx-auto mb-2 text-deep-blue dark:text-teal" />
                  <span className="text-sm font-medium text-foreground">Industries</span>
                </div>
              </Link>
              <Link href="/insights">
                <div className="p-4 rounded-md border border-border hover-elevate cursor-pointer" data-testid="link-insights">
                  <ArrowLeft className="w-6 h-6 mx-auto mb-2 text-deep-blue dark:text-teal rotate-[135deg]" />
                  <span className="text-sm font-medium text-foreground">Insights</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <p>Looking for something specific? <Link href="/contact" className="text-deep-blue dark:text-teal underline">Get in touch</Link> and we'll help you find it.</p>
          </div>
        </div>
      </div>

      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aryo Consulting Group. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
