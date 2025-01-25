import React from 'react';
import { Modal, TextField, Select, MenuItem, Box, Button } from '@mui/material';

export const EventModal = ({ 
  open, 
  onClose, 
  onSubmit, 
  title, 
  setTitle, 
  type, 
  setType 
}) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={modalStyle}>
      <h2>Nouvel événement</h2>
      <TextField
        label="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      >
        <MenuItem value="perso">Personnel</MenuItem>
        <MenuItem value="pro">Professionnel</MenuItem>
        <MenuItem value="enfant">Enfant</MenuItem>
      </Select>
      <Button 
        variant="contained" 
        onClick={onSubmit}
        sx={{ mt: 2, float: 'right' }}
      >
        Ajouter
      </Button>
    </Box>
  </Modal>
);

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};
