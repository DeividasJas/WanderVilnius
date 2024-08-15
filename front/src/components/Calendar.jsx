import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import BasicModal from './Modal';
import { useState } from 'react';
import { DateTime } from 'luxon';

export default function MyCalendar({ eventData, setShowRegistration }) {
  const { dates, name } = eventData;
  console.log(eventData);
  const [open, setOpen] = useState(false);

  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');

  const handleEventClick = (info) => {
    const dateTime = DateTime.fromJSDate(info.event.start).setLocale('gb-lt');
    const readableDate = dateTime.toLocaleString(DateTime.DATETIME_FULL);
    setEventTime(readableDate);
    setEventTitle(info.event.title);
    setOpen(true);

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

          events={dates.map((date) => ({
            title: name,
            date,
            className: ['bg-blue-300 hover:bg-red-400'],
          }))}
          eventClick={handleEventClick}
          eventMouseEnter={handleMouseEnter}
        />
        <BasicModal
          open={open}
          setOpen={setOpen}
          eventTitle={eventTitle}
          eventTime={eventTime}
          setShowRegistration={setShowRegistration}
        />
      </div>
    </>
  );
}
