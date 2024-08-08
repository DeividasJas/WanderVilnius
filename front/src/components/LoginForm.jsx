import { forwardRef } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '../context/ThemeContext';

const LoginForm = forwardRef((props, ref) => {
  const { isDarkMode } = useTheme();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .trim('Cannot be Empty')
      .email('Has to be valid email')
      .required('Please enter email'),
    password: yup.string().trim().required('Please enter password'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });
  const showInput = (input) => {
    const x = document.getElementById(input);
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div ref={ref} className={props.className}>
      <h1>this is login form</h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 '
      >
        <div className='relative min-w-36 w-48 lg:w-56'>
          <input
            type='email'
            placeholder='Email Address'
            id='email'
            className={`w-full text-slate-800 py-1 pl-2 rounded-md ${
              isDarkMode && 'text-slate-400'
            }`}
            {...register('email')}
          />
          <p className='text-red-800 w-full'>{errors.email?.message}</p>
        </div>

        <div className='relative min-w-36 w-48 lg:w-56'>
          <input
            type='password'
            placeholder='Password'
            id='password'
            className={`w-full text-slate-800 py-1 pl-2 rounded-md ${
              isDarkMode && 'text-slate-400'
            }`}
            {...register('password')}
          />
          <input
            type='checkbox'
            className='absolute right-2 top-2.5'
            onClick={() => {
              showInput('password');
            }}
          />
          <p className='text-red-800 w-full'>{errors.password?.message}</p>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
});

export default LoginForm;
