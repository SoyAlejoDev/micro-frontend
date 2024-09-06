import { yupResolver } from '@hookform/resolvers/yup';
import { Help, Verified } from '@mui/icons-material';
import { Box, Button, Paper, TextField, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ImageUploader } from '../../../components/imageUploader/ImageUploader';
import { IFormMain } from '../../../types';
import { useAdminStore } from '../../../store/useAdminStore';
import _ from 'lodash';

const schema = yup.object({
    title: yup.string().required('El título es requerido'),
    description: yup.string().required('La descripción es requerida'),
    imageBase64: yup.string().required('La imagen es requerida'),
    tablesCount: yup.string().required('La cantidad de mesas es requerida')
}).required();

export const Main = () => {
    const { setFormMainData, formMainData, removeFormMainData } = useAdminStore();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<IFormMain>({
        resolver: yupResolver(schema),
    });
    const [fileBase64, setFileBase64] = React.useState<string | null>('');

    const onSubmit: SubmitHandler<IFormMain> = data => {
        if (Number(data.tablesCount)) {
            const tables = Array.from({ length: Number(data.tablesCount) }, (_, i) => ({
                id: i + 1,
                mesa: `Mesa ${i + 1}`,
                bussy: false,
            }));

            //@ts-ignore
            setValue('mesas', tables, { shouldValidate: true });

            const updatedData = {
                ...data,
                mesas: tables,
            };
            setFormMainData(updatedData);
        }
    };

    const formValues = watch();

    React.useEffect(() => {

        if (!_.isEqual(formValues, formMainData)) {
            formMainData && removeFormMainData();
        }
    }, [formValues]);

    React.useEffect(() => {
        if (fileBase64) {
            setValue('imageBase64', fileBase64);
        }
    }, [fileBase64, setValue]);

    return (
        <div className=''>
            <Paper elevation={3} sx={{ p: 4 }}>
                <div className='flex items-center gap-3 justify-center'>
                    <Typography variant="h6" gutterBottom sx={{ margin: 0 }}>
                        Presentacion
                    </Typography>
                    {formMainData && <Verified color='success' />}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
                        <Tooltip title="Aqui va el titulo principal de la pagina web" arrow placement="top">
                            <Help htmlColor='gray' />
                        </Tooltip>
                    </div>
                    <div className='flex gap-2 items-start'>
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
                        <Tooltip sx={{ mt: 2 }} title="Foto para fondo de la pantalla principal" arrow placement="top">
                            <Help htmlColor='gray' />
                        </Tooltip>
                    </div>
                    <div className='flex gap-3'>
                        <TextField
                            fullWidth
                            label="Cantidad de Mesas"
                            variant="outlined"
                            size='small'
                            type='number'
                            {...register('tablesCount')}
                            error={!!errors.tablesCount}
                            helperText={errors.tablesCount?.message}
                            margin="normal"
                        />

                        <Box sx={{ mt: 2, width: '100%' }}>
                            <div className='flex gap-3 items-center'>
                                <ImageUploader
                                    setFileBase64={setFileBase64}
                                    fileBase64={fileBase64}
                                />
                                <Tooltip title="Foto para fondo de la pantalla principal" arrow placement="top">
                                    <Help htmlColor='gray' />
                                </Tooltip>
                            </div>
                            {errors.imageBase64 && (
                                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                    {errors.imageBase64.message}
                                </Typography>
                            )}
                        </Box>
                    </div>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            startIcon={<Verified />}
                            variant="contained" color="primary" type="submit" sx={{ textTransform: 'none' }}>
                            Comprobar
                        </Button>
                    </Box>
                </form>
            </Paper>
        </div>
    );
};
