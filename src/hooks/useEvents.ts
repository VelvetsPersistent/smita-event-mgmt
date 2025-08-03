import { useState, useEffect } from 'react';
import { Event } from '../../types';

const useEvents = () => {
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return { events, addEvent, updateEvent, deleteEvent };
};

export default useEvents;