import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplashScreen({ onComplete }) {
    const containerRef = useRef();
    const textRef = useRef();
    const progressRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: 'power4.inOut',
                    onComplete: () => onComplete()
                });
            }
        });

        tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out'
        })
            .to(progressRef.current, {
                width: '100%',
                duration: 1.5,
                ease: 'power2.inOut'
            }, "-=1")
            .to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: 'power2.in'
            }, "+=0.2")
            .to(progressRef.current, {
                opacity: 0,
                duration: 0.5
            }, "<");

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div id="splash-screen" ref={containerRef}>
            <div className="splash-text" ref={textRef}>LIMITLESS ART</div>
            <div className="splash-loader">
                <div className="splash-loader-progress" ref={progressRef}></div>
            </div>
        </div>
    );
}
