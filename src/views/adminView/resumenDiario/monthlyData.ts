// monthlyData.ts

export const monthlyData = {
	totalRevenue: 158250.75,
	totalOrders: 2610,
	averageOrderValue: 60.63,
	menuOptions: [
		{
			name: "Pizza",
			quantity: 750,
			revenue: 15000,
			sections: [
				{name: "Margarita", quantity: 300, revenue: 5400},
				{name: "Pepperoni", quantity: 250, revenue: 5000},
				{name: "Hawaiana", quantity: 200, revenue: 4600},
			],
		},
		{
			name: "Hamburguesa",
			quantity: 600,
			revenue: 9000,
			sections: [
				{name: "Clásica", quantity: 250, revenue: 3250},
				{name: "Con queso", quantity: 200, revenue: 3000},
				{name: "Vegetariana", quantity: 150, revenue: 2750},
			],
		},
		{
			name: "Ensalada",
			quantity: 450,
			revenue: 5625,
			sections: [
				{name: "César", quantity: 200, revenue: 2600},
				{name: "Griega", quantity: 150, revenue: 1875},
				{name: "Mixta", quantity: 100, revenue: 1150},
			],
		},
		{
			name: "Pasta",
			quantity: 500,
			revenue: 7500,
			sections: [
				{name: "Carbonara", quantity: 200, revenue: 3000},
				{name: "Bolognesa", quantity: 180, revenue: 2700},
				{name: "Alfredo", quantity: 120, revenue: 1800},
			],
		},
		{
			name: "Bebidas",
			quantity: 1000,
			revenue: 3000,
			sections: [
				{name: "Refresco", quantity: 500, revenue: 1250},
				{name: "Agua", quantity: 300, revenue: 600},
				{name: "Cerveza", quantity: 200, revenue: 1150},
			],
		},
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
	],
};
