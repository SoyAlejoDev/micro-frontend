import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, IconButton, Accordion, AccordionSummary, AccordionDetails, Switch } from '@mui/material';
import { Add, AddCircle, Delete, ExpandMore, PlusOne } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { ImageUploader } from './ImageUploader'; // Asegúrate de que la ruta sea la correcta.

interface MenuItem {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    foto: string;
    habilitado: boolean;
}

interface MenuSection {
    id: string;
    nombre: string;
    items: MenuItem[];
}

const AdminDashboard: React.FC = () => {
    const [sections, setSections] = useState<MenuSection[]>([]);
    const [newSectionName, setNewSectionName] = useState<string>('');

    const handleAddSection = () => {
        if (newSectionName.trim() === '') return;

        const newSection: MenuSection = {
            id: uuidv4(),
            nombre: newSectionName,
            items: [],
        };

        setSections([...sections, newSection]);
        setNewSectionName('');
    };

    const handleAddItem = (sectionId: string) => {
        const newItem: MenuItem = {
            id: uuidv4(),
            nombre: '',
            descripcion: '',
            precio: 0,
            foto: '',
            habilitado: true,
        };

        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id === sectionId
                    ? { ...section, items: [...section.items, newItem] }
                    : section
            )
        );
    };

    const handleDeleteItem = (sectionId: string, itemId: string) => {
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id === sectionId
                    ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
                    : section
            )
        );
    };

    const handleDeleteSection = (sectionId: string) => {
        setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
    };

    const handleFileBase64Change = (sectionId: string, itemId: string, base64: string | null) => {
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        items: section.items.map((item) =>
                            item.id === itemId ? { ...item, foto: base64 || '' } : item
                        ),
                    }
                    : section
            )
        );
    };

    const handleAccept = () => {
        const hasIncompleteItems = sections.some((section) =>
            section.items.some((item) => !item.nombre || !item.descripcion || item.precio <= 0 || !item.foto)
        );

        if (hasIncompleteItems) {
            alert('Hay opciones incompletas. Por favor, revisa el formulario.');
            return;
        }

        console.log("Menu Data: ", sections);
    };

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Menú
            </Typography>

            <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                    <TextField
                        label="Nombre de la nueva sección"
                        variant="outlined"
                        size='small'
                        fullWidth
                        value={newSectionName}
                        onChange={(e) => setNewSectionName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAddSection}
                    >
                        {/* Agregar Sección */}
                        <Add />
                    </Button>
                </Grid>
            </Grid>

            {sections.map((section) => (
                <Accordion key={section.id} style={{ marginTop: 20 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h5">
                            {section.nombre}
                            <IconButton color="secondary" onClick={() => handleDeleteSection(section.id)} style={{ marginLeft: '16px' }}>
                                <Delete />
                            </IconButton>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<AddCircle />}
                            onClick={() => handleAddItem(section.id)}
                            style={{ marginBottom: 10 }}
                        >
                            Agregar Opción
                        </Button>

                        <Grid container spacing={2}>
                            {section.items.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
                                        <TextField
                                            label="Nombre"
                                            variant="outlined"
                                            fullWidth
                                            value={item.nombre}
                                            onChange={(e) =>
                                                setSections((prevSections) =>
                                                    prevSections.map((sec) =>
                                                        sec.id === section.id
                                                            ? {
                                                                ...sec,
                                                                items: sec.items.map((it) =>
                                                                    it.id === item.id ? { ...it, nombre: e.target.value } : it
                                                                ),
                                                            }
                                                            : sec
                                                    )
                                                )
                                            }
                                            style={{ marginBottom: 10 }}
                                        />
                                        <TextField
                                            label="Descripción"
                                            variant="outlined"
                                            fullWidth
                                            value={item.descripcion}
                                            onChange={(e) =>
                                                setSections((prevSections) =>
                                                    prevSections.map((sec) =>
                                                        sec.id === section.id
                                                            ? {
                                                                ...sec,
                                                                items: sec.items.map((it) =>
                                                                    it.id === item.id ? { ...it, descripcion: e.target.value } : it
                                                                ),
                                                            }
                                                            : sec
                                                    )
                                                )
                                            }
                                            style={{ marginBottom: 10 }}
                                        />
                                        <TextField
                                            label="Precio"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            value={item.precio}
                                            onChange={(e) =>
                                                setSections((prevSections) =>
                                                    prevSections.map((sec) =>
                                                        sec.id === section.id
                                                            ? {
                                                                ...sec,
                                                                items: sec.items.map((it) =>
                                                                    it.id === item.id ? { ...it, precio: parseFloat(e.target.value) } : it
                                                                ),
                                                            }
                                                            : sec
                                                    )
                                                )
                                            }
                                            style={{ marginBottom: 10 }}
                                        />
                                        <ImageUploader
                                            setFileBase64={(base64) => handleFileBase64Change(section.id, item.id, base64)}
                                            fileBase64={item.foto}
                                        />
                                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                                            <Typography>Habilitado</Typography>
                                            <Switch
                                                checked={item.habilitado}
                                                onChange={(e) =>
                                                    setSections((prevSections) =>
                                                        prevSections.map((sec) =>
                                                            sec.id === section.id
                                                                ? {
                                                                    ...sec,
                                                                    items: sec.items.map((it) =>
                                                                        it.id === item.id ? { ...it, habilitado: e.target.checked } : it
                                                                    ),
                                                                }
                                                                : sec
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleDeleteItem(section.id, item.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Button
                variant="contained"
                color="primary"
                onClick={handleAccept}
                style={{ marginTop: 20 }}
            >
                Aceptar
            </Button>
        </div>
    );
};

export default AdminDashboard;
