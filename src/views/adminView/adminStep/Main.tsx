import { yupResolver } from '@hookform/resolvers/yup';
import { Help, Verified } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ImageUploader } from '../../../components/imageUploader/ImageUploader';

interface IFormInput {
    title: string;
    description: string;
    imageBase64: string;
    tablesCount: number;
}

const schema = yup.object({
    title: yup.string().required('El título es requerido'),
    description: yup.string().required('La descripción es requerida'),
    imageBase64: yup.string().required('La imagen es requerida'),
    tablesCount: yup
        .number()
        .required('La cantidad de mesas es requerida')
        .min(1, 'Debe haber al menos una mesa')
}).required();

export const Main: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>({
        resolver: yupResolver(schema),
        defaultValues: {
            tablesCount: 1,  // Valor por defecto para cantidad de mesas
        },
    });
    const [fileBase64, setFileBase64] = React.useState<string | null>(null);

    const onSubmit: SubmitHandler<IFormInput> = data => {
        const tables = Array.from({ length: data.tablesCount }, (_, i) => ({
            id: i + 1,
            mesa: `Mesa ${i + 1}`,
            bussy: false,
        }));

        const finalData = {
            ...data,
            mesas: tables,
        };

        console.log(finalData);
    };

    React.useEffect(() => {
        if (fileBase64) {
            setValue('imageBase64', fileBase64);
        }
    }, [fileBase64, setValue]);

    return (
        <div className='flex justify-center items-center h-full'>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Presentacion
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            label="Título"
                            variant="outlined"
                            {...register('title')}
                            size='small'
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            margin="normal"
                            autoComplete='none'
                        />
                        <Tooltip title="Ayuda" arrow placement="right-start">
                            <Help htmlColor='gray' />
                        </Tooltip>
                    </div>
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
                    <TextField
                        fullWidth
                        label="Cantidad de Mesas"
                        variant="outlined"
                        size='small'
                        type="number"
                        {...register('tablesCount')}
                        error={!!errors.tablesCount}
                        helperText={errors.tablesCount?.message}
                        margin="normal"
                        InputProps={{
                            inputProps: {
                                min: 1,
                            },
                        }}
                    />

                    <Box sx={{ mt: 2 }}>
                        <ImageUploader
                            setFileBase64={setFileBase64}
                            fileBase64={fileBase64}
                        />
                        {errors.imageBase64 && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {errors.imageBase64.message}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Button
                            startIcon={<Verified />}
                            variant="contained" color="primary" type="submit" fullWidth sx={{ textTransform: 'none' }}>
                            Comprobar
                        </Button>
                    </Box>
                </form>
            </Paper>
        </div>
    );
};
