import { Alert } from "@mui/material"

function TittlePage({Tittle = "Gestion de Hoteles"}){

    return (
        
        <>

            <Alert variant= "outlined" serverity = "info" sx={{ width: "100%", mv:3}}>
                {Tittle}
            </Alert>
        </>

    )


}

export default TittlePage