import { Send } from '@mui/icons-material';
import { Button, Paper, Typography } from '@mui/material';
import { useAdminStore } from '../../store/useAdminStore';
import { useSocketStore } from '../../store/useSocketStore';

export const DataSend = () => {
    const { descriptionFormData: characteristics, footerFormData: footer, formMainData: main, historyFormData: history } = useAdminStore();
    //@ts-ignore
    const { formMainData: { mesas } } = useAdminStore();
    const { socket } = useSocketStore();

    const resumeData = { characteristics, footer, main, history, mesas };


    const onClick = () => {
        console.log(resumeData);
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
