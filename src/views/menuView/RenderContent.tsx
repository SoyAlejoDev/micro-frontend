import { Data } from '../../types';
import { Characteristics } from './characteristics/Characteristics';
import { Footer } from './Footer';
import { History } from './History';
import { MainMenu } from './MainMenu';
import { MenuItem } from './menu/menuItem/MenuItem';

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
            return <MenuItem seccion='Entrantes' />;
        case "Bebidas":
            return <MenuItem seccion='Bebidas' />;
        case "Comidas":
            return <MenuItem seccion='Comidas' />;
        case "Agregados":
            return <MenuItem seccion='Agregados' />;
        case "Pizzas":
            return <MenuItem seccion='Pizzas' />;
        case "Postres":
            return <MenuItem seccion='Postres' />;
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