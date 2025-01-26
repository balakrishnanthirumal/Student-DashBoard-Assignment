import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';

import useSignUpWithEmail from '../../hooks/useSignUpWIthEmail';
import { Link } from 'react-router-dom';

export function SignUpView() {
  const router = useRouter();
  const { loading, error, signup } = useSignUpWithEmail();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const renderForm = (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={1000}
      alignSelf="center"
      sx={{ width: 600, mx: 60 }}
    >
      <TextField
        fullWidth
        name="email"
        value={inputs.email}
        label="Email address"
        defaultValue="admin@123.com"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />

      <TextField
        fullWidth
        name="password"
        value={inputs.password}
        label="Password"
        defaultValue="admin@123"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={() => signup(inputs)}
      >
        {loading ? 'Loading...' : 'Sign Up'}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box
        gap={1.5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ mb: 5, mt: 10 }}
      >
        <Typography variant="h6">Sign Up</Typography>

        <Typography variant="h6">
          <Link to={'/login'}>Already Registered?</Link>
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}
