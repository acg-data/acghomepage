import { Link } from "wouter";
import { ArrowRight, Check, Grid3X3, MoveUpRight } from "lucide-react";
import { useEffect } from "react";
import "./brand-books.css";

type DirectionKey = "precision" | "authority" | "engineered";

type BrandDirection = {
  key: DirectionKey;
  number: string;
  name: string;
  descriptor: string;
  thesis: string;
  bestFor: string;
  keep: string[];
  clean: string[];
  colors: Array<{ name: string; hex: string; role: string }>;
  type: { display: string; body: string; rationale: string };
  voice: string[];
};

const directions: Record<DirectionKey, BrandDirection> = {
  precision: {
    key: "precision",
    number: "01",
    name: "Precision Advisory",
    descriptor: "The direct evolution",
    thesis: "An executive consulting system with sharper hierarchy, fewer containers, and evidence that leads the page.",
    bestFor: "The strongest all-purpose direction for the main Aryo site and enterprise consulting work.",
    keep: ["Aryo cobalt and teal", "Serif moments for authority", "Metrics and operating frameworks"],
    clean: ["One border weight", "Fewer cards and shadows", "Larger body copy and tighter sections"],
    colors: [
      { name: "Aryo Cobalt", hex: "#214D88", role: "Primary" },
      { name: "Signal Teal", hex: "#35B8B0", role: "Accent" },
      { name: "Executive Ink", hex: "#17324F", role: "Type" },
      { name: "Blueprint", hex: "#EAF1F6", role: "Surface" },
      { name: "White", hex: "#FFFFFF", role: "Canvas" },
    ],
    type: { display: "Inter / 600", body: "Inter / 400", rationale: "A single sans family makes complex material faster to scan; serif is reserved for large metrics and quotations." },
    voice: ["Specific before aspirational", "Outcome before methodology", "Short sentences. Named owners. Measured results."],
  },
  authority: {
    key: "authority",
    number: "02",
    name: "Quiet Authority",
    descriptor: "The premium editorial system",
    thesis: "A warmer, more assured Aryo—less software UI, more trusted counsel—with disciplined editorial typography.",
    bestFor: "Board advisory, M&A, governance, executive thought leadership, and premium printed material.",
    keep: ["Deep blue as the trust anchor", "Editorial serif heritage", "Understated teal references"],
    clean: ["Warmer paper backgrounds", "No decorative gradients", "Hairline rules instead of boxed cards"],
    colors: [
      { name: "Midnight", hex: "#183657", role: "Primary" },
      { name: "Verdigris", hex: "#438E86", role: "Accent" },
      { name: "Warm Paper", hex: "#F4F1E9", role: "Canvas" },
      { name: "Slate", hex: "#61707A", role: "Body" },
      { name: "Brass", hex: "#B69A6B", role: "Rare accent" },
    ],
    type: { display: "Playfair Display / 500", body: "Inter / 400", rationale: "Editorial contrast communicates judgment and permanence while the sans serif keeps operating details practical." },
    voice: ["Measured, never breathless", "Lead with a clear point of view", "Use evidence without turning the page into a dashboard"],
  },
  engineered: {
    key: "engineered",
    number: "03",
    name: "Engineered Intelligence",
    descriptor: "The HardTech-forward system",
    thesis: "A more technical expression of Aryo built for AI, manufacturing, photonics, and complex operating systems.",
    bestFor: "HardTech service pages, industrial AI, engineering transformation, and innovation-oriented campaigns.",
    keep: ["Cobalt trust cues", "Teal as the action signal", "Geometric logic from the Aryo mark"],
    clean: ["Dark sections used intentionally", "Technical labels with readable scale", "Diagrams replace generic icon grids"],
    colors: [
      { name: "Deep System", hex: "#0D2542", role: "Canvas" },
      { name: "Cobalt", hex: "#2E64A6", role: "Primary" },
      { name: "Electric Teal", hex: "#4ED1C8", role: "Signal" },
      { name: "Optic Blue", hex: "#55B9E6", role: "Secondary" },
      { name: "Ice", hex: "#ECF5F7", role: "Light surface" },
    ],
    type: { display: "Inter / 500", body: "Inter / 400", rationale: "A precise sans system with monospaced micro-labels feels engineered without sacrificing executive credibility." },
    voice: ["Explain the system, not the hype", "Pair every capability with a control", "Show the before, after, and accountable decision"],
  },
};

