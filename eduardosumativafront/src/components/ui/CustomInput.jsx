import TextField from '@mui/material/TextField';


export default function CustomInput({
    label,
    value,
    onChange,
    error = false,
    helperText = '',
    type = 'text',
    required = false,
    fullWidth = true,
    variant = 'outlined',
    size = 'medium',
    disabled = false,
    multiline = false,
    rows,
    sx = {},
    ...rest
}) {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            type={type}
            required={required}
            fullWidth={fullWidth}
            variant={variant}
            size={size}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            sx={sx}
            {...rest}
        />
    );
}
