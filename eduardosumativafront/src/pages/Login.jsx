import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import CustomInput from '../components/ui/CustomInput';
import CustomButton from '../components/ui/CustomButton';
import CustomAlert from '../components/ui/CustomAlert';
import { loginUser } from '../services/api';

/**
 * Página de Login — /login
 */
export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

    const validate = () => {
        const errs = {};
        if (!username.trim()) errs.username = 'El usuario es requerido';
        if (!password.trim()) errs.password = 'La contraseña es requerida';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const trimmedUser = username.trim();

            // Credenciales personalizadas
            if (trimmedUser === 'edpardoda@uide.edu.ec' && password === 'password1234') {
                localStorage.setItem('accessToken', 'custom-token-edpardoda');
                localStorage.setItem('refreshToken', 'custom-refresh-edpardoda');
                localStorage.setItem('userId', '1');
                localStorage.setItem('username', 'edpardoda');
                localStorage.setItem('email', 'edpardoda@uide.edu.ec');
                localStorage.setItem('firstName', 'Eduardo');
                localStorage.setItem('lastName', 'Pardo');
                localStorage.setItem('image', '');
                navigate('/dashboard', { replace: true });
                return;
            }

            // Fallback: DummyJSON API
            const data = await loginUser(trimmedUser, password);

            localStorage.setItem('accessToken', data.accessToken || '');
            localStorage.setItem('refreshToken', data.refreshToken || '');
            localStorage.setItem('userId', String(data.id || ''));
            localStorage.setItem('username', data.username || '');
            localStorage.setItem('email', data.email || '');
            localStorage.setItem('firstName', data.firstName || '');
            localStorage.setItem('lastName', data.lastName || '');
            localStorage.setItem('image', data.image || '');

            navigate('/dashboard', { replace: true });
        } catch (err) {
            const msg =
                err.response?.data?.message || 'Error de autenticación. Verifica tus credenciales.';
            setAlert({ open: true, message: msg, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000000',
                p: 2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 5 },
                    maxWidth: 420,
                    width: '100%',
                    borderRadius: 4,
                    border: '1px solid #333333',
                    background: '#111111',
                }}
            >
                {/* Header */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            width: 56,
                            height: 56,
                            mb: 2,
                            boxShadow: '0 0 24px rgba(255,255,255,0.15)',
                        }}
                    >
                        <LockOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
                        Iniciar Sesión
                    </Typography>
                </Box>

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <CustomInput
                        label="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={Boolean(errors.username)}
                        helperText={errors.username}
                        required
                        autoComplete="username"
                    />
                    <CustomInput
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        required
                        autoComplete="current-password"
                    />
                    <CustomButton
                        label="Ingresar"
                        type="submit"
                        fullWidth
                        loading={loading}
                        sx={{
                            mt: 1,
                            py: 1.4,
                            fontSize: '1rem',
                            background: '#FFFFFF',
                            color: '#000000',
                            '&:hover': {
                                background: '#CCCCCC',
                            },
                        }}
                    />
                </Box>
            </Paper>

            {/* Alert — reemplaza alert() nativo */}
            <CustomAlert
                open={alert.open}
                onClose={() => setAlert((a) => ({ ...a, open: false }))}
                message={alert.message}
                severity={alert.severity}
            />
        </Box>
    );
}
