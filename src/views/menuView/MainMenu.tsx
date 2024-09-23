import React, { useState, useEffect } from "react";
import { Fade, Grow } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { Data } from "../../types";

interface Props {
    socketData: Data | null;
}

export const MainMenu = ({ socketData }: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [inView]);

    return (
        <Fade in={isVisible} timeout={1500}>
            <div
                ref={ref}
                className="background-container overflow-y-auto"
                style={{
                    backgroundImage: `url(${socketData?.main?.foto})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    height: '80vh',
                }}
            >
                <div className="overlay">
                    <Grow in={isVisible} timeout={2500}>
                        <h1 className="title">{socketData?.main?.title}</h1>
                    </Grow>
                    <Grow in={isVisible} timeout={3500}>
                        <p className="label">{socketData?.main?.label}</p>
                    </Grow>
                </div>
            </div>
        </Fade>
    );
};