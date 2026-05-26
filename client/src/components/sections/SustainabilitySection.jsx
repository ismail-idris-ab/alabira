import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sun, Recycle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import * as THREE from "three";

const PILLARS = [
  {
    num: "01 / 03",
    icon: Sun,
    title: "Solar Irrigation",
    description:
      "100% of our water pumping is powered by on-farm solar arrays, eliminating fossil fuel dependency and cutting irrigation costs by 80%.",
    stat: "100%",
    statLabel: "Solar Powered",
  },
  {
    num: "02 / 03",
    icon: Recycle,
    title: "Zero-Waste Processing",
    description:
      "Every crop byproduct is composted, biofermented, or repurposed as animal feed — nothing leaves our facility as waste.",
    stat: "0kg",
    statLabel: "Waste to Landfill",
  },
  {
    num: "03 / 03",
    /* Custom trees icon inline */
    icon: null,
    title: "Reforestation",
    description:
      "For every acre cultivated, we plant 10 trees in surrounding buffer zones — restoring native ecosystems and improving soil health across the region.",
    stat: "10×",
    statLabel: "Trees Per Acre",
  },
];

const TreeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9952A"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8C8 10 5.9 16.17 3.82 22M9.5 11.5a11 11 0 0 0 8.34 7.2"/>
    <path d="M21.5 12a9.5 9.5 0 0 0-9.5-9.5"/>
    <path d="M12 2.5v19"/>
  </svg>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function useThreeBackground(canvasRef, sectionRef) {
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const W = section.offsetWidth;
    const H = section.offsetHeight;
    renderer.setSize(W, H);

    /* Scene + Camera */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
    camera.position.set(0, 0, 18);

    /* Lights */
    scene.add(new THREE.AmbientLight(0x2e6b3e, 0.6));

    const goldLight = new THREE.PointLight(0xc9952a, 3.5, 28);
    goldLight.position.set(6, 4, 8);
    scene.add(goldLight);

    const sageLight = new THREE.PointLight(0x7fb08a, 2.0, 22);
    sageLight.position.set(-7, -3, 6);
    scene.add(sageLight);

    /* Large torus ring (right) */
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(5.8, 0.06, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x7fb08a, transparent: true, opacity: 0.22 }),
    );
    torus.position.set(7, -1, -4);
    torus.rotation.x = Math.PI / 3.2;
    scene.add(torus);

    /* Smaller torus ring (left) */
    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.04, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0xc9952a, transparent: true, opacity: 0.14 }),
    );
    torus2.position.set(-8, 2, -6);
    torus2.rotation.set(Math.PI / 5, Math.PI / 4, 0);
    scene.add(torus2);

    /* Wireframe sphere */
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(6.5, 28, 28),
      new THREE.MeshBasicMaterial({ color: 0x3a7a50, transparent: true, opacity: 0.07, wireframe: true }),
    );
    sphere.position.set(-4, 1, -10);
    scene.add(sphere);

    /* Floating octahedra */
    const octPositions = [[-6.5, 2.5, 2], [0, -2.5, 1.5], [6.5, 2.5, 2]];
    const octahedra = octPositions.map((pos, i) => {
      const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.38 + i * 0.06, 0),
        new THREE.MeshPhongMaterial({
          color:     i === 1 ? 0x7fb08a : 0xc9952a,
          emissive:  i === 1 ? 0x2e6b3e : 0x8b6200,
          emissiveIntensity: 0.4,
          transparent: true,
          opacity: 0.75,
          shininess: 120,
        }),
      );
      mesh.position.set(...pos);
      mesh.userData = { baseY: pos[1], speed: 0.4 + i * 0.12 };
      scene.add(mesh);
      return mesh;
    });

    /* Particle clouds */
    const makeParticles = (count, color, size, spread) => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * spread.x;
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread.z;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.55, sizeAttenuation: true }),
      );
      pts.userData = { phase: Math.random() * Math.PI * 2 };
      scene.add(pts);
      return pts;
    };

    const sageP  = makeParticles(360, 0x7fb08a, 0.048, { x: 28, y: 18, z: 10 });
    const goldP  = makeParticles(110, 0xc9952a, 0.07,  { x: 24, y: 16, z: 8  });
    const creamP = makeParticles(200, 0xfdf5e0, 0.035, { x: 32, y: 20, z: 12 });

    /* Thin line grid */
    const gridMat = new THREE.LineBasicMaterial({ color: 0x2e6b3e, transparent: true, opacity: 0.06 });
    for (let i = -5; i <= 5; i++) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-14, i * 1.8, -12),
        new THREE.Vector3( 14, i * 1.8, -12),
      ]);
      scene.add(new THREE.Line(geo, gridMat));
    }

    /* Animation loop */
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;

      torus.rotation.z  = t * 0.055;
      torus2.rotation.z = -t * 0.035;
      torus2.rotation.x = Math.PI / 5 + Math.sin(t * 0.2) * 0.06;
      sphere.rotation.y = t * 0.025;
      sphere.rotation.x = t * 0.012;

      goldLight.position.set(Math.sin(t * 0.38) * 10, Math.cos(t * 0.28) * 5, 8);
      sageLight.position.set(Math.cos(t * 0.22) * -9, Math.sin(t * 0.18) * 4, 5);

      octahedra.forEach((oct, i) => {
        oct.rotation.x = t * (0.5 + i * 0.15);
        oct.rotation.y = t * (0.3 + i * 0.12);
        oct.rotation.z = t * 0.08 * (i + 1);
        oct.position.y = oct.userData.baseY + Math.sin(t * oct.userData.speed + i * 2.1) * 0.45;
      });

      sageP.rotation.y  =  t * 0.010;
      sageP.rotation.x  =  Math.sin(t * 0.07) * 0.04;
      goldP.rotation.y  = -t * 0.016;
      goldP.rotation.x  =  Math.cos(t * 0.09) * 0.05;
      creamP.rotation.y =  t * 0.007;
      creamP.position.y =  Math.sin(t * 0.12) * 0.4;

      renderer.render(scene, camera);
    };
    animate();

    /* Resize observer */
    const ro = new ResizeObserver(() => {
      const w = section.offsetWidth;
      const h = section.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(section);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.dispose();
    };
  }, [canvasRef, sectionRef]);
}

