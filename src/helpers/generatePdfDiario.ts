import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {IResumenDiario} from "../types";

export const generatePDF = (resumenDiario: IResumenDiario) => {
	const doc = new jsPDF();

	// Título
	doc.setFontSize(18);
	doc.text("Resumen Diario de Ventas", 14, 20);
	doc.setFontSize(12);
	doc.text(`Fecha: ${new Date(resumenDiario.date).toLocaleDateString()}`, 14, 30);

	// Resumen general
	doc.setFontSize(14);
	doc.text("Resumen General", 14, 40);
	doc.setFontSize(12);
	doc.text(`Total Facturado: $${resumenDiario.totalingreso}`, 14, 50);
	doc.text(`Número de Órdenes: ${resumenDiario.totalOrders}`, 14, 60);

	// Tabla de resumen por categoría
	doc.setFontSize(14);
	doc.text("Resumen por Categoría", 14, 70);

	const categoryTableColumn = ["Categoría", "Total Vendido", "Ingreso Total ($)"];
	const categoryTableRows = resumenDiario.menuItems.map(category => [
		category.category,
		category.totalVendido,
		`$${category.totalIngreso.toFixed(2)}`,
	]);

	autoTable(doc, {
		startY: 80,
		head: [categoryTableColumn],
		body: categoryTableRows,
	});

	// Detalles por categoría
	let startY = (doc as any).lastAutoTable.finalY + 20;

	resumenDiario.menuItems.forEach((category, index) => {
		if (startY > 250) {
			doc.addPage();
			startY = 20;
		}

		doc.setFontSize(14);
		doc.text(`Detalles de ${category.category}`, 14, startY);

		const itemTableColumn = ["Ítem", "Cantidad Vendida", "Ingreso ($)"];
		const itemTableRows = category.items.map(item => [item.name, item.cantVendida, `$${item.ingreso.toFixed(2)}`]);

		autoTable(doc, {
			startY: startY + 10,
			head: [itemTableColumn],
			body: itemTableRows,
		});

		startY = (doc as any).lastAutoTable.finalY + 20;
	});

	// Formatear la fecha para el nombre del archivo
	const fechaFormateada = new Date(resumenDiario.date)
		.toLocaleDateString("es-ES", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		})
		.replace(/\//g, "-");

	// Guardar el PDF con el nuevo formato de nombre
	doc.save(`Resumen Diario ${fechaFormateada}.pdf`);
};
