import io from "socket.io-client";
import {create} from "zustand";
import {Data, SocketState} from "../types";

interface SocketStateData {
	cocina: any;
	socket: any;
	socketData: Data | null;
	online: boolean;
}

export const useSocketStore = create<SocketStateData & SocketState>((set, get) => ({
	cocina: null,
	socket: null,
	socketData: null,
	online: false,

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
			if (socket.connected) {
				socket.disconnect();
			} else {
				console.log("Socket ya desconectado o aún no conectado");
			}
			socket.removeAllListeners();
			set({online: false, socket: null, socketData: null});
		} else {
			console.log("No hay socket para desconectar");
		}
	},

	setSocketData: (data: Data) => {
		set({socketData: data});
	},
}));
