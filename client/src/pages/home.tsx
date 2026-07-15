import { ArrowRight, Check, MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/layout";
import { SEO, breadcrumbSchema, organizationSchema } from "@/components/seo";
import { useWPHomepage, useWPTestimonials } from "@/lib/wordpress";
import "./home.css";

const fallbackStats = [
  { value: "400+", label: "engagements completed" },
  { value: "$1.5B", label: "enterprise value unlocked" },
  { value: "98%", label: "client retention rate" },
  { value: "75%", label: "average reduction in fees" },
];

const capabilities = [
  {
    number: "01",
    title: "Enterprise transformation",
    copy: "Turn strategic priorities into an operating model with clear ownership, systems, and measurable value creation.",
    href: "/capabilities",
    signal: "Strategy / execution",
  },
  {
    number: "02",
    title: "AI & HardTech implementation",
    copy: "Deploy governed AI across manufacturing, engineering, CAD, photonics, and frontline workflows.",
    href: "/services/ai-hardtech",
    signal: "Workflow / control / ROI",
  },
  {
    number: "03",
    title: "M&A and value creation",
    copy: "Connect diligence, integration, and operational improvement to the value thesis behind the transaction.",
    href: "/ma-advisory",
    signal: "Thesis / integration",
  },
  {
    number: "04",
    title: "Governance and risk",
    copy: "Build decision rights, reporting, and control systems that let teams move faster without losing accountability.",
    href: "/governance-risk",
    signal: "Decisions / assurance",
  },
];

const process = [
  { phase: "01", time: "Weeks 1–4", title: "Diagnose", copy: "Establish the baseline, isolate the constraint, and name the accountable owner." },
  { phase: "02", time: "Weeks 5–8", title: "Architect", copy: "Design the operating model, decision rights, economics, and implementation path." },
  { phase: "03", time: "Weeks 9–24", title: "Implement", copy: "Deploy the workflow, connect the systems, and measure what changed in production." },
  { phase: "04", time: "Handover", title: "Govern", copy: "Transfer ownership with controls, dashboards, training, and a repeatable scale model." },
];

const aiDeltas = [
  { label: "Machined component", before: 100, after: 65, delta: "−35%" },
  { label: "Molded enclosure", before: 100, after: 64, delta: "−36%" },
  { label: "Mechatronic assembly", before: 100, after: 69, delta: "−31%" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="ph-label"><span />{children}</p>;
}

export default function Home() {
  const { data: wpHome } = useWPHomepage();
  const { data: testimonials = [] } = useWPTestimonials();
  const hero = wpHome?.hero;
  const stats = wpHome?.stats?.length
    ? wpHome.stats.slice(0, 4).map((item) => ({ value: `${item.value}${item.suffix}`, label: item.label }))
    : fallbackStats;

  return (
    <PageLayout>
      <SEO
        title="Aryo Consulting Group | Strategy, AI Implementation & Enterprise Transformation"
        description="Aryo turns strategic priorities into governed operating systems, AI implementations, and measurable enterprise value."
        canonical="https://aryocg.com/"
        jsonLd={[organizationSchema(), breadcrumbSchema([{ name: "Home", url: "https://aryocg.com" }])]}
      />

      <div className="precision-home">
        <section className="ph-hero">
          <div className="ph-shell ph-hero-grid">
            <div className="ph-hero-copy">
              <SectionLabel>{hero?.subheadline || "RESULTS-DRIVEN CONSULTING"}</SectionLabel>
              <h1>{hero?.headline || <>Strategy that becomes an <em>operating system.</em></>}</h1>
              <p>{hero?.description || "Aryo helps leaders translate strategic priorities into governed execution, AI-enabled workflows, and measurable enterprise value."}</p>
              <div className="ph-hero-actions">
                <Link href="/contact">Request a briefing <ArrowRight size={15} /></Link>
                <Link href="/services/ai-hardtech">Explore AI implementation <MoveUpRight size={15} /></Link>
              </div>
              <div className="ph-hero-proof">
                <span>FIXED TIMELINE</span><span>ACCOUNTABLE OWNERS</span><span>MEASURED HANDOVER</span>
              </div>
            </div>

            <div className="ph-system" aria-label="Aryo value creation operating system">
              <header><span>ARYO VALUE CREATION SYSTEM</span><small>01 / 04</small></header>
              <div className="ph-system-core">
                <small>OPERATING PRIORITY</small>
                <strong>Move the decision, not just the metric.</strong>
                <i />
              </div>
              {["Strategic architecture", "Systems and workflow", "Governance and value"].map((item, index) => (
                <div className="ph-system-row" key={item}>
                  <span>0{index + 1}</span><b>{item}</b><small>{index === 0 ? "FRAME" : index === 1 ? "BUILD" : "SCALE"}</small>
                </div>
              ))}
              <footer><span>CONTROLLED EXECUTION</span><b>Outcome → owner → evidence</b></footer>
            </div>
          </div>
        </section>

        <section className="ph-stats" aria-label="Engagement indicators">
          <div className="ph-shell">
            {stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        </section>

        <section className="ph-section ph-capabilities">
          <div className="ph-shell">
            <div className="ph-heading">
              <div><SectionLabel>WHERE WE CREATE VALUE</SectionLabel><h2>Integrated advisory.<br />Built for implementation.</h2></div>
              <p>Most transformations fail in the handoff between recommendation and execution. Aryo stays through the operating decision, the deployed system, and the measurable result.</p>
            </div>
            <div className="ph-cap-grid">
              {capabilities.map((capability) => (
                <Link href={capability.href} className="ph-cap-card" key={capability.number}>
                  <div><span>{capability.number}</span><small>{capability.signal}</small></div>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                  <strong>Explore capability <ArrowRight size={15} /></strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="ph-section ph-ai">
          <div className="ph-shell ph-ai-grid">
            <div className="ph-ai-copy">
              <SectionLabel>AI IMPLEMENTATION / HARDTECH</SectionLabel>
              <h2>Make the implementation delta visible.</h2>
              <p>We start with a real product family, line, or engineering workflow. Then we baseline effort, connect the toolchain, define the controls, and prove the economics before scaling.</p>
              <ul>
                <li><Check size={14} /> Manufacturing-floor workflows</li>
                <li><Check size={14} /> CAD and engineering automation</li>
                <li><Check size={14} /> Photonics design-to-test systems</li>
              </ul>
              <Link href="/services/manufacturing-ai">See manufacturing AI implementation <ArrowRight size={15} /></Link>
            </div>
            <div className="ph-delta-card">
              <header><span>MODELED ENGINEERING EFFORT</span><small>ILLUSTRATIVE / BASELINE = 100</small></header>
              {aiDeltas.map((item) => (
                <article key={item.label}>
                  <div><h3>{item.label}</h3><strong>{item.delta}</strong></div>
                  <i><b style={{ width: `${item.before}%` }} /></i>
                  <i className="enabled"><b style={{ width: `${item.after}%` }} /></i>
                  <footer><span>Conventional</span><span>AI-enabled</span></footer>
                </article>
              ))}
              <p>Illustrative hypothesis. Client baselines replace these assumptions during the diagnostic.</p>
            </div>
          </div>
        </section>

        <section className="ph-section ph-process">
          <div className="ph-shell">
            <div className="ph-heading">
              <div><SectionLabel>THE ENGAGEMENT MODEL</SectionLabel><h2>Predictable transformation.</h2></div>
              <p>A fixed-timeline engagement with defined gates, visible economics, and an accountable handover.</p>
            </div>
            <ol>
              {process.map((step) => (
                <li key={step.phase}>
                  <div><span>{step.phase}</span><small>{step.time}</small></div>
                  <h3>{step.title}</h3><p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {testimonials.length > 0 && (
          <section className="ph-section ph-trust">
            <div className="ph-shell">
              <SectionLabel>CLIENT PERSPECTIVE</SectionLabel>
              <blockquote>“{testimonials[0].quote}”</blockquote>
              <p>{testimonials[0].author}<span>{testimonials[0].title}</span></p>
            </div>
          </section>
        )}

        <section className="ph-section ph-cta">
          <div className="ph-shell">
            <div><SectionLabel>BEGIN THE CONVERSATION</SectionLabel><h2>Bring the priority that cannot remain a slide deck.</h2></div>
            <aside><p>We will help define the baseline, accountable owner, implementation path, and first measurable decision gate.</p><Link href="/contact">Request a confidential briefing <ArrowRight size={15} /></Link></aside>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
