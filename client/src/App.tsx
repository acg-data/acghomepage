import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Partner from "@/pages/partner";
import CaseStudies from "@/pages/case-studies";
import Blog from "@/pages/blog";
import About from "@/pages/about";
import Capabilities from "@/pages/capabilities";
import Industries from "@/pages/industries";
import Careers from "@/pages/careers";
import Contact from "@/pages/contact";
import ValuationTool from "@/pages/valuation-tool";
import AIConsultant from "@/pages/ai-consultant";
import NYC from "@/pages/nyc";
import Admin from "@/pages/admin";
import ReportQ4HiringAbroad from "@/pages/report-q4-hiring-abroad";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/nyc" component={NYC}/>
      <Route path="/about" component={About}/>
      <Route path="/capabilities" component={Capabilities}/>
      <Route path="/industries" component={Industries}/>
      <Route path="/insights" component={Blog}/>
      <Route path="/insights/:slug" component={Blog}/>
      <Route path="/case-studies" component={CaseStudies}/>
      <Route path="/case-studies/:slug" component={CaseStudies}/>
      <Route path="/careers" component={Careers}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/valuation-tool" component={ValuationTool}/>
      <Route path="/ai-consultant" component={AIConsultant}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/partner" component={Partner}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/reports/q4-hiring-abroad" component={ReportQ4HiringAbroad}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
