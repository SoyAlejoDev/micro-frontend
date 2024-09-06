import { yupResolver } from '@hookform/resolvers/yup';
import { Verified } from '@mui/icons-material';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ImageUploader } from '../../../components/imageUploader/ImageUploader';
import { useAdminStore } from '../../../store/useAdminStore';
import { HistoryFormInputs } from '../../../types';

const historySchema = yup.object({
    title: yup.string().required('El título es requerido'),
    description: yup.string().required('La descripción es requerida'),
    image: yup.string().required('La imagen es requerida'),
}).required();

export const HistoryForm = () => {
    const [fileBase64, setFileBase64] = useState<string | null>('');

    const { setHistoryFormData, historyFormData, removeHistoryFormData } = useAdminStore();

    const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm<HistoryFormInputs>({
        //@ts-ignore
        resolver: yupResolver(historySchema),
    });

    const onSubmit = (data: HistoryFormInputs) => {
        setHistoryFormData(data);
    };

    useEffect(() => {
        setValue('image', fileBase64);

    }, [fileBase64, setValue]);

    useEffect(() => {
        const subscription = watch(() => {
            removeHistoryFormData();
        });
        return () => subscription.unsubscribe();
    }, [watch, historyFormData, removeHistoryFormData]);

    return (
        <div>
            <Paper elevation={3} sx={{ p: 4 }}>
                <div className="flex items-center justify-center gap-3">
                    <Typography variant="h6" sx={{ textAlign: 'center', margin: 0 }}>Formulario Historia</Typography>
                    {
                        historyFormData && <Verified color='success' />
                    }
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-3'>
                        <div className='w-full'>
                            <TextField
                                label="Título"
                                variant="outlined"
                                size='small'
                                fullWidth
                                margin='normal'
                                {...register('title')}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                            <Box sx={{ width: '100%' }}>
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
                        </div>
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            size='small'
                            fullWidth
                            {...register('description')}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            margin='normal'
                            multiline
                            rows={3}
                        />
                    </div>



                    <div className='flex w-full justify-end'>
                        <Button
                            startIcon={<Verified />}
                            sx={{ textTransform: 'none' }} variant="contained" color="primary" type="submit" >
                            Comprobar
                        </Button>
                    </div>
                </form>
            </Paper>


        </div >
    );
};
