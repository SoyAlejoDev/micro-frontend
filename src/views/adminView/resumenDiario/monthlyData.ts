// mock-restaurant-data.js

export const monthlyData = {
	totalRevenue: 158250.75,
	totalOrders: 2610,
	averageOrderValue: 60.63,
	topSellingItems: [
		{name: "Pollo a la parrilla", quantity: 750, revenue: 24750},
		{name: "Pasta Alfredo", quantity: 600, revenue: 12000},
		{name: "Ensalada César", quantity: 450, revenue: 6750},
		{name: "Filete de salmón", quantity: 540, revenue: 16200},
		{name: "Hamburguesa clásica", quantity: 660, revenue: 9900},
	],
	dailyRevenue: [
		{date: "2024-09-01", revenue: 5250.75},
		{date: "2024-09-02", revenue: 4800.5},
		{date: "2024-09-03", revenue: 5500.25},
		{date: "2024-09-04", revenue: 5100.0},
		{date: "2024-09-05", revenue: 5300.25},
		{date: "2024-09-06", revenue: 5600.5},
		{date: "2024-09-07", revenue: 5800.75},
		{date: "2024-09-08", revenue: 5200.0},
		{date: "2024-09-09", revenue: 5400.25},
		{date: "2024-09-10", revenue: 5700.5},
		{date: "2024-09-11", revenue: 5150.75},
		{date: "2024-09-12", revenue: 5350.0},
		{date: "2024-09-13", revenue: 5550.25},
		{date: "2024-09-14", revenue: 5750.5},
		{date: "2024-09-15", revenue: 5050.75},
		// ... puedes agregar más días aquí si lo deseas
	],
	categoryBreakdown: [
		{name: "Platos principales", value: 98000},
		{name: "Entradas", value: 25000},
		{name: "Postres", value: 15250},
		{name: "Bebidas", value: 20000},
	],
};

export const getDailySummary = (date: any) => ({
	date: date,
	totalRevenue: 5250.75 + Math.random() * 1000,
	totalOrders: 87 + Math.floor(Math.random() * 20),
	menuItemSales: [
		{item: "Pollo a la parrilla", quantity: 25, revenue: 825.0},
		{item: "Ensalada César", quantity: 15, revenue: 225.0},
		{item: "Pasta Alfredo", quantity: 20, revenue: 400.0},
		{item: "Sopa del día", quantity: 30, revenue: 300.0},
		{item: "Filete de salmón", quantity: 18, revenue: 540.0},
	],
});
