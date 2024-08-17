import { useLoaderData, useParams, Outlet } from 'react-router-dom';
import Calendar from '../../components/Calendar';
import { useState } from 'react';
function Tour() {
  const tourData = useLoaderData();
  const { tourType, tourId } = useParams();
  console.log(tourData);

  // const [showRegistration, setShowRegistration] = useState(false);

  if (tourData.status > 200) {
    return <h1>Something went wrong</h1>;
  } else {
    return (
      <>
        <h1 className='text-center my-5 text-2xl capitalize'>
          {tourData.data.name}
        </h1>
        <div className='flex flex-col gap-4 sm:flex-row mx-auto max-w-3xl px-4'>
          <img
            className='aspect-square h-72 w-72 rounded-sm shadow-md object-cover'
            src={
              tourData.data.image_url
                ? tourData.data.image_url
                : '../../public/city.jpg'
            }
            alt='tour picture'
          />
          <div className='flex flex-col justify-around'>
            <p>
              <span className='font-bold'>Description</span>:{' '}
              {tourData.data.description}
            </p>
            <div>
              <p>
                <span className='font-bold'>Start location</span>:{' '}
                {tourData.data.location}
              </p>
              {tourData.data.is_group && (
                <p>
                  <span className='font-bold'>Maximum Participants</span>:{' '}
                  {tourData.data.maximum_participants}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* {showRegistration && <Outlet />} */}
        <div className=''>
          {tourData.data.dates ? (
            <Calendar eventData={tourData.data} />
          ) : (
            <p className='text-center mt-10 italic text-2xl font-bold'>
              No scheduled dates
            </p>
          )}
        </div>
      </>
    );
  }
}

export default Tour;
