import { Alert, Button, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSocketStore } from '../../store/useSocketStore';
import { Close } from '@mui/icons-material';

interface User {
    user: string;
    password: string;
}

export const MeseroForm = () => {
    const { handleSubmit, control, formState: { errors, isValid } } = useForm<User>();
    const { socket, meseroLogin } = useSocketStore();

    const onSubmit: SubmitHandler<User> = data => {
        socket?.emit('mesero-login', data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className="bg-white relative lg:py-20">
                <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row">
                    <div className="flex flex-col items-center w-full pt-5 pr-8 pb-20 pl-8 lg:pt-20 lg:flex-row">
                        <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                                <img src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png" className="btn-" />
                            </div>
                        </div>
                        <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10">
                                <p className="w-full text-xl font-medium text-center leading-snug font-serif">Iniciar sesión Mesero</p>
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                    <div className="relative">

                                        <Controller
                                            name="user"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'El usuario es requerido' }}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Usuario"
                                                    fullWidth
                                                    variant="outlined"
                                                    size='small'
                                                    error={!!errors.user}
                                                    helperText={errors.user ? errors.user.message : ''}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="relative">
                                        <Controller
                                            name="password"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'la contraseña es requerida' }}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Contraseña"
                                                    variant="outlined"
                                                    fullWidth
                                                    size='small'
                                                    type='password'
                                                    error={!!errors.password}
                                                    helperText={errors.password ? errors.password.message : ''}
                                                />
                                            )}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={!isValid}
                                        fullWidth
                                    >
                                        Aceptar
                                    </Button>

                                    {
                                        meseroLogin == false && (
                                            <div className='flex bg-red-100'>
                                                <Close color='error' />
                                                <span className='text-red-600'>Credenciales incorrectas</span>
                                            </div>

                                        )
                                    }


                                </div>
                            </div>
                            <svg className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
            fill-current"><g stroke="none"  ><g ><g><g><circle
                                    cx="3.261" cy="3.445" r="2.72" /><circle cx="15.296" cy="3.445" r="2.719" /><circle cx="27.333" cy="3.445"
                                        r="2.72" /><circle cx="39.369" cy="3.445" r="2.72" /><circle cx="51.405" cy="3.445" r="2.72" /><circle cx="63.441"
                                            cy="3.445" r="2.72" /><circle cx="75.479" cy="3.445" r="2.72" /><circle cx="87.514" cy="3.445" r="2.719" /></g><g
                                                transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72" /><circle cx="15.296" cy="3.525"
                                                    r="2.719" /><circle cx="27.333" cy="3.525" r="2.72" /><circle cx="39.369" cy="3.525" r="2.72" /><circle
                                            cx="51.405" cy="3.525" r="2.72" /><circle cx="63.441" cy="3.525" r="2.72" /><circle cx="75.479" cy="3.525"
                                                r="2.72" /><circle cx="87.514" cy="3.525" r="2.719" /></g><g transform="translate(0 24)"><circle cx="3.261"
                                                    cy="3.605" r="2.72" /><circle cx="15.296" cy="3.605" r="2.719" /><circle cx="27.333" cy="3.605" r="2.72" /><circle
                                            cx="39.369" cy="3.605" r="2.72" /><circle cx="51.405" cy="3.605" r="2.72" /><circle cx="63.441" cy="3.605"
                                                r="2.72" /><circle cx="75.479" cy="3.605" r="2.72" /><circle cx="87.514" cy="3.605" r="2.719" /></g><g
                                                    transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72" /><circle cx="15.296" cy="3.686"
                                                        r="2.719" /><circle cx="27.333" cy="3.686" r="2.72" /><circle cx="39.369" cy="3.686" r="2.72" /><circle
                                            cx="51.405" cy="3.686" r="2.72" /><circle cx="63.441" cy="3.686" r="2.72" /><circle cx="75.479" cy="3.686"
                                                r="2.72" /><circle cx="87.514" cy="3.686" r="2.719" /></g><g transform="translate(0 49)"><circle cx="3.261"
                                                    cy="2.767" r="2.72" /><circle cx="15.296" cy="2.767" r="2.719" /><circle cx="27.333" cy="2.767" r="2.72" /><circle
                                            cx="39.369" cy="2.767" r="2.72" /><circle cx="51.405" cy="2.767" r="2.72" /><circle cx="63.441" cy="2.767"
                                                r="2.72" /><circle cx="75.479" cy="2.767" r="2.72" /><circle cx="87.514" cy="2.767" r="2.719" /></g><g
                                                    transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72" /><circle cx="15.296" cy="2.846"
                                                        r="2.719" /><circle cx="27.333" cy="2.846" r="2.72" /><circle cx="39.369" cy="2.846" r="2.72" /><circle
                                            cx="51.405" cy="2.846" r="2.72" /><circle cx="63.441" cy="2.846" r="2.72" /><circle cx="75.479" cy="2.846"
                                                r="2.72" /><circle cx="87.514" cy="2.846" r="2.719" /></g><g transform="translate(0 73)"><circle cx="3.261"
                                                    cy="2.926" r="2.72" /><circle cx="15.296" cy="2.926" r="2.719" /><circle cx="27.333" cy="2.926" r="2.72" /><circle
                                            cx="39.369" cy="2.926" r="2.72" /><circle cx="51.405" cy="2.926" r="2.72" /><circle cx="63.441" cy="2.926"
                                                r="2.72" /><circle cx="75.479" cy="2.926" r="2.72" /><circle cx="87.514" cy="2.926" r="2.719" /></g><g
                                                    transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72" /><circle cx="15.296" cy="3.006"
                                                        r="2.719" /><circle cx="27.333" cy="3.006" r="2.72" /><circle cx="39.369" cy="3.006" r="2.72" /><circle
                                            cx="51.405" cy="3.006" r="2.72" /><circle cx="63.441" cy="3.006" r="2.72" /><circle cx="75.479" cy="3.006"
                                                r="2.72" /><circle cx="87.514" cy="3.006" r="2.719" /></g></g></g></g></svg>
                            <svg className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
            fill-current"><g stroke="none" ><g ><g><g><circle
                                    cx="3.261" cy="3.445" r="2.72" /><circle cx="15.296" cy="3.445" r="2.719" /><circle cx="27.333" cy="3.445"
                                        r="2.72" /><circle cx="39.369" cy="3.445" r="2.72" /><circle cx="51.405" cy="3.445" r="2.72" /><circle cx="63.441"
                                            cy="3.445" r="2.72" /><circle cx="75.479" cy="3.445" r="2.72" /><circle cx="87.514" cy="3.445" r="2.719" /></g><g
                                                transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72" /><circle cx="15.296" cy="3.525"
                                                    r="2.719" /><circle cx="27.333" cy="3.525" r="2.72" /><circle cx="39.369" cy="3.525" r="2.72" /><circle
                                            cx="51.405" cy="3.525" r="2.72" /><circle cx="63.441" cy="3.525" r="2.72" /><circle cx="75.479" cy="3.525"
                                                r="2.72" /><circle cx="87.514" cy="3.525" r="2.719" /></g><g transform="translate(0 24)"><circle cx="3.261"
                                                    cy="3.605" r="2.72" /><circle cx="15.296" cy="3.605" r="2.719" /><circle cx="27.333" cy="3.605" r="2.72" /><circle
                                            cx="39.369" cy="3.605" r="2.72" /><circle cx="51.405" cy="3.605" r="2.72" /><circle cx="63.441" cy="3.605"
                                                r="2.72" /><circle cx="75.479" cy="3.605" r="2.72" /><circle cx="87.514" cy="3.605" r="2.719" /></g><g
                                                    transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72" /><circle cx="15.296" cy="3.686"
                                                        r="2.719" /><circle cx="27.333" cy="3.686" r="2.72" /><circle cx="39.369" cy="3.686" r="2.72" /><circle
                                            cx="51.405" cy="3.686" r="2.72" /><circle cx="63.441" cy="3.686" r="2.72" /><circle cx="75.479" cy="3.686"
                                                r="2.72" /><circle cx="87.514" cy="3.686" r="2.719" /></g><g transform="translate(0 49)"><circle cx="3.261"
                                                    cy="2.767" r="2.72" /><circle cx="15.296" cy="2.767" r="2.719" /><circle cx="27.333" cy="2.767" r="2.72" /><circle
                                            cx="39.369" cy="2.767" r="2.72" /><circle cx="51.405" cy="2.767" r="2.72" /><circle cx="63.441" cy="2.767"
                                                r="2.72" /><circle cx="75.479" cy="2.767" r="2.72" /><circle cx="87.514" cy="2.767" r="2.719" /></g><g
                                                    transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72" /><circle cx="15.296" cy="2.846"
                                                        r="2.719" /><circle cx="27.333" cy="2.846" r="2.72" /><circle cx="39.369" cy="2.846" r="2.72" /><circle
                                            cx="51.405" cy="2.846" r="2.72" /><circle cx="63.441" cy="2.846" r="2.72" /><circle cx="75.479" cy="2.846"
                                                r="2.72" /><circle cx="87.514" cy="2.846" r="2.719" /></g><g transform="translate(0 73)"><circle cx="3.261"
                                                    cy="2.926" r="2.72" /><circle cx="15.296" cy="2.926" r="2.719" /><circle cx="27.333" cy="2.926" r="2.72" /><circle
                                            cx="39.369" cy="2.926" r="2.72" /><circle cx="51.405" cy="2.926" r="2.72" /><circle cx="63.441" cy="2.926"
                                                r="2.72" /><circle cx="75.479" cy="2.926" r="2.72" /><circle cx="87.514" cy="2.926" r="2.719" /></g><g
                                                    transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72" /><circle cx="15.296" cy="3.006"
                                                        r="2.719" /><circle cx="27.333" cy="3.006" r="2.72" /><circle cx="39.369" cy="3.006" r="2.72" /><circle
                                            cx="51.405" cy="3.006" r="2.72" /><circle cx="63.441" cy="3.006" r="2.72" /><circle cx="75.479" cy="3.006"
                                                r="2.72" /><circle cx="87.514" cy="3.006" r="2.719" /></g></g></g></g></svg>
                        </div>
                    </div>
                </div>
            </div>



            {/* <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: 'auto', justifyContent: 'center', padding: '40px' }}>


                <Typography variant='h4'>Regístrate</Typography>


                <Controller
                    name="user"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'El usuario es requerido' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="First Name"
                            variant="outlined"
                            size='small'
                            error={!!errors.user}
                            helperText={errors.user ? errors.user.message : ''}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'la contraseña es requerida' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Last Name"
                            variant="outlined"
                            size='small'
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ''}
                        />
                    )}
                />



                <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
                    Submit
                </Button>
            </Paper> */}
        </form>
    );
};

