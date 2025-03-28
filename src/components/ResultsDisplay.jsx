import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert,
  Paper
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ResultsDisplay = () => {
  const { currentResult, loading, error } = useSelector((state) => state.query);

  return (
    <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
      {loading ? (
        <Box textAlign="center" py={4}>
          <CircularProgress />
          <Typography variant="body2" color="text.secondary" mt={2}>
            Processing query...
          </Typography>
        </Box>
      ) : error ? (
        <Alert severity="error" icon={<ErrorOutlineIcon />}>
          Error: {error}
        </Alert>
      ) : !currentResult ? (
        <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
          Submit a query to see results
        </Typography>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            {currentResult.summary}
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentResult.data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1976d2"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ResultsDisplay;