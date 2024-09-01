import {Socket} from "socket.io-client";

export interface Data {
	nombreNegocio: string;
	main: Main;
	history: History;
	characteristics: Characteristic[];
	footer: Footer;
	mesas: MesasArray[];
	cocina: Datos;
	new_data_menu: NewDataMenu[];
}

export interface NewDataMenu {
	id: string;
	nombre: string;
	items: Items[];
}

export interface Items {
	id: string;
	nombre: string;
	descripcion: string;
	precio: number;
	foto: string;
	habilitado: boolean;
}

interface Main {
	title: string;
	label: string;
	foto: string;
}

interface History {
	title: string;
	label: string;
	foto: string;
}

export interface Characteristic {
	logo: string;
	item: string;
	text: string;
}

export interface Footer {
	name: string;
	correo: string;
	logo: string;
	instagram: string;
	facebook: string;
	contacto: string;
}

export interface MesasArray {
	mesa: string;
	id: number;
	bussy: boolean;
}

export interface OrderItem {
	id: number;
	nombre: string;
	cantidad: number;
	precio: number;
}

export interface SocketState {
	socket: Socket | null;
	socketData: Data | null;
	online: boolean;
	connectSocket: () => void;
	disconnectSocket: () => void;
	setSocketData: (data: Data) => void;
}

export type Producto = {
	id: number;
	nombre: string;
	cantidad: number;
	precio: number;
};

export type Categorias = {
	Entrantes?: Producto[];
	Bebidas?: Producto[];
	Comidas?: Producto[];
	Agregados?: Producto[];
	Pizzas?: Producto[];
	Postres?: Producto[];
};

export type Orden = {
	mesa: number;
	orders: Categorias;
};

export type Datos = {
	[key: string]: Categorias;
};
