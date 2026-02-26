import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';
import UserInfoCard from '../components/UserInfoCard';
import ProductTable from '../components/ProductTable';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import CustomAlert from '../components/ui/CustomAlert';
import { getProducts, getCurrentUser } from '../services/api';

/**
 * Página Dashboard — /dashboard (protegida)
 */
export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

    const token = localStorage.getItem('accessToken') || '';

    const fetchProducts = useCallback(async () => {
        try {
            const data = await getProducts(token, 10, 0);
            setProducts(data.products || []);
        } catch (err) {
            setAlert({
                open: true,
                message: err.response?.data?.message || 'Error al cargar productos',
                severity: 'error',
            });
        }
    }, [token]);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                // Verificar y refrescar info del usuario autenticado
                const me = await getCurrentUser(token);
                if (me) {
                    localStorage.setItem('firstName', me.firstName || localStorage.getItem('firstName') || '');
                    localStorage.setItem('lastName', me.lastName || localStorage.getItem('lastName') || '');
                    localStorage.setItem('email', me.email || localStorage.getItem('email') || '');
                    localStorage.setItem('username', me.username || localStorage.getItem('username') || '');
                    localStorage.setItem('image', me.image || localStorage.getItem('image') || '');
                }
            } catch {
                // Si el token expiró, aún mostramos lo que hay en localStorage
            }
            await fetchProducts();
            setLoading(false);
        };
        init();
    }, [token, fetchProducts]);

    if (loading) return <LoadingSpinner />;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Bienvenida */}
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                    Bienvenido, {localStorage.getItem('firstName') || 'Usuario'}
                </Typography>

                {/* Info del usuario */}
                <Box sx={{ mb: 4 }}>
                    <UserInfoCard />
                </Box>

                {/* Tabla de productos con CRUD */}
                <ProductTable products={products} setProducts={setProducts} />
            </Container>

            {/* Alert global */}
            <CustomAlert
                open={alert.open}
                onClose={() => setAlert((a) => ({ ...a, open: false }))}
                message={alert.message}
                severity={alert.severity}
            />
        </Box>
    );
}
