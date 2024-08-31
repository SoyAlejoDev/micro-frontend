import { Data } from '../../types';
import { Characteristics } from './characteristics/Characteristics';
import { Footer } from './Footer';
import { History } from './History';
import { MainMenu } from './MainMenu';
import { Bebidas } from './menu/bebidas/Bebidas';
import { Comidas } from './menu/comidas/Comidas';
import { Entrantes } from './menu/entrantes/Entrantes';
import { Pizzas } from './menu/pizzas/Pizzas';
import { Postres } from './menu/postres/Postres';
import { Agregados } from './menu/agregados/Agregados ';

interface Props {
    selectedMenu: string;
    socketData: Data | null;
}

export const RenderContent = ({ selectedMenu, socketData }: Props) => {
    switch (selectedMenu) {
        case "Inicio":
            return (
                <>
                    <MainMenu socketData={socketData} />
                    <History socketData={socketData} />
                    <Characteristics socketData={socketData} />
                    <Footer socketData={socketData} />
                </>
            );
        case "Entrantes":
            return <Entrantes />;
        case "Bebidas":
            return <Bebidas />;
        case "Comidas":
            return <Comidas />;
        case "Agregados":
            return <Agregados />;
        case "Pizzas":
            return <Pizzas />;
        case "Postres":
            return <Postres />;
        default:
            return (
                <>
                    <MainMenu socketData={socketData} />
                    <History socketData={socketData} />
                    <Characteristics socketData={socketData} />
                    <Footer socketData={socketData} />
                </>
            );
    }
};