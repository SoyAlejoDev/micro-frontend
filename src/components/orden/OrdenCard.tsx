import React from 'react';
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { calcularTotalPorMesa } from '../../helpers/calcularTotalPorMesa';
import { Orden, OrderItem } from '../../types'; // Importa los tipos desde el archivo de tipos

interface Props {
    orden: Orden;
    ordersByTable: Record<number, Record<string, OrderItem[]>>;
    tableId: string;
}

export const OrdenCard: React.FC<Props> = ({ orden, ordersByTable, tableId }) => {
    const renderSection = (title: string, productos: OrderItem[] | undefined) => {
        if (!productos || productos.length === 0) return null;

        return (
            <React.Fragment key={title}>
                <Typography variant="h6">{title}</Typography>
                <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                    <Table size="small" aria-label={`${title} table`}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="center">Cantidad</TableCell>
                                <TableCell align="right">Precio</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos.map((producto) => (
                                <TableRow key={producto.id}>
                                    <TableCell component="th" scope="row">
                                        {producto.nombre}
                                    </TableCell>
                                    <TableCell align="center">{producto.cantidad}</TableCell>
                                    <TableCell align="right">${producto.precio.toFixed(2)}</TableCell>
                                    <TableCell align="right">${(producto.cantidad * producto.precio).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        );
    };

    const { orders } = orden;

    return (
        <Box>
            {Object.entries(orders).map(([sectionName, sectionItems]) =>
                renderSection(sectionName, sectionItems)
            )}
            <Typography variant="h6" color='error' style={{ marginTop: '30px', textAlign: 'right' }}>
                TOTAL A PAGAR: ${calcularTotalPorMesa(tableId, ordersByTable).toFixed(2)}
            </Typography>
            <Divider />
        </Box>
    );
};