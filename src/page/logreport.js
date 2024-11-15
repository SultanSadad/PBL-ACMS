import React, { useState } from 'react';
import { TextField, IconButton, Box, Typography, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

const LogReport = () => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [logs, setLogs] = useState([
    { date: '21-10-2024', user: 'John Doe', device: 'MAC', action: 'Access Granted', ip: '192.168.8.233' },
    { date: '23-11-2024', user: 'Malik Anwar', device: 'CCTV', action: 'Access Denied', ip: '192.168.8.233' },
    { date: '24-11-2024', user: 'Michael', device: 'CCTV', action: 'Access Granted', ip: '192.168.8.232' },
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

    const sortedLogs = [...logs].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setLogs(sortedLogs);
  };

  const convertToDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredLogs = logs.filter((log) => {
    const logDate = convertToDate(log.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const isWithinDateRange = (!from || logDate >= from) && (!to || logDate <= to);
    const isSearchMatch = log.user.toLowerCase().includes(search.toLowerCase());

    return isWithinDateRange && isSearchMatch;
  });

  return (
    <Box width="100%" px={3}> {/* Full width with padding on the sides */}
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>Log Report</Typography>
          <Typography variant="subtitle1">This is a list of log reports</Typography>
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
                  <span onClick={() => handleSort('date')}>Date</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span onClick={() => handleSort('user')}>User<SortIcon/></span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span onClick={() => handleSort('device')}>Device <SortIcon /></span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span onClick={() => handleSort('action')}>Action <SortIcon /></span>
                </th>
                <th scope="col" className="px-6 py-3">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{log.date}</th>
                  <td className="px-6 py-4">{log.user}</td>
                  <td className="px-6 py-4">{log.device}</td>
                  <td className="px-6 py-4">
                    <Button
                      style={{
                        backgroundColor: log.action === 'Access Denied' ? '#F2E3D5' : '#DCF2E8',
                        color: log.action === 'Access Denied' ? '#C82333' : '#28A745',
                        borderRadius: '50px',
                        padding: '5px 20px',
                        textTransform: 'capitalize',
                        minWidth: '120px',
                        height: '35px'
                      }}
                    >
                      {log.action}
                    </Button>
                  </td>
                  <td className="px-6 py-4">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>

  );
};

export default LogReport;
