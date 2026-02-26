import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CustomButton from './ui/CustomButton';
import CustomAlert from './ui/CustomAlert';
import CustomDialog from './ui/CustomDialog';
import ProductFormDialog from './ProductFormDialog';
import {
    addProduct,
    updateProduct,
    deleteProduct,
} from '../services/api';


export default function ProductTable({ products, setProducts }) {
    const token = localStorage.getItem('accessToken') || '';


    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    const showAlert = (message, severity = 'success') => {
        setAlert({ open: true, message, severity });
    };

    const handleOpenAdd = () => {
        setFormData(null);
        setFormOpen(true);
    };

    const handleOpenEdit = (product) => {
        setFormData(product);
        setFormOpen(true);
    };

    const handleFormSubmit = async (productData) => {
        setFormLoading(true);
        try {
            if (formData) {
                try {
                    const updated = await updateProduct(token, formData.id, productData);
                    setProducts((prev) =>
                        prev.map((p) => (p.id === formData.id ? { ...p, ...updated } : p))
                    );
                } catch {
                    // DummyJSON puede devolver 404 para productos simulados, actualizar localmente
                    setProducts((prev) =>
                        prev.map((p) => (p.id === formData.id ? { ...p, ...productData } : p))
                    );
                }
                showAlert('Producto actualizado correctamente', 'success');
            } else {
                try {
                    const created = await addProduct(token, productData);
                    setProducts((prev) => [created, ...prev]);
                } catch {
                    // Si falla la API, agregar localmente con ID temporal
                    const localProduct = { ...productData, id: Date.now(), thumbnail: '' };
                    setProducts((prev) => [localProduct, ...prev]);
                }
                showAlert('Producto agregado correctamente', 'success');
            }
            setFormOpen(false);
        } catch (err) {
            showAlert(err.response?.data?.message || 'Error al guardar producto', 'error');
        } finally {
            setFormLoading(false);
        }
    };

    const handleOpenDelete = (product) => {
        setDeleteTarget(product);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;
        setDeleteLoading(true);
        try {
            try {
                await deleteProduct(token, deleteTarget.id);
            } catch {
                // DummyJSON puede devolver 404 para productos simulados, ignorar
            }
            setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
            showAlert('Producto eliminado correctamente', 'success');
            setDeleteOpen(false);
        } catch (err) {
            showAlert(err.response?.data?.message || 'Error al eliminar producto', 'error');
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Productos</Typography>
                <CustomButton
                    label="Agregar Producto"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAdd}
                />
            </Box>

            {/* Table */}
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    background: '#111111',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Imagen</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary">No hay productos.</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((p) => (
                                <TableRow
                                    key={p.id}
                                    sx={{
                                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
                                        transition: 'background-color 0.2s',
                                    }}
                                >
                                    <TableCell>
                                        <Avatar
                                            src={p.thumbnail}
                                            alt={p.title}
                                            variant="rounded"
                                            sx={{ width: 48, height: 48 }}
                                        />
                                    </TableCell>
                                    <TableCell>{p.title}</TableCell>
                                    <TableCell>${p.price}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize' }}>{p.category}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Editar">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpenEdit(p)}
                                                size="small"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar">
                                            <IconButton
                                                color="error"
                                                onClick={() => handleOpenDelete(p)}
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Form Dialog (Add / Edit) */}
            <ProductFormDialog
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={formData}
                loading={formLoading}
            />

            {/* Delete Confirmation */}
            <CustomDialog
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar Producto"
                content={`¿Estás seguro de que deseas eliminar "${deleteTarget?.title}"?`}
                confirmLabel="Eliminar"
                loading={deleteLoading}
            />

            {/* Alert */}
            <CustomAlert
                open={alert.open}
                onClose={() => setAlert((a) => ({ ...a, open: false }))}
                message={alert.message}
                severity={alert.severity}
            />
        </>
    );
}
