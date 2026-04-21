import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { lazy, Suspense } from "react";
import Home from "@/pages/home";

const Login = lazy(() => import("@/pages/login"));
const Register = lazy(() => import("@/pages/register"));
const Partner = lazy(() => import("@/pages/partner"));
const CaseStudies = lazy(() => import("@/pages/case-studies"));
const Blog = lazy(() => import("@/pages/blog"));
const About = lazy(() => import("@/pages/about"));
const Capabilities = lazy(() => import("@/pages/capabilities"));
const Industries = lazy(() => import("@/pages/industries"));
const Careers = lazy(() => import("@/pages/careers"));
const Contact = lazy(() => import("@/pages/contact"));
const ValuationTool = lazy(() => import("@/pages/valuation-tool"));
const AIConsultant = lazy(() => import("@/pages/ai-consultant"));
const NYC = lazy(() => import("@/pages/nyc"));
const Admin = lazy(() => import("@/pages/admin"));
const ReportQ4HiringAbroad = lazy(() => import("@/pages/report-q4-hiring-abroad"));
const ValueCreation = lazy(() => import("@/pages/value-creation"));
const PitchDeck = lazy(() => import("@/pages/pitch-deck"));
const DigitalTransformation = lazy(() => import("@/pages/digital-transformation"));
const MAAdvisory = lazy(() => import("@/pages/ma-advisory"));
const GovernanceRisk = lazy(() => import("@/pages/governance-risk"));
const OperationalExcellence = lazy(() => import("@/pages/operational-excellence"));
const TalentOrganization = lazy(() => import("@/pages/talent-organization"));
const GrowthStrategy = lazy(() => import("@/pages/growth-strategy"));
const PitchDecks = lazy(() => import("@/pages/pitch-decks"));
const PEValuationTool = lazy(() => import("@/pages/pe-valuation-tool"));
const StablecoinCalculator = lazy(() => import("@/pages/stablecoin-calculator"));
const WebsiteAnalyzer = lazy(() => import("@/pages/tools/website-analyzer"));
const MarketResearchReports = lazy(() => import("@/pages/market-research-reports"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-aryo-offWhite flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-aryo-deepBlue border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
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
        <Route path="/value-creation" component={ValueCreation}/>
        <Route path="/pitch-deck" component={PitchDeck}/>
        <Route path="/digital-transformation" component={DigitalTransformation}/>
        <Route path="/ma-advisory" component={MAAdvisory}/>
        <Route path="/governance-risk" component={GovernanceRisk}/>
        <Route path="/operational-excellence" component={OperationalExcellence}/>
        <Route path="/talent-organization" component={TalentOrganization}/>
        <Route path="/growth-strategy" component={GrowthStrategy}/>
        <Route path="/pitch-decks" component={PitchDecks}/>
        <Route path="/tools/pe-valuation-tool" component={PEValuationTool}/>
        <Route path="/tools/stablecoin-calculator" component={StablecoinCalculator}/>
        <Route path="/tools/website-analyzer" component={WebsiteAnalyzer}/>
        <Route path="/market-research-reports" component={MarketResearchReports}/>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
