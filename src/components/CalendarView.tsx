import React from 'react';
import type { Event } from '../../types';

interface CalendarViewProps {
  events: Event[];
  onDateClick: (date: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, onDateClick }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const renderDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      const isToday = today.getDate() === day && today.getMonth() === currentMonth;
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
          onClick={() => onDateClick(dateStr)}
        >
          <span className="day-number">{day}</span>
          {dayEvents.length > 0 && (
            <span className="event-indicator">{dayEvents.length}</span>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <h3>
          {new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
        </h3>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default CalendarView;