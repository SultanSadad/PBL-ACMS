import React, { useState } from 'react';
import { TextField, IconButton, Box, Typography, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

const ApprovalTable = () => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [approvals, setApprovals] = useState([
    { username: 'John Doe', deviceName: 'MAC', status: 'Pending', issueDate: '21-10-2024', category: 'Low' },
    { username: 'Malik Anwar', deviceName: 'CCTV', status: 'Approved', issueDate: '23-11-2024', category: 'Critical' },
    { username: 'Michael', deviceName: 'CCTV', status: 'Rejected', issueDate: '24-11-2024', category: 'Medium' },
  ]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedApprovals = [...approvals].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setApprovals(sortedApprovals);
  };

  const convertToDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredApprovals = approvals.filter((approval) => {
    const approvalDate = convertToDate(approval.issueDate);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
  
    const isWithinDateRange = (!from || approvalDate >= from) && (!to || approvalDate <= to);
    const isUsernameMatch = approval.username.toLowerCase().includes(search.toLowerCase());
    const isDeviceNameMatch = approval.deviceName.toLowerCase().includes(search.toLowerCase());
  
    return isWithinDateRange && (isUsernameMatch || isDeviceNameMatch);
  });
  

  const handleStatusChange = (index, newStatus) => {
    const updatedApprovals = approvals.map((approval, i) => 
      i === index ? { ...approval, status: newStatus } : approval
    );
    setApprovals(updatedApprovals);
  };

  return (
    <Box width="100%" px={3}>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>Approval</Typography>
          <Typography variant="subtitle1">This is a list of pending approvals</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <TextField
              label="From"
              type="date"
              variant="outlined"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ marginRight: '8px', backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="To"
              type="date"
              variant="outlined"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ marginRight: '8px', backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              InputLabelProps={{ shrink: true }}
            />
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
          </Box>
        </Grid>
      </Grid>

      {/* Table section */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span onClick={() => handleSort('username')}>Username <SortIcon /></span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span onClick={() => handleSort('deviceName')}>Device Name <SortIcon /></span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Status</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span onClick={() => handleSort('issueDate')}>Issue Date <SortIcon /></span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span onClick={() => handleSort('category')}>Category <SortIcon /></span>
              </th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApprovals.map((approval, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{approval.username}</td>
                <td className="px-6 py-4">{approval.deviceName}</td>
                <td className="px-6 py-4">
                  <Button
                    style={{
                      backgroundColor: approval.status === 'Rejected' ? '#F8D7DA' :
                                      approval.status === 'Approved' ? '#dcf2e8' : '#FFF9E2',
                      color: approval.status === 'Rejected' ? '#C82333' :
                            approval.status === 'Approved' ? '#28a745' : '#C8AA14',
                      borderRadius: '50px',
                      padding: '5px 20px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {approval.status}
                  </Button>
                </td>
                <td className="px-6 py-4">{approval.issueDate}</td>
                <td className="px-6 py-4">{approval.category}</td>
                <td className="px-6 py-4">
                  <Button
                    onClick={() => handleStatusChange(index, 'Approved')}
                    style={{
                      backgroundColor: "#3CB371",
                      text: "#fffff",
                      color: "#fff",
                      borderRadius: "5px",
                      marginRight: "5px",
                      padding: "8px 15px"
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(index, 'Rejected')}
                    style={{
                      backgroundColor: "#C82333",
                      color: "#fff",
                      borderRadius: "5px",
                      padding: "8px 15px"
                    }}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default ApprovalTable;
