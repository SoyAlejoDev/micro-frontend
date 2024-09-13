import { OrderItem } from '../types'; // Asegúrate de que la ruta de importación sea correcta

export const calcularTotalPorMesa = (
    tableId: string,
    ordersByTable: Record<number, Record<string, OrderItem[]>>
): number => {
    const tableIdNumber = Number(tableId);
    const ordersForTable = ordersByTable[tableIdNumber];

    if (!ordersForTable) {
        return 0;
    }

    let total = 0;

    Object.values(ordersForTable).forEach((categoryItems) => {
        categoryItems.forEach((item) => {
            total += item.precio * item.cantidad;
        });
    });

    return total;
};