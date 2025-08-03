import React from 'react';
import EventCard from './EventCard';
import { Event } from '../../types';

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  return (
    <div className="event-list">
      {events.length === 0 ? (
        <div className="empty-state">
          <p>No events found. Add your first event!</p>
        </div>
      ) : (
        events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))
      )}
    </div>
  );
};

export default EventList;