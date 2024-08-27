interface Item {
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
}

interface Menu {
    [key: string]: Item[];
}

interface MesaData {
    [key: string]: Menu;
}

export const calcularTotalPorMesa = (idMesa: string, data: MesaData): number => {
    const mesa = data[idMesa];
    if (!mesa) {
        console.error(`No se encontró la mesa con id ${idMesa}`);
        return 0;
    }

    const secciones = ['Entrantes', 'Bebidas', 'Comidas', 'Agregados', 'Pizzas', 'Postres'];
    let total = 0;

    secciones.forEach(seccion => {
        const items = mesa[seccion];
        if (items) {
            items.forEach(item => {
                total += item.precio * item.cantidad;
            });
        }
    });

    return total;
};