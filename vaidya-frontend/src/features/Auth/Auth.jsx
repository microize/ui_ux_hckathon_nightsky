import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginWithGoogleSSO,
  loginWithMicrosoftSSO,
  sendOTP,
  verifyOTP,
  logout,
} from './authSlice';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const Auth = () => {
  const [loginMethod, setLoginMethod] = useState(null); // 'google', 'microsoft', 'email'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [accessTokenInput, setAccessTokenInput] = useState('');
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const handleLoginMethodSelection = (method) => {
    setLoginMethod(method);
    setAccessTokenInput('');
    setEmail('');
    setOtp('');
  };

  const handleGoogleLogin = () => {
    const accessToken = accessTokenInput || 'google_access_token';
    dispatch(loginWithGoogleSSO(accessToken));
    setDisclaimerOpen(true);
  };

  const handleMicrosoftLogin = () => {
    const accessToken = accessTokenInput || 'microsoft_access_token';
    dispatch(loginWithMicrosoftSSO(accessToken));
    setDisclaimerOpen(true);
  };

  const handleSendOTP = () => {
    dispatch(sendOTP(email));
  };

  const handleVerifyOTP = () => {
    dispatch(verifyOTP({ email, otp }));
    setDisclaimerOpen(true);
  };

  const handleDisclaimerClose = () => {
    setDisclaimerOpen(false);
  };

  return (
    <>
      <Grid container sx={{ height: '100vh' }}>
        {/* Left Section - Authentication Form */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: { xs: 2, md: 4 } }}>
          <Paper elevation={3} sx={{ padding: { xs: 2, md: 4 }, maxWidth: 400, width: '100%' }}>
            <Typography variant={{ xs: 'h5', md: 'h4' }} gutterBottom align="center">
              Ask Vaidya.ai
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
              Your trusted health companion for medical insights. Sign in to begin your journey to better health!
            </Typography>
            {!loginMethod && (
              <>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: { xs: 1, md: 2 } }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendOTP}
                  fullWidth
                  sx={{ mb: { xs: 1, md: 2 }, py: { xs: 1, md: 1.5 } }}
                >
                  Generate OTP
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<img src="/google-icon.png" alt="Google" style={{ width: 20 }} />}
                  onClick={() => handleLoginMethodSelection('google')}
                  sx={{ mb: { xs: 1, md: 2 }, py: { xs: 1, md: 1.5 } }}
                >
                  Sign in with Google
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<img src="/microsoft-icon.png" alt="Microsoft" style={{ width: 20 }} />}
                  onClick={() => handleLoginMethodSelection('microsoft')}
                  sx={{ mb: { xs: 1, md: 2 }, py: { xs: 1, md: 1.5 } }}
                >
                  Sign in with Microsoft
                </Button>
              </>
            )}

            {loginMethod === 'google' && (
              <Box sx={{ maxWidth: '400px', width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                  Login with Google SSO
                </Typography>
                <TextField
                  label="Access Token"
                  variant="outlined"
                  fullWidth
                  value={accessTokenInput}
                  onChange={(e) => setAccessTokenInput(e.target.value)}
                  sx={{ mb: 2 }}
                />
                {authError && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {authError}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGoogleLogin}
                  disabled={authStatus === 'loading'}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {authStatus === 'loading' ? 'Logging in...' : 'Login'}
                </Button>
                <Button variant="text" onClick={() => setLoginMethod(null)} fullWidth>
                  Back
                </Button>
              </Box>
            )}

            {loginMethod === 'microsoft' && (
              <Box sx={{ maxWidth: '400px', width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                  Login with Microsoft SSO
                </Typography>
                <TextField
                  label="Access Token"
                  variant="outlined"
                  fullWidth
                  value={accessTokenInput}
                  onChange={(e) => setAccessTokenInput(e.target.value)}
                  sx={{ mb: 2 }}
                />
                {authError && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {authError}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMicrosoftLogin}
                  disabled={authStatus === 'loading'}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {authStatus === 'loading' ? 'Logging in...' : 'Login'}
                </Button>
                <Button variant="text" onClick={() => setLoginMethod(null)} fullWidth>
                  Back
                </Button>
              </Box>
            )}

            {loginMethod === 'email' && authStatus === 'otpSent' && (
              <>
                <Typography variant="body1" sx={{ mb: { xs: 1, md: 2 } }}>
                  OTP sent to {email}
                </Typography>
                <TextField
                  label="Enter OTP"
                  variant="outlined"
                  fullWidth
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  sx={{ mb: { xs: 1, md: 2 } }}
                />
                {authError && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {authError}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleVerifyOTP}
                  fullWidth
                  sx={{ mb: { xs: 1, md: 2 }, py: { xs: 1, md: 1.5 } }}
                >
                  Verify OTP
                </Button>
              </>
            )}
          </Paper>
        </Grid>

        {/* Right Section - Why Vaidya.ai? */}
        <Grid item xs={12} md={6} sx={{ backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
          <img src="/why-vaidya.png" alt="Why Vaidya.ai" style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px' }} />
        </Grid>
      </Grid>

      {/* Disclaimer Dialog */}
      <Dialog open={disclaimerOpen} onClose={handleDisclaimerClose}>
        <DialogTitle>Disclaimer</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            AI-Powered Tool: This tool utilizes artificial intelligence and may produce inaccurate or misleading information.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Not Medical Advice: The content generated is for informational purposes only and does not constitute medical advice. Consult a healthcare professional for medical concerns.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Data Privacy: We do not store or share any uploaded documents on our servers.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Limited Scope: Vaidya is designed exclusively for medical queries and may not address questions outside the medical domain. Please limit your questions to healthcare-related topics.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisclaimerClose} variant="contained" color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Auth;