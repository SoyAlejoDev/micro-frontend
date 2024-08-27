import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useSocketStore } from '../../store/useSocketStore';
import { Datos } from '../../types';


interface Props {
    orders: Datos;
}


export const OrderItems = ({ orders }: Props) => {

    const { socket } = useSocketStore();

    const handleClick = (mesa: string) => {
        Swal.fire({
            // title: 'Are you sure?',
            text: "Estas seguro/a que ya terminaste esta orden?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ya esta terminada!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Orden Terminada',
                    '',
                    'success'
                );
                console.log(mesa);
                socket?.emit('orden-lista', { mesa });
            }
        });
    };


    return (
        <div className="mt-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(orders).map(([mesa, secciones]) => (
                    <div key={mesa} className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-blue-gray-100">
                        <div className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-3">
                            <h5 className="block antialiased tracking-normal font-sans text-sm font-semibold leading-snug text-blue-gray-900 capitalize">Mesa: {mesa}</h5>
                        </div>
                        <div className="p-3 border-t border-blue-gray-50">
                            <ul className="flex flex-col gap-3">
                                {Object.entries(secciones).map(([seccion, items]) => (
                                    <li key={seccion}>
                                        <h6 className="font-light text-blue-gray-900">{seccion}</h6>
                                        <ul className="pl-4">
                                            {items.map(item => (
                                                <li key={item.id} className="flex items-center gap-3 text-gray-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-gray-900">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                                    </svg>
                                                    <p className="block antialiased font-sans text-pretty leading-normal font-bold text-inherit">
                                                        {item.nombre} x{item.cantidad}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>

                                    </li>
                                ))}
                            </ul>
                            <Button
                                variant='outlined'
                                color='success'
                                sx={{ textTransform: 'none', marginTop: '10px', borderRadius: '0.75rem' }}
                                size='small'
                                fullWidth
                                onClick={() => handleClick(mesa)}
                            >
                                Terminada
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};