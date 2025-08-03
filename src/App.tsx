import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import CalendarView from './components/CalendarView';
import useEvents from './hooks/useEvents';
import { Event } from '../types';
import './styles/main.css';

const App: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleSubmit = (data: Omit<Event, 'id'>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
    } else {
      addEvent(data);
    }
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const filteredEvents = selectedDate 
    ? events.filter(event => event.date === selectedDate)
    : events;

  const heroImageUrl = 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

  return (
    <div className="app">
      <header className="app-header">
        <h1>Smita Event Manager</h1>
        <div className="view-toggle">
          <button 
            onClick={() => setView('list')} 
            className={view === 'list' ? 'active' : ''}
          >
            List View
          </button>
          <button 
            onClick={() => setView('calendar')} 
            className={view === 'calendar' ? 'active' : ''}
          >
            Calendar View
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImageUrl})` }}>
        <div className="hero-content">
          <h1>Plan Your Perfect Event</h1>
          <p>Create, manage, and share your events with ease</p>
          <button 
            onClick={() => setShowForm(true)} 
            className="cta-button"
          >
            Create Your First Event
          </button>
        </div>
      </div>

      <main className="app-content">
        {view === 'calendar' && (
          <CalendarView 
            events={events} 
            onDateClick={(date) => {
              setSelectedDate(selectedDate === date ? null : date);
              setView('list');
            }} 
          />
        )}

        <div className="actions-bar">
          <button 
            onClick={() => {
              setShowForm(true);
              setEditingEvent(null);
            }} 
            className="add-event-btn"
          >
            Add New Event
          </button>
          {selectedDate && (
            <button 
              onClick={() => setSelectedDate(null)} 
              className="clear-filter-btn"
            >
              Clear Date Filter
            </button>
          )}
        </div>

        {showForm && (
          <div className="form-modal">
            <div className="form-modal-content">
              <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
              <EventForm 
                onSubmit={handleSubmit} 
                existingEvent={editingEvent || undefined}
                onCancel={() => {
                  setShowForm(false);
                  setEditingEvent(null);
                }} 
              />
            </div>
          </div>
        )}

        <EventList 
          events={filteredEvents} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </main>
    </div>
  );
};

export default App;