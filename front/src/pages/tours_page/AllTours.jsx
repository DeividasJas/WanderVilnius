import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import { useLoaderData, useParams } from 'react-router-dom';
import PagginationButtons from '../../components/PagginationButtons';
import Sort_limit_order from '../../components/Sort_limit_order';
import TourCard from './TourCard';
import { searchTours } from '../../services/get.mjs';

function AllTours() {
  const soloTourData = useLoaderData();

  const { tourType } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [sort, setSortTour] = useState('Name'); // fill with desired sort method\
  const [order, setOrder] = useState('ASC');

  const [tours, setTours] = useState([]);

  let queryParams = new URLSearchParams();
  if (search) queryParams.append('search', search);
  if (sort) queryParams.append('sort', sort);
  if (page) queryParams.append('page', page);
  if (limit) queryParams.append('limit', limit);
  if (order) queryParams.append('order', order);

  let queryString = queryParams.toString();
  // console.log(queryString);

  // console.log(soloTourData.data.length);
  useEffect(() => {
    try {
      (async () => {
        const results = await searchTours(queryParams, tourType);
        if (results.status === 200) {
          setTours(results.data);
          setPage(1);
        }
      })();
    } catch (error) {}
  }, [page, limit, search, sort, order, tourType]);
  return (
    <>
      <h2 className='text-3xl text-center capitalize'>{tourType} tours</h2>
      <div className='flex flex-wrap justify-center my-2'>
        <div className='w-fit md:w-2/3 md:max-w-lg'>
          <SearchBar setSearch={setSearch} search={search} />
        </div>
        <div className=''>
          <Sort_limit_order
            setOrder={setOrder}
            setSortTour={setSortTour}
            setLimit={setLimit}
          />
        </div>
      </div>
      {tours.length < 1 ? (
        <p className='text-center mt-5 text-xl'>No tours find 😫</p>
      ) : (
        <>
          <div className='grid max-w-sm md:grid-cols-2 gap-4 md:w-full md:max-w-screen-lg  mx-auto'>
            {tours.map((tour, index) => {
              return <TourCard key={index} tour={tour} />;
            })}
          </div>
          <PagginationButtons
            setPage={setPage}
            dataLength={soloTourData.data.length}
            limit={limit}
          />
        </>
      )}
    </>
  );
}

export default AllTours;
