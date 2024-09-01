import { Close } from '@mui/icons-material';
import Grading from '@mui/icons-material/Grading';
import ReplyAll from '@mui/icons-material/ReplyAll';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Orden } from '../types';
import { useSocketStore } from '../store/useSocketStore';



interface Props {
    orderTable: Orden | undefined;
}

export const FabSaveOrBack = ({ orderTable }: Props) => {

    const navigate = useNavigate();
    const { ordersByTable, socket, clearOrderForTable } = useSocketStore();

    const { pathname } = useLocation();

    const tableId = pathname.split('/').slice(2).join('/');

    const sendData = () => {
        const serializedData = JSON.stringify(orderTable);
        console.log(orderTable);
        socket.emit('saveOrder', orderTable);
    };

    const handleClick = (value: number) => {
        if (value === 0) {
            if (Object.keys(ordersByTable).length == 0) {
                swal("Error", "No hay orden para guardar", "error").then(() => {
                    return;
                });
            } else {
                sendData();
                swal("Orden Lista", "Esta orden se enviará a la cocina", "success").then(() => {
                    navigate(`/mesas`);
                });
            }

        } else if (value === 1) {
            navigate(`/mesas`);
        } else if (value === 2) {

            if (Object.keys(ordersByTable).length !== 0) {
                swal({
                    text: "Estas seguro(a) que deseas eliminar esta orden?",
                    icon: "warning",
                    buttons: [true, true],
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal("Esta orden ha sido eliminada", {
                                icon: "success",
                            }).then(() => {
                                clearOrderForTable(Number(tableId));
                                navigate(`/mesas`);
                            });
                        } else {
                            swal("La orden no se llegó a eliminar!").then(() => {
                            });
                        }
                    });
            } else
                swal("Error", "No hay orden para eliminar", "error").then(() => {
                    return;
                });

        }
    };


    const actions = [
        { icon: <Grading color='primary' />, name: 'Save' },
        { icon: <ReplyAll htmlColor='green' />, name: 'Back' },
        { icon: <Close color='error' />, name: 'Close' },
    ];

    return (
        <>

            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                }}
            >
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action, index) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => handleClick(index)}

                        />
                    ))}
                </SpeedDial>
            </Box>
        </>
    );
};

