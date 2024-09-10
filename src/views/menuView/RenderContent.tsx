import { Data } from '../../types';
import { Characteristics } from './characteristics/Characteristics';
import { Footer } from './Footer';
import { History } from './History';
import { MainMenu } from './MainMenu';
import { MenuItem } from './menu/menuItem/MenuItem';

interface Props {
    selectedMenu: string;
    socketData: Data | null;
    seccionesMenu: string[];
}

export const RenderContent = ({ selectedMenu, socketData, seccionesMenu }: Props) => {
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
            return <MenuItem seccion={seccionesMenu[1]} />;
        case seccionesMenu[2]:
            return <MenuItem seccion={seccionesMenu[2]} />;
        case seccionesMenu[3]:
            return <MenuItem seccion={seccionesMenu[3]} />;
        case seccionesMenu[4]:
            return <MenuItem seccion={seccionesMenu[4]} />;
        case seccionesMenu[5]:
            return <MenuItem seccion={seccionesMenu[5]} />;
        case seccionesMenu[6]:
            return <MenuItem seccion={seccionesMenu[6]} />;
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