export default function SustainabilitySection() {
  const { ref, inView } = useScrollReveal();
  const canvasRef  = useRef(null);
  const sectionRef = useRef(null);

  useThreeBackground(canvasRef, sectionRef);

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      className="relative overflow-hidden py-28 lg:py-36 px-6 sm:px-10 lg:px-20"
      style={{
        background: `
          radial-gradient(ellipse 70% 65% at  8% 12%, rgba(38,90,52,0.80) 0%, transparent 55%),
          radial-gradient(ellipse 45% 55% at 92% 88%, rgba(18,48,27,0.75) 0%, transparent 50%),
          radial-gradient(ellipse 55% 40% at 55% 50%, rgba(26,65,35,0.40) 0%, transparent 65%),
          radial-gradient(ellipse 100% 80% at 50% 100%, rgba(4,10,6,0.90) 0%, transparent 60%),
          linear-gradient(162deg, #0E2417 0%, #152E1C 25%, #0A1B0E 55%, #060F08 100%)
        `,
      }}
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-55"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative max-w-[1280px] mx-auto" style={{ zIndex: 2 }} ref={ref}>

        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20"
        >
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 font-sans text-[10.5px] font-medium tracking-[0.32em] uppercase text-brand-sage mb-5">
              <span className="w-6 h-px bg-brand-sage/50" />
              How We Farm
            </div>

            <h2 className="font-display font-bold text-white leading-[1.1] tracking-heading mb-3.5"
              style={{ fontSize: "clamp(2.6rem, 4vw, 3.6rem)" }}>
              Our Sustainability<br />
              <em className="font-semibold italic not-italic"
                style={{
                  background: "linear-gradient(135deg, #7FB08A, #E4B45A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                }}>
                Pillars.
              </em>
            </h2>

            <p className="font-sans text-[15px] font-light text-white/38 tracking-[0.01em] max-w-[340px]">
              Three commitments at the core of everything we grow.
            </p>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 font-sans font-medium text-[13px] tracking-[0.08em] text-brand-gold border border-brand-gold/35 px-7 py-3.5 rounded-[3px] transition-all duration-250 hover:bg-brand-gold/10 hover:border-brand-gold/65 hover:text-[#E4B45A] hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 shrink-0 self-start md:self-auto"
          >
            Explore Our Commitment
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Pillar cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {PILLARS.map(({ num, icon: Icon, title, description, stat, statLabel }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group relative flex flex-col p-11 rounded-[14px] border border-brand-sage/18 overflow-hidden transition-all duration-350"
              style={{
                background: "rgba(255,255,255,0.035)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
              }}
              whileHover={{
                y: -8,
                background: "rgba(255,255,255,0.065)",
                borderColor: "rgba(127,176,138,0.32)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.45), 0 0 40px rgba(46,107,62,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top gradient accent line */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(201,149,42,0.35), rgba(127,176,138,0.5), rgba(201,149,42,0.35), transparent)" }}
              />

              {/* Inner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[14px]"
                style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(46,107,62,0.12) 0%, transparent 70%)" }}
              />

              {/* Card number */}
              <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-brand-gold opacity-55 mb-7">
                {num}
              </p>

              {/* Icon */}
              <div className="flex items-center justify-center size-[58px] rounded-[12px] border border-brand-gold/28 mb-7 self-start transition-transform duration-300 group-hover:scale-[1.06]"
                style={{ background: "linear-gradient(140deg, rgba(201,149,42,0.18) 0%, rgba(46,107,62,0.22) 100%)" }}
              >
                {Icon ? (
                  <Icon size={24} className="text-brand-gold" strokeWidth={1.5} />
                ) : (
                  <TreeIcon />
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-[22px] font-semibold text-white tracking-[-0.01em] leading-[1.2]">
                {title}
              </h3>

              {/* Gold expanding divider */}
              <div className="h-px my-[18px] transition-all duration-350 group-hover:w-[72px]"
                style={{
                  width: "44px",
                  background: "linear-gradient(to right, #C9952A, rgba(201,149,42,0.2))",
                }}
              />

              {/* Description */}
              <p className="font-sans text-[14.5px] font-light text-white/65 leading-[1.75] mb-8 flex-1">
                {description}
              </p>

              {/* Stat callout */}
              <div className="flex items-baseline gap-2.5 pt-6 border-t border-white/6">
                <span
                  className="font-display text-[36px] font-bold leading-none"
                  style={{
                    background: "linear-gradient(135deg, #E4B45A, #C9952A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat}
                </span>
                <span className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-white/38">
                  {statLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
