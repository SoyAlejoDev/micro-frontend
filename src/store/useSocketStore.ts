import io from "socket.io-client";
import {create} from "zustand";
import {Data, OrderItem, SocketState} from "../types";

interface OrderState {
	ordersByTable: Record<number, Record<string, OrderItem[]>>;
	addToOrder: (tableId: number, selectedMenu: string, item: OrderItem) => void;
	removeFromOrder: (tableId: number, selectedMenu: string, itemId: number) => void;
	getOrderForTable: (tableId: number) => Record<string, OrderItem[]> | undefined;
	clearOrderForTable: (tableId: number) => void;
}

interface SocketStateData {
	cocina: any;
	socket: any;
	socketData: Data | null;
	online: boolean;
	meseroLogin: boolean | null; // Nueva propiedad para el estado de autenticación
}

export const useSocketStore = create<SocketStateData & OrderState & SocketState>((set, get) => ({
	// Estado del socket
	cocina: null,
	socket: null,
	socketData: null,
	online: false,
	meseroLogin: null, // Inicializa la propiedad meseroLogin

	ordersByTable: {},

	// Conexión del socket
	connectSocket: () => {
		const socket = io(import.meta.env.VITE_URL_SOCKET, {
			transports: ["websocket"],
		});

		socket.on("connect", () => {
			set({online: true});
		});

		socket.on("disconnect", () => {
			set({online: false});
		});

		socket.on("emit-data", (data: Data) => {
			console.log(data);
			set({socketData: data});
		});

		socket.on("meseroLogin", (data: {logged: boolean}) => {
			if (data.logged) {
				set({meseroLogin: true}); // Actualiza el estado meseroLogin a true
			} else {
				set({meseroLogin: false});
			}
		});

		socket.on("orderSaved", data => {
			console.log(data);
			set({cocina: data});
		});

		socket.on("meseroLogout", (data: {logged: boolean}) => {
			console.log(data);
			set({meseroLogin: undefined});
		});

		set({socket});
	},

	disconnectSocket: () => {
		const {socket} = get();
		if (socket) {
			socket.disconnect();
			set({online: false, socket: null, socketData: null});
		}
	},

	setSocketData: (data: Data) => {
		set({socketData: data});
	},

	// Métodos para manejar órdenes
	addToOrder: (tableId: number, selectedMenu: string, item: OrderItem) => {
		const currentOrders = get().ordersByTable;
		const updatedOrders = {...currentOrders};

		if (!updatedOrders[tableId]) {
			updatedOrders[tableId] = {};
		}

		if (!updatedOrders[tableId][selectedMenu]) {
			updatedOrders[tableId][selectedMenu] = [];
		}

		const existingItemIndex = updatedOrders[tableId][selectedMenu].findIndex(orderItem => orderItem.id === item.id);

		if (existingItemIndex !== -1) {
			updatedOrders[tableId][selectedMenu][existingItemIndex].cantidad = item.cantidad;
		} else {
			updatedOrders[tableId][selectedMenu].push(item);
		}

		set({ordersByTable: updatedOrders});
	},

	removeFromOrder: (tableId: number, selectedMenu: string, itemId: number) => {
		const currentOrders = get().ordersByTable;
		const updatedOrders = {...currentOrders};

		if (updatedOrders[tableId] && updatedOrders[tableId][selectedMenu]) {
			updatedOrders[tableId][selectedMenu] = updatedOrders[tableId][selectedMenu].filter(orderItem => orderItem.id !== itemId);

			if (updatedOrders[tableId][selectedMenu].length === 0) {
				delete updatedOrders[tableId][selectedMenu];
			}

			if (Object.keys(updatedOrders[tableId]).length === 0) {
				delete updatedOrders[tableId];
			}
		}

		set({ordersByTable: updatedOrders});
	},

	getOrderForTable: (tableId: number) => {
		const currentOrders = get().ordersByTable;
		return currentOrders[tableId];
	},

	clearOrderForTable: (tableId: number) => {
		const currentOrders = get().ordersByTable;
		const updatedOrders = {...currentOrders};

		if (updatedOrders[tableId]) {
			delete updatedOrders[tableId];
		}

		set({ordersByTable: updatedOrders});
	},
}));
