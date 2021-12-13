import React, { useState } from 'react';
import { Alert, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../services/auth';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <Box display="flex" justifyContent="center" alignItems="center" style={{ height: "80vh" }}>
            <Paper>
                <Box m={5}>
                    <form>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4" component="h2">Login</Typography>
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email"
                                    autoComplete="email"
                                    variant="standard"
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value);
                                        setError("");
                                    }}
                                    error={error.length > 0}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="standard"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    error={error.length > 0}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box my={2}>
                                    <Button type="submit" variant="contained" disabled={!email || !password} onClick={e => {
                                        e.preventDefault();
                                        Auth.login(email, password, () => navigate("/virtualCard"), error => setError(error));
                                    }}>Log in</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                {error && <Alert severity="error">{error}</Alert>}
            </Paper>
        </Box>
    );
}