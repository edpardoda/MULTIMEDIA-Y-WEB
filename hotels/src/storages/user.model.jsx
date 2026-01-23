import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");

export const setDataUser = (data) => {
    ReactSession.set("sessionUser", JSON.stringify(data));
}

export const rmDataUser = ()=>{
    ReactSession.remove("sessionUser");
}

export const getDataUser = ()=>{
    const dataUser = ReactSession.get("sessionUser")
    return dataUser ? JSON.parse(dataUser) : null
}