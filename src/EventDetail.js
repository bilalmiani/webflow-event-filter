import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaWhatsapp, FaLink } from 'react-icons/fa';
import gradientImage from '../src/images/gradient.png'
import Video from './Video';


const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
 

  useEffect(() => {
    fetch(`http://localhost:3000/webflow-api`)
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

        {/* Main design start */}
        <div className='hero_container w-container'>
          <div className='event_main-block'>
            <div className='div-block-17'>
              <div className='div-block-50'>
                  <img 
                    src={event.fieldData['main-image'].url} 
                    alt={event.fieldData['main-image'].alt || event.fieldData.name} 
                    className="image-18"
                  />
                    <div class="html-embed-7 hide w-embed">
                      <img 
                        src={event.fieldData['main-image'].url} 
                        alt={event.fieldData['main-image'].alt || event.fieldData.name} 
                        className="image-18"
                      />
                    </div>
              </div>

              {/* performer */}
                <div className='perdormer'>
                    <h3 className='heading-23'>{event.fieldData.name}</h3>
                    <div className='rich-text-block change-row w-richtext'>
                      <p>Resident RJ's</p>
                    </div>
                    <a href={event.fieldData.tickets} style={{backgroundColor:'#408dbc',marginTop:'10px'}} className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors set-mb">Buy Ticket</a>
                </div>
              
              {/* Shiny block */}
              <div className='shining_block'>
                  <div className='div-block-18'>
                    <h1 class="heading-25">{event.fieldData.name}</h1>
                  </div>
                  <img src={gradientImage} className='image-20' />
                  <div className='div-block-77'>
                      <h6 class="heading-13 shining">{new Date(event.fieldData['date-2']).toLocaleDateString()}</h6>
                      <div class="div-block-78"></div>
                      <h6 class="heading-13 shining">{event.fieldData['time-3']}</h6>
                      <div class="div-block-78"></div>
                      <h6 class="heading-13">{event.fieldData['venue-name']}</h6>
                      <div class="div-block-78"></div>
                      <h6 class="heading-13">{event.fieldData.locaition}</h6>
                      {/* <div class="div-block-78"></div> */}
                      {/* <h6 class="heading-13">{event.fieldData["18"]}</h6> */}


                      {/* cost */}
                      {/* <div className='parent'>
                      <div className='cost-sing'>
                          <h6 class="costheaing">Min.age</h6>
                          <div class="div-block-123">
                            <h5 class="heading-18">{event.fieldData["18"]}</h5>
                          </div>
                      </div> */}

                      {/* <div className='d-flex'>
                        <div className='cost-sing'>
                           <h6 className='costheading'>Min.age</h6>
                          <div class="div-block-123">
                            <h5 class="heading-18">{event.fieldData["18"]}</h5>
                            </div>
                            </div>
                        </div> */}


                      {/* cost */}
                      <div className='parent'>
                        <div className='d-flex align-items-center'>
                            <h6 className='waues-heading'>Min.Age</h6>
                            <h5 class="heading-18 ml-3">{event.fieldData["18"]}</h5>
                      </div>


                      <div className='cost-sing'>
                          <h6 class="costheaing">Cost</h6>
                          <div class="div-block-123">
                            <h5 class="heading-18">{event.fieldData.valu}</h5>
                          </div>
                      </div>

                      <br />
                      {/* quest */}
                      <div className='quest'>
                        <h6 class="waues-heading">Do You have a Question?</h6>
                        <a href="mailto:info@whiterockbali.com" class="w-inline-block">
                            <h5 class="heading-18 culor padding _2nd linkcon">Contact the Promoter</h5>
                        </a>
                      </div>
                      </div>
                  </div>
              </div>

            </div>
          </div>
        </div>
      
      {/* Old design */}
        {/* <h2 className="text-3xl font-bold mb-4">{event.fieldData.name}</h2>
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
            <p className="text-dark-slate-grey mb-4"><strong>Cost:</strong> {event.fieldData.valu}</p>

            <a href={event.fieldData.tickets} style={{backgroundColor:'#408dbc'}} className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors">Get Tickets</a>
          </div>
        </div> */}


        <div className="bg-white p-6  rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Event Details</h2>
            <div className='flex'>
              <span className="text-lg font-semibold mr-4 mb-2 md:mb-0">Follow By:</span>
              <a href={event.fieldData['social-tw-link']} aria-label="Twitter" className="text-blue-500 hover:text-blue-600 mr-2 mb-2 md:mb-0">
                <FaTwitter size={24} />
              </a>
              <a href={event.fieldData['social-fb-link']} aria-label="Facebook" className="text-blue-500 hover:text-blue-600 mr-2 mb-2 md:mb-0">
                <FaFacebookF size={24} />
              </a>
              <a href={event.fieldData['social-wt-link']} aria-label="WhatsApp" className="text-green-500 hover:text-green-600 mr-2 mb-2 md:mb-0">
                <FaWhatsapp size={24} />
              </a>
              <a href={event.fieldData['social-other-link']} aria-label="Other Link" className="text-gray-500 hover:text-gray-600">
                <FaLink size={24} />
              </a>
            </div>
          </div>
            <p className="text-gray-700 text-lg mt-4 mb-6">{event.fieldData.summary}</p>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center mb-5">
            <h2 className="mb-4">Media video</h2>
            <Video embedId={ event.fieldData.vedio.url } />

            {/* <iframe  width={event.fieldData.vedio.metadata.width} height={event.fieldData.vedio.metadata.height} 
                src={event.fieldData.vedio.url} frameborder="0" allowfullscreen>
            </iframe> */}
            {/* <video
              width={event.fieldData.vedio.metadata.width}
              height={event.fieldData.vedio.metadata.height}
              controls
              autoPlay
              className="mx-auto"
            >
              <source src={event.fieldData.vedio.url} type="video" />
              Your browser does not support the video tag.
            </video> */}
        </div>

       {/* Old UI code for summary and link */}

        {/* <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Event Summary</h3>
          <p className="text-dark-slate-grey">{event.fieldData.summary}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Social Links</h3>
          <ul className="list-disc list-inside">
            <li><a href={event.fieldData['social-tw-link']} className="text-blue-500 underline">Twitter</a></li>
            <li><a href={event.fieldData['social-fb-link']} className="text-blue-500 underline">Facebook</a></li>
            <li><a href={event.fieldData['social-wt-link']} className="text-blue-500 underline">WhatsApp</a></li>
            <li><a href={event.fieldData['social-other-link']} className="text-blue-500 underline">Other</a></li>
          </ul>
        </div> */}

        {/* Commented code for Lineup adn genres */}

        {/* <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Lineup</h3>
          <p className="text-dark-slate-grey">{event.fieldData['lineup-2']}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Genres</h3>
          <p className="text-dark-slate-grey">{event.fieldData['genres-1']}</p>
          <p className="text-dark-slate-grey">{event.fieldData['genres-2']}</p>
        </div> */}
      
        {event.fieldData.video && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Event Video</h3>
            <div dangerouslySetInnerHTML={{ __html: event.fieldData.video.metadata.html }} />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-center" style={{fontSize:'50px'}}>Get Directions</h3>
          <img style={{margin:'auto',marginBottom:'60px',marginTop:'30px'}} src={gradientImage} alt='gradient' />
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
