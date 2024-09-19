import React from 'react';
import {
    CurrencyExchange,
    Restaurant,
    ShoppingCart,
    GetApp
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    Grid,
    Paper,
    Typography,
    Button
} from '@mui/material';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Asegúrate de que jspdf-autotable está correctamente tipado
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

// Interfaz para nuestros datos de ventas
interface SalesSummary {
    date: string;
    totalingreso: number;
    totalOrders: number;
    menuItemSales: {
        item: string;
        cantVendida: number;
        ingreso: number;
    }[];
}

// Datos mockeados
const resumenDiario: SalesSummary = {
    date: '2024-09-18',
    totalingreso: 5250.75,
    totalOrders: 87,
    menuItemSales: [
        { item: 'Pollo a la parrilla', cantVendida: 25, ingreso: 825.00 },
        { item: 'Ensalada César', cantVendida: 15, ingreso: 225.00 },
        { item: 'Pasta Alfredo', cantVendida: 20, ingreso: 400.00 },
        { item: 'Sopa del día', cantVendida: 30, ingreso: 300.00 },
        { item: 'Filete de salmón', cantVendida: 18, ingreso: 540.00 },
        { item: 'Hamburguesa clásica', cantVendida: 22, ingreso: 330.00 },
        { item: 'Tarta de manzana', cantVendida: 12, ingreso: 72.00 },
    ]
};

export const ResumenDiario: React.FC = () => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Título
        doc.setFontSize(18);
        doc.text('Resumen Diario de Ventas', 14, 20);
        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date(resumenDiario.date).toLocaleDateString()}`, 14, 30);

        // Resumen general
        doc.setFontSize(14);
        doc.text('Resumen General', 14, 40);
        doc.setFontSize(12);
        doc.text(`Total Facturado: $${resumenDiario.totalingreso.toFixed(2)}`, 14, 50);
        doc.text(`Número de Órdenes: ${resumenDiario.totalOrders}`, 14, 60);

        // Tabla de ventas por plato
        doc.setFontSize(14);
        doc.text('Ventas por Plato', 14, 90);

        const tableColumn = ["Plato", "Cantidad Vendida", "Ingreso ($)"];
        const tableRows = resumenDiario.menuItemSales.map(item => [
            item.item,
            item.cantVendida,
            `$${item.ingreso.toFixed(2)}`
        ]);

        doc.autoTable({
            startY: 100,
            head: [tableColumn],
            body: tableRows,
        });

        // Guardar el PDF
        doc.save(`ResumenDiarioVentas - ${new Date(resumenDiario.date).toLocaleDateString()}.pdf`);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3} alignItems="center" marginBottom={3}>
                <Grid item xs>
                    <Typography variant="h4">
                        Resumen Diario de Ventas - {new Date(resumenDiario.date).toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        startIcon={<GetApp />}
                        onClick={generatePDF}
                    >
                        Descargar PDF
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Total Facturado */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Facturado
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <CurrencyExchange sx={{ marginRight: '10px' }} />
                                <Typography variant="h5" component="div">
                                    ${resumenDiario.totalingreso.toFixed(2)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Número de Órdenes */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Número de Órdenes
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <ShoppingCart sx={{ marginRight: '10px' }} />
                                <Typography variant="h5" component="div">
                                    {resumenDiario.totalOrders}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Plato Más Vendido */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Plato Más Vendido
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Restaurant sx={{ marginRight: '10px' }} />
                                <Typography variant="h5" component="div">
                                    {resumenDiario.menuItemSales.reduce((prev, current) =>
                                        (prev.cantVendida > current.cantVendida) ? prev : current
                                    ).item}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Gráfico de Ventas por Plato */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Ventas por Plato
                        </Typography>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={resumenDiario.menuItemSales} layout="vertical" margin={{ left: 100 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="item" type="category" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cantVendida" fill="#82ca9d" name="Cantidad Vendida" />
                                <Bar dataKey="ingreso" fill="#8884d8" name="Ingresos ($)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Historial de Ventas */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Historial de Ventas
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            El historial detallado de ventas se implementará en futuras actualizaciones.
                            Aquí se mostrará un registro completo de las transacciones del día,
                            incluyendo horas pico, tendencias de ventas y más.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};