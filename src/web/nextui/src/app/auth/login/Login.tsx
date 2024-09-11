'use client';

import React from 'react';
import { callApi } from '@app/api';
import { useAuth } from '@app/app/contexts/AuthContext';
import { SERVER_MODE } from '@app/constants';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const { user, login, serverMode } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSignIn = async (event: React.FormEvent) => {
    setLoading(true);
    setError('');
    event.preventDefault();

    try {
      const response = await callApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.user);
        router.push('/');
      } else {
        setError(data.message || 'An error occurred during sign in');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (serverMode === SERVER_MODE.OPEN || user) {
    router.push('/');
    return null;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={handleSignIn}>
        <TextField
          disabled={loading}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={Boolean(error)}
        />
        <TextField
          disabled={loading}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={Boolean(error)}
          helperText={error}
        />
        <Button
          type="submit"
          disabled={loading}
          sx={{ marginTop: '1em' }}
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
        <p>
          Don't have an account yet? <Link href="/auth/signup">Sign up</Link>
        </p>
      </form>
    </Container>
  );
}
