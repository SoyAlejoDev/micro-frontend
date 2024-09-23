import React, { useState, useEffect } from 'react';
import { Grow } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { Characteristic } from '../../../types';

interface Props {
    characteristics: Characteristic;
}

export const Characteristics_Items = ({ characteristics }: Props) => {
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
        <div ref={ref} className='w-full md:w-auto md:mt-14 md:mx-2'>
            <Grow
                in={isVisible}
                timeout={1000}
                style={{ transformOrigin: '0 0 0' }}
            >
                <div className="relative w-full h-[400px] md:h-auto md:aspect-square overflow-hidden">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={characteristics.logo}
                        alt=""
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
                        <div className='bg-white bg-opacity-5 p-2 rounded'>
                            <span
                                className="text-[80px] md:text-2xl font-bold bg-clip-text text-transparent leading-none"
                                style={{
                                    backgroundImage: `url(${characteristics.logo})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    WebkitTextStroke: '1px rgba(255,255,255,0.3)'
                                }}
                            >
                                {characteristics.item}
                            </span>
                        </div>
                        <p className="text-white text-center md:text-gray-600 mt-4 text-lg md:text-base">
                            {characteristics.text}
                        </p>
                    </div>
                </div>
            </Grow>
        </div>
    );
};