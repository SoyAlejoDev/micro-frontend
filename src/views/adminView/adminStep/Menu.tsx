import { Add, AddCircle, Delete, DeleteOutline, ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControlLabel, Grid, IconButton, Switch, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ImageUploader } from '../ImageUploader';

interface MenuItem {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    foto: string;
    habilitado: boolean;
}

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

interface MenuSection {
    id: string;
    nombre: string;
    items: MenuItem[];
}

export const Menu: React.FC = () => {
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

        console.log(sections);
    };

    return (
        <div style={{ margin: '24px 16px' }}>
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
                                        <div className='flex gap-2'>
                                            <TextField
                                                label="Nombre"
                                                variant="outlined"
                                                fullWidth
                                                size='small'
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
                                                label="Precio"
                                                variant="outlined"
                                                type="number"
                                                sx={{ maxWidth: '100px' }}
                                                size='small'
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
                                        </div>
                                        <TextField
                                            label="Descripción"
                                            variant="outlined"
                                            fullWidth
                                            size='small'
                                            multiline
                                            rows={2}
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

                                        <ImageUploader
                                            setFileBase64={(base64) => handleFileBase64Change(section.id, item.id, base64)}
                                            fileBase64={item.foto}
                                        />
                                        <div className='flex justify-between mt-3'>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                                <FormControlLabel
                                                    control={<Android12Switch defaultChecked />}
                                                    label="Habilitado"
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
                                                color="error"
                                                onClick={() => handleDeleteItem(section.id, item.id)}
                                            >
                                                <DeleteOutline />
                                            </IconButton>
                                        </div>
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

