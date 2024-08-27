import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocketStore } from '../../store/useSocketStore';
import { MesasItems } from './MesasItems';

export const Mesas = () => {

    const { online, socketData, meseroLogin, socket } = useSocketStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!meseroLogin) {
            navigate('/mesero');
        }

    }, [meseroLogin]);

    const handleClick = () => {
        socket.emit('mesero-logout', { logged: false });
        navigate('/mesero');
    };

    return (
        <>
            {!online ? (
                <p>loading....</p>
            ) : (
                <div className="bg-gray-900 min-h-screen flex items-center justify-center">

                    <div className="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
                        <div className="flex-1 px-2 sm:px-0">
                            <div className='pl-11 flex justify-end px-2'>
                                <IconButton aria-label="delete" onClick={handleClick}>
                                    <Close htmlColor='red' />
                                </IconButton>
                            </div>
                            <div className="flex justify-center items-center">
                                <h3 className="text-3xl font-extralight text-white/50 text-center">Mesas</h3>



                            </div>
                            <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {
                                    socketData?.mesas.map((item, index) => (
                                        <MesasItems
                                            {...item}
                                            key={index}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

