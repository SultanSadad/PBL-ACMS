import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import Logo from './logo.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{marginTop: '95px'
       
      }}
    >
      <div
        style={{
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <img 
  src={Logo} 
  style={{ 
    height: '80px', 
    display: 'block', 
    margin: '0 auto' 
  }} 
  alt="Logo" 
/>

</Typography>
        <Typography component="h1" variant="h5">
          Sign in to your account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         <Button 
  type="submit" 
  variant="contained" 
  style={{ backgroundColor: '#007BFF', color: '#FFFFFF',marginTop:'6px', marginBottom:'40px' }} 
  fullWidth
>
  Sign in
</Button>

        </form>
      </div>
    </Container>
  );
};

export default Login;
