import { Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { Datos } from '../../types';
import { OrderItems } from './OrderItems';
import { useSocketStore } from '../../store/useSocketStore';

export const Orden = () => {


    const { socketData, online } = useSocketStore();
    const [orden, setOrden] = React.useState<Datos>();

    useEffect(() => {
        setOrden(socketData?.cocina);
    }, [socketData?.cocina]);


    return (
        <>
            {
                online
                    ? (<section className="px-8 py-4">
                        <div className="container mx-auto text-center">
                            <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-4"><Divider>Ordenes</Divider></h2>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-normal !text-gray-500">Aquí tendrá la lista de ordenes. Cuando complete alguna de click en
                                <span style={{ fontWeight: 600, color: '#000', textDecoration: 'underline', marginLeft: '5px' }}>Terminada
                                </span>
                            </p>
                        </div>
                        <OrderItems
                            orders={orden || {} as Datos}
                        />
                    </section>)
                    : (<p>Loading...</p>)
            }
        </>

    );
};
