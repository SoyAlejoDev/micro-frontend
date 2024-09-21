import React from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';

interface Props {
    label: string;
    total?: string;
    masVendido?: string;
    color: string;
    Icon: SvgIconComponent;
}

const FourPointStar: React.FC<{ color: string, size: number, opacity: number; }> = ({ color, size, opacity }) => (
    <Box component="svg" width={size} height={size} viewBox="0 0 40 40" sx={{ opacity }}>
        <path
            d="M20 0 L24 16 L40 20 L24 24 L20 40 L16 24 L0 20 L16 16 Z"
            fill={color}
        />
    </Box>
);

export const ResumeCard = ({ color, label, total, Icon, masVendido }: Props) => {
    const theme = useTheme();


    return (
        <Box sx={{
            bgcolor: color,
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            height: '100%',
            '&:after': {
                content: '""',
                position: 'absolute',
                width: 210,
                height: 210,
                background: `black`,
                borderRadius: '50%',
                top: -105,
                right: -95,
                opacity: 0.3,
            },
            '&:before': {
                content: '""',
                position: 'absolute',
                width: 210,
                height: 210,
                background: `black`,
                borderRadius: '50%',
                top: -125,
                right: -15,
                opacity: 0.2,
            }
        }}>
            <Box sx={{ p: 2.25, position: 'relative', zIndex: 1 }}>
                <Box sx={{ mb: 1 }}>
                    <Icon sx={{ fontSize: '2rem', color: 'white' }} />
                </Box>
                <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mb: 0.5 }}>
                    {total || masVendido}
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 500, opacity: 0.8 }}>
                    {label}
                </Typography>
            </Box>

            {/* Estrellas decorativas */}
            <Box sx={{ position: 'absolute', top: '10%', left: '10%', zIndex: 0 }}>
                <FourPointStar color="rgba(255,255,255,0.2)" size={40} opacity={0.6} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: '10%', right: '10%', zIndex: 0 }}>
                <FourPointStar color="rgba(255,255,255,0.2)" size={30} opacity={0.4} />
            </Box>
        </Box>
    );
};