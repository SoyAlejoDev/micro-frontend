import { Close } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useSocketStore } from '../../store/useSocketStore';
import { Loading } from '../loading/Loading';
import { MesasItems } from './MesasItems';

export const Mesas = () => {
    const { online, socketData } = useSocketStore();
    const { meseroLogin, logoutMesero } = useAuthStore();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!meseroLogin) {
            navigate('/mesero');
        }
    }, [meseroLogin, navigate]);

    const handleClick = () => {
        logoutMesero();
        navigate('/mesero');
    };

    if (!online) {
        return <Loading />;
    }

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
                <div className="flex-1 px-2 sm:px-0">
                    <div className='pl-11 flex justify-end px-2'>
                        <button
                            className="p-2 rounded-full hover:bg-gray-600 transition-colors"
                            onClick={handleClick}
                            aria-label="Cerrar"
                        >
                            <Close />
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <h3 className="text-3xl font-extralight text-white/50 text-center">Mesas</h3>
                    </div>
                    <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {socketData ? (
                            socketData.mesas.map((item, index) => (
                                <MesasItems {...item} key={index} />
                            ))
                        ) : (
                            // Skeleton UI
                            Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="bg-gray-700 rounded-lg p-4 animate-pulse">
                                    <div className="h-24 bg-gray-600 rounded-md mb-4"></div>
                                    <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};