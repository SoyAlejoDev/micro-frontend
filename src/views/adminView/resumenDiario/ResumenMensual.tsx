import { AttachMoney, GetApp, Restaurant, ShoppingCart } from '@mui/icons-material';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { generatePDFMensual } from '../../../helpers/generatePdfMensual';
import { ResumeCard } from '../analisis/ResumeCard';
import { monthlyData } from './monthlyData';

export const ResumenMensual = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option === selectedOption ? null : option);
    };

    const formatXAxis = (tickItem: string) => {
        const date = new Date(tickItem);
        return date.getDate().toString();
    };

    const customTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const date = new Date(label);
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                    <p className="label">{`${date.getDate()}/${date.getMonth() + 1}`}</p>
                    <p className="intro">{`Ingresos: $${payload[0].value.toFixed(2)}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Box sx={{ flexGrow: 1, px: 3, backgroundColor: '#f5faff', height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                    <ResumeCard
                        color="#1976d2"
                        label="Ingresos Totales"
                        total={`$${monthlyData.totalRevenue.toLocaleString()}`}
                        Icon={AttachMoney}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ResumeCard
                        color="#388e3c"
                        label="Pedidos Totales"
                        total={monthlyData.totalOrders.toString()}
                        Icon={ShoppingCart}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ResumeCard
                        color="#ebc840"
                        label="Opción Más Vendida"
                        masVendido={monthlyData.menuOptions.reduce((max, option) => max.quantity > option.quantity ? max : option).name}
                        Icon={Restaurant}
                    />
                </Grid>
            </Grid>

            <Paper elevation={3} sx={{ p: 2, mb: 3, height: '40%' }}>
                <Typography variant="h6" gutterBottom>
                    Ingresos Diarios del Mes
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData.dailyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={formatXAxis} />
                        <YAxis />
                        <Tooltip content={customTooltip} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Ingresos ($)" />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>

            <Box sx={{ display: 'flex', flexGrow: 1, gap: 3, height: '450px' }}>
                <Paper elevation={3} sx={{ p: 2, width: '50%' }}>
                    <Typography variant="h6" gutterBottom>
                        Opciones del Menú
                    </Typography>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={monthlyData.menuOptions}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                interval={0}
                                tick={{ fontSize: 12 }}
                                height={60}
                            />
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                            <Tooltip />
                            <Legend layout="horizontal" verticalAlign="top" align="center" />
                            <Bar yAxisId="left" dataKey="quantity" fill="#ed1c1c" name="Cantidad" onClick={(data) => handleOptionClick(data.name)} />
                            <Bar yAxisId="right" dataKey="revenue" fill="#f5840b" name="Ingresos ($)" onClick={(data) => handleOptionClick(data.name)} />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>

                <Paper elevation={3} sx={{ p: 2, width: '48%' }}>
                    <Typography variant="h6" gutterBottom>
                        {selectedOption ? `Secciones de ${selectedOption}` : 'Seleccione una opción del menú'}
                    </Typography>
                    <ResponsiveContainer width="100%" height="90%">
                        {selectedOption ? (
                            <BarChart data={monthlyData.menuOptions.find(option => option.name === selectedOption)?.sections}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    interval={0}
                                    tick={{ fontSize: 12 }}
                                    height={60}
                                />
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                <Tooltip />
                                <Legend layout="horizontal" verticalAlign="top" align="center" />
                                <Bar yAxisId="left" dataKey="quantity" fill="#4caf50" name="Cantidad" />
                                <Bar yAxisId="right" dataKey="revenue" fill="#2196f3" name="Ingresos ($)" />
                            </BarChart>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Typography>Seleccione una opción del menú para ver sus secciones</Typography>
                            </Box>
                        )}
                    </ResponsiveContainer>
                </Paper>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Button
                    variant="text"
                    startIcon={<GetApp />}
                    color='success'
                    sx={{ backgroundColor: 'white' }}
                    onClick={() => generatePDFMensual(monthlyData)}
                >
                    Descargar PDF
                </Button>
            </Box>
        </Box>
    );
};