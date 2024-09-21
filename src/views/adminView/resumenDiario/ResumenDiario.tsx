import React, { useState } from 'react';
import { AddShoppingCart, AttachMoney, GetApp, ListAlt } from '@mui/icons-material';
import { Box, Button, Typography, useTheme, Paper, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generatePDF } from '../../../helpers/generatePdfDiario';
import { ResumeCard } from '../analisis/ResumeCard';

const resumenDiario = {
    date: '2024-09-18',
    totalingreso: '12750.50',
    totalOrders: '215',
    menuItems: [
        {
            category: 'Pizzas',
            totalVendido: 85,
            totalIngreso: 2125,
            items: [
                { name: 'Pizza Margarita', cantVendida: 30, ingreso: 600 },
                { name: 'Pizza Pepperoni', cantVendida: 25, ingreso: 625 },
                { name: 'Pizza Hawaiana', cantVendida: 15, ingreso: 450 },
                { name: 'Pizza Vegetariana', cantVendida: 15, ingreso: 450 }
            ]
        },
        {
            category: 'Pastas',
            totalVendido: 60,
            totalIngreso: 1500,
            items: [
                { name: 'Espagueti a la Bolognesa', cantVendida: 20, ingreso: 500 },
                { name: 'Lasaña', cantVendida: 15, ingreso: 450 },
                { name: 'Fettuccine Alfredo', cantVendida: 15, ingreso: 375 },
                { name: 'Ravioles de Queso', cantVendida: 10, ingreso: 175 }
            ]
        },
        {
            category: 'Ensaladas',
            totalVendido: 45,
            totalIngreso: 900,
            items: [
                { name: 'Ensalada César', cantVendida: 20, ingreso: 400 },
                { name: 'Ensalada Griega', cantVendida: 15, ingreso: 300 },
                { name: 'Ensalada de la Casa', cantVendida: 10, ingreso: 200 }
            ]
        },
        {
            category: 'Bebidas',
            totalVendido: 150,
            totalIngreso: 600,
            items: [
                { name: 'Refresco', cantVendida: 60, ingreso: 180 },
                { name: 'Agua Mineral', cantVendida: 40, ingreso: 80 },
                { name: 'Cerveza', cantVendida: 30, ingreso: 210 },
                { name: 'Vino (Copa)', cantVendida: 20, ingreso: 130 }
            ]
        },
        {
            category: 'Postres',
            totalVendido: 70,
            totalIngreso: 875,
            items: [
                { name: 'Tiramisú', cantVendida: 25, ingreso: 375 },
                { name: 'Cheesecake', cantVendida: 20, ingreso: 300 },
                { name: 'Helado', cantVendida: 15, ingreso: 120 },
                { name: 'Brownie', cantVendida: 10, ingreso: 80 }
            ]
        },
        {
            category: 'Entrantes',
            totalVendido: 95,
            totalIngreso: 1425,
            items: [
                { name: 'Palitos de Mozzarella', cantVendida: 30, ingreso: 450 },
                { name: 'Alitas de Pollo', cantVendida: 25, ingreso: 375 },
                { name: 'Bruschetta', cantVendida: 20, ingreso: 300 },
                { name: 'Nachos con Queso', cantVendida: 20, ingreso: 300 }
            ]
        },
        {
            category: 'Platos Principales',
            totalVendido: 55,
            totalIngreso: 1925,
            items: [
                { name: 'Filete de Res', cantVendida: 15, ingreso: 675 },
                { name: 'Pollo a la Parrilla', cantVendida: 20, ingreso: 600 },
                { name: 'Salmón a la Plancha', cantVendida: 10, ingreso: 400 },
                { name: 'Risotto de Champiñones', cantVendida: 10, ingreso: 250 }
            ]
        }
    ]
};

export const ResumenDiario = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const theme = useTheme();

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const mainChartData = resumenDiario.menuItems;
    const detailChartData = selectedCategory ? resumenDiario.menuItems.find(item => item.category === selectedCategory)?.items : [];

    return (
        <Box sx={{ flexGrow: 1, px: 3, backgroundColor: '#f5faff', height: '100%', width: '100%' }}>


            <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Main content - 2/3 width */}
                <Box sx={{ flex: '0 0 75%' }}>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={4}>
                            <ResumeCard
                                color="#1976d2"
                                label="Ventas Totales"
                                total={resumenDiario.totalingreso}
                                Icon={AttachMoney}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <ResumeCard
                                color="#388e3c"
                                label="Número de Órdenes"
                                total={resumenDiario.totalOrders}
                                Icon={ListAlt}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <ResumeCard
                                color="#ebc840"
                                label="Categoría más Vendida"
                                masVendido={resumenDiario.menuItems.reduce((a, b) => a.totalVendido > b.totalVendido ? a : b).category}
                                Icon={AddShoppingCart}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
                                <Typography variant="h6" gutterBottom>
                                    Resumen por Categoría
                                </Typography>
                                <ResponsiveContainer width="100%" height="90%">
                                    <BarChart
                                        data={mainChartData}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="category" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="totalVendido"
                                            fill="#ed1c1c"
                                            onClick={(data) => handleCategoryClick(data.category)}
                                            name="Cantidad Vendida"
                                        />
                                        <Bar
                                            dataKey="totalIngreso"
                                            fill="#f5840b"
                                            onClick={(data) => handleCategoryClick(data.category)}
                                            name="Ingreso Total ($)"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
                                <Typography variant="h6" gutterBottom>
                                    {selectedCategory ? `Desglose de ${selectedCategory}` : 'Seleccione una categoría'}
                                </Typography>
                                {selectedCategory ? (
                                    <ResponsiveContainer width="100%" height="90%">
                                        <BarChart
                                            data={detailChartData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="cantVendida" fill="#0d4a80ff" name="Cantidad Vendida" />
                                            <Bar dataKey="ingreso" fill="#49c2ecff" name="Ingreso" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
                                        <Typography variant="body1">Haga clic en una categoría para ver detalles</Typography>
                                    </Box>
                                )}
                            </Paper>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
                                <Button
                                    variant="text"
                                    startIcon={<GetApp />}
                                    color='success'
                                    sx={{ backgroundColor: 'white' }}
                                    onClick={() => generatePDF(resumenDiario)}
                                >
                                    Descargar PDF
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Historial - 1/3 width */}
                <Box sx={{ flex: '1' }}>
                    <Paper elevation={3} sx={{ p: 2, height: 'calc(100vh - 140px)', overflowY: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                            Historial
                        </Typography>
                        {/* Aquí puedes agregar el contenido del historial */}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};