import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContentOverlay() {
    const containerRef = useRef();

    useGSAP(() => {
        // Initial Page Load Animations
        const tl = gsap.timeline({ delay: 0.5 });

        tl.from('.navbar', {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
            .from('.hero-content > *', {
                x: -100,
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'expo.out'
            }, "-=0.5")
            .from('.scroll-indicator', {
                opacity: 0,
                y: -20,
                duration: 1
            }, "-=0.8");

        // Futuristic parallax scrolling for sections
        const sections = gsap.utils.toArray('.section:not(.hero-section)');

        sections.forEach((section, i) => {
            const isRight = section.querySelector('.align-right');

            // Dramatic reveal for glass panels
            const panels = section.querySelectorAll('.glass-panel');
            panels.forEach(panel => {
                gsap.from(panel, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play reverse play reverse'
                    },
                    x: isRight ? 150 : -150,
                    rotationY: isRight ? -15 : 15,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power4.out',
                    transformPerspective: 1000
                });
            });

            // Huge background text scroll
            const hugeText = section.querySelector('.left-huge');
            if (hugeText) {
                gsap.to(hugeText, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    },
                    y: -300,
                    opacity: 0.3
                });
            }
        });

        // Gallery Stagger Reveal
        gsap.from('.gallery-item', {
            scrollTrigger: {
                trigger: '#gallery',
                start: 'top 70%'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });

    }, { scope: containerRef });

    return (
        <div id="content" ref={containerRef}>
            <nav className="navbar">
                <div className="logo">Limitless<span className="accent">.Art</span></div>
                <div className="nav-links">
                    <a href="#about" className="nav-btn">About</a>
                    <a href="#whatwedo" className="nav-btn">What We Do</a>
                    <a href="#gallery" className="nav-btn">Gallery</a>
                    <a href="#register" className="nav-btn">Register</a>
                    <a href="#contact" className="nav-btn">Contact</a>
                </div>
            </nav>

            {/* Hero */}
            <section className="section hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Unlock<br /><span className="text-gradient">Potential</span></h1>
                        <p className="hero-subtitle">
                            Empowering individuals with disabilities to break down barriers, inspire confidence, and discover their limitless potential through immersive, cinematic art expression.
                        </p>
                        <div className="nav-links">
                            <a href="#register" className="btn glowing-btn">Join The Movement</a>
                            <a href="#about" className="btn outline-btn">Explore Vision</a>
                        </div>
                    </div>
                </div>
                <div className="scroll-indicator">
                    <ArrowDown size={36} />
                </div>
            </section>

            {/* About Us */}
            <section className="section" id="about">
                <div className="left-huge">OUR MISSION</div>
                <div className="container flex-end">
                    <div className="glass-panel" style={{ maxWidth: '700px' }}>
                        <h2 className="panel-title">Abilities <span className="text-gradient">Celebrated</span></h2>
                        <p>
                            We exist to create a wildly inclusive space where creativity has no boundaries. At Limitless Art, we see abilities, not limitations.
                        </p>
                        <p className="mt-4">
                            We believe that art is the ultimate equalizer. Through cutting-edge cinematic environments, real depths, and interactive mentoring, we unlock hidden talents worldwide.
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="section" id="whatwedo">
                <div className="left-huge" style={{ right: 0, left: 'auto' }}>EXPERIENCE</div>
                <div className="container">
                    <div className="glass-panel" style={{ maxWidth: '800px' }}>
                        <h2 className="panel-title">Real <span className="accent">Immersion</span></h2>
                        <p>
                            We push the boundaries of modern digital expression. You don't just view art here; you step inside it.
                        </p>
                        <div className="grid-2 mt-6">
                            <div>
                                <h3 className="accent mb-2">Workshops</h3>
                                <p>Interactive, real-time 3D environments where disabled artists learn advanced spatial design and digital canvas creation.</p>
                            </div>
                            <div>
                                <h3 className="text-gradient mb-2">Mentorship</h3>
                                <p>1-on-1 guidance from industry leaders in cinematic animation, GSAP choreography, and creative coding.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="section" id="gallery">
                <div className="container">
                    <h2 className="panel-title text-center text-gradient" style={{ textAlign: 'center' }}>Visionary Gallery</h2>
                    <p className="text-center mx-auto" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>Witness the mind-blowing projects created within our interactive workshops. Real depth. Real emotion.</p>

                    <div className="gallery-grid">
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract Art" />
                            <div className="gallery-overlay">
                                <h3>Neon Dreaming</h3>
                                <p>By Alex M.</p>
                            </div>
                        </div>
                        <div className="gallery-item" style={{ transform: 'translateY(40px)' }}>
                            <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" alt="Digital Space" />
                            <div className="gallery-overlay">
                                <h3>Quantum Shift</h3>
                                <p>By Sarah J.</p>
                            </div>
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop" alt="Particles" />
                            <div className="gallery-overlay">
                                <h3>Limitless</h3>
                                <p>By David R.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Register */}
            <section className="section" id="register">
                <div className="left-huge">JOIN US</div>
                <div className="container flex-end">
                    <div className="glass-panel" style={{ maxWidth: '600px', width: '100%' }}>
                        <h2 className="panel-title">Ignite <span className="text-gradient">Your Path</span></h2>
                        <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <input type="text" className="form-input" placeholder="Initiate Name Sequence" />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-input" placeholder="Enter Comms Address (Email)" />
                            </div>
                            <div className="form-group">
                                <select className="form-input" defaultValue="" style={{ appearance: 'none', background: 'rgba(255,255,255,0.03)' }}>
                                    <option value="" disabled>Select Interface Type</option>
                                    <option value="workshop">Interactive Workshop</option>
                                    <option value="mentor">Mentorship Program</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>
                            <button className="btn glowing-btn" style={{ width: '100%' }}>Initialize Registration</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Contact Us */}
            <section className="section" id="contact" style={{ paddingBottom: '0' }}>
                <div className="container">
                    <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 className="panel-title">Establish <span className="accent">Connection</span></h2>
                        <p className="mt-4">Ready to collaborate or sponsor our mission? Transmit your signal to our central hub.</p>

                        <form className="mt-6 text-left" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <textarea className="form-input" placeholder="Enter Transmission Data..."></textarea>
                            </div>
                            <button className="btn outline-btn" style={{ width: '100%' }}>Transmit Data</button>
                        </form>
                    </div>
                </div>
            </section>

            <section className="footer-section">
                <h2 className="footer-title">The <span className="text-gradient">Singularity</span></h2>
                <p className="hero-subtitle">Embrace the Limitless</p>
                <footer>
                    <p>&copy; {new Date().getFullYear()} Limitless Art Collective. All rights reserved.</p>
                </footer>
            </section>
        </div>
    );
}
