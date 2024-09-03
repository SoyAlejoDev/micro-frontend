import { yupResolver } from "@hookform/resolvers/yup";
import { Verified } from "@mui/icons-material";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { ImageUploader } from "../../../components/imageUploader/ImageUploader";
import { IFormFooter } from "../../../types";
import { useAdminStore } from "../../../store/useAdminStore";

const footerSchema = yup.object({
    name: yup.string().required('El nombre es requerido'),
    email: yup.string().email('El correo debe ser válido').required('El correo es requerido'),
    logo: yup.string().nullable().required('El logo es requerido'),
    facebook: yup.string().required('El Facebook es requerido'),
    instagram: yup.string().required('El Instagram es requerido'),
    phone: yup.string().required('El número es requerido'),
}).required();




// Componente Footer Form
export const FooterForm: React.FC<{ onSubmit: SubmitHandler<IFormFooter>; }> = ({ onSubmit }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormFooter>({
        resolver: yupResolver(footerSchema),
    });

    const { footerFormData } = useAdminStore();


    return (
        <div>
            <Divider sx={{ marginY: "24px" }}>
                <div className="flex items-center gap-3">
                    <Typography variant="h6" sx={{ margin: 0 }}>Formulario Pie de Pagina</Typography>
                    {
                        footerFormData && <Verified color="success" />
                    }
                </div>
            </Divider>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="flex gap-3">
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
                </div>
                <div className="flex gap-3">
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
                </div>
                <div className="flex gap-3 mt-2">
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
                    />
                    <div className="w-full flex items-center">
                        <ImageUploader
                            setFileBase64={(base64 = '') => setValue('logo', base64)}
                            fileBase64={null}
                        />

                        {errors.logo && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {errors.logo.message}
                            </Typography>
                        )}
                    </div>
                </div>



                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <Button
                        startIcon={<Verified />}
                        sx={{ textTransform: 'none' }}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Comprobar
                    </Button>
                </div>
            </form>
        </div>
    );
};
