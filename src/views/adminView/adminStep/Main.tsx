import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';

interface IFormInput {
    title: string;
    description: string;
    image: FileList | null;
}

const schema = yup.object({
    title: yup.string().required('El título es requerido'),
    description: yup.string().required('La descripción es requerida'),
    image: yup
        .mixed()
        .test('fileRequired', 'La imagen es requerida', (value) => {
            return value && value.length > 0;
        }),
}).required();

export const Main: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data);
        // Aquí puedes manejar el envío del formulario, como enviarlo a una API
    };

    return (
        <div className='flex justify-center items-center h-full'>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Formulario
                </Typography>
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
                            {...register('image')}
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
        </div>
    );
};
