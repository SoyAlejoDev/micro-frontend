import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';

// Definir los tipos de datos para el formulario
interface CantMesasFormInputs {
    numberOfTables: number;
}

// Esquema de validación con yup
const schema = yup.object({
    numberOfTables: yup
        .number()
        .typeError('Debe ser un número')
        .required('La cantidad de mesas es requerida')
        .min(1, 'Debe haber al menos 1 mesa')
}).required();

export const CantMesas: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CantMesasFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<CantMesasFormInputs> = (data) => {
        const mesas = Array.from({ length: data.numberOfTables }, (_, index) => ({
            id: index + 1,
            mesa: `Mesa ${index + 1}`,
            bussy: false,
        }));

        console.log(mesas);
        // Aquí puedes manejar la data como desees, por ejemplo, enviarla a una API
    };

    return (
        <div className='flex justify-center items-center h-full'>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                    Cantidad de Mesas
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Cantidad de Mesas"
                        variant="outlined"
                        type="number"
                        size='small'
                        {...register('numberOfTables')}
                        error={!!errors.numberOfTables}
                        helperText={errors.numberOfTables?.message}
                        margin="normal"
                    />
                    <Box sx={{ mt: 3 }}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Generar Mesas
                        </Button>
                    </Box>
                </form>
            </Paper>
        </div>
    );
};
