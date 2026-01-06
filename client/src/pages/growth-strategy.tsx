import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown, Compass, Rocket, DollarSign, GitBranch, Handshake } from "lucide-react";
import { SEO } from "@/components/seo";
import { Footer } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const content = {
  hero: {
    title: "Growth Strategy",
    tagline: "Accelerating Market Success",
    body: "We help you find and capture your next $100M opportunity — then we help you build the capabilities to repeat it.",
    primaryCta: "Book a Strategy Call",
    secondaryCta: "Download Service Brief",
  },
  services: [
    {
      id: 1,
      title: "Market Entry Strategy",
      description: "Navigate new markets with confidence through rigorous analysis and structured entry planning.",
      deliverables: [
        "Market opportunity assessment",
        "Competitive landscape mapping",
        "Go-to-market playbook",
      ],
      icon: Compass,
      module: "compass",
    },
    {
      id: 2,
      title: "Revenue Acceleration",
      description: "Unlock growth levers across your commercial engine to drive sustainable revenue expansion.",
      deliverables: [
        "Revenue driver analysis",
        "Sales effectiveness roadmap",
        "Growth initiative prioritization",
      ],
      icon: Rocket,
      module: "thruster",
    },
    {
      id: 3,
      title: "Pricing Optimization",
      description: "Align your pricing architecture with value delivered to maximize margins and market share.",
      deliverables: [
        "Pricing structure assessment",
        "Value-based pricing model",
        "Implementation guidelines",
      ],
      icon: DollarSign,
      module: "grid",
    },
    {
      id: 4,
      title: "Channel Strategy",
      description: "Design and optimize your distribution network to reach customers through the right pathways.",
      deliverables: [
        "Channel performance analysis",
        "Partner ecosystem design",
        "Channel conflict resolution",
      ],
      icon: GitBranch,
      module: "nodes",
    },
    {
      id: 5,
      title: "Partnership Development",
      description: "Identify and structure strategic partnerships that create mutual value and accelerate growth.",
      deliverables: [
        "Partnership opportunity scan",
        "Deal structure framework",
        "Integration planning",
      ],
      icon: Handshake,
      module: "lattice",
    },
  ],
  outcome: {
    title: "Typical Outcome",
    metric: "2x",
    metricLabel: "revenue growth rate",
  },
  footer: {
    cta: "Talk to Us",
    nextSteps: [
      "30-minute discovery call",
      "Custom proposal within 5 days",
      "Kick-off in 2 weeks",
    ],
  },
};

