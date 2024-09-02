import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { HCF } from './HCF';
import { Main } from './Main';
import { Menu } from './Menu';

const steps = [
    {
        label: `Formulario de Presentación`,
        component: <Main />
        ,
    },
    {
        label: 'Historia, Caracteristicas y Pie de Pagina',
        component: <HCF />,
    },
    {
        label: 'Menu Component',
        component: <Menu />,
    },

];

export const AdminStep = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', height: '100%' }}>
                {steps[activeStep].component}
            </Box>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
                sx={{ mt: 'auto' }}
            />
        </Box>
    );
};
