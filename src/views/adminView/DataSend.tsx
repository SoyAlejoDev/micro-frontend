import { Image, Send, Verified } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useAdminStore } from '../../store/useAdminStore';
import { useSocketStore } from '../../store/useSocketStore';
import admin_send_data from '../../assets/cohete.gif';
import Swal from 'sweetalert2';
import { useState } from 'react';

export const DataSend = () => {
    const {
        descriptionFormData: characteristics,
        footerFormData: footer,
        formMainData: main,
        historyFormData: history
    } = useAdminStore();

    const mesas = useAdminStore(state => state.formMainData?.mesas ?? []);
    const { socket } = useSocketStore();

    const [envioData, setEnvioData] = useState(false);

    const resumeData = { characteristics, footer, main, history, mesas };

    const onClick = () => {
        Swal.fire({
            text: "Estas seguro/a que quieres enviar los datos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ya esta terminada!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Datos Enviados',
                    '',
                    'success'
                );
                console.log(resumeData);
                socket.emit('formularios-web', resumeData);
                setEnvioData(true);
            }
        });

    };

    return (
        <Paper elevation={3} sx={{ p: 4 }}>
            <div className='flex justify-evenly'>
                <div className='flex flex-col gap-10 justify-center' >
                    <Typography variant='h3'>Enviar todos los datos a la base de datos</Typography>
                    <div className='flex justify-end w-full'>
                        {
                            !envioData ? (
                                <Button
                                    variant='outlined'
                                    startIcon={<Send />}
                                    onClick={onClick}
                                    sx={{ textTransform: 'none' }}
                                >Enviar Datos</Button>
                            ) : (
                                <div className='flex gap-2 items-center'>
                                    <Typography variant='subtitle1'>Datos enviados correctamente</Typography>
                                    <Verified color='success' />
                                </div>
                            )
                        }
                    </div>
                </div>

                <Box
                    component="img"
                    sx={{
                        width: '320px',
                        height: '100%',
                        maxWidth: '100%',
                        objectFit: 'cover',
                    }}
                    src={admin_send_data}
                />
            </div>
        </Paper>
    );
};