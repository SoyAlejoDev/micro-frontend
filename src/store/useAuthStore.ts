import {create} from "zustand";

interface AuthStore {
	meseroArray: string[];
	adminArray: string[];
	cocinaArray: string[];
	meseroLogin: boolean;
	adminLogin: boolean;
	cocinaLogin: boolean;
	checkMesero: (email: string) => void;
	checkAdmin: (email: string) => void;
	checkCocina: (email: string) => void;
	logoutMesero: () => void;
	logoutAdmin: () => void;
	logoutCocina: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
	meseroArray: ["rol4ndo99@gmail.com", "diazperezalejandro26@gmail.com"],
	adminArray: ["rol4ndo99@gmail.com", "diazperezalejandro26@gmail.com"],
	cocinaArray: ["rol4ndo99@gmail.com", "diazperezalejandro26@gmail.com"],
	meseroLogin: false,
	adminLogin: false,
	cocinaLogin: false,
	checkMesero: (email: string) => {
		set(state => ({
			meseroLogin: state.meseroArray.includes(email),
		}));
	},
	checkAdmin: (email: string) => {
		set(state => ({
			adminLogin: state.adminArray.includes(email),
		}));
	},
	checkCocina: (email: string) => {
		set(state => ({
			cocinaLogin: state.cocinaArray.includes(email),
		}));
	},
	logoutMesero: () => {
		set({meseroLogin: false});
	},
	logoutAdmin: () => {
		set({adminLogin: false});
	},
	logoutCocina: () => {
		set({cocinaLogin: false});
	},
}));
