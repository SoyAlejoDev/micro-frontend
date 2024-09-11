import {create} from "zustand";

interface MeseroStore {
	meseroArray: string[];
	meseroLogin: boolean;
	checkMesero: (name: string) => void;
}

export const useAuthStore = create<MeseroStore>(set => ({
	meseroArray: ["rol4ndo99@gmail.com", "diazperezalejandro26@gmail.com"],
	meseroLogin: false,
	checkMesero: (name: string) => {
		set(state => ({
			meseroLogin: state.meseroArray.includes(name),
		}));
	},
}));
