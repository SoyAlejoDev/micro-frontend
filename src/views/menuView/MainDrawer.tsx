import { ChevronLeft, ChevronRight, Menu } from '@mui/icons-material';
import {
    Box,
    Button,
    CssBaseline, Divider, Drawer, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    styled,
    Toolbar,
    Typography,
    useTheme
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import * as React from 'react';
import { useSocketStore } from '../../store/useSocketStore';
import { RenderContent } from './RenderContent';
import './styles.css';
import { FABToScroll } from '../../ui/FABToScroll';
import { Loading } from '../../components/loading/Loading';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export const MainDrawer = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedMenu, setSelectedMenu] = React.useState<string>("Inicio");

    const { socketData, online } = useSocketStore();

    //? Sacar del menu el arreglo de secciones del menu
    const seccionesMenu = socketData?.new_data_menu?.map(item => item.nombre) ?? [];
    seccionesMenu.unshift("Inicio");

    const handleDrawerOpen = () => {
        setOpen(true);
    };


    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
    };

    return (
        <>
            {!online ? (
                <Loading />
            ) : (
                <Box sx={{ display: 'flex' }}

                >
                    <CssBaseline />
                    <AppBar position="fixed" open={open} style={{ backgroundImage: `url(${socketData?.main?.foto})` }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <Menu />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                {selectedMenu === 'Inicio' ? (socketData?.nombreNegocio) : selectedMenu}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer

                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                                backgroundImage: `url(${socketData?.history.foto})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <DrawerHeader>
                            <Button
                                onClick={handleDrawerClose}
                                variant='contained'
                                color='inherit'
                                sx={{ borderRadius: '15px' }}
                            >
                                {theme.direction === 'ltr' ? <ChevronLeft color='action' fontSize='small' /> : <ChevronRight color='action' fontSize='small' />}
                            </Button>
                        </DrawerHeader>
                        <Divider />
                        <List

                        >
                            {seccionesMenu.map((text) => (
                                <ListItem
                                    key={text}
                                    disablePadding
                                    style={{ backgroundColor: text === selectedMenu ? 'gray' : 'transparent' }}
                                >
                                    <ListItemButton onClick={() => handleMenuClick(text)}>
                                        <ListItemText primary={text} sx={{
                                            color: text === selectedMenu ? 'white' : 'black',
                                            fontWeight: 800

                                        }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <Main open={open}>
                        <DrawerHeader />

                        <RenderContent
                            seccionesMenu={seccionesMenu}
                            selectedMenu={selectedMenu}
                            socketData={socketData}
                        />
                        <FABToScroll />
                    </Main>
                </Box>
            )}
        </>
    );
};

