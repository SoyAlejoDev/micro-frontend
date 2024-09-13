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
}

export const useSocketStore = create<SocketStateData & OrderState & SocketState>((set, get) => ({
	// Estado del socket
	cocina: null,
	socket: null,
	socketData: null,
	online: false,
	ordersByTable: {},

	connectSocket: () => {
		const socket = io("http://localhost:3000", {
			transports: ["websocket", "polling"],
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 1000,
		});

		socket.on("connect_error", error => {
			console.error("Connection error:", error);
			set({online: false});
		});

		socket.on("connect", () => {
			console.log("Connected to server");
			set({online: true});
		});

		socket.on("disconnect", reason => {
			console.log("Disconnected:", reason);
			set({online: false});
		});

		socket.on("emit-data", (data: Data) => {
			console.log(data);
			set({socketData: data});
		});

		socket.on("orderSaved", data => {
			console.log(data);
			set({cocina: data});
		});

		set({socket});
	},

	disconnectSocket: () => {
		const {socket} = get();
		if (socket) {
			// Verificar el estado del socket antes de intentar desconectar
			if (socket.connected) {
				socket.disconnect();
			} else {
				console.log("Socket ya desconectado o aún no conectado");
			}

			// Limpiar los listeners para evitar memory leaks
			socket.removeAllListeners();

			// Actualizar el estado
			set({online: false, socket: null, socketData: null});
		} else {
			console.log("No hay socket para desconectar");
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
