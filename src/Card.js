import React from 'react';

const Card = ({ event }) => {
  return (
    <div className="card border p-4 rounded-lg shadow-lg bg-white flex transition-transform transform hover:scale-105 max-w-[1320px] h-[413.59px] overflow-hidden">
      <div className="w-1/3 pr-4 flex items-center justify-center">
        <div className="w-[440px] h-[413.59px] overflow-hidden">
          <img
            src={event.fieldData['main-image'].url}
            alt={event.fieldData['main-image'].alt || event.fieldData.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="flex-1 p-4">
        <h3 className="text-2xl font-bold mb-2">{event.fieldData.name}</h3>
        <p className="text-gray-500 mb-1">{event.fieldData.neighborhood}</p>
        <p className="text-gray-700 mb-2">{new Date(event.fieldData['date-2']).toLocaleDateString()}</p>
        <p className="text-gray-900">{event.fieldData.summary}</p>
        <a href={event.fieldData.tickets} className="text-blue-500 underline">Get Tickets</a>
      </div>
    </div>
  );
};

export default Card;
