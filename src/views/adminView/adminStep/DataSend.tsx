import { Send } from '@mui/icons-material';
import { Button, Paper, Typography } from '@mui/material';
import { useAdminStore } from '../../../store/useAdminStore';
import { useSocketStore } from '../../../store/useSocketStore';

export const DataSend = () => {
    const { descriptionFormData, footerFormData, formMainData, historyFormData } = useAdminStore();
    const { socket } = useSocketStore();
    const formMainDataString = JSON.stringify(formMainData);

    const resumeData = { descriptionFormData, footerFormData, formMainDataString, historyFormData };


    const onClick = () => {
        socket.emit('formularios-web', resumeData);
    };
    return (
        <Paper elevation={3} sx={{ p: 4 }}>
            <Typography>Enviar todos los datos a la base de datos</Typography>
            <Button
                variant='outlined'
                startIcon={<Send />}
                onClick={onClick}
            >Enviar</Button>
        </Paper>
    );
};
