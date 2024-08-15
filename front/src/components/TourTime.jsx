import { getAllTours } from '../services/get.mjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { registerTourTime } from '../services/post.mjs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function TourTime() {
  const [allTours, setAllTours] = useState([]);

  const formSchema = yup.object().shape({
    tour_id: yup.number().required('Selecting tour is required'),
    tour_date_time: yup
      .date()
      .typeError('Invalid date')
      .required('Please select a date')
      .min(new Date(), 'Date must be in future'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (formData) => {
    console.log(formData);

    const response = await registerTourTime(formData);

    if (response.status === 201) {
      reset();
      toast.success(`Tour time was successfully created`);
    } else {
      toast.error('Could not register new tour time');
    }
  };
  useEffect(() => {
    (async () => {
      const allTours = await getAllTours();
      //   console.log(allTours);
      if (allTours.status === 200) {
        setAllTours(allTours.data);
      }
    })();
  }, []);
  return (
    <>
      <h1 className='text-center'>Add new tour time</h1>
      <form
        className='flex flex-col gap-4 items-center'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <select
            className='select select-bordered w-full max-w-xs'
            {...register('tour_id')}
          >
            <option disabled selected>
              Pick a tour
            </option>
            {allTours.map((tour, index) => {
              return (
                <option key={index} value={tour.id}>
                  {tour.name}
                </option>
              );
            })}
          </select>
          <p className='errorPara'>{errors.tour_id?.message}</p>
        </div>

        <div>
          <input
            type='datetime-local'
            name=''
            id=''
            className='max-w-xs p-2 rounded-md'
            {...register('tour_date_time')}
          />
          <p className='errorPara'>
            {errors.tour_date_time?.message}
          </p>
        </div>
        <button type='submit' className='btn btn-success'>
          Add new time
        </button>
      </form>
      <Toaster richColors />
    </>
  );
}

export default TourTime;
