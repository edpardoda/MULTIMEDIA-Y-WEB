import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function CustomButton({
    label,
    onClick,
    variant = 'contained',
    color = 'primary',
    loading = false,
    startIcon,
    fullWidth = false,
    type = 'button',
    size = 'medium',
    disabled = false,
    sx = {},
}) {
    return (
        <Button
            variant={variant}
            color={color}
            onClick={onClick}
            startIcon={loading ? null : startIcon}
            fullWidth={fullWidth}
            type={type}
            size={size}
            disabled={disabled || loading}
            sx={{
                position: 'relative',
                ...sx,
            }}
        >
            {loading ? <CircularProgress size={24} color="inherit" /> : label}
        </Button>
    );
}
