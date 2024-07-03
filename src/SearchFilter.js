import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import Card from './Card';
import calenderImage from '../src/images/calender-image.svg';
import locationImage from '../src/images/loc-icon.svg';


const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const header = document.getElementById('stickyHeader');
    const sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



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
            <img  src={locationImage} alt="Calendar" className="w-6 h-6" style={{marginRight:"9px"}} />
          </span>
            </div>


            {/* <div className="flex items-center bg-white rounded-lg overflow-hidden">
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              placeholderText="Choose Date"
              className="w-full p-2 border-none outline-none bg-white"
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              popperPlacement="bottom-end"
              showIcon
            />
        </div> */}


            <div className="flex items-center bg-white rounded-lg overflow-hidden">
              <DatePicker
                  selected={date}
                  onChange={handleDateChange}
                  placeholderText="Choose Date"
                  className="w-full p-2 border-none outline-none bg-white pr-10 relative"
              />
              <span>
              <img style={{marginLeft:"90px",cursor:'pointer',marginRight:'6px'}} src={calenderImage} alt="Calendar" className="w-6 h-6" onClick={() => document.querySelector('.react-datepicker__input-container input').focus()} />
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
        {/* <div className="filter-container w-full flex flex-wrap justify-between items-center mb-4">
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
      </div> */}

        <div
            id="stickyHeader"
            className={`sticky-style ${isSticky ? 'is-sticky' : ''}`}
            style={{
              position: 'sticky',
              top: 0,
              // backgroundColor: 'yellow',
              // padding: '50px',
              fontSize: '30px',
              zIndex: 10,
              backdropFilter: isSticky ? 'blur(10px)' : 'none',
            }}
        >
          Today
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
