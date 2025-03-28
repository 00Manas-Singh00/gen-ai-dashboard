import React from 'react';
import { useSelector } from 'react-redux';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Box,
  Divider
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const QueryHistory = () => {
  const { history } = useSelector((state) => state.query);

  return (
    <Box sx={{ 
      bgcolor: 'background.paper',
      borderRadius: 2,
      p: 2,
      height: '400px',
      overflow: 'auto'
    }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <AccessTimeIcon sx={{ mr: 1 }} /> Query History
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      {history.length === 0 ? (
        <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
          No queries yet. Start asking!
        </Typography>
      ) : (
        <List dense>
          {history.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={item.query}
                  secondary={new Date(item.timestamp).toLocaleString()}
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default QueryHistory;