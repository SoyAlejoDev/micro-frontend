import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

interface ProfileObj {
    googleId: string;
    imageUrl: string;
    email: string;
    name: string;
    givenName: string;
    familyName: string;
}

interface FormInputs {
    email: string;
    password: string;
}


export function MeseroForm() {
    const clientID = import.meta.env.VITE_OAUTH_ID_CLIENT;
    const navigate = useNavigate();

    const { checkMesero, meseroLogin } = useAuthStore();

    const [user, setUser] = useState<ProfileObj | undefined>();
    const [error, setError] = useState("");

    const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onGoogleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        // console.log(response);
        if ('profileObj' in response) {
            setUser(response.profileObj);
            checkMesero(response.profileObj.email);
        }
    };

    const onGoogleFailure = (error: any) => {
        console.log("Google Sign In was unsuccessful. Try again later", error);
        setError("Google Sign In failed. Please try again.");
    };

    const onSubmit = (data: FormInputs) => {

        // Aquí debería implementar la lógica de autenticación con el backend
        // Por ahora, solo verifico si el email está en el array de meseros
        setUser({
            googleId: "",
            imageUrl: "",
            email: data.email,
            name: data.email.split("@")[0],
            givenName: "",
            familyName: ""
        });
        checkMesero(data.email);
    };

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: clientID,
                scope: "",
            });
        };

        gapi.load("client:auth2", start);
    }, []);

    useEffect(() => {
        if (meseroLogin) {
            navigate('/mesas');
        } else if (user) {
            setError("No tienes permisos de mesero.");
        }
    }, [meseroLogin, user, navigate]);

    return (
        <Container component="main" sx={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper
                elevation={3}
                sx={{ p: 4 }}
            >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Registro | Mesero
                    </Typography>

                    <>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        size="small"
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        autoComplete="email"
                                        autoFocus
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        size="small"
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Entrar
                            </Button>
                        </Box>

                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2, mb: 2 }}>
                            OR
                        </Typography>

                        <GoogleLogin
                            clientId={clientID}
                            onSuccess={onGoogleSuccess}
                            onFailure={onGoogleFailure}
                            buttonText="Continue with Google"
                            cookiePolicy={"single_host_origin"}
                        />
                    </>

                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}