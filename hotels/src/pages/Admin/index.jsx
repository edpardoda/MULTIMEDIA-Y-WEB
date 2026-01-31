import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import GroupIcon from '@mui/icons-material/Group';

const navItems = [
    {
        label: "Registrar Hotel",
        path: "/dashboard/registrohotel",
        icon: "HotelIcon"
    },
    {
        label: "Gestionar Hoteles",
        path: "/dashboard/gestionhoteles",
        icon: "Manage"
    },
    {
        label: "Usuarios",
        path: "/dashboard/usuarios",
        icon: "Users",
        options: [
            {
                label: "Crear",
                path: "/dashboard/usuarios/crear"
            },
            {
                label: "Listar",
                path: "/dashboard/usuarios/listar"
            }
        ]
    },

];
const handleGetIcon = (icon) => {
    switch (icon) {
        case "HotelIcon":
            return <HotelIcon />;
        case "Manage":
            return <ManageSearchIcon />;
        case "Users":
            return <GroupIcon />;
        default:
            break;
    }
}
function LayoutAdmin(props) {
    const navigate = useNavigate();
    const { window } = props;
    const [menuOpen, setMenuOpen] = React.useState(true);

    const handleDrawerToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleNavItem = (path) => {
        navigate(path)
    }

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            onClick={() => { handleNavItem(item.path) }}
                            sx={{ textAlign: 'center' }}
                        >
                            <ListItem>
                                {handleGetIcon(item.icon)}
                            </ListItem>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{ width: menuOpen ? '80%' : '100%' }} component="nav">
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon sx={{ color: '#fff' }} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, marginLeft: 'auto' }}
                    >

                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button sx={{ color: '#fff' }}>
                            Cerrar Sesión
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="persistent"
                    open={menuOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        width: menuOpen ? '20%' : '0%',
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '20%' },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }} width={menuOpen ? '75%' : '100%'}>
                <Outlet />
            </Box>
        </Box>
    );
}

LayoutAdmin.propTypes = {
    window: () => Window
}

export default LayoutAdmin;