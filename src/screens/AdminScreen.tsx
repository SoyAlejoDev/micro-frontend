import AdminDashboard from "../views/adminView/admin";

export const AdminScreen = () => {

    const data = { "mesa": 1, "orders": { "Entrantes": [{ "id": 25, "nombre": "Bruschetta", "cantidad": 1, "precio": 5 }, { "id": 26, "nombre": "Calamares Fritos", "cantidad": 1, "precio": 7.5 }], "Bebidas": [{ "id": 7, "nombre": "Coca Cola", "cantidad": 1, "precio": 2.5 }], "Comidas": [{ "id": 1, "nombre": "Pollo a la Parrilla", "cantidad": 1, "precio": 12.99 }] } };

    console.log(data.orders.Bebidas);
    return (<AdminDashboard />
    );
};
