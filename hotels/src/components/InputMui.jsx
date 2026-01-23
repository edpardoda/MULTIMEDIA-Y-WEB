import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function InputMui({
    type = "text",
    placeholder,
    value,
    onChange = () => { },
    required = false,
    helperText = "",
    errorcito = false,
    label = "",
    startIcon = null,
    endIcon = null


}) {

    return (
        <>
            <TextField
                fullWidth
                size='small'
                label={label}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                variant='outlined'
                required={required}
                helperText={helperText}
                error={errorcito}
                slotProps={{
                    input: {
                        startAdornment: startIcon && (
                            <InputAdornment position="start">
                                {startIcon}
                            </InputAdornment>
                        ),
                        endAdornment: endIcon && (
                            <InputAdornment position="end">
                                {endIcon}
                            </InputAdornment>
                        ),
                    },
                }}
            />

        </>

    )
}
export default InputMui;