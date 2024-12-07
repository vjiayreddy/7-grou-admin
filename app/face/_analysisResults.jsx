// src/components/AnalysisResults.js
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const AnalysisResults = ({ results }) => {
  if (results.error) {
    return (
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography color="error">{results.error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Analysis Results
      </Typography>
      <List>
        {Object.entries(results).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText
              primary={key.replace('_', ' ')}
              secondary={`${(value * 100).toFixed(2)}%`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AnalysisResults;