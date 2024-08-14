import { useLoaderData, useParams } from 'react-router-dom';
import Calendar from '../../components/Calendar';
import { useState } from 'react';
function ToursPage() {
  const tourData = useLoaderData();
  const { tourType, tourId } = useParams();
  console.log(tourData);

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
            className='aspect-square w-72 mx-auto rounded-sm shadow-md object-cover'
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
        <div className=''>
          <Calendar eventData={tourData.data} />
        </div>
      </>
    );
  }
}

export default ToursPage;
