import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function SplashScreen({ onComplete }) {
    const containerRef = useRef();
    const textRef = useRef();
    const textRef2 = useRef();
    const progressRef = useRef();
    const blurRef = useRef();
    const [loadingText, setLoadingText] = useState("ESTABLISHING CONNECTION...");

    useEffect(() => {
        const texts = [
            "ESTABLISHING CONNECTION...",
            "INITIALIZING NEURAL NET...",
            "BYPASSING LIMITATIONS...",
            "UNLOCKING POTENTIAL..."
        ];

        let i = 0;
        const interval = setInterval(() => {
            i++;
            if (i < texts.length) {
                setLoadingText(texts[i]);
            } else {
                clearInterval(interval);
            }
        }, 700);

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: 'power4.inOut',
                    onComplete: () => onComplete()
                });
            }
        });

        tl.to(blurRef.current, {
            filter: "blur(0px)",
            scale: 1,
            opacity: 1,
            duration: 2.5,
            ease: 'expo.out'
        })
            .to(progressRef.current, {
                width: '100%',
                duration: 2.8,
                ease: 'power2.inOut'
            }, "-=2.5")
            .to([textRef.current, textRef2.current, progressRef.current], {
                opacity: 0,
                y: -30,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.in'
            }, "+=0.2");

        return () => {
            tl.kill();
            clearInterval(interval);
        };
    }, [onComplete]);

    return (
        <div id="splash-screen" ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020202', color: '#fff', zIndex: 99999 }}>
            <div ref={blurRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'blur(20px)', scale: 1.2, opacity: 0 }}>
                <div className="splash-text" ref={textRef} style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '8px',
                    background: 'linear-gradient(90deg, #00ffff, #8a2be2, #ff00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    textTransform: 'uppercase'
                }}>
                    LIMITLESS.ART
                </div>
                <div ref={textRef2} style={{ marginTop: '1.5rem', fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', letterSpacing: '4px', color: '#00ffff', textTransform: 'uppercase' }}>
                    {loadingText}
                </div>
                <div className="splash-loader" style={{ width: '350px', height: '2px', background: 'rgba(255,255,255,0.05)', marginTop: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div className="splash-loader-progress" ref={progressRef} style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '0%', background: 'linear-gradient(90deg, #00ffff, #8a2be2)', boxShadow: '0 0 15px #00ffff' }}></div>
                </div>
            </div>
        </div>
    );
}
