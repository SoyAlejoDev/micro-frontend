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
    seccionesMenu: string[];
}

export const RenderContent = ({ seccionesMenu, selectedMenu, socketData }: Props) => {
    switch (selectedMenu) {
        case seccionesMenu[0]:
            return (
                <>
                    <MainMenu socketData={socketData} />
                    <History socketData={socketData} />
                    <Characteristics socketData={socketData} />
                    <Footer socketData={socketData} />
                </>
            );
        case seccionesMenu[1]:
            return <Entrantes />;
        case seccionesMenu[2]:
            return <Bebidas />;
        case seccionesMenu[3]:
            return <Comidas />;
        case seccionesMenu[4]:
            return <Agregados />;
        case seccionesMenu[5]:
            return <Pizzas />;
        case seccionesMenu[6]:
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