import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import Card from './Card';
import Location from './images/location.png';
import calenderImage from './images/calender.jpg';

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:3000/webflow-api')
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
      <div className="bg-teal-500 p-6 rounded-lg mb-5" style={{ backgroundColor: '#408dbc' }}>
        <h2 className="text-3xl text-white mb-4">Latest Events and Concerts</h2>
        <div className="flex flex-wrap justify-between items-center w-full gap-4">
          <div className="flex items-center bg-white rounded-lg overflow-hidden flex-grow relative">
            <select
                value={city}
                onChange={handleCityChange}
                className="p-2 border-none outline-none bg-white flex-grow"
            >
              <option value="">Choose City</option>
              <option value="Perth">Perth</option>
              <option value="Gold Coast">Gold Coast</option>
              <option value="Brisbane">Brisbane</option>
              <option value="Melbourne">Melbourne</option>
              <option value="Bali">Bali</option>
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {/*<svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.656 0 3-1.344 3-3S13.656 5 12 5s-3 1.344-3 3 1.344 3 3 3zm0 0v3m0 0c-3.316 0-6 2.684-6 6h12c0-3.316-2.684-6-6-6z" />*/}
            {/*</svg>*/}
              <img src={Location} alt="Calendar" className="w-6 h-6" />
          </span>
          </div>

          <div className="flex items-center bg-white rounded-lg overflow-hidden flex-grow">
            <DatePicker
                selected={date}
                onChange={handleDateChange}
                placeholderText="Choose Date"
                className="w-full p-2 border-none outline-none bg-white pr-10"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {/*<img src={calenderImage} alt="Calendar" className="w-6 h-6" />*/}
          </span>
          </div>

          <div className="flex items-center bg-white rounded-lg overflow-hidden flex-grow relative">
            <input
                type="text"
                placeholder="Search Event"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 border-none outline-none bg-white"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          </div>
        </div>
        <div className="mt-4 w-full">
          <button onClick={clearFilters} className="text-white underline">
            Clear filters
          </button>
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
