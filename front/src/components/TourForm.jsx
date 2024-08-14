import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { createTour } from '../services/post.mjs';

function TourForm() {
  const [isGroup, setIsGroup] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .trim('Cannot be Empty')
      .required('Please enter tour name'),
    location: yup
      .string()
      .trim('Cannot be empty')
      .required('Please enter location'),
    description: yup
      .string()
      .trim('Cannot be empty')
      .required('Please enter description'),
    is_group: yup.string().required('Selecting type is required'),
    // maximum_participants: yup.number().min(1, 'Cannot be less than 1').typeError('Maximum participants must be a number')
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
    const isGroup = formData.is_group === 'true'; // 'true' becomes true, 'false' becomes false
    console.log(isGroup);
    formData.is_group = isGroup;
    formData.maximum_participants = parseInt(formData.maximum_participants);
    if (!isGroup) {
      formData.maximum_participants = 1;
    }
    console.log(formData);
    const { status, data } = await createTour(formData);
    console.log(status, data);
    if (status === 400) {
      toast.error(data.message);
    } else {
      toast.success('Tour created');
      reset()
    }
  };

  return (
    <div className='w-full mx-auto border'>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className='grid sm:grid-cols-2 gap-5 place-items-center max-w-2xl mx-auto'
      >
        <div className='relative w-64  '>
          <input
            type='text'
            placeholder='Tour Name'
            id='text'
            className={`w-full  py-1 pl-2 rounded-md  ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}
            {...register('name')}
          />
          <p className='text-red-800 w-full'>{errors.name?.message}</p>
        </div>

        <div className='relative w-64  '>
          <input
            type='text'
            placeholder='Location'
            id='text'
            className={`w-full  py-1 pl-2 rounded-md  ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}
            {...register('location')}
          />
          <p className='text-red-800 w-full'>{errors.location?.message}</p>
        </div>
        <div className='relative w-64  '>
          <input
            type='text'
            placeholder='Image URL'
            id='text'
            className={`w-full  py-1 pl-2 rounded-md  ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}
            {...register('image_url')}
          />
          <p className='text-red-800 w-full'>{errors.image_url?.message}</p>
        </div>

        <div className={`relative w-64 ${!isGroup && 'sm:col-span-2'}`}>
          <div className='form-control'>
            <label className='label cursor-pointer  py-1'>
              <span className='label-text'>Group tour</span>
              <input
                type='radio'
                value='true'
                name='radio-10'
                className='radio   size-6'
                onClick={() => setIsGroup(true)}
                {...register('is_group')}
              />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer py-1'>
              <span className='label-text'>Individual tour</span>
              <input
                type='radio'
                value='false'
                name='radio-10'
                className='radio size-6'
                onClick={() => setIsGroup(false)}
                {...register('is_group')}
              />
            </label>
          </div>
          <p className='text-red-800 w-full'>{errors.is_group?.message}</p>
        </div>

        {isGroup && (
          <div className='relative w-64  '>
            {/* <div className={`relative w-64 ${isGroup && 'hidden'}`}> */}
            <input
              type='number'
              placeholder='Participant amount'
              min='2'
              // defaultChecked='3'
              className={`w-full  py-1 pl-2 rounded-md  ${
                isDarkMode ? 'text-slate-200' : 'text-slate-800'
              }`}
              {...register('maximum_participants')}
            />
            <p className='text-red-800 w-full'>
              {errors.maximum_participants?.message}
            </p>
          </div>
        )}

        <div
          className={`relative w-64 sm:col-span-2 sm:w-2/3 ${
            isDarkMode ? 'text-slate-200' : 'text-slate-800'
          }`}
        >
          <textarea
            name=''
            rows='5'
            placeholder='Description'
            id='description'
            className='w-full rounded-md p-2'
            {...register('description')}
          />
          <p className='text-red-800 w-full'>{errors.description?.message}</p>
        </div>
        <button
          type='submit'
          className='btn btn-active btn-neutral sm:col-span-2'
        >
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default TourForm;