function useFocusedBrandChrome() {
  useEffect(() => {
    const style = document.createElement("style");
    style.dataset.aryoFocusedRoute = "true";
    style.textContent = "#tooldesk-widget-container{display:none!important}";
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
}

function AryoWordmark({ light = false }: { light?: boolean }) {
  return (
    <div className={`bb-wordmark ${light ? "is-light" : ""}`}>
      <img src="/favicon.png" alt="" aria-hidden="true" />
      <span><b>ARYO</b><small>CONSULTING GROUP</small></span>
    </div>
  );
}

export function BrandLab() {
  useFocusedBrandChrome();
  return (
    <main className="brand-lab">
      <header className="brand-lab-nav"><AryoWordmark /><Link href="/">Return to Aryo site</Link></header>
      <section className="brand-lab-hero">
        <p>ARYO BRAND EVOLUTION / THREE DIRECTIONS</p>
        <h1>Keep the equity.<br /><em>Remove the noise.</em></h1>
        <div><span>Purpose</span><p>These are working design systems, not mood boards. Each direction shows how the same Aryo brand can become cleaner, more legible, and more differentiated.</p></div>
      </section>
      <section className="brand-direction-index">
        {(Object.values(directions) as BrandDirection[]).map((direction) => (
          <Link href={`/brand/${direction.key}`} className={`brand-direction-card ${direction.key}`} key={direction.key}>
            <div className="brand-card-top"><span>{direction.number}</span><small>{direction.descriptor}</small></div>
            <div className="brand-card-sample"><i /><i /><i /><strong>Aa</strong></div>
            <h2>{direction.name}</h2>
            <p>{direction.thesis}</p>
            <div className="brand-card-link">Open the brand book <ArrowRight size={16} /></div>
          </Link>
        ))}
      </section>
      <section className="brand-recommendation">
        <span>RECOMMENDATION</span><h2>Use Precision Advisory as the master system.</h2><p>Then borrow Quiet Authority for board-facing work and Engineered Intelligence for HardTech service pages. One brand, three controlled modes—not three unrelated identities.</p>
      </section>
    </main>
  );
}

function Palette({ direction }: { direction: BrandDirection }) {
  return <div className="bb-palette">{direction.colors.map((color) => <div key={color.hex}><span style={{ background: color.hex }} /><b>{color.name}</b><small>{color.hex}</small><em>{color.role}</em></div>)}</div>;
}

function AppliedSystem({ direction }: { direction: BrandDirection }) {
  const values = direction.key === "engineered" ? [78, 55, 88, 68] : direction.key === "authority" ? [62, 86, 48, 74] : [72, 58, 84, 66];
  return (
    <div className="bb-applied">
      <div className="bb-mini-nav"><AryoWordmark light={direction.key === "engineered"} /><span>Capabilities&nbsp;&nbsp;&nbsp; Industries&nbsp;&nbsp;&nbsp; Insights</span><b>Request a Briefing</b></div>
      <div className="bb-mini-hero">
        <div><small>RESULTS-DRIVEN CONSULTING</small><h3>The operating system behind <em>enterprise value.</em></h3><p>Aryo turns strategic priorities into governed execution and measurable results.</p><button>Begin the conversation <MoveUpRight size={14} /></button></div>
        <div className="bb-mini-chart"><span>VALUE CREATION SYSTEM</span>{values.map((value, index) => <i key={index} style={{ height: `${value}%` }} />)}<b>+23%</b></div>
      </div>
    </div>
  );
}

export function BrandBook({ directionKey }: { directionKey: DirectionKey }) {
  useFocusedBrandChrome();
  const direction = directions[directionKey];
  return (
    <main className={`brand-book ${direction.key}`}>
      <header className="bb-nav"><AryoWordmark light={direction.key === "engineered"} /><div><Link href="/brand">All directions</Link><span>{direction.number} / 03</span></div></header>

      <section className="bb-cover">
        <div className="bb-cover-index"><span>{direction.number}</span><small>BRAND DIRECTION</small></div>
        <div className="bb-cover-title"><p>{direction.descriptor}</p><h1>{direction.name}</h1><h2>{direction.thesis}</h2></div>
        <div className="bb-cover-mark"><img src="/favicon.png" alt="Aryo mark" /></div>
        <div className="bb-cover-fit"><span>BEST FIT</span><p>{direction.bestFor}</p></div>
      </section>

      <section className="bb-section bb-strategy">
        <div className="bb-section-label"><span>01</span><p>STRATEGIC EDIT</p></div>
        <div className="bb-strategy-grid">
          <div><small>WHAT WE KEEP</small>{direction.keep.map((item) => <p key={item}><Check size={14} />{item}</p>)}</div>
          <div><small>WHAT WE CLEAN UP</small>{direction.clean.map((item) => <p key={item}><Check size={14} />{item}</p>)}</div>
          <blockquote>“The brand should feel more expensive because it is more disciplined—not because it has more decoration.”</blockquote>
        </div>
      </section>

      <section className="bb-section bb-foundation">
        <div className="bb-section-label"><span>02</span><p>COLOR FOUNDATION</p></div>
        <Palette direction={direction} />
        <p className="bb-guidance">Color is assigned by role. Teal signals action or change; it does not compete with every headline. Cobalt carries trust. Neutral space carries confidence.</p>
      </section>

      <section className="bb-section bb-type">
        <div className="bb-section-label"><span>03</span><p>TYPOGRAPHY</p></div>
        <div className="bb-type-specimen">
          <div><small>DISPLAY / {direction.type.display}</small><h2>Clarity compounds.</h2></div>
          <div><small>BODY / {direction.type.body}</small><p>Strategy becomes valuable when teams can understand it, act on it, and measure what changed. Typography should make complex decisions easier to navigate.</p></div>
          <aside><b>Aa</b><span>0123456789<br />ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz</span></aside>
        </div>
        <p className="bb-guidance">{direction.type.rationale}</p>
      </section>

      <section className="bb-section bb-grid-system">
        <div className="bb-section-label"><span>04</span><p>LAYOUT SYSTEM</p></div>
        <div className="bb-grid-demo"><Grid3X3 size={20} /><div>{Array.from({ length: 12 }).map((_, index) => <i key={index} />)}</div><p><b>12-column desktop</b><br />8pt spacing base · 72–112px section rhythm · 1px rules · square geometry</p></div>
      </section>

      <section className="bb-section bb-components">
        <div className="bb-section-label"><span>05</span><p>INTERFACE LANGUAGE</p></div>
        <div className="bb-component-row">
          <div><small>PRIMARY ACTION</small><button>Request a briefing <ArrowRight size={14} /></button></div>
          <div><small>SECONDARY ACTION</small><button className="secondary">View case studies <ArrowRight size={14} /></button></div>
          <article><span>01 / OPERATIONAL ALPHA</span><h3>Find the constraint.</h3><p>Start with the operating decision, not the model.</p></article>
          <div className="bb-metric"><strong>23%</strong><span>CLIENT RETENTION RATE</span><i /></div>
        </div>
      </section>

      <section className="bb-section bb-data">
        <div className="bb-section-label"><span>06</span><p>DATA & EVIDENCE</p></div>
        <div className="bb-data-layout"><div><small>BEFORE / AFTER</small><h2>Evidence should be the visual.</h2><p>Avoid ornamental dashboards. Show the baseline, the intervention, the delta, and the accountable measure.</p></div><div className="bb-bars">{[[100,66],[100,72],[100,58]].map(([before, after], index) => <div key={index}><span>0{index+1}</span><i style={{ width: `${before}%` }} /><i style={{ width: `${after}%` }} /><b>−{100-after}%</b></div>)}</div></div>
      </section>

      <section className="bb-section bb-voice">
        <div className="bb-section-label"><span>07</span><p>VOICE</p></div>
        <div className="bb-voice-grid">{direction.voice.map((item, index) => <article key={item}><span>0{index+1}</span><h3>{item}</h3></article>)}</div>
      </section>

      <section className="bb-section bb-application">
        <div className="bb-section-label"><span>08</span><p>APPLIED DIGITAL SYSTEM</p></div>
        <AppliedSystem direction={direction} />
      </section>

      <footer className="bb-footer"><AryoWordmark light={direction.key === "engineered"} /><p>{direction.name} / Working brand book / 2026</p><Link href="/brand">Compare all three directions <ArrowRight size={15} /></Link></footer>
    </main>
  );
}

export function PrecisionBrandBook() {
  return <BrandBook directionKey="precision" />;
}

export function AuthorityBrandBook() {
  return <BrandBook directionKey="authority" />;
}

export function EngineeredBrandBook() {
  return <BrandBook directionKey="engineered" />;
}
