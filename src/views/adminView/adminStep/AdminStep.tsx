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
import { Send } from '@mui/icons-material';
import { useAdminStore } from '../../../store/useAdminStore';

export const AdminStep = () => {
    const steps = [
        {
            label: 'Formulario de Presentación',
            component: <Main />,
        },
        {
            label: 'Historia, Características y Pie de Página',
            component: <HCF />,
        },
        {
            label: 'Componente de Menú',
            component: <Menu />,
        },
    ];

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const { menuSections, formMainData, descriptionFormData, footerFormData, historyFormData } = useAdminStore();

    const sendData = () => {
        console.log({ menuSections, formMainData, descriptionFormData, footerFormData, historyFormData });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', height: '100%' }}>
                {steps.map((step, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: index === activeStep ? 'block' : 'none',
                            height: '100%',
                        }}
                    >
                        {step.component}
                    </Box>
                ))}
            </Box>

            {activeStep === steps.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '12px' }}>
                    <Button
                        startIcon={<Send />}
                        sx={{ width: '300px' }}
                        variant='outlined'
                        onClick={sendData}
                    >
                        Enviar
                    </Button>
                </div>
            )}

            <MobileStepper
                style={{ backgroundColor: '#001529' }}
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        variant='outlined'
                        sx={{ marginRight: '50px' }}
                        style={{ color: 'white' }}
                    >
                        Siguiente
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft style={{ fontSize: '24px' }} />
                        ) : (
                            <KeyboardArrowRight style={{ fontSize: '24px' }} />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        sx={{ marginLeft: '50px' }}
                        style={{ color: 'white' }}
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        variant='outlined'
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight style={{ fontSize: '24px' }} />
                        ) : (
                            <KeyboardArrowLeft style={{ fontSize: '24px' }} />
                        )}
                        Atrás
                    </Button>
                }
                sx={{ mt: 'auto' }}
            />
        </Box>
    );
};
