import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import CustomButton from './ui/CustomButton';

export default function Navbar() {
    const navigate = useNavigate();
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    const image = localStorage.getItem('image') || '';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: '#000000',
                borderBottom: '1px solid #333333',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={image} alt={firstName} sx={{ width: 34, height: 34 }} />
                    <Typography variant="body1" sx={{ fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
                        {firstName} {lastName}
                    </Typography>
                    <CustomButton
                        label="Salir"
                        variant="outlined"
                        color="inherit"
                        size="small"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            borderColor: 'rgba(255,255,255,0.5)',
                            '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' },
                        }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
