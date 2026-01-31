import { IconButton } from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

export const columsHotels = (
    onDelete = () => { },
    onEdit = () => { },
    onView = () => { }
) => {
    return [
        {
            field: "id",
            headerName: 'ID',
            width: 200,
        },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 200,
        },
        {
            field: 'address',
            headerName: 'Dirección',
            width: 200,
        },
        {
            field: 'store',
            headerName: 'Tiendas disponibles',
            width: 200,
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (item) => {
                return (
                    <>
                        <Tooltip title="Eliminar" placement="top">
                            <IconButton onClick={() => onDelete(item.id)} aria-label="delete" size="large">
                                <DeleteIcon fontSize="small" color="error" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar" placement="top">
                            <IconButton onClick={() => onEdit(item)} aria-label="edit" size="large">
                                <EditSquareIcon fontSize="small" color="success" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Ver" placement="top">
                            <IconButton onClick={() => onView(item)} aria-label="visibility" size="large">
                                <VisibilityIcon fontSize="small" color="primary" />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
    ]
}