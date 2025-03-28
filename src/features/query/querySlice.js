import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockData = (query) => ({
  data: Array.from({length: 5}, (_, i) => ({
    name: `Day ${i+1}`,
    value: Math.floor(Math.random() * 1000)
  })),
  summary: `Showing results for: ${query}`
});

export const processQuery = createAsyncThunk(
  'query/process',
  async (queryText, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if(Math.random() < 0.1) throw new Error('Simulated API error');
      return mockData(queryText);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const querySlice = createSlice({
  name: 'query',
  initialState: {
    history: [],
    currentResult: null,
    loading: false,
    error: null,
    suggestions: [
      'Sales last quarter',
      'User growth rate',
      'Revenue by region',
      'Monthly active users'
    ]
  },
  reducers: {
    addToHistory: (state, action) => {
      state.history.unshift({
        id: Date.now(),
        query: action.payload,
        timestamp: new Date().toISOString()
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResult = action.payload;
      })
      .addCase(processQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addToHistory } = querySlice.actions;
export default querySlice.reducer;