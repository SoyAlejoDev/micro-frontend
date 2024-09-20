import {
    AttachMoney,
    GetApp,
    Restaurant,
    ShoppingCart
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card, CardContent,
    Grid, Paper,
    Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Typography
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';
import { getDailySummary, monthlyData } from './monthlyData';

// Mock data for the monthly summary


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const ResumenMensual = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dailySummary, setDailySummary] = useState(getDailySummary(selectedDate));

    const handleDateChange = (newDate: any) => {
        setSelectedDate(newDate);
        setDailySummary(getDailySummary(newDate));
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text('Resumen Mensual del Restaurante', 14, 22);

        // Monthly Data
        doc.setFontSize(12);
        doc.text(`Ingresos Totales: $${monthlyData.totalRevenue.toLocaleString()}`, 14, 32);
        doc.text(`Pedidos Totales: ${monthlyData.totalOrders.toLocaleString()}`, 14, 40);
        doc.text(`Valor Promedio de Pedido: $${monthlyData.averageOrderValue.toFixed(2)}`, 14, 48);
        doc.text(`Plato Más Vendido: ${monthlyData.topSellingItems[0].name}`, 14, 56);

        // Top Selling Items Table
        const topSellingItemsRows = monthlyData.topSellingItems.map(item => [
            item.name,
            item.quantity,
            `$${item.revenue.toFixed(2)}`
        ]);

        doc.autoTable({
            head: [['Plato', 'Cantidad', 'Ingresos']],
            body: topSellingItemsRows,
            startY: 70,
        });

        // Save the PDF
        doc.save('resumen-mensual.pdf');
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className='flex justify-between'>
                        <Typography variant="h4" gutterBottom>
                            Resumen Mensual
                        </Typography>
                        <Button
                            sx={{ textTransform: 'none' }}
                            variant="contained"
                            startIcon={<GetApp />}
                            onClick={generatePDF}
                        >
                            Descargar Reporte Mensual
                        </Button>
                    </div>
                </Grid>

                {/* Download Report Button */}


                {/* Summary Cards */}
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Ingresos Totales
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <AttachMoney sx={{ marginRight: 1 }} />
                                <Typography variant="h5">
                                    ${monthlyData.totalRevenue.toLocaleString()}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Pedidos Totales
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <ShoppingCart sx={{ marginRight: 1 }} />
                                <Typography variant="h5">
                                    {monthlyData.totalOrders.toLocaleString()}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Plato Más Vendido
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Restaurant sx={{ marginRight: 1 }} />
                                <Typography variant="h5">
                                    {monthlyData.topSellingItems[0].name}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Calendar and Daily Summary */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Calendario
                        </Typography>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Resumen Diario - {selectedDate.toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1">
                            Ingresos: ${dailySummary.totalRevenue.toFixed(2)}
                        </Typography>
                        <Typography variant="body1">
                            Pedidos: {dailySummary.totalOrders}
                        </Typography>
                        <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Plato</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                        <TableCell align="right">Ingresos</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dailySummary.menuItemSales.map((row) => (
                                        <TableRow key={row.item}>
                                            <TableCell component="th" scope="row">
                                                {row.item}
                                            </TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                            <TableCell align="right">${row.revenue.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                {/* Monthly Revenue Chart */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Ingresos Diarios del Mes
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData.dailyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Top Selling Items */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Platos Más Vendidos
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData.topSellingItems}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="quantity" fill="#8884d8" name="Cantidad" />
                                <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Ingresos ($)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Category Breakdown */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Desglose por Categoría
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={monthlyData.categoryBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {monthlyData.categoryBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>


            </Grid>
        </Box>
    );
};
