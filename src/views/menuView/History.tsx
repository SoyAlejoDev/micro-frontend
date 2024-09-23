import React, { useState, useEffect } from "react";
import { CardContent, Typography, Grow } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { Data } from "../../types";

interface Props {
    socketData: Data | null;
}

export const History = ({ socketData }: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.1,
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
        <div ref={ref} className="overflow-y-auto md:flex md:items-start">
            <Grow in={isVisible} timeout={2000}>
                <img
                    className="md:max-h-[500px] lg:max-h-[500px] w-full md:w-1/2"
                    src={socketData?.history.foto}
                    style={{ backgroundPosition: 'center', backgroundSize: 'cover' }}
                    alt="History"
                />
            </Grow>

            <Grow in={isVisible} timeout={1000}>
                <CardContent className="md:w-1/2">
                    <Typography variant="h4" component="p" className="text-2xl font-sans md:text-5xl md:mt-11">
                        {socketData?.history.title}
                    </Typography>
                    <Typography variant="body1" className="text-sm font-sans mt-2 md:text-lg">
                        {socketData?.history.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                </CardContent>
            </Grow>
        </div>
    );
};