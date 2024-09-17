import { Google } from '@mui/icons-material';
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

interface ProfileObj {
    sub: string;
    picture: string;
    email: string;
    name: string;
    given_name: string;
    family_name: string;
}

interface FormInputs {
    email: string;
    password: string;
}

export function AdminForm() {
    const clientID = import.meta.env.VITE_OAUTH_ID_CLIENT;
    const navigate = useNavigate();

    const { adminLogin, checkAdmin } = useAuthStore();

    const [user, setUser] = useState<ProfileObj | null>(null);
    const [error, setError] = useState("");

    const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const handleGoogleLogin = async () => {
        try {
            const { google } = window as any;
            const client = google.accounts.oauth2.initTokenClient({
                client_id: clientID,
                scope: 'email profile',
                callback: async (response: any) => {
                    if (response.access_token) {
                        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                            headers: { Authorization: `Bearer ${response.access_token}` },
                        }).then(res => res.json());

                        setUser(userInfo);
                        checkAdmin(userInfo.email);
                    }
                },
            });
            client.requestAccessToken();
        } catch (error) {
            console.error("Google Sign In was unsuccessful. Try again later", error);
            setError("Google Sign In failed. Please try again.");
        }
    };

    const onSubmit = (data: FormInputs) => {
        setUser({
            sub: "",
            picture: "",
            email: data.email,
            name: data.email.split("@")[0],
            given_name: "",
            family_name: ""
        });
        checkAdmin(data.email);
    };

    useEffect(() => {
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        };

        loadGoogleScript();
    }, []);

    useEffect(() => {
        if (adminLogin) {
            navigate('/admin-dashboard'); // Adjust this route as needed
        } else if (user) {
            setError("No tienes permisos de administrador.");
        }
    }, [adminLogin, user, navigate]);

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
                        Registro | Administrador
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
                        <Controller
                            name="email"
                            control={control}
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

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleGoogleLogin}
                        sx={{ mt: 1, mb: 2, textTransform: 'none' }}
                        startIcon={<Google />}
                    >
                        Continuar con Google
                    </Button>

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