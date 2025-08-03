// import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Event } from '../../types';

interface EventFormProps {
  onSubmit: (data: Omit<Event, 'id'>) => void;
  existingEvent?: Event;
  onCancel?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, existingEvent, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<Event, 'id'>>({
    defaultValues: existingEvent || {
      title: '',
      description: '',
      venue: '',
      date: '',
      time: '',
      category: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="event-form">
      <div className="form-group">
        <label>Title *</label>
        <input 
          {...register('title', { required: 'Title is required' })} 
          placeholder="Event title"
        />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea 
          {...register('description', { required: 'Description is required' })} 
          placeholder="Event description"
          rows={3}
        />
        {errors.description && <span className="error">{errors.description.message}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Venue *</label>
          <input 
            {...register('venue', { required: 'Venue is required' })} 
            placeholder="Event venue"
          />
          {errors.venue && <span className="error">{errors.venue.message}</span>}
        </div>

        <div className="form-group">
          <label>Date *</label>
          <input 
            type="date" 
            {...register('date', { required: 'Date is required' })} 
          />
          {errors.date && <span className="error">{errors.date.message}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Time</label>
          <input type="time" {...register('time')} />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select {...register('category')}>
            <option value="">Select...</option>
            <option value="concert">Concert</option>
            <option value="conference">Conference</option>
            <option value="exhibition">Exhibition</option>
            <option value="party">Party</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        )}
        <button type="submit" className="submit-btn">
          {existingEvent ? 'Update Event' : 'Add Event'}
        </button>
      </div>
    </form>
  );
};


export default EventForm;
