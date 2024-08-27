import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { calcularTotalPorMesa } from '../../helpers/calcularTotalPorMesa';
import { OrderItem } from '../../types';

type Producto = {
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
};

type Categorias = {
    Entrantes?: Producto[];
    Bebidas?: Producto[];
    Comidas?: Producto[];
    Agregados?: Producto[];
    Pizzas?: Producto[];
    Postres?: Producto[];
};

type Orden = {
    mesa: number;
    orders: Categorias;
};

interface Props {
    orden: Orden;
    ordersByTable: Record<number, Record<string, OrderItem[]>>;
    tableId: string;
}

export const OrdenCard = ({ orden, ordersByTable, tableId }: Props) => {
    const renderSection = (title: string, productos: Producto[] | undefined) => {
        if (!productos || productos.length === 0) return null;

        return (
            <>
                <Typography variant="h6" >{title}</Typography>
                <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                    <Table size="small" aria-label={`${title} table`}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="center">Cantidad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos.map((producto, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {producto.nombre}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {producto.cantidad}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    };

    const { orders } = orden;

    return (
        <Box>
            {renderSection('Entrantes', orders.Entrantes)}
            {renderSection('Bebidas', orders.Bebidas)}
            {renderSection('Comidas', orders.Comidas)}
            {renderSection('Agregados', orders.Agregados)}
            {renderSection('Pizzas', orders.Pizzas)}
            {renderSection('Postres', orders.Postres)}
            <Typography variant="h6" color='error' style={{ marginTop: '30px', textAlign: 'right' }}>
                TOTAL A PAGAR: ${calcularTotalPorMesa(tableId, ordersByTable).toFixed(2)}
            </Typography>
            <Divider />
        </Box>
    );
};
