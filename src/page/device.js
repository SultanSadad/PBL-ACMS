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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

function createData(DeviceName, Department, Category, IpAddress) {
  return { DeviceName, Department, Category, IpAddress };
}

const initialRows = [
  createData('FASILITY GENSET.PLANT', 'IT, FINANCE, OP', 'Low', '192.168.1.1'),
  createData('CCTV', 'MIS', 'Critical', '192.168.1.2'),
  createData('GAD-server', '  GAD', 'Medium', '192.168.1.3'),
  createData('ATI-FG', 'IT, HR, OP', 'Low', '192.168.1.4'),
  createData('FASILITY GENSET.BAM', 'HR', 'Critical', '192.168.1.5'),
];

// Daftar nama-nama department yang akan ditampilkan di dropdown
const departmentList = [
  { name: 'IT', code: 'IT001' },
  { name: 'Human Resources', code: 'HR001' },
  { name: 'Finance', code: 'FN001' },
  { name: 'Marketing', code: 'MK001' },
  { name: 'Operations', code: 'OP001' },
];

export default function ProdukTable() {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newDevice, setNewDevice] = useState({
    name: '',
    department: '',
    category: '',
    ipAddress: ''
  });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.DeviceName.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (row) => {
    setSelectedRow(row);
    setNewDevice({
      name: row.DeviceName,
      department: row.Department,
      category: row.Category,
      ipAddress: row.IpAddress
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

  const handleAddDevice = () => {
    const newRow = createData(newDevice.name, newDevice.department, newDevice.category, newDevice.ipAddress);
    setRows([...rows, newRow]);
    setNewDevice({ name: '', department: '', category: '', ipAddress: '' });
    handleClose();
  };

  const handleEditDevice = () => {
    const updatedRows = rows.map((row) =>
      row.Department === selectedRow.Department
        ? { ...row, DeviceName: newDevice.name, Category: newDevice.category, IpAddress: newDevice.ipAddress }
        : row
    );
    setRows(updatedRows);
    handleCloseEdit();
  };

  const handleDeleteDevice = () => {
    setRows(rows.filter((row) => row.Department !== selectedRow.Department));
    handleCloseDelete();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDevice({ ...newDevice, [name]: value });
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
      {/* Bagian atas */}
      <Grid container spacing={2} className="mb-5" alignItems="center">
        <Grid item xs={6} container direction="column" justifyContent="flex-start">
          <Typography variant="h4" gutterBottom>Device</Typography>
          <Typography variant="subtitle1">This is a list of device</Typography>
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
            + Add Device
          </Button>
        </Grid>
      </Grid>

      {/* Tabel */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"><span onClick={() => handleSort('DeviceName')}>Device Name <SortIcon /></span></th>
              <th scope="col" className="px-6 py-3"><span onClick={() => handleSort('Department')}>Department <SortIcon /></span></th>
              <th scope="col" className="px-6 py-3"><span onClick={() => handleSort('Category')}>Category <SortIcon /></span></th>
              <th scope="col" className="px-6 py-3"><span onClick={() => handleSort('IpAddress')}>IP Address </span></th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.Department} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{row.DeviceName}</th>
                <td className="px-6 py-4">{row.Department}</td>
                <td className="px-6 py-4">
  <Button
    style={{
      backgroundColor: 
        row.Category === 'Low' ? '#DCF2E8' : 
        row.Category === 'Medium' ? '#FFF9E2' : 
        row.Category === 'Critical' ? '#f2e3d5' : '#FFFFFF',
      color: 
        row.Category === 'Low' ? '#28A745' : 
        row.Category === 'Medium' ? '#C8AA14' : 
        row.Category === 'Critical' ? '#c82333' : '#000000',
      borderRadius: '50px',
      padding: '5px 20px',
      textTransform: 'capitalize'
    }}
  >
    {row.Category}
  </Button>
</td>

                <td className="px-6 py-4">{row.IpAddress}</td>
                <td className="px-6 py-4">
                  <Button onClick={() => handleOpenEdit(row)} style={{ backgroundColor: "#007BFF", color: "#fff", borderRadius: "5px", padding: "8px 20px" }}>Edit</Button>
                  <Button onClick={() => handleOpenDelete(row)} style={{ backgroundColor: "#C82333", color: "#fff", borderRadius: "5px", padding: "8px 15px", marginLeft: "10px" }}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog untuk Add Device */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Device</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Device Name" name="name" value={newDevice.name} onChange={handleInputChange} fullWidth />
          
          {/* Select untuk Department */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={newDevice.department}
              onChange={handleInputChange}
            >
              {departmentList.map((dept) => (
                <MenuItem key={dept.code} value={dept.code}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField margin="dense" label="Category" name="category" value={newDevice.category} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="IP Address" name="ipAddress" value={newDevice.ipAddress} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleAddDevice} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Edit */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Device</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Device Name" name="name" value={newDevice.name} onChange={handleInputChange} fullWidth />
          
          {/* Select untuk Department */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={newDevice.department}
              onChange={handleInputChange}
            >
              {departmentList.map((dept) => (
                <MenuItem key={dept.code} value={dept.code}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField margin="dense" label="Category" name="category" value={newDevice.category} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="IP Address" name="ipAddress" value={newDevice.ipAddress} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">Cancel</Button>
          <Button onClick={handleEditDevice} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Delete */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Device</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this device?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">Cancel</Button>
          <Button onClick={handleDeleteDevice} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
