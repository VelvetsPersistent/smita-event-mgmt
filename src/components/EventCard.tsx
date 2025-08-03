import React from 'react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  const isPastEvent = new Date(event.date) < new Date();

  return (
    <div className={`event-card ${isPastEvent ? 'past' : ''}`}>
      <div className="event-image">
        {event.image ? (
          <img src={event.image} alt={event.title} />
        ) : (
          <div className="image-placeholder">
            <span>{event.category || 'Event'}</span>
          </div>
        )}
      </div>
      <div className="event-content">
        <h3>{event.title}</h3>
        <p className="description">{event.description}</p>
        <div className="event-meta">
          <span className="venue">{event.venue}</span>
          <span className="date">
            {new Date(event.date).toLocaleDateString()}
            {event.time && ` • ${event.time}`}
          </span>
        </div>
        <div className="event-actions">
          <button onClick={() => onEdit(event)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => onDelete(event.id)} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;