import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import { CssBaseline, Container, Grid, Typography } from '@mui/material';
import QueryInput from './components/QueryInput';
import ResultsDisplay from './components/ResultsDisplay';
import QueryHistory from './components/QueryHistory';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
          Gen AI Analytics Dashboard
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <QueryInput />
            <ResultsDisplay />
          </Grid>
          <Grid item xs={12} md={4}>
            <QueryHistory />
          </Grid>
        </Grid>
      </Container>
    </Provider>
  );
}

export default App;