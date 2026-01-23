import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
function ButtonMui({
    name,
    onClick = () => { },
    backgroundColor = 'black',
    textColor = "white",
    type = "submit"
}) {

    return (
        <>
            <Button
                fullWidth
                type={type}
                onClick={onClick}
                endIcon={<LoginIcon />}
                variant='contained'
                sx={{
                    color: textColor,
                    backgroundColor: backgroundColor
                }}
            >
                {name}

            </Button>
        </>

    )

}
export default ButtonMui