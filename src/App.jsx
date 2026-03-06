import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplashScreen from './components/SplashScreen';
import Canvas3D from './components/Canvas3D';
import ContentOverlay from './components/ContentOverlay';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        // Initial setup if needed. SplashScreen handles its own timing and calls setLoading(false)
    }, []);

    useEffect(() => {
        if (!loading) {
            document.body.style.overflow = 'auto'; // allow scroll after splash
        }
    }, [loading]);

    return (
        <div className="app-container" ref={containerRef}>
            {loading && <SplashScreen onComplete={() => setLoading(false)} />}

            {!loading && (
                <>
                    <Canvas3D />
                    <ContentOverlay />
                </>
            )}
        </div>
    );
}

export default App;
