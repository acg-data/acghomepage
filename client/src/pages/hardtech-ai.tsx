import { ArrowRight, MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { Footer, Navbar } from "@/components/layout";
import { SEO } from "@/components/seo";
import "./hardtech-ai.css";

export type HardtechServiceKey = "manufacturing" | "cad" | "photonics";

type Service = {
  key: HardtechServiceKey;
  eyebrow: string;
  title: string;
  highlight: string;
  lede: string;
  promise: string;
  system: string[];
  outcomes: string[];
  workflows: Array<{ label: string; title: string; copy: string; metric: string }>;
  evolution: Array<{ stage: string; title: string; copy: string }>;
  benchmarkHorizon?: { value: string; label: string; copy: string };
  builds: Array<{ name: string; examples: string; conventional: number; enabled: number }>;
  phases: Array<{ time: string; title: string; copy: string }>;
  signals: Array<{ value: string; label: string; source: string; href: string }>;
};

const services: Record<HardtechServiceKey, Service> = {
  manufacturing: {
    key: "manufacturing",
    eyebrow: "AI IMPLEMENTATION FOR MANUFACTURING",
    title: "Put AI to work on the",
    highlight: "manufacturing floor.",
    lede: "Aryo helps manufacturing and HardTech leaders identify, implement, and scale AI across engineering, operations, and the frontline—without losing control of quality, safety, or the process.",
    promise: "One line. One problem. One KPI. Prove the workflow in production, then scale the operating model.",
    system: ["Frontline workflow", "MES · QMS · CMMS · ERP", "Governance · security · ROI"],
    outcomes: ["Lower scrap", "Less downtime", "Faster changeovers", "More throughput"],
    workflows: [
      { label: "QUALITY", title: "Inspection and root cause", copy: "Detect defects earlier, connect failure patterns to process conditions, and route exceptions to the accountable owner.", metric: "Scrap / FPY / CoPQ" },
      { label: "RELIABILITY", title: "Predictive maintenance", copy: "Turn machine signals, work orders, and technician knowledge into risk-based maintenance decisions.", metric: "Downtime / MTBF / MTTR" },
      { label: "OPERATIONS", title: "Scheduling and throughput", copy: "Surface constraints, sequence work intelligently, and give planners explainable options around the real line.", metric: "OEE / Cycle time / OTIF" },
      { label: "FRONTLINE", title: "Operator knowledge systems", copy: "Put SOPs, troubleshooting history, and governed expert guidance at the point of work.", metric: "Training / Resolution time" },
    ],
    evolution: [
      { stage: "PAST", title: "Isolated prediction", copy: "Point solutions forecast a failure or classify an image, but sit outside the operating decision." },
      { stage: "PRESENT", title: "Connected assistance", copy: "AI reads plant context, proposes the next action, and routes exceptions through existing systems and owners." },
      { stage: "FUTURE", title: "Governed closed loops", copy: "Validated agents coordinate planning, quality, maintenance, and engineering inside explicit control limits." },
    ],
    builds: [
      { name: "Machined component", examples: "Bracket / fixture / manifold", conventional: 52, enabled: 34 },
      { name: "Molded enclosure", examples: "Housing / cover / handheld product", conventional: 168, enabled: 108 },
      { name: "Mechatronic assembly", examples: "Actuator / sensor module / end effector", conventional: 520, enabled: 361 },
      { name: "Configured industrial machine", examples: "Workcell / line module / capital equipment", conventional: 1440, enabled: 1015 },
    ],
    phases: [
      { time: "WEEKS 1–3", title: "Diagnostic and opportunity map", copy: "Map value streams, systems, data quality, decision rights, and frontline pain points." },
      { time: "WEEKS 4–8", title: "Pilot and business case", copy: "Deploy one workflow on a real line or part family with a baseline and named KPI owner." },
      { time: "WEEKS 9–16", title: "Integration and scale", copy: "Connect MES, ERP, QMS, CMMS, PLM, and the people who operate the process." },
      { time: "ONGOING", title: "Governance and handover", copy: "Establish controls, monitoring, ownership, training, and a repeatable rollout model." },
    ],
    signals: [
      { value: "30 → 5 min", label: "ML retraining and deployment", source: "Siemens / AWS", href: "https://aws.amazon.com/partners/success/siemens-electronics-factory-erlangen-siemens/" },
      { value: "8 → 1", label: "parts in an observed GM redesign", source: "Autodesk", href: "https://www.autodesk.com/design-make/articles/automotive-design" },
      { value: "2 days → 1 hr", label: "illustrative NASA design cycle", source: "NASA", href: "https://science.nasa.gov/wp-content/uploads/2024/03/evolved-structures-ryan-mcclelland.pdf" },
    ],
  },
  cad: {
    key: "cad",
    eyebrow: "AI IMPLEMENTATION FOR ENGINEERING",
    title: "Turn AI-assisted CAD into",
    highlight: "an engineering capability.",
    lede: "Aryo helps product and manufacturing teams redesign the work around CAD copilots, generative design, simulation automation, and engineering knowledge systems.",
    promise: "Faster design cycles without weakening technical authority, release discipline, or manufacturability.",
    system: ["Requirements + knowledge", "CAD + simulation", "PLM + release controls"],
    outcomes: ["Design velocity", "First-pass quality", "Engineering reuse", "Controlled release"],
    workflows: [
      { label: "INTENT", title: "Requirements intelligence", copy: "Structure customer requirements, standards, prior decisions, and constraints before geometry begins.", metric: "Review hours / Misses" },
      { label: "DESIGN", title: "CAD generation and reuse", copy: "Assist feature creation, part-family configuration, drawing updates, and retrieval of proven design intent.", metric: "Modeling hours / Reuse" },
      { label: "VALIDATE", title: "Simulation and DFM loops", copy: "Automate setup, explore variants, and surface manufacturability risks while change is inexpensive.", metric: "Iterations / Late rework" },
      { label: "RELEASE", title: "Change control", copy: "Generate controlled documentation, trace impact, and preserve accountable engineering approval in PLM.", metric: "ECO time / Defects" },
    ],
    evolution: [
      { stage: "PAST", title: "Geometry generation", copy: "Research systems proved that models could emit sketches, meshes, and basic CAD command sequences." },
      { stage: "PRESENT", title: "Executable, editable programs", copy: "New benchmarks test whether models recover parametric intent—not merely a convincing rendered shape." },
      { stage: "FUTURE", title: "The full engineering loop", copy: "The frontier expands from CAD into CAE, CAM, drawings, tolerances, release artifacts, and physical validation." },
    ],
    benchmarkHorizon: {
      value: "18–24",
      label: "MONTH PLANNING WINDOW",
      copy: "Use this as an Aryo operating assumption—not a universal benchmark law. Today’s capability gap is a window to redesign workflows, controls, and data before the tools mature.",
    },
    builds: [
      { name: "Parametric part family", examples: "Brackets / manifolds / housings", conventional: 80, enabled: 49 },
      { name: "Tooling and fixture package", examples: "Jigs / gauges / end effectors", conventional: 240, enabled: 154 },
      { name: "Mechatronic assembly", examples: "Actuators / modules / subsystems", conventional: 620, enabled: 438 },
    ],
    phases: [
      { time: "WEEKS 1–3", title: "Engineering workflow diagnostic", copy: "Map design work, rework, standards, systems, data rights, and decision gates." },
      { time: "WEEKS 4–8", title: "Controlled copilot pilot", copy: "Deploy against a bounded CAD workflow using real inputs and approved references." },
      { time: "WEEKS 9–16", title: "PLM and toolchain integration", copy: "Connect CAD, simulation, PDM/PLM, requirements, and release controls." },
      { time: "ONGOING", title: "Scale and governance", copy: "Expand with evaluation suites, model controls, training, and named technical ownership." },
    ],
    signals: [
      { value: "18K", label: "multimodal evaluation samples", source: "CADBench", href: "https://arxiv.org/abs/2605.10873" },
      { value: "17.9K", label: "execution-verified CAD programs", source: "BenchCAD", href: "https://arxiv.org/abs/2605.10865" },
      { value: "70", label: "tasks in an exploratory agent benchmark", source: "CAD-Bench · live data limited", href: "https://evals-for-ai-cads.vercel.app/" },
    ],
  },
  photonics: {
    key: "photonics",
    eyebrow: "AI + AUTOMATION FOR PHOTONICS",
    title: "Move photonics from simulation to",
    highlight: "automated execution.",
    lede: "Aryo helps photonics and optical-system teams connect inverse design, simulation, lab automation, test data, and manufacturing controls into one governed workflow.",
    promise: "More design exploration, faster validation, and a cleaner path from optical intent to repeatable production.",
    system: ["Optical targets + constraints", "Inverse design + simulation", "Lab + production feedback"],
    outcomes: ["Design-space coverage", "Simulation throughput", "Test automation", "Yield learning"],
    workflows: [
      { label: "TARGET", title: "Target-to-geometry workflows", copy: "Translate optical performance, fabrication rules, and tolerance limits into machine-readable objectives.", metric: "Concept cycles / Target" },
      { label: "EXPLORE", title: "Inverse design orchestration", copy: "Coordinate optimization, surrogate models, FDTD/FEM solvers, and compute across viable designs.", metric: "Iterations / Compute" },
      { label: "TEST", title: "Automated lab and test", copy: "Link instruments, scripts, experiment plans, and analysis into traceable closed-loop validation.", metric: "Hands-on time / Coverage" },
      { label: "LEARN", title: "Design-to-yield learning", copy: "Connect measured performance and process variation back to design rules and next-run decisions.", metric: "Yield / Root-cause time" },
    ],
    evolution: [
      { stage: "PAST", title: "Inverse-design studies", copy: "Optimization produced promising geometries, while simulation, lab work, and fabrication remained separate loops." },
      { stage: "PRESENT", title: "Orchestrated toolchains", copy: "AI and automation connect targets, solvers, instruments, analysis, and experiment records around a bounded device." },
      { stage: "FUTURE", title: "Design-to-fab learning", copy: "Measured performance and process variation continuously inform the next design and manufacturing decision." },
    ],
    builds: [
      { name: "Passive photonic component", examples: "Coupler / splitter / filter", conventional: 180, enabled: 111 },
      { name: "PIC building-block library", examples: "Cells / models / design rules", conventional: 520, enabled: 344 },
      { name: "Automated optical test cell", examples: "Instruments / motion / analytics", conventional: 880, enabled: 590 },
    ],
    phases: [
      { time: "WEEKS 1–3", title: "Design-to-test diagnostic", copy: "Map solvers, experiment handoffs, instrumentation, data lineage, and failure loops." },
      { time: "WEEKS 4–8", title: "Closed-loop pilot", copy: "Automate one device or test family against a defined optical target and baseline." },
      { time: "WEEKS 9–16", title: "Toolchain integration", copy: "Connect design environments, compute, lab control, result stores, and manufacturing." },
      { time: "ONGOING", title: "Platform and operating model", copy: "Scale reusable modules with evaluation, change control, access, and monitoring." },
    ],
    signals: [
      { value: "12", label: "iterations to an optimum in a 2026 RL study", source: "Scientific Reports", href: "https://www.nature.com/articles/s41598-026-52039-z" },
      { value: "<2%", label: "spectral-emissivity error in a fabricated study", source: "npj Computational Materials", href: "https://www.nature.com/articles/s41524-025-01518-4" },
      { value: "400M", label: "trainable parameters per mm² demonstrated", source: "Nature Communications", href: "https://www.nature.com/articles/s41467-026-68648-1" },
    ],
  },
};

function useFocusedLandingChrome() {
  useEffect(() => {
    const style = document.createElement("style");
    style.dataset.aryoFocusedRoute = "true";
    style.textContent = "#tooldesk-widget-container{display:none!important}";
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
}

export function AIHardtechHub() {
  useFocusedLandingChrome();
  return (
    <div className="hai-page hai-hub">
      <SEO title="AI & HardTech Implementation | Aryo Consulting Group" description="AI implementation services for manufacturing, CAD engineering, and photonics automation." canonical="https://aryocg.com/services/ai-hardtech" />
      <Navbar />
      <main>
        <section className="hai-hub-hero"><div className="hai-shell"><p className="hai-eyebrow"><span /> AI & HARDTECH IMPLEMENTATION</p><h1>Build the operating capability <em>behind the AI.</em></h1><p>Aryo connects technical workflows, production systems, governance, and measurable economics across manufacturing and engineering.</p></div></section>
        <section className="hai-service-index hai-shell">
          {(Object.values(services) as Service[]).map((service, index) => <Link href={`/services/${service.key === "manufacturing" ? "manufacturing-ai" : service.key === "cad" ? "cad-ai" : "photonics-automation"}`} key={service.key}><div><span>0{index+1}</span><small>{service.eyebrow}</small></div><h2>{service.title} <em>{service.highlight}</em></h2><p>{service.lede}</p><strong>Explore the service <ArrowRight size={15} /></strong></Link>)}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function HardtechServicePage({ serviceKey }: { serviceKey: HardtechServiceKey }) {
  useFocusedLandingChrome();
  const service = services[serviceKey];
  const canonicalSlug = serviceKey === "manufacturing" ? "manufacturing-ai" : serviceKey === "cad" ? "cad-ai" : "photonics-automation";
  return (
    <div className={`hai-page hai-${service.key}`}>
      <SEO title={`${service.highlight.replace(".", "")} | Aryo Consulting Group`} description={service.lede} canonical={`https://aryocg.com/services/${canonicalSlug}`} />
      <Navbar />
      <main>
        <section className="hai-hero">
          <div className="hai-grid" />
          <div className="hai-shell hai-hero-layout">
            <div className="hai-hero-copy"><p className="hai-eyebrow"><span /> {service.eyebrow}</p><h1>{service.title} <em>{service.highlight}</em></h1><p>{service.lede}</p><strong>{service.promise}</strong><div className="hai-actions"><Link href="/contact">Scope the first pilot <ArrowRight size={14} /></Link><a href="#delta">See the modeled delta <ArrowRight size={14} /></a></div></div>
            <div className="hai-system"><div className="hai-system-head"><span>ARYO IMPLEMENTATION SYSTEM</span><small>WORKFLOW / CONTROL / VALUE</small></div><div className="hai-system-core"><small>START WITH A BOUNDED SYSTEM</small><strong>{service.promise}</strong></div>{service.system.map((layer,index)=><div className="hai-layer" key={layer}><span>0{index+1}</span><b>{layer}</b><i>{index===2?"GOVERN":"CONNECT"}</i></div>)}</div>
          </div>
          <div className="hai-shell hai-outcomes">{service.outcomes.map((outcome,index)=><div key={outcome}><span>0{index+1}</span><b>{outcome}</b></div>)}</div>
        </section>

        <section className="hai-section hai-workflows"><div className="hai-shell"><div className="hai-heading"><div><p className="hai-eyebrow"><span /> WHERE AI EARNS ITS KEEP</p><h2>Redesign the workflow, not just the task.</h2></div><p>We prioritize decisions that repeat, have usable evidence, and can be measured by an accountable technical or operating owner.</p></div><div className="hai-workflow-list">{service.workflows.map((item,index)=><article key={item.title}><span>0{index+1}</span><div><small>{item.label}</small><h3>{item.title}</h3></div><p>{item.copy}</p><div><small>MEASURE</small><b>{item.metric}</b></div></article>)}</div></div></section>

        <section className="hai-section hai-evolution"><div className="hai-shell"><div className="hai-heading"><div><p className="hai-eyebrow"><span /> PAST / PRESENT / FUTURE</p><h2>Adoption is moving from tools to operating systems.</h2></div><p>Benchmark progress shows what is becoming technically possible. Implementation determines whether that capability becomes safe, repeatable enterprise value.</p></div><div className="hai-evolution-grid">{service.evolution.map((item,index)=><article key={item.stage}><header><span>0{index+1}</span><small>{item.stage}</small></header><h3>{item.title}</h3><p>{item.copy}</p><i /></article>)}{service.benchmarkHorizon && <aside><span>{service.benchmarkHorizon.label}</span><strong>{service.benchmarkHorizon.value}</strong><p>{service.benchmarkHorizon.copy}</p></aside>}</div></div></section>

        <section className="hai-section hai-delta" id="delta"><div className="hai-shell"><div className="hai-heading"><div><p className="hai-eyebrow"><span /> CONVENTIONAL VS. AI-ENABLED</p><h2>Make the operating hypothesis visible.</h2></div><p>Illustrative person-hours for a bounded engineering workflow. Aryo replaces these assumptions with client baselines during the diagnostic.</p></div><div className="hai-delta-model"><header><span>PRODUCT / SYSTEM TYPE</span><span>RELATIVE ENGINEERING EFFORT</span><span>DELTA</span></header>{service.builds.map((build,index)=>{const retained=Math.round(build.enabled/build.conventional*100);return <article key={build.name}><div><span>0{index+1}</span><div><h3>{build.name}</h3><p>{build.examples}</p></div></div><div className="hai-bars"><i><span>Conventional</span><b>{build.conventional.toLocaleString()} hrs</b></i><i style={{width:`${retained}%`}}><span>AI-enabled</span><b>{build.enabled.toLocaleString()} hrs</b></i></div><strong>−{100-retained}%</strong></article>})}<footer><b>CONTROL POINT</b><p>AI accelerates generation and analysis. Qualified people retain technical approval, validation responsibility, and release authority.</p></footer></div></div></section>

        <section className="hai-section hai-implementation"><div className="hai-shell"><div className="hai-heading"><div><p className="hai-eyebrow"><span /> THE ARYO ENGAGEMENT</p><h2>From use case to governed capability.</h2></div><p>A fixed-timeline model establishes the baseline, proves the workflow, connects the stack, and transfers the operating model.</p></div><ol>{service.phases.map((phase,index)=><li key={phase.title}><div><span>0{index+1}</span><small>{phase.time}</small></div><h3>{phase.title}</h3><p>{phase.copy}</p></li>)}</ol></div></section>

        <section className="hai-signals"><div className="hai-shell"><div><p className="hai-eyebrow"><span /> EXTERNAL SIGNALS</p><h2>Capability is moving quickly. Production discipline matters more.</h2></div><div>{service.signals.map(signal=><a href={signal.href} target="_blank" rel="noreferrer" key={signal.source}><strong>{signal.value}</strong><span>{signal.label}</span><small>{signal.source} <MoveUpRight size={12} /></small></a>)}</div></div></section>

        <section className="hai-section hai-cta"><div className="hai-shell"><div><p className="hai-eyebrow"><span /> BEGIN WITH A REAL WORKFLOW</p><h2>Define what the first implementation must prove.</h2><p>Bring one product family, device class, line, or automation loop. Aryo will frame the baseline, systems, controls, pilot scope, and measurable decision gate.</p></div><aside><span>60-MINUTE WORKING SESSION</span><h3>Implementation Readiness Briefing</h3><ul><li>Current workflow and constraint</li><li>Data, tools, and integration path</li><li>Technical and operational controls</li><li>Pilot economics and next decision</li></ul><Link href="/contact">Request the briefing <ArrowRight size={14} /></Link></aside></div></section>
      </main>
      <Footer />
    </div>
  );
}

export function ManufacturingAIPage() {
  return <HardtechServicePage serviceKey="manufacturing" />;
}

export function CadAIPage() {
  return <HardtechServicePage serviceKey="cad" />;
}

export function PhotonicsAutomationPage() {
  return <HardtechServicePage serviceKey="photonics" />;
}
