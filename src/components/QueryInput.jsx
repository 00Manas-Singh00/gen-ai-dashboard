import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processQuery, addToHistory } from '../features/query/querySlice';
import { 
  TextField, 
  Button, 
  Chip, 
  Box, 
  Grid,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const QueryInput = () => {
  const [input, setInput] = useState('');
  const { suggestions, loading } = useSelector((state) => state.query);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    dispatch(addToHistory(input));
    dispatch(processQuery(input));
    setInput('');
  };

  return (
    <Box sx={{ mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your data query..."
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button 
                  type="submit" 
                  disabled={loading}
                  sx={{ minWidth: 'auto' }}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <SendIcon color="primary" />
                  )}
                </Button>
              </InputAdornment>
            )
          }}
        />
      </form>
      
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {suggestions.map((text) => (
          <Chip
            key={text}
            label={text}
            onClick={() => setInput(text)}
            variant="outlined"
            clickable
          />
        ))}
      </Box>
    </Box>
  );
};

export default QueryInput;