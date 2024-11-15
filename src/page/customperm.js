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

function createData(Username, DeviceName, IssueDate, Category) {
  return { Username, DeviceName, IssueDate, Category };
}

const initialRows = [
  createData('Alice', 'FASILITY GENSET.PLANT', '2024-01-01', 'Low'),
  createData('Bob', 'CCTV', '2024-02-15', 'Critical'),
  createData('Charlie', 'GAD-server', '2024-03-10', 'Medium'),
  createData('Dave', 'ATI-FG', '2024-04-25', 'Low'),
  createData('Eve', 'FASILITY GENSET.BAM', '2024-05-05', 'Critical'),
];

export default function CustomPermissionTable() {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newPermission, setNewPermission] = useState({
    username: '',
    deviceName: '',
    issueDate: '',
    category: '',
  });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearchChange = (event) => setSearch(event.target.value);

  const filteredRows = rows.filter((row) =>
  row.DeviceName.toLowerCase().includes(search.toLowerCase()) ||
  row.Username.toLowerCase().includes(search.toLowerCase()) 
);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEdit = (row) => {
    setSelectedRow(row);
    setNewPermission({
      username: row.Username,
      deviceName: row.DeviceName,
      issueDate: row.IssueDate,
      category: row.Category,
    });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (row) => {
    setSelectedRow(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const handleAddPermission = () => {
    const newRow = createData(newPermission.username, newPermission.deviceName, newPermission.issueDate, newPermission.category);
    setRows([...rows, newRow]);
    setNewPermission({ username: '', deviceName: '', issueDate: '', category: '' });
    handleClose();
  };

  const handleEditPermission = () => {
    const updatedRows = rows.map((row) =>
      row.Username === selectedRow.Username
        ? { ...row, DeviceName: newPermission.deviceName, IssueDate: newPermission.issueDate, Category: newPermission.category }
        : row
    );
    setRows(updatedRows);
    handleCloseEdit();
  };

  const handleDeletePermission = () => {
    setRows(rows.filter((row) => row.Username !== selectedRow.Username));
    handleCloseDelete();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPermission({ ...newPermission, [name]: value });
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
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>Permissions</Typography>
          <Typography variant="subtitle1">List of permissions</Typography>
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
            + Add Permission
          </Button>
        </Grid>
      </Grid>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3"><span onClick={() => handleSort('Username')}>Username <SortIcon /></span></th>
              <th className="px-6 py-3"><span onClick={() => handleSort('DeviceName')}>Device Name <SortIcon /></span></th>
              <th className="px-6 py-3"><span onClick={() => handleSort('IssueDate')}>Issue Date <SortIcon /></span></th>
              <th className="px-6 py-3"><span onClick={() => handleSort('Category')}>Category <SortIcon /></span></th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.Username} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.Username}</td>
                <td className="px-6 py-4">{row.DeviceName}</td>
                <td className="px-6 py-4">{row.IssueDate}</td>
                <td className="px-6 py-4">
                  <Button style={{
                    backgroundColor: row.Category === 'Low' ? '#DCF2E8' : row.Category === 'Medium' ? '#FFF9E2' : '#f2e3d5',
                    color: row.Category === 'Low' ? '#28A745' : row.Category === 'Medium' ? '#C8AA14' : '#c82333',
                    borderRadius: '50px', padding: '5px 20px', textTransform: 'capitalize'
                  }}>{row.Category}</Button>
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

      {/* Add Permission Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Permission</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Username" name="username" value={newPermission.username} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Device Name" name="deviceName" value={newPermission.deviceName} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Issue Date" name="issueDate" value={newPermission.issueDate} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Category" name="category" value={newPermission.category} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: "#757575", color: "#fff", borderRadius: "5px", padding: "8px 20px"}}>Cancel</Button>
          <Button onClick={handleAddPermission} style={{ backgroundColor: "#3CB371", color: "#fff", borderRadius: "5px", padding: "8px 20px", marginRight:"20px", marginBlock:"10px"}}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Permission Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Permission</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Username" name="username" value={newPermission.username} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Device Name" name="deviceName" value={newPermission.deviceName} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Issue Date" name="issueDate" value={newPermission.issueDate} onChange={handleInputChange} fullWidth />
          <TextField margin="dense" label="Category" name="category" value={newPermission.category} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} style={{ backgroundColor: "#757575", color: "#fff", borderRadius: "5px", padding: "8px 20px"}}>Cancel</Button>
          <Button onClick={handleEditPermission} style={{ backgroundColor: "#007BFF", color: "#fff", borderRadius: "5px", padding: "8px 20px", marginRight:"20px", marginBlock:"10px"}}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Permission</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this permission?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} style={{ backgroundColor: "#757575", color: "#fff", borderRadius: "5px", padding: "8px 20px"}}>Cancel</Button>
          <Button onClick={handleDeletePermission} style={{ backgroundColor: "#C82333", color: "#fff", borderRadius: "5px", padding: "8px 20px", marginRight:"20px", marginBlock:"10px"}}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
