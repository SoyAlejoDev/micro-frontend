import { Add, Remove } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSocketStore } from "../../../store/useSocketStore";
import { Items } from "../../../types";

interface Props {
    data: Items;
    selectedMenu: string;
    tableId: number;
}

export const CardMesero = ({ data, selectedMenu, tableId }: Props) => {
    const getOrderForTable = useSocketStore((state) => state.getOrderForTable);
    const addToOrder = useSocketStore((state) => state.addToOrder);
    const removeFromOrder = useSocketStore((state) => state.removeFromOrder);

    // Inicializa el estado count con la cantidad almacenada en zustand, si existe
    const [count, setCount] = useState(() => {
        if (data && selectedMenu && tableId) {
            const orderForTable = getOrderForTable(tableId);
            const existingItem = orderForTable?.[selectedMenu]?.find(
                (item) => item.id === data.id
            );
            return existingItem?.cantidad ?? 0;
        }
        return 0;
    });

    const handleClick = (value: number) => {
        if (!(count + value < 0)) setCount(count + value);
    };

    useEffect(() => {
        if (data && selectedMenu && tableId) {
            if (count > 0) {
                addToOrder(tableId, selectedMenu, {
                    id: data.id,
                    nombre: data.nombre,
                    cantidad: count,
                    precio: data.precio,
                });
            } else {
                removeFromOrder(tableId, selectedMenu, data.id);
            }
        }
    }, [count, data, selectedMenu, tableId, addToOrder, removeFromOrder]);

    return (
        <Paper elevation={3} className="mb-2">
            <div className="justify-between flex">
                <div className="flex">
                    <img
                        src={`data:${data.foto.split(',')[0]};base64,${data.foto.split(',')[1]}`}
                        alt={data.descripcion}
                        className="h-full w-[80px] rounded-md mr-3"
                    />
                    <div className="flex flex-col justify-center">
                        <h3 className="w-full font-bold text-lg leading-tight">
                            {data.nombre}
                        </h3>
                        <span style={{ fontWeight: 100 }}> ${data.precio}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <IconButton
                        color="error"
                        size="large"
                        onClick={() => handleClick(-1)}
                    >
                        <Remove />
                    </IconButton>
                    <Typography variant="h5">{count}</Typography>
                    <IconButton
                        color="success"
                        size="large"
                        onClick={() => handleClick(+1)}
                    >
                        <Add />
                    </IconButton>
                </div>
            </div>
        </Paper>
    );
};
