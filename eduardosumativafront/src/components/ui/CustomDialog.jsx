import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CustomButton from './CustomButton';


export default function CustomDialog({
    open,
    onClose,
    onConfirm,
    title = '¿Estás seguro?',
    content = '',
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    confirmColor = 'error',
    loading = false,
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>
            {content && (
                <DialogContent>
                    <DialogContentText>{content}</DialogContentText>
                </DialogContent>
            )}
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <CustomButton
                    label={cancelLabel}
                    onClick={onClose}
                    variant="outlined"
                    color="inherit"
                />
                <CustomButton
                    label={confirmLabel}
                    onClick={onConfirm}
                    color={confirmColor}
                    loading={loading}
                />
            </DialogActions>
        </Dialog>
    );
}
