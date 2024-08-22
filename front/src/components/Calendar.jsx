import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Tooltip from 'tooltip.js';
import Modal from './Modal';
import { useState } from 'react';
import { DateTime } from 'luxon';

export default function MyCalendar({ eventData }) {
  const { dates, name, tour_id } = eventData;
  console.log(eventData);

  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventTime_id, setEventTime_id] = useState('');

  const handleEventClick = (info) => {
    const dateTime = DateTime.fromJSDate(info.event.start).setLocale('gb-lt');
    const readableDate = dateTime.toLocaleString(DateTime.DATETIME_FULL);
    setEventTime(readableDate);
    setEventTitle(info.event.title);
    console.log(info.event._def.extendedProps.tourId);
    setEventTime_id(info.event._def.extendedProps.tourId);

    document.getElementById('my_modal_5').showModal();
  };

  const handleMouseEnter = (info) => {
    // Custom logic for mouse enter
  };

  const handleMouseLeave = (info) => {
    // Custom logic for mouse leave
  };

  return (
    <>
      <div className='container max-w-3xl mx-auto mt-5'>
        <FullCalendar
          plugins={[dayGridPlugin]} // Replaced multiMonthYear with dayGridPlugin
          initialView='dayGridMonth' // Set the view to dayGridMonth
          showNonCurrentDates={false}
          height={500}
          headerToolbar={{
            start: 'title',
            end: 'today,prev,next',
          }}
          titleFormat={{ year: 'numeric', month: 'long' }} // Maintain title format
          eventClick={handleEventClick}
          eventMouseEnter={handleMouseEnter}
          eventDidMount={(info) => {

            const tooltip = new Tooltip(info.el, {
              title: info.event.extendedProps.description || info.event.title, // Fallback to event title if description is missing
              placement: 'top',
              trigger: 'hover',
              container: 'body',
              // TO ADD TOOLTIP STYLES GOT TO WRITTE CSS FIEL CLASSES LIKE IN : https://codepen.io/pen?editors=0110
            });
            // Store the tooltip instance on the element for later disposal
            info.el._tooltip = tooltip;
            // info.el.addEventListener('mouseenter', () => {
            //   tooltip.show()
            // })

            // info.el.addEventListener('mouseleave', () => {
            //   tooltip.hide()
            // })
            // Dispose of the tooltip when the mouse leaves the event element
            info.el.addEventListener('mousedown', () => {
              tooltip.dispose();
            });
            // info.el.style.backgroundColor = 'lightblue'; // Example color
            // info.el.style.borderColor = 'blue'; // Optionally, you can set the border color too
            // info.el.style.color = 'white'; // Optionally, you can set the text color
          }}
          events={dates.map((dateObj) => ({
            title: name,
            date: dateObj.dates, // Accessing the 'dates' key within each object
            className: ['bg-blue-300 hover:bg-red-400'],
            tourId: dateObj.tour_id, // If you need to use tour_id somewhere else
          }))}
        />
        <Modal
          eventTitle={eventTitle}
          eventTime={eventTime}
          eventTime_id={eventTime_id}
          tour_id={tour_id}
        />
      </div>
    </>
  );
}
