import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { ImageUploader } from "../../../components/imageUploader/ImageUploader";
import { Verified } from "@mui/icons-material";

interface HistoryFormInputs {
    title: string;
    description: string;
    image: string | null;
}

// Esquema de validación con yup
const historySchema = yup.object({
    title: yup.string().required('El título es requerido'),
    description: yup.string().required('La descripción es requerida'),
    image: yup.string().required('La imagen es requerida'),
}).required();

export const HistoryForm: React.FC<{ onSubmit: SubmitHandler<HistoryFormInputs>; }> = ({ onSubmit }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<HistoryFormInputs>({
        resolver: yupResolver(historySchema),
    });

    const [fileBase64, setFileBase64] = useState<string | null>(null);

    // Sincroniza el estado del fileBase64 con el valor del formulario
    useEffect(() => {
        setValue('image', fileBase64);
    }, [fileBase64, setValue]);

    return (
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6">Formulario de Historia</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    label="Título"
                    variant="outlined"
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    autoComplete="none"
                    size="small"
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

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box >
                        <ImageUploader
                            setFileBase64={setFileBase64}
                            fileBase64={fileBase64}
                        />
                        {errors.image && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {errors.image.message}
                            </Typography>
                        )}
                    </Box>

                    <Box >
                        <Button
                            startIcon={<Verified />}
                            sx={{ textTransform: 'none' }} variant="contained" color="primary" type="submit" fullWidth>
                            Comprobar
                        </Button>
                    </Box>
                </div>
            </form>
        </Paper>
    );
};
