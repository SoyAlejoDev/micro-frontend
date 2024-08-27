// src/components/ScrollToTopButton.tsx
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab } from '@mui/material';
import { useEffect, useState } from 'react';

export const FABToScroll = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {showButton && (
                <Fab
                    color="primary"
                    aria-label="scroll back to top"
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '16px',
                        right: '16px',
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            )}
        </>
    );
};

