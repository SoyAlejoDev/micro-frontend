import { Box } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { DescriptionForm } from './DescriptionForm';
import { FooterForm } from './FooterForm';
import { HistoryForm } from './HistoryForm';
import { Flex } from 'antd';

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
export const HCF: React.FC = () => {
    const [historyData, setHistoryData] = useState<HistoryFormInputs | null>(null);
    const [descriptionData, setDescriptionData] = useState<DescriptionFormInputs | null>(null);
    const [footerData, setFooterData] = useState<FooterFormInputs | null>(null);

    const handleHistorySubmit: SubmitHandler<HistoryFormInputs> = (data) => {
        setHistoryData(data);
        console.log("History Data:", data);
    };

    const handleDescriptionSubmit: SubmitHandler<DescriptionFormInputs> = (data) => {
        setDescriptionData(data);
        console.log("Description Data:", data);
    };

    const handleFooterSubmit: SubmitHandler<FooterFormInputs> = (data) => {
        setFooterData(data);
        console.log("Footer Data:", data);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ p: 2 }}>
                <HistoryForm onSubmit={handleHistorySubmit} />
                <DescriptionForm onSubmit={handleDescriptionSubmit} />
                <FooterForm onSubmit={handleFooterSubmit} />
            </Box>
        </div>
    );
};
