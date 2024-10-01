import React from 'react';
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

export const RenderContent: React.FC<Props> = ({ selectedMenu, socketData, seccionesMenu }) => {
    if (selectedMenu === seccionesMenu[0] || !seccionesMenu.includes(selectedMenu)) {
        return (
            <>
                <MainMenu socketData={socketData} />
                <History socketData={socketData} />
                <Characteristics socketData={socketData} />
                <Footer socketData={socketData} />
            </>
        );
    }

    const index = seccionesMenu.indexOf(selectedMenu);
    return <MenuItem seccion={seccionesMenu[index]} />;
};