function StrategyCore({ activeScene }: { activeScene: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const compassRef = useRef<THREE.Group>(null);
  const thrusterRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const latticeRef = useRef<THREE.Group>(null);
  
  const opacityState = useRef({
    compass: 0,
    thruster: 0,
    grid: 0,
    nodes: 0,
    lattice: 0,
  });

  const targetOpacity = useMemo(() => ({
    compass: activeScene >= 1 ? 1 : 0,
    thruster: activeScene >= 2 ? 1 : 0,
    grid: activeScene >= 3 ? 1 : 0,
    nodes: activeScene >= 4 ? 1 : 0,
    lattice: activeScene >= 5 ? 1 : 0,
  }), [activeScene]);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    const lerpSpeed = 4;
    const lerp = (current: number, target: number) => current + (target - current) * Math.min(lerpSpeed * delta, 1);
    
    opacityState.current.compass = lerp(opacityState.current.compass, targetOpacity.compass);
    opacityState.current.thruster = lerp(opacityState.current.thruster, targetOpacity.thruster);
    opacityState.current.grid = lerp(opacityState.current.grid, targetOpacity.grid);
    opacityState.current.nodes = lerp(opacityState.current.nodes, targetOpacity.nodes);
    opacityState.current.lattice = lerp(opacityState.current.lattice, targetOpacity.lattice);

    const updateGroupOpacity = (group: THREE.Group | null, opacity: number) => {
      if (!group) return;
      group.visible = opacity > 0.01;
      group.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.opacity = opacity;
          child.material.needsUpdate = true;
        }
      });
    };

    updateGroupOpacity(compassRef.current, opacityState.current.compass);
    updateGroupOpacity(thrusterRef.current, opacityState.current.thruster);
    updateGroupOpacity(gridRef.current, opacityState.current.grid * 0.8);
    updateGroupOpacity(nodesRef.current, opacityState.current.nodes);
    updateGroupOpacity(latticeRef.current, opacityState.current.lattice);
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#274D8E"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        <mesh position={[0, 0, 0]} scale={1.05}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#47B5CB"
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>

        <group ref={compassRef} visible={false}>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.4, 0.05, 16, 64]} />
            <meshStandardMaterial
              color="#47B5CB"
              metalness={0.7}
              roughness={0.2}
              transparent
              opacity={0}
            />
          </mesh>
        </group>

        <group ref={thrusterRef} visible={false}>
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i * Math.PI) / 2) * 1.3,
                0,
                Math.sin((i * Math.PI) / 2) * 1.3,
              ]}
              rotation={[0, (i * Math.PI) / 2, Math.PI / 4]}
            >
              <coneGeometry args={[0.15, 0.4, 4]} />
              <meshStandardMaterial
                color="#4EB9A7"
                metalness={0.6}
                roughness={0.3}
                transparent
                opacity={0}
              />
            </mesh>
          ))}
        </group>

        <group ref={gridRef} visible={false}>
          {[-0.6, 0, 0.6].map((y, i) => (
            <mesh key={i} position={[1.5, y, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.05, 0.4, 0.8]} />
              <meshStandardMaterial
                color="#274D8E"
                metalness={0.5}
                roughness={0.4}
                transparent
                opacity={0}
              />
            </mesh>
          ))}
        </group>

        <group ref={nodesRef} visible={false}>
          {[
            [1.2, 0.8, 0.5],
            [1.0, -0.6, 0.8],
            [-0.8, 0.9, 0.6],
            [-1.1, -0.5, 0.7],
          ].map((pos, i) => (
            <mesh key={i} position={pos as [number, number, number]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color="#47B5CB"
                metalness={0.7}
                roughness={0.2}
                transparent
                opacity={0}
                emissive="#47B5CB"
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>

        <group ref={latticeRef} visible={false}>
          {[
            [[0.8, 0.8, 0.8], [1.2, 1.2, 0.8]],
            [[-0.8, 0.8, 0.8], [-1.2, 1.0, 1.0]],
            [[0.8, -0.8, 0.8], [1.0, -1.2, 1.2]],
            [[-0.8, -0.8, -0.8], [-1.0, -1.0, -1.2]],
          ].map((pair, i) => {
            const start = new THREE.Vector3(...(pair[0] as [number, number, number]));
            const end = new THREE.Vector3(...(pair[1] as [number, number, number]));
            const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
            const length = start.distanceTo(end);
            const direction = new THREE.Vector3().subVectors(end, start).normalize();
            const quaternion = new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              direction
            );
            
            return (
              <mesh
                key={i}
                position={[mid.x, mid.y, mid.z]}
                quaternion={quaternion}
              >
                <cylinderGeometry args={[0.02, 0.02, length, 8]} />
                <meshStandardMaterial
                  color="#4EB9A7"
                  metalness={0.6}
                  roughness={0.3}
                  transparent
                  opacity={0}
                />
              </mesh>
            );
          })}
        </group>
      </group>
    </Float>
  );
}

function ThreePortal({ activeScene }: { activeScene: number }) {
  return (
    <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#47B5CB" />
          <StrategyCore activeScene={activeScene} />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={5}
            blur={2}
            far={4}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`scene-card ${className}`}>
      {children}
    </div>
  );
}

function ScrollProgress({ activeScene, totalScenes }: { activeScene: number; totalScenes: number }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
      {Array.from({ length: totalScenes }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === activeScene
              ? "bg-[#47B5CB] scale-150"
              : i < activeScene
              ? "bg-[#274D8E]"
              : "bg-white/30"
          }`}
        />
      ))}
    </div>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let count = 0;
          const target = parseInt(value);
          const increment = target / 30;
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(count).toString());
            }
          }, 50);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

export default function GrowthStrategy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const totalScenes = 7;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>(".scene-section");

      scenes.forEach((scene, index) => {
        const card = scene.querySelector(".scene-card");
        if (!card) return;

        gsap.set(card, {
          y: 80,
          opacity: 0,
          rotateX: 5,
        });

        ScrollTrigger.create({
          trigger: scene,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            setActiveScene(index);
            gsap.to(card, {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          },
          onEnterBack: () => {
            setActiveScene(index);
            gsap.to(card, {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.6,
              ease: "power3.out",
            });
          },
          onLeave: () => {
            gsap.to(card, {
              y: -40,
              opacity: 0.5,
              scale: 0.98,
              duration: 0.5,
              ease: "power2.in",
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              y: 40,
              opacity: 0.5,
              duration: 0.5,
              ease: "power2.in",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-slate-50 to-white">
      <SEO
        title="Growth Strategy | Aryo Consulting Group"
        description="Accelerating market success. We help you find and capture your next $100M opportunity — then we help you build the capabilities to repeat it."
        canonical="https://aryocg.com/growth-strategy"
      />

      <ScrollProgress activeScene={activeScene} totalScenes={totalScenes} />

      {/* Scene 0: Hero */}
      <section className="scene-section min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] via-[#274D8E] to-[#47B5CB]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(71,181,203,0.3),transparent_50%)]" />
        
        <SceneCard className="relative z-10 max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[#4EB9A7] text-sm sm:text-base font-medium tracking-widest uppercase mb-4"
              >
                {content.hero.tagline}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
              >
                {content.hero.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                {content.hero.body}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-[#274D8E] gap-2 text-base px-8"
                    data-testid="button-strategy-call"
                  >
                    {content.hero.primaryCta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white gap-2 text-base px-8 backdrop-blur-sm"
                  data-testid="button-download-brief"
                >
                  {content.hero.secondaryCta}
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ThreePortal activeScene={0} />
            </motion.div>
          </div>
        </SceneCard>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Scenes 1-5: Sub-services */}
      {content.services.map((service, index) => (
        <section
          key={service.id}
          className="scene-section min-h-screen flex items-center justify-center px-4 sm:px-6 py-20"
          data-testid={`scene-service-${service.id}`}
        >
          <SceneCard className="max-w-6xl w-full">
            <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#274D8E] to-[#47B5CB] flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[#47B5CB] text-sm font-medium tracking-widest uppercase">
                    0{service.id}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1a365d] mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#274D8E] uppercase tracking-wider">
                    What you get
                  </p>
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#4EB9A7]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#4EB9A7]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <ThreePortal activeScene={index + 1} />
              </div>
            </div>
          </SceneCard>
        </section>
      ))}

      {/* Scene 6: Outcome */}
      <section
        className="scene-section min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 bg-gradient-to-br from-[#1a365d] via-[#274D8E] to-[#1a365d]"
        data-testid="scene-outcome"
      >
        <SceneCard className="max-w-4xl w-full text-center">
          <p className="text-[#4EB9A7] text-sm sm:text-base font-medium tracking-widest uppercase mb-4">
            {content.outcome.title}
          </p>
          <div className="mb-8">
            <span className="text-7xl sm:text-8xl md:text-9xl font-display font-bold text-white">
              <AnimatedNumber value="2" suffix="x" />
            </span>
            <p className="text-2xl sm:text-3xl text-white/80 mt-4">
              {content.outcome.metricLabel}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {content.services.map((service) => (
              <span
                key={service.id}
                className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm border border-white/20"
              >
                {service.title}
              </span>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
              {content.footer.cta}
            </h3>
            <p className="text-white/70 mb-6">What happens next?</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {content.footer.nextSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#47B5CB] flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-white/80 text-sm">{step}</span>
                </div>
              ))}
            </div>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#47B5CB] text-white gap-2"
                data-testid="button-talk-to-us"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </SceneCard>
      </section>

      <Footer />
    </div>
  );
}
