import {Socket} from "socket.io-client";

export interface Data {
	nombreNegocio: string;
	main: Main;
	history: History;
	characteristics: Characteristic[];
	footer: Footer;
	menu: Menu;
	mesas: MesasArray[];
	cocina: Datos;
}

interface Menu {
	platosPrincipales: PlatosPrincipales[];
	bebidas: Bebidas[];
	pizzas: Pizzas[];
	agregados: Agregados[];
	entrantes: Entrantes[];
	postres: Postres[];
}

export interface Postres {
	id: number;
	nombre: string;
	foto: string;
	descripcion: string;
	precio: number;
}

export interface Entrantes {
	id: number;
	nombre: string;
	foto: string;
	descripcion: string;
	precio: number;
}

export interface Agregados {
	id: number;
	nombre: string;
	foto: string;
	descripcion: string;
	precio: number;
}

export interface PlatosPrincipales {
	id: number;
	nombre: string;
	foto: string;
	descripcion: string;
	precio: number;
}

export interface Bebidas {
	id: number;
	nombre: string;
	foto: string;
	descripcion: string;
	precio: number;
}

interface Pizzas {
	id: number;
	nombre: string;
	foto: string;
	descripcion: string;
	precio: number;
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

type Categoria = {
	Entrantes?: Producto[];
	Bebidas?: Producto[];
	Comidas?: Producto[];
	Pizzas?: Producto[];
	Postres?: Producto[];
	Agregados?: Producto[];
};

export type Datos = {
	[key: string]: Categoria;
};
