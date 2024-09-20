import { useState, useCallback } from 'react';
import { OrderItem } from "../types";

type OrdersByTable = Record<number, Record<string, OrderItem[]>>;

export const createOrder = () => {
    const [ordersByTable, setOrdersByTable] = useState<OrdersByTable>({});

    const addToOrder = useCallback((tableId: number, selectedMenu: string, item: OrderItem) => {
        setOrdersByTable(currentOrders => {
            const updatedOrders = { ...currentOrders };
            if (!updatedOrders[tableId]) {
                updatedOrders[tableId] = {};
            }
            if (!updatedOrders[tableId][selectedMenu]) {
                updatedOrders[tableId][selectedMenu] = [];
            }
            const existingItemIndex = updatedOrders[tableId][selectedMenu].findIndex(orderItem => orderItem.id === item.id);
            if (existingItemIndex !== -1) {
                updatedOrders[tableId][selectedMenu][existingItemIndex].cantidad = item.cantidad;
            } else {
                updatedOrders[tableId][selectedMenu].push(item);
            }
            return updatedOrders;
        });
    }, []);

    const removeFromOrder = useCallback((tableId: number, selectedMenu: string, itemId: string) => {
        setOrdersByTable(currentOrders => {
            const updatedOrders = { ...currentOrders };
            if (updatedOrders[tableId] && updatedOrders[tableId][selectedMenu]) {
                updatedOrders[tableId][selectedMenu] = updatedOrders[tableId][selectedMenu].filter(orderItem => orderItem.id !== itemId);
                if (updatedOrders[tableId][selectedMenu].length === 0) {
                    delete updatedOrders[tableId][selectedMenu];
                }
                if (Object.keys(updatedOrders[tableId]).length === 0) {
                    delete updatedOrders[tableId];
                }
            }
            return updatedOrders;
        });
    }, []);

    const getOrderForTable = useCallback((tableId: number) => {
        return ordersByTable[tableId];
    }, [ordersByTable]);

    const clearOrderForTable = useCallback((tableId: number) => {
        setOrdersByTable(currentOrders => {
            const updatedOrders = { ...currentOrders };
            if (updatedOrders[tableId]) {
                delete updatedOrders[tableId];
            }
            return updatedOrders;
        });
    }, []);

    return {
        ordersByTable,
        addToOrder,
        removeFromOrder,
        getOrderForTable,
        clearOrderForTable,
    };
};