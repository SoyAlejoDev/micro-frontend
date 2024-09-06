import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useAdminStore } from '../../../store/useAdminStore';
import { DescriptionForm } from './DescriptionForm';
import { FooterForm } from './FooterForm';
import { HistoryForm } from './HistoryForm';
import { Main } from './Main';

const ComponentFive = () => <Typography>Componente 5</Typography>;

const steps = [
    {
        label: 'Inicio',
        component: <Main />,
    },
    {
        label: 'Historia',
        component: <HistoryForm />,
    },
    {
        label: 'Descripcion',
        component: <DescriptionForm />,
    },
    {
        label: 'Pie de Pagina',
        component: <FooterForm />,
    },
    {
        label: 'Enviar Datos',
        component: <ComponentFive />,
    },
];

export const AdminStepper = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    // Variables de estado desde el store
    const { formMainData, historyFormData, descriptionFormData, footerFormData } = useAdminStore();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const isNextButtonDisabled = () => {
        switch (activeStep) {
            case 0:
                return !formMainData;
            // return false;
            case 1:
                return !historyFormData;
            // return false;
            case 2:
                return !descriptionFormData;
            // return false;
            case 3:
                return !footerFormData;
            default:
                return false;
        }
    };

    return (
        <div className='px-10'>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === steps.length - 1 ? (
                                    <Typography variant="caption">Último paso</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {step.component} {/* Muestra el componente en lugar de la descripción */}
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                    disabled={isNextButtonDisabled()}
                                >
                                    {index === steps.length - 1 ? 'Finalizar' : 'Continuar'}
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Atrás
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {/* {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>Todos los pasos completados - ¡has terminado!</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reiniciar
                    </Button>
                </Paper>
            )} */}
        </div>
    );
};
