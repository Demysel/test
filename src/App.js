import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button, Modal, TextField, Select, MenuItem, Box } from '@mui/material';
import { db, eventsCollection } from './utils/firebase';
import { onSnapshot, addDoc } from 'firebase/firestore';
import './App.css';

const EVENT_COLORS = {
  perso: '#2196f3',
  pro: '#4caf50',
  enfant: '#ff9800'
};

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

function App() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('perso');

  useEffect(() => {
    const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
      const firebaseEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(firebaseEvents);
    });

    return () => unsubscribe();
  }, []);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      await addDoc(eventsCollection, {
        title,
        date: selectedDate,
        type,
        backgroundColor: EVENT_COLORS[type]
      });
      setOpen(false);
      setTitle('');
      setType('perso');
    } catch (error) {
      console.error("Erreur d'ajout d'événement : ", error);
    }
  };

  return (
    <div className="app-container">
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

export default App;

useEffect(() => {
  console.log("Configuration Firebase :", firebaseConfig);
}, []);
