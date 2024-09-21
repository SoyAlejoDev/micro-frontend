import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDFMensual = (monthlyData: any) => {
	const doc = new jsPDF();

	// Título
	doc.setFontSize(18);
	doc.text("Resumen Mensual de Ventas", 14, 20);
	doc.setFontSize(12);
	doc.text(`Fecha: ${new Date().toLocaleDateString("es-ES", {year: "numeric", month: "long"})}`, 14, 30);

	// Resumen general
	doc.setFontSize(14);
	doc.text("Resumen General", 14, 40);
	doc.setFontSize(12);
	doc.text(`Total Facturado: $${monthlyData.totalRevenue.toLocaleString()}`, 14, 50);
	doc.text(`Número de Órdenes: ${monthlyData.totalOrders}`, 14, 60);
	doc.text(`Valor Promedio por Orden: $${monthlyData.averageOrderValue.toFixed(2)}`, 14, 70);

	// Tabla de resumen por opción de menú
	doc.setFontSize(14);
	doc.text("Resumen por Opción de Menú", 14, 85);

	const menuOptionsTableColumn = ["Opción", "Cantidad Vendida", "Ingreso Total ($)"];
	const menuOptionsTableRows = monthlyData.menuOptions.map((option: any) => [option.name, option.quantity, `$${option.revenue.toFixed(2)}`]);

	autoTable(doc, {
		startY: 95,
		head: [menuOptionsTableColumn],
		body: menuOptionsTableRows,
	});

	// Detalles por opción de menú
	let startY = (doc as any).lastAutoTable.finalY + 20;

	monthlyData.menuOptions.forEach((option: any, _: number) => {
		if (startY > 250) {
			doc.addPage();
			startY = 20;
		}

		doc.setFontSize(14);
		doc.text(`Detalles de ${option.name}`, 14, startY);

		const sectionTableColumn = ["Sección", "Cantidad Vendida", "Ingreso ($)"];
		const sectionTableRows = option.sections.map((section: any) => [section.name, section.quantity, `$${section.revenue.toFixed(2)}`]);

		autoTable(doc, {
			startY: startY + 10,
			head: [sectionTableColumn],
			body: sectionTableRows,
		});

		startY = (doc as any).lastAutoTable.finalY + 20;
	});

	// Gráfico de ingresos diarios
	if (startY > 200) {
		doc.addPage();
		startY = 20;
	}

	doc.setFontSize(14);
	doc.text("Ingresos Diarios del Mes", 14, startY);

	const dailyRevenueTableColumn = ["Fecha", "Ingreso ($)"];
	const dailyRevenueTableRows = monthlyData.dailyRevenue.map((day: any) => [
		new Date(day.date).toLocaleDateString("es-ES"),
		`$${day.revenue.toFixed(2)}`,
	]);

	autoTable(doc, {
		startY: startY + 10,
		head: [dailyRevenueTableColumn],
		body: dailyRevenueTableRows,
	});

	// Nombre del archivo
	const monthYear = new Date().toLocaleDateString("es-ES", {year: "numeric", month: "2-digit"}).replace("/", "-");

	// Guardar el PDF
	doc.save(`Resumen Mensual ${monthYear}.pdf`);
};
