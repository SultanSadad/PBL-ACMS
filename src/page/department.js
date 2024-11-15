import React, { useState } from 'react';
import {
  Container,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

function createData(DepartmentName, Code, Head) {
  return { DepartmentName, Code, Head };
}

const initialRows = [
  createData('Information Technology', 'IT001', 'John Doe'),
  createData('Human Resources', 'HR001', 'Jane Smith'),
  createData('Finance', 'FN001', 'Mark Johnson'),
  createData('Marketing', 'MK001', 'Emily Davis'),
  createData('Operations', 'OP001', 'Michael Brown'),
];

export default function ProdukTable() {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    code: '',
    head: '',
  });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.DepartmentName.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (row) => {
    setSelectedRow(row);
    setNewDepartment({
      name: row.DepartmentName,
      code: row.Code,
      head: row.Head,
    });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = (row) => {
    setSelectedRow(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleAddDepartment = () => {
    const newRow = createData(newDepartment.name, newDepartment.code, newDepartment.head);
    setRows([...rows, newRow]);
    setNewDepartment({ name: '', code: '', head: '' });
    handleClose();
  };

  const handleEditDepartment = () => {
    const updatedRows = rows.map((row) =>
      row.Code === selectedRow.Code
        ? { ...row, DepartmentName: newDepartment.name, Head: newDepartment.head }
        : row
    );
    setRows(updatedRows);
    handleCloseEdit();
  };

  const handleDeleteDepartment = () => {
    setRows(rows.filter((row) => row.Code !== selectedRow.Code));
    handleCloseDelete();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDepartment({ ...newDepartment, [name]: value });
  };

  const handleSort = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);

    const sortedRows = [...rows].sort((a, b) => {
      if (direction === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setRows(sortedRows);
  };

  return (
    <Container>
      <Grid container spacing={2} className="mb-5" alignItems="center">
        {/* Bagian kiri untuk "Department" dan "This is a list of departments" */}
        <Grid item xs={6} container direction="column" justifyContent="flex-start">
          <Typography variant="h4" gutterBottom>
            Department
          </Typography>
          <Typography variant="subtitle1">
            This is a list of departments
          </Typography>
        </Grid>

        {/* Bagian kanan untuk Search dan Button */}
        <Grid item xs={6} container justifyContent="flex-end" alignItems="center" spacing={1}>
        <TextField
              label="Search"
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
              style={{ width: "200px", backgroundColor: "#FFFFFF", borderRadius: "8px" }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
                style: { borderRadius: "8px" },
              }}
            />
          <Button
            variant="contained"
            onClick={handleOpen}
            style={{
              backgroundColor: "#3CB371",
              color: "#fff",
              borderRadius: "8px",
              padding: "15px 12px",
              marginLeft: "8px", // Gap between TextField and Button
            }}
          >
            + Add Department
          </Button>
        </Grid>
      </Grid>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span onClick={() => handleSort('DepartmentName')}>
                  Department Name   <SortIcon />
                </span>
              </th>
              <th scope="col" className="px-6 py-3">
          <span
            onClick={() => handleSort('Code')} 
            sx={{ color: 'black' }} // Mengatur warna teks tombol menjadi hitam
          >
            Code <SortIcon style={{ color: 'black' }} />
          </span>
        </th>

              <th scope="col" className="px-6 py-3">
                <span onClick={() => handleSort('Head')}>
                  Head of Department<SortIcon />
                </span>
              </th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.Code} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {row.DepartmentName}
                </th>
                <td className="px-6 py-4">{row.Code}</td>
                <td className="px-6 py-4">{row.Head}</td>
                <td className="px-6 py-4">
                  <Button onClick={() => handleOpenEdit(row)} 
                    style={{
                      backgroundColor: "#007BFF",
                      color: "#fff",
                      borderRadius: "5px",
                      padding: "8px 20px",
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleOpenDelete(row)}
                    style={{
                      backgroundColor: "#C82333",
                      color: "#fff",
                      borderRadius: "5px",
                      padding: "8px 15px",
                      marginLeft: "10px", // Jarak antar tombol
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Department</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Nama Department" name="name" value={newDepartment.name} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Kode Department" name="code" value={newDepartment.code} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Head of Department" name="head" value={newDepartment.head} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  style={{ backgroundColor: "#757575", color: "#fff", borderRadius: "5px", padding: "8px 10PX"}}>Cancel</Button>
          <Button onClick={handleAddDepartment}  style={{ backgroundColor: "#3CB371", color: "#fff", borderRadius: "5px", padding: "8px 20px", marginRight:"20px", marginBlock:"5px"}}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Nama Department" name="name" value={newDepartment.name} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Kode Department" name="code" value={newDepartment.code} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Head of Department" name="head" value={newDepartment.head} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}style={{ backgroundColor: "#757575", color: "#fff", borderRadius: "5px", padding: "8px 20px"}}>Cancel</Button>
          <Button onClick={handleEditDepartment} style={{ backgroundColor: "#007BFF", color: "#fff", borderRadius: "5px", padding: "8px 20px", marginRight:"20px", marginBlock:"10px"}}>Edit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this department?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}  style={{ backgroundColor: "#757575", color: "#fff", borderRadius: "5px", padding: "8px 10PX"}}>Cancel</Button>
          <Button onClick={handleDeleteDepartment} style={{ backgroundColor: "#C82333", color: "#fff", borderRadius: "5px", padding: "8px 20px", marginRight:"20px", marginBlock:"5px"}}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}