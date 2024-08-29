// import { useTheme } from '../../context/ThemeContext';
import { Link, useParams } from 'react-router-dom';
function TourCard({ tour }) {
  // console.log(tour);
  // const { isDarkMode } = useTheme();
  const { tourType } = useParams();
  return (
    <div className='card md:card-side bg-base-300 shadow-xl flex'>
      <figure className='shrink-0 border md:w-44 md:h-full md:max-h-56 overflow-hidden'>
        {' '}
        {/* Add overflow-hidden */}
        <img
          src={tour.image_url ? tour.image_url : '../../public/city.jpg'}
          alt='Album'
          className='w-full h-full object-cover border-none'
        />
      </figure>
      <div className='card-body flex-grow p-4'>
        {' '}
        {/* Add padding to the body */}
        <h2 className='card-title text-xl font-bold'>{tour.name}</h2>
        <p>Location: {tour.location}</p>
        {tour.isgroup ? <p>group tour</p> : <p>not group</p>}
        <Link to={`/tours/${tourType}/${tour.id}`}>
          <div className='card-actions justify-start mt-4'>
            <button className='btn btn-primary'>More info</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TourCard;
