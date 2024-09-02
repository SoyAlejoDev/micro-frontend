import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, Verified } from "@mui/icons-material";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from 'yup';
import { ImageUploader } from "../../../components/imageUploader/ImageUploader";

const descriptionSchema = yup.object({
    items: yup.array().of(
        yup.object({
            logo: yup.string().required('El logo es requerido'),
            item: yup.string().required('El item es requerido'),
            text: yup.string().required('El texto es requerido'),
        })
    ).min(1, 'Debe haber al menos un elemento'),
}).required();

interface DescriptionFormInputs {
    items: { logo: string | null; item: string; text: string; }[];
}

// Componente Description Form (Formulario Características)
export const DescriptionForm: React.FC<{ onSubmit: SubmitHandler<DescriptionFormInputs>; }> = ({ onSubmit }) => {


    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<DescriptionFormInputs>({
        resolver: yupResolver(descriptionSchema),
        defaultValues: {
            items: [{ logo: null, item: '', text: '' }] // Inicia con un formulario
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    const handleFileBase64Change = (index: number, base64: string | null) => {
        setValue(`items.${index}.logo`, base64);
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
                            size="small"
                            autoComplete="none"
                        />
                        <TextField
                            fullWidth
                            label={`Texto ${index + 1}`}
                            variant="outlined"
                            {...register(`items.${index}.text` as const)}
                            error={!!errors.items?.[index]?.text}
                            helperText={errors.items?.[index]?.text?.message}
                            margin="normal"
                            autoComplete="none"
                            multiline
                            rows={2}
                        />

                        {/* Uso de ImageUploader en lugar del botón de subir logo */}
                        <Box sx={{ mt: 2 }}>
                            <ImageUploader
                                setFileBase64={(base64) => handleFileBase64Change(index, base64)}
                                fileBase64={field.logo}
                            />
                            {errors.items?.[index]?.logo && (
                                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                    {errors.items?.[index]?.logo?.message}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ))}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                        color="success"
                        variant="outlined"
                        onClick={() => append({ logo: null, item: '', text: '' })}
                        sx={{ textTransform: 'none' }}
                        startIcon={<Add />}
                    >
                        Añadir Item
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => remove(fields.length - 1)}
                        sx={{ textTransform: 'none' }}
                        startIcon={<Delete />}
                        disabled={fields.length === 1}
                    >
                        Eliminar Último Item
                    </Button>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Button
                        startIcon={<Verified />}
                        sx={{ textTransform: 'none' }} variant="contained" color="primary" type="submit" fullWidth>
                        Comprobar
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};
