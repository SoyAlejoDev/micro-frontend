import { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Paper, TextField, Button, Typography, Box, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

// Definición de los tipos de datos para cada formulario
interface HistoryFormInputs {
    title: string;
    description: string;
    image: string | null;
}

interface DescriptionFormInputs {
    items: { logo: string | null; item: string; text: string; }[];
}

interface FooterFormInputs {
    name: string;
    email: string;
    logo: string | null;
    facebook: string;
    instagram: string;
    phone: string;
}

// Esquemas de validación con yup
const historySchema = yup.object({
    title: yup.string().required('El título es requerido'),
    description: yup.string().required('La descripción es requerida'),
    image: yup.string().required('La imagen es requerida'),
}).required();

const descriptionSchema = yup.object({
    items: yup.array().of(
        yup.object({
            logo: yup.string().required('El logo es requerido'),
            item: yup.string().required('El item es requerido'),
            text: yup.string().required('El texto es requerido'),
        })
    ).min(1, 'Debe haber al menos un elemento'),
}).required();

const footerSchema = yup.object({
    name: yup.string().required('El nombre es requerido'),
    email: yup.string().email('El correo debe ser válido').required('El correo es requerido'),
    logo: yup.string().required('El logo es requerido'),
    facebook: yup.string().url('Debe ser una URL válida').required('El Facebook es requerido'),
    instagram: yup.string().url('Debe ser una URL válida').required('El Instagram es requerido'),
    phone: yup.string().required('El número es requerido'),
}).required();

// Función para convertir imagen a Base64
const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

// Componente History Form
const HistoryForm: React.FC<{ onSubmit: SubmitHandler<HistoryFormInputs>; }> = ({ onSubmit }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<HistoryFormInputs>({
        resolver: yupResolver(historySchema),
    });

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const base64 = await convertToBase64(files[0]);
            setValue('image', base64 as string);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6">Formulario History</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    label="Título"
                    variant="outlined"
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Descripción"
                    variant="outlined"
                    {...register('description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2 }}
                >
                    Subir Imagen
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
                {errors.image && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {errors.image.message}
                    </Typography>
                )}
                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Enviar
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

// Componente Description Form (Formulario Características)
const DescriptionForm: React.FC<{ onSubmit: SubmitHandler<DescriptionFormInputs>; }> = ({ onSubmit }) => {
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<DescriptionFormInputs>({
        resolver: yupResolver(descriptionSchema),
        defaultValues: {
            items: [{ logo: null, item: '', text: '' }] // Inicia con un formulario
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: 'items',
    });

    const handleLogoChange = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const base64 = await convertToBase64(files[0]);
            setValue(`items.${index}.logo`, base64 as string);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6">Formulario Características</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <Box key={field.id} sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label={`Item ${index + 1}`}
                            variant="outlined"
                            {...register(`items.${index}.item` as const)}
                            error={!!errors.items?.[index]?.item}
                            helperText={errors.items?.[index]?.item?.message}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label={`Texto ${index + 1}`}
                            variant="outlined"
                            {...register(`items.${index}.text` as const)}
                            error={!!errors.items?.[index]?.text}
                            helperText={errors.items?.[index]?.text?.message}
                            margin="normal"
                            multiline
                            rows={2}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mt: 2 }}
                        >
                            Subir Logo
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => handleLogoChange(index, e)}
                            />
                        </Button>
                        {errors.items?.[index]?.logo && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {errors.items?.[index]?.logo?.message}
                            </Typography>
                        )}
                    </Box>
                ))}
                <IconButton
                    onClick={() => append({ logo: null, item: '', text: '' })}
                    sx={{ mt: 2 }}
                >
                    <Add />
                </IconButton>
                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Enviar
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

// Componente Footer Form
const FooterForm: React.FC<{ onSubmit: SubmitHandler<FooterFormInputs>; }> = ({ onSubmit }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FooterFormInputs>({
        resolver: yupResolver(footerSchema),
    });

    const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const base64 = await convertToBase64(files[0]);
            setValue('logo', base64 as string);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6">Formulario Footer</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    label="Nombre"
                    variant="outlined"
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Correo"
                    variant="outlined"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Facebook"
                    variant="outlined"
                    {...register('facebook')}
                    error={!!errors.facebook}
                    helperText={errors.facebook?.message}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Instagram"
                    variant="outlined"
                    {...register('instagram')}
                    error={!!errors.instagram}
                    helperText={errors.instagram?.message}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Número"
                    variant="outlined"
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2 }}
                >
                    Subir Logo
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleLogoChange}
                    />
                </Button>
                {errors.logo && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {errors.logo.message}
                    </Typography>
                )}
                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Enviar
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

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
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Componente HCF</Typography>
            <HistoryForm onSubmit={handleHistorySubmit} />
            <DescriptionForm onSubmit={handleDescriptionSubmit} />
            <FooterForm onSubmit={handleFooterSubmit} />
        </Box>
    );
};
