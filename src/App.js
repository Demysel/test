import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button, Modal, TextField, Select, MenuItem, Box } from '@mui/material';
import './App.css';

const EVENT_COLORS = {
  perso: '#2196f3',
  pro: '#4caf50',
  enfant: '#ff9800'
};

function App() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('perso');

  // Chargement initial depuis localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  // Sauvegarde dans localStorage
  const saveEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(newEvents));
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setOpen(true);
  };

  const handleSubmit = () => {
    const newEvent = {
      title,
      date: selectedDate,
      backgroundColor: EVENT_COLORS[type],
      type
    };
    saveEvents([...events, newEvent]);
    setOpen(false);
    setTitle('');
    setType('perso');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        editable={true}
        headerToolbar={{
          start: 'today',
          center: 'title',
          end: 'prev,next'
        }}
      />
<div className="app-container">
  <FullCalendar
    // ... autres props
    eventClassNames={(arg) => `event-${arg.event.extendedProps.type}`}
  />
      <Modal open={open} onClose={() => setOpen(false)}>
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
            onClick={handleSubmit}
            sx={{ mt: 2, float: 'right' }}
          >
            Ajouter
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper', // Vérifiez cette ligne
  borderRadius: '8px',
  boxShadow: 24,
  p: 4, // La virgule finale est importante
}; // <-- Vérifiez que l'accolade fermante est bien présente
