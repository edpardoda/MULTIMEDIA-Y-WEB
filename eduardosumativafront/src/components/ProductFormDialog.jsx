import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import CustomInput from './ui/CustomInput';
import CustomButton from './ui/CustomButton';

export default function ProductFormDialog({
    open,
    onClose,
    onSubmit,
    initialData = null,
    loading = false,
}) {
    const isEdit = Boolean(initialData);

    const [title, setTitle] = useState(initialData?.title || '');
    const [price, setPrice] = useState(initialData?.price?.toString() || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [errors, setErrors] = useState({});

    const handleEnter = () => {
        setTitle(initialData?.title || '');
        setPrice(initialData?.price?.toString() || '');
        setCategory(initialData?.category || '');
        setErrors({});
    };

    const validate = () => {
        const errs = {};
        if (!title.trim()) errs.title = 'El título es requerido';
        if (!price.trim()) errs.price = 'El precio es requerido';
        else if (isNaN(Number(price)) || Number(price) <= 0)
            errs.price = 'Ingrese un precio válido';
        if (!category.trim()) errs.category = 'La categoría es requerida';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        onSubmit({ title: title.trim(), price: Number(price), category: category.trim() });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            TransitionProps={{ onEnter: handleEnter }}
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                {isEdit ? 'Editar Producto' : 'Agregar Producto'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <CustomInput
                        label="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                        required
                    />
                    <CustomInput
                        label="Precio"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                        required
                    />
                    <CustomInput
                        label="Categoría"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        error={Boolean(errors.category)}
                        helperText={errors.category}
                        required
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <CustomButton
                    label="Cancelar"
                    onClick={onClose}
                    variant="outlined"
                    color="inherit"
                />
                <CustomButton
                    label={isEdit ? 'Guardar Cambios' : 'Agregar'}
                    onClick={handleSubmit}
                    loading={loading}
                />
            </DialogActions>
        </Dialog>
    );
}
