import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { DescriptionForm } from './DescriptionForm';
import { FooterForm } from './FooterForm';
import { HistoryForm } from './HistoryForm';
import { Flex } from 'antd';
import { useAdminStore } from '../../../store/useAdminStore';

// Definición de los tipos de datos para cada formulario
interface HistoryFormInputs {
    title: string;
    description: string;
    image: string | null;
}


interface FooterFormInputs {
    name: string;
    email: string;
    logo: string | null;
    facebook: string;
    instagram: string;
    phone: string;
}

interface DescriptionFormInputs {
    items: { logo: string | null; item: string; text: string; }[];
}


// Componente principal HCF
export const HCF: React.FC = (ref) => {

    const { setHistoryFormData, setFooterFormData, setDescriptionFormData } = useAdminStore();


    const handleHistorySubmit: SubmitHandler<HistoryFormInputs> = (data) => {
        setHistoryFormData(data);
    };

    const handleDescriptionSubmit: SubmitHandler<DescriptionFormInputs> = (data) => {
        setDescriptionFormData(data);
    };

    const handleFooterSubmit: SubmitHandler<FooterFormInputs> = (data) => {
        setFooterFormData(data);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0px', }}>
            <Paper elevation={3}>
                <div className='p-5 lg:w-[900px]'>
                    <HistoryForm onSubmit={handleHistorySubmit} />
                    <DescriptionForm onSubmit={handleDescriptionSubmit} />
                    <FooterForm onSubmit={handleFooterSubmit} />
                </div>
            </Paper>
        </div>
    );
};
