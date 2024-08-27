import { Agregados } from "./menu/agregados/Agregados ";
import { Bebidas } from "./menu/bebidas/Bebidas";
import { Comidas } from "./menu/comidas/Comidas";
import { Entrantes } from "./menu/entrantes/Entrantes";
import { Pizzas } from "./menu/pizzas/Pizzas";
import { Postres } from "./menu/postres/Postres";


interface Props {
    selectedMenu: string;
    seccionesMenu: string[];
    tableId: string;
}

export const RenderContent = ({ seccionesMenu, selectedMenu, tableId }: Props) => {
    switch (selectedMenu) {
        case seccionesMenu[0]:
            return <Entrantes selectedMenu={selectedMenu} tableId={tableId} />;
        case seccionesMenu[1]:
            return <Bebidas selectedMenu={selectedMenu} tableId={tableId} />;
        case seccionesMenu[2]:
            return <Comidas selectedMenu={selectedMenu} tableId={tableId} />;
        case seccionesMenu[3]:
            return <Agregados selectedMenu={selectedMenu} tableId={tableId} />;
        case seccionesMenu[4]:
            return <Pizzas selectedMenu={selectedMenu} tableId={tableId} />;
        case seccionesMenu[5]:
            return <Postres selectedMenu={selectedMenu} tableId={tableId} />;
        default:
            return <Entrantes selectedMenu={selectedMenu} tableId={tableId} />;

    }
};