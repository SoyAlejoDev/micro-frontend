import { create } from 'zustand';

export interface IFormMain {
    title: string;
    description: string;
    imageBase64: string;
    tablesCount: string;
    mesas: MesasArray[];
}

export interface MesasArray {
    mesa: string;
    id: number;
    bussy: boolean;
}

export interface IFormFooter {
    name: string;
    email: string;
    logo: string;
    facebook: string;
    instagram: string;
    phone: string;
}

interface HistoryFormInputs {
    title: string;
    description: string;
    image: string | null;
}

interface FooterFormInputs {
    name: string;
    email: string;
    logo: string | null;
    facebook: string;
    instagram: string;
    phone: string;
}

interface DescriptionFormInputs {
    items: { logo: string | null; item: string; text: string; }[];
}

interface MenuItem {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    foto: string;
    habilitado: boolean;
}

interface MenuSection {
    id: string;
    nombre: string;
    items: MenuItem[];
}

interface AppState {
    formMainData: IFormMain | null;
    historyFormData: HistoryFormInputs | null;
    footerFormData: FooterFormInputs | null;
    descriptionFormData: DescriptionFormInputs | null;
    menuSections: MenuSection[];

    setFormMainData: (data: IFormMain) => void;
    removeFormMainData: () => void;

    setHistoryFormData: (data: HistoryFormInputs) => void;
    removeHistoryFormData: () => void;

    setDescriptionFormData: (data: DescriptionFormInputs) => void;
    removeDescriptionFormData: () => void;

    setFooterFormData: (data: FooterFormInputs) => void;
    removeFooterFormData: () => void;

    setMenuSections: (sections: MenuSection[]) => void;
    removeMenuSections: () => void;
}

// Implementación del Store
export const useAdminStore = create<AppState>((set) => ({
    formMainData: null,
    historyFormData: null,
    footerFormData: null,
    descriptionFormData: null,
    menuSections: [],

    setFormMainData: (data: IFormMain) => set({ formMainData: data }),
    removeFormMainData: () => set({ formMainData: null }),

    setHistoryFormData: (data: HistoryFormInputs) => set({ historyFormData: data }),
    removeHistoryFormData: () => set({ historyFormData: null }),

    setDescriptionFormData: (data: DescriptionFormInputs) => set({ descriptionFormData: data }),
    removeDescriptionFormData: () => set({ descriptionFormData: null }),

    setFooterFormData: (data: FooterFormInputs) => set({ footerFormData: data }),
    removeFooterFormData: () => set({ footerFormData: null }),

    setMenuSections: (sections: MenuSection[]) => set({ menuSections: sections }),
    removeMenuSections: () => set({ menuSections: undefined })
}));
