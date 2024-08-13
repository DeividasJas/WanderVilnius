function TourCard({ tour }) {
    // console.log(tour);
    return (
      <div className='card md:card-side bg-base-100 shadow-xl flex'>
        <figure className="shrink-0 border md:w-44 md:h-full overflow-hidden"> {/* Add overflow-hidden */}
          <img
            src='https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp'
            alt='Album'
            className='w-full h-full object-cover border-none'
          />
        </figure>
        <div className='card-body flex-grow p-4'> {/* Add padding to the body */}
          <h2 className='card-title text-xl font-bold'>{tour.name}</h2>
          <p>Location: {tour.location}</p>
          {tour.isgroup ? <p>group tour</p> : <p>not group</p>}

          <div className='card-actions justify-start mt-4'>
            <button className='btn btn-primary'>More info</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default TourCard;
  