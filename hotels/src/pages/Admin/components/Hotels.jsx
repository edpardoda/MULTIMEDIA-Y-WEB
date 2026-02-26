
import TittlePage from '../../../components/TittlePage'
import TableMui from '../../../components/TableMUI';
import { useEffect, useState } from 'react';
import { columsHotels } from '../../../utils/columnsTable'
import { GetHotels } from '../../../utils/hotels';
import ModalMui from '../../../components/ModalMui';

import { Services } from '../../../services/service.js';
import config from '../../../configs/env.js';
function Hotels ({}) { 

    const [listHotels, setListHotels] = useState([]);
    const [stateModal, setStateModal] = useState({
        open: false,
        tittle: "",
        message: null,
        status: 'info'
    })

    const handleGetHotels = async () =>{
        const resListHotels = await Services(
            {},   // body
            config.api.hotels.list.url,       // url
            config.api.hotels.list.method    // method, opcional
        )

        console.log(resListHotels);
       // const hotels = GetHotels();
        //setListHotels(hotels)
    }

    const handleOpenEditHotel= (id) => {
        alert("Editar Hotel" + id)
    }

    const handleDeleteHotel= (id) => {
        setStateModal(
            {
                ...stateModal,
                open: true,
                status: 'warning',
                message: "Estas seguro de eliminar el hotel con ID" + id + "?"
            }
        )
    }
    const handleViewHotel= (id) => {
        alert("ver Hotel" + id);
    }

    const handleCloseModal = () => setStateModal({...stateModal, open: false})

    useEffect(
        () => {
            handleGetHotels();
        },
        []
    )

    return (
        <>
            <ModalMui open={stateModal.open} message={stateModal.message} handleClose={handleCloseModal} status={stateModal.status} />
            <TittlePage tittle={"Gestion de hoteles"}/>
            <TableMui columns={
                columsHotels(
                    handleDeleteHotel,
                    handleOpenEditHotel,
                    handleViewHotel
                )} rows={listHotels}/>
        </>
    )
    
}

export default Hotels