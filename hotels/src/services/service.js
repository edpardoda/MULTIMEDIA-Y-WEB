import config from "../configs/env.js";
export const Services = async (body="", url, method = "POST")=>{
    const request = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    try {
    const response = await fetch(`${config.host}:${config.port}/${url}`, request);
    return response.json();
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Error de conexion con el servidor"
        }
        
    }
        
   

}

