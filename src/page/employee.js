import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Container,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';


function createData(name, email, role, status) {
  return { name, email, role, status };
}

const initialRows = [
  createData('John Doe', 'john.doe@example.com', 'Admin', 'Active'),
  createData('Jane Smith', 'jane.smith@example.com', 'Employee', 'Unactive'),
  createData('Bob Johnson', 'bob.johnson@example.com', 'Employee', 'Active'),
  createData('Alice Williams', 'alice.williams@example.com', 'Employee', 'Unactive'),
  createData('Charlie Brown', 'charlie.brown@example.com', 'Admin', 'Active'),
];

export default function EmployeeTable() {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: '',
    status: ''
  });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (row) => {
    setSelectedRow(row);
    setNewEmployee({
      name: row.name,
      email: row.email,
      role: row.role,
      status: row.status
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

  const handleAddEmployee = () => {
    const newRow = createData(newEmployee.name, newEmployee.email, newEmployee.role, newEmployee.status);
    setRows([...rows, newRow]);
    setNewEmployee({ name: '', email: '', role: '', status: '' });
    handleClose();
  };

  const handleEditEmployee = () => {
    const updatedRows = rows.map((row) =>
      row.email === selectedRow.email
        ? { ...row, name: newEmployee.name, role: newEmployee.role, status: newEmployee.status }
        : row
    );
    setRows(updatedRows);
    handleCloseEdit();
  };

  const handleDeleteEmployee = () => {
    setRows(rows.filter((row) => row.email !== selectedRow.email));
    handleCloseDelete();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee({ ...newEmployee, [name]: value });
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
        <Grid item xs={6} container direction="column" alignItems="flex-start">
          <Typography variant="h4" gutterBottom>Employee</Typography>
          <Typography variant="subtitle1">This is a list of employee</Typography>
        </Grid>
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
            style={{ backgroundColor: "#3CB371", color: "#fff", borderRadius: "8px", padding: "15px 12px", marginLeft: "8px" }}
          >
            + ADD Employee
          </Button>
        </Grid>
      </Grid>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span onClick={() => handleSort('name')}>Name <SortIcon /></span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span onClick={() => handleSort('email')}>Email <SortIcon /></span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span onClick={() => handleSort('role')}>Role <SortIcon /></span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span onClick={() => handleSort('status')}>Status <SortIcon /></span>
              </th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.email} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.name}</th>
                <td className="px-6 py-4">{row.email}</td>
                <td className={`px-6 py-4 ${row.role === 'Admin' ? 'text-green-500' : 'text-gray-900'}`}>{row.role}</td>
                <td className="px-6 py-4">
  <Button
    style={{
      backgroundColor: row.status === 'Unactive' ? '#F2E3D5' : '#DCF2E8',
      color: row.status === 'Unactive' ? '#C82333' : '#28A745',
      borderRadius: '50px',
      padding: '5px 20px',
      textTransform: 'capitalize'
    }}
  >
    {row.status}
  </Button>
</td>

                <td className="px-6 py-4">
                  <Button onClick={() => handleOpenEdit(row)} style={{ backgroundColor: "#007BFF", color: "#fff", borderRadius: "5px", padding: "8px 20px" }}>Edit</Button>
                  <Button onClick={() => handleOpenDelete(row)} style={{ backgroundColor: "#C82333", color: "#fff", borderRadius: "5px", padding: "8px 15px", marginLeft: "10px" }}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Name" name="name" value={newEmployee.name} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Email" name="email" value={newEmployee.email} onChange={handleInputChange} fullWidth />
          <FormControl component="fieldset" margin="dense">
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup row name="role" value={newEmployee.role} onChange={handleInputChange}>
              <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
              <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
            </RadioGroup>
          </FormControl>
          <TextField margin="dense" label="Status" name="status" value={newEmployee.status} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleAddEmployee} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Name" name="name" value={newEmployee.name} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Email" name="email" value={newEmployee.email} onChange={handleInputChange} fullWidth />
          <FormControl component="fieldset" margin="dense">
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup row name="role" value={newEmployee.role} onChange={handleInputChange}>
              <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
              <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
            </RadioGroup>
          </FormControl>
          <TextField margin="dense" label="Status" name="status" value={newEmployee.status} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">Cancel</Button>
          <Button onClick={handleEditEmployee} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>Are you sure you want to delete this employee?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteEmployee} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
