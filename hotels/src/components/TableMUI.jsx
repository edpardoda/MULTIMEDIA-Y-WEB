import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


function TableMui({ columns = [], rows=[]}){

    return (
    
        <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            //initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
        />
        </Paper>
  );
}

export default TableMui