import { MeseroMenuItem } from "./meseroMenuItem/MeseroMenuItem";


interface Props {
    selectedMenu: string;
    seccion: string;
    tableId: string;
}

export const RenderContent = ({ seccion, selectedMenu, tableId }: Props) => {
    switch (selectedMenu) {
        case "Entrantes":
            return <MeseroMenuItem
                selectedMenu={selectedMenu} tableId={tableId} />;
        case "Bebidas":
            return <MeseroMenuItem
                selectedMenu={selectedMenu} tableId={tableId} />;
        case "Comidas":
            return <MeseroMenuItem
                selectedMenu={selectedMenu} tableId={tableId} />;
        case "Agregados":
            return <MeseroMenuItem
                selectedMenu={selectedMenu} tableId={tableId} />;
        case "Pizzas":
            return <MeseroMenuItem
                selectedMenu={selectedMenu} tableId={tableId} />;
        case "Postres":
            return <MeseroMenuItem
                selectedMenu={selectedMenu} tableId={tableId} />;
        default:
            return <MeseroMenuItem
                selectedMenu={selectedMenu} tableId={tableId} />;

    }
};