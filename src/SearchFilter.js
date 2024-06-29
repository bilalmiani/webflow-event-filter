import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import Card from './Card';

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:5000/webflow-api')
      .then(response => response.json())
      .then(data => setEvents(data.items))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setCurrentPage(1); // Reset to first page on city change
  };

  const handleDateChange = (date) => {
    setDate(date);
    setCurrentPage(1); // Reset to first page on date change
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCity('');
    setDate(null);
    setCurrentPage(1); // Reset to first page after clearing filters
  };

  // Filtered events based on search, city, and date
  const filteredEvents = events.filter(event => {
    return (
      event.fieldData.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (city === '' || event.fieldData.neighborhood.toLowerCase() === city.toLowerCase()) &&
      (date === null || event.fieldData['date-2'].split('T')[0] === date.toISOString().split('T')[0])
    );
  });

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <div className="filter-container w-full flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center gap-4 w-full">
          <input
            type="text"
            placeholder="Search by event name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border rounded w-full"
          />
          <select value={city} onChange={handleCityChange} className="p-2 border rounded">
            <option value="">Choose city</option>
            <option value="New York">Perth</option>
            <option value="Los Angeles">Gold Coast</option>
            <option value="Chicago">Brisbane</option>
            <option value="Chicago">Melbourne</option>
            <option value="Chicago">Brisbane</option>
            <option value="Chicago">Bali</option>
  
          </select>
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            placeholderText="Select date"
            className="p-2 border rounded"
          />
        </div>
        <div className="mt-2">
          <button onClick={clearFilters} className="bg-blue-500 text-white px-4 py-2 rounded-full text-center inline-block">Clear Filters</button>
        </div>
      </div>
      <div className="cards-container w-full grid gap-4">
        {currentEvents.map(event => (
          <Link to={`/event/${event.id}`} key={event.id}>
            <Card event={event} />
          </Link>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
