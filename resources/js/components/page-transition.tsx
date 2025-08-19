import React, { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "slide" | "fade" | "scale" | "curtain" | "particles";
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, variant = "slide" }) => {
  const transitionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!transitionRef.current || !overlayRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(transitionRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0 });

      const tl = gsap.timeline();

      switch (variant) {
        case "slide":
          gsap.set(contentRef.current, {
            y: 100,
            scale: 0.95,
            filter: "blur(10px)",
          });

          tl.to(transitionRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          }).to(
            contentRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.1",
          );
          break;

        case "fade":
          const elements = contentRef.current.children;
          gsap.set(elements, { opacity: 0, y: 30 });

          tl.to(transitionRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          })
            .to(
              contentRef.current,
              {
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.2",
            )
            .to(
              elements,
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
              },
              "-=0.4",
            );
          break;

        case "scale":
          gsap.set(contentRef.current, {
            scale: 0.8,
            rotation: -5,
            filter: "blur(5px)",
          });

          tl.to(transitionRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          }).to(
            contentRef.current,
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              filter: "blur(0px)",
              duration: 1,
              ease: "elastic.out(1, 0.8)",
            },
            "-=0.1",
          );
          break;

        case "curtain":
          gsap.set(overlayRef.current, {
            scaleY: 1,
            transformOrigin: "top",
          });
          gsap.set(contentRef.current, {
            opacity: 1,
            scale: 1.1,
            filter: "blur(3px)",
          });

          tl.to(transitionRef.current, {
            opacity: 1,
            duration: 0.1,
          })
            .to(overlayRef.current, {
              scaleY: 0,
              duration: 1.2,
              ease: "power3.inOut",
            })
            .to(
              contentRef.current,
              {
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out",
              },
              "-=0.8",
            );
          break;

        case "particles":
          const existingParticles = transitionRef.current?.querySelectorAll(".particle");
          existingParticles?.forEach((particle) => particle.remove());

          const particles = Array.from({ length: 20 }, (_, i) => {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.cssText = `
              position: absolute;
              width: 4px;
              height: 4px;
              background: hsl(${Math.random() * 360}, 70%, 60%);
              border-radius: 50%;
              top: ${Math.random() * 100}%;
              left: ${Math.random() * 100}%;
              pointer-events: none;
            `;
            transitionRef.current?.appendChild(particle);
            return particle;
          });

          gsap.set(particles, { scale: 0, opacity: 0 });
          gsap.set(contentRef.current, {
            opacity: 0,
            scale: 0.9,
            filter: "blur(8px)",
          });

          tl.to(transitionRef.current, {
            opacity: 1,
            duration: 0.2,
          })
            .to(particles, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: "back.out(2)",
            })
            .to(
              contentRef.current,
              {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.4",
            )
            .to(
              particles,
              {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                stagger: 0.02,
                ease: "power2.in",
              },
              "-=0.2",
            );
          break;

        default:
          tl.to(transitionRef.current, {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          }).to(
            contentRef.current,
            {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.3",
          );
      }
    }, transitionRef);

    return () => ctx.revert();
  }, [variant]); // Supprimez pathname, gardez variant

  return (
    <div
      ref={transitionRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        opacity: 0,
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/10 z-10"
        style={{ transformOrigin: "top" }}
      />

      <div
        ref={contentRef}
        className="relative z-20 min-h-screen"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      >
        {children}
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
          `,
          animation: "ambient-pulse 4s ease-in-out infinite alternate",
        }}
      />

      <style>{`
        @keyframes ambient-pulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
        
        .particle {
          animation: particle-float 3s ease-in-out infinite;
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;