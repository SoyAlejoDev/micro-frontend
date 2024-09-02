import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { Verified } from "@mui/icons-material";
import { ImageUploader } from "../../../components/imageUploader/ImageUploader";

const footerSchema = yup.object({
    name: yup.string().required('El nombre es requerido'),
    email: yup.string().email('El correo debe ser válido').required('El correo es requerido'),
    logo: yup.string().required('El logo es requerido'),
    facebook: yup.string().url('Debe ser una URL válida').required('El Facebook es requerido'),
    instagram: yup.string().url('Debe ser una URL válida').required('El Instagram es requerido'),
    phone: yup.string().required('El número es requerido'),
}).required();

interface FooterFormInputs {
    name: string;
    email: string;
    logo: string | null;
    facebook: string;
    instagram: string;
    phone: string;
}

// Componente Footer Form
export const FooterForm: React.FC<{ onSubmit: SubmitHandler<FooterFormInputs>; }> = ({ onSubmit }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FooterFormInputs>({
        resolver: yupResolver(footerSchema),
    });


    return (
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h6">Formulario de Pie de Página</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    label="Nombre"
                    size="small"
                    autoComplete="none"
                    variant="outlined"
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Correo"
                    size="small"
                    autoComplete="none"
                    variant="outlined"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Facebook"
                    size="small"
                    autoComplete="none"
                    variant="outlined"
                    {...register('facebook')}
                    error={!!errors.facebook}
                    helperText={errors.facebook?.message}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Instagram"
                    size="small"
                    autoComplete="none"
                    variant="outlined"
                    {...register('instagram')}
                    error={!!errors.instagram}
                    helperText={errors.instagram?.message}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Número"
                    size="small"
                    type="number"
                    autoComplete="none"
                    variant="outlined"
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    margin="normal"
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <ImageUploader
                            setFileBase64={(base64) => setValue('logo', base64)}
                            fileBase64={null}
                        />

                        {errors.logo && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {errors.logo.message}
                            </Typography>
                        )}
                    </Box>

                    <Box>
                        <Button
                            startIcon={<Verified />}
                            sx={{ textTransform: 'none' }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Comprobar
                        </Button>
                    </Box>
                </div>
            </form>
        </Paper>
    );
};
