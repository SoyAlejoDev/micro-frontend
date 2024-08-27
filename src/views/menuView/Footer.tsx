import { Send } from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Data } from '../../types';

interface Props {
    socketData: Data | null;
}


export const Footer = ({ socketData }: Props) => {

    const [fecha, setFecha] = useState<number>();

    useEffect(() => {
        const fechaActual = new Date().getFullYear();
        setFecha(fechaActual);
    }, []);

    return (
        <footer className="font-sans mb-12 relative pt-5">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    <div className="flex w-full md:w-5/12">
                        <div className="text-2xl px-4">


                            <h3 className="font-bold text-gray-900 ">Agradecemos su visita.</h3>
                            <p className="mt-2 mb-2 text-gray-600 text-sm">{`Contáctenos:`}</p>
                            <div className="flex flex-col my-2">
                                <div className='flex'>
                                    <InstagramIcon className='text-gray-400' />
                                    <p className='text-sm font-bold ml-2'>{socketData?.footer.instagram}</p>
                                </div>
                                <div className='flex'>
                                    <FacebookIcon className='text-gray-400' />
                                    <p className='text-sm font-bold ml-2'>{socketData?.footer.facebook}</p>
                                </div>
                                <div className='flex'>
                                    <CallIcon className='text-gray-400' />
                                    <p className='text-sm font-bold ml-2'>{socketData?.footer.contacto}</p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="flex w-full md:w-5/12 px-4">
                        <div className="text-2xl">
                            {/* <p className="font-bold text-gray-900 dark:text-gray-100">Subsrcibe</p> */}
                            <p className="mt-2 mb-4 text-gray-600 dark:text-gray-400 text-sm">{`Si nos quiere dejar alguna queja o sujerencia de nuestro servicio, no dude en hacerlo:`}</p>
                            <div className="my-4">
                                <form action="" className='flex flex-col items-end gap-2' >
                                    <TextField size='small' fullWidth label='Correo' placeholder='correo@correo.com' />
                                    <TextField size='small' fullWidth multiline rows={2} label="Cuerpo del Correo" />
                                    <Button variant='outlined' endIcon={<Send />} sx={{ textTransform: 'none' }} >Enviar</Button>
                                </form>

                            </div>

                        </div>
                        <hr className="my-3 md:my-6 border-gray-400" />

                    </div>
                </div>
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400 py-1">
                            &copy;
                            <span id="year">{fecha}</span>
                            <a href="wa.me/+5355891334" className="hover:underline hover:text-gray-900 sm:ml-2">Creado por .......</a>.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
