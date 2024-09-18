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

const cargarEstado = () => {
	return {
		meseroLogin: localStorage.getItem("meseroLogin") === "true",
		adminLogin: localStorage.getItem("adminLogin") === "true",
		cocinaLogin: localStorage.getItem("cocinaLogin") === "true",
	};
};

const guardarEstado = (estado: Partial<AuthStore>) => {
	if (estado.meseroLogin !== undefined) {
		localStorage.setItem("meseroLogin", estado.meseroLogin.toString());
	}
	if (estado.adminLogin !== undefined) {
		localStorage.setItem("adminLogin", estado.adminLogin.toString());
	}
	if (estado.cocinaLogin !== undefined) {
		localStorage.setItem("cocinaLogin", estado.cocinaLogin.toString());
	}
};

export const useAuthStore = create<AuthStore>(set => ({
	meseroArray: ["rol4ndo99@gmail.com", "diazperezalejandro26@gmail.com"],
	adminArray: ["rol4ndo99@gmail.com", "diazperezalejandro26@gmail.com"],
	cocinaArray: ["rol4ndo99@gmail.com", "diazperezalejandro26@gmail.com"],
	...cargarEstado(),
	checkMesero: (email: string) => {
		set(estado => {
			const nuevoEstado = {
				meseroLogin: estado.meseroArray.includes(email),
			};
			guardarEstado(nuevoEstado);
			return nuevoEstado;
		});
	},
	checkAdmin: (email: string) => {
		set(estado => {
			const nuevoEstado = {
				adminLogin: estado.adminArray.includes(email),
			};
			guardarEstado(nuevoEstado);
			return nuevoEstado;
		});
	},
	checkCocina: (email: string) => {
		set(estado => {
			const nuevoEstado = {
				cocinaLogin: estado.cocinaArray.includes(email),
			};
			guardarEstado(nuevoEstado);
			return nuevoEstado;
		});
	},
	logoutMesero: () => {
		set(() => {
			const nuevoEstado = {meseroLogin: false};
			guardarEstado(nuevoEstado);
			return nuevoEstado;
		});
	},
	logoutAdmin: () => {
		set(() => {
			const nuevoEstado = {adminLogin: false};
			guardarEstado(nuevoEstado);
			return nuevoEstado;
		});
	},
	logoutCocina: () => {
		set(() => {
			const nuevoEstado = {cocinaLogin: false};
			guardarEstado(nuevoEstado);
			return nuevoEstado;
		});
	},
}));
