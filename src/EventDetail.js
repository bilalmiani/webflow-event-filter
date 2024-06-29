import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/webflow-api`)
      .then(response => response.json())
      .then(data => {
        const eventData = data.items.find(item => item.id === id);
        setEvent(eventData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="w-7/10 mx-auto">
        <h2 className="text-3xl font-bold mb-4">{event.fieldData.name}</h2>
        <div className="flex mb-4">
          <div className="w-2/3 h-auto max-w-[714px] max-h-[900px] overflow-hidden rounded-lg">
            <img 
              src={event.fieldData['main-image'].url} 
              alt={event.fieldData['main-image'].alt || event.fieldData.name} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 ml-4">
            <p className="text-slate-grey mb-2"><strong>Neighborhood:</strong> {event.fieldData.neighborhood}</p>
            <p className="text-dark-slate-grey-2 mb-2"><strong>Date:</strong> {new Date(event.fieldData['date-2']).toLocaleDateString()}</p>
            <p className="text-dark-slate-grey-2 mb-2"><strong>Time:</strong> {event.fieldData['time-3']}</p>
            <p className="text-dark-slate-grey-2 mb-2"><strong>Venue:</strong> {event.fieldData['venue-name']}</p>
            <p className="text-dark-slate-grey mb-4"><strong>Location:</strong> {event.fieldData.location}</p>
            <a href={event.fieldData.tickets} className="bg-blue-500 text-white px-4 py-2 rounded-full text-center inline-block">Get Tickets</a>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Event Summary</h3>
          <p className="text-dark-slate-grey">{event.fieldData.summary}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Lineup</h3>
          <p className="text-dark-slate-grey">{event.fieldData['lineup-2']}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Genres</h3>
          <p className="text-dark-slate-grey">{event.fieldData['genres-1']}</p>
          <p className="text-dark-slate-grey">{event.fieldData['genres-2']}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Social Links</h3>
          <ul className="list-disc list-inside">
            <li><a href={event.fieldData['social-tw-link']} className="text-blue-500 underline">Twitter</a></li>
            <li><a href={event.fieldData['social-fb-link']} className="text-blue-500 underline">Facebook</a></li>
            <li><a href={event.fieldData['social-wt-link']} className="text-blue-500 underline">WhatsApp</a></li>
            <li><a href={event.fieldData['social-other-link']} className="text-blue-500 underline">Other</a></li>
          </ul>
        </div>
        {event.fieldData.video && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Event Video</h3>
            <div dangerouslySetInnerHTML={{ __html: event.fieldData.video.metadata.html }} />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold mb-2">Map</h3>
          <iframe 
            src={event.fieldData.map} 
            width="100%" 
            height="300" 
            frameBorder="0" 
            allowFullScreen 
            className="rounded-lg"
            title="Event Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
