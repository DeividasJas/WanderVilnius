import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { loginUser } from '../services/post.mjs';
import { forwardRef } from 'react';

const LoginForm = forwardRef((props, ref) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
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

  const onSubmit = async (formData) => {
    console.log(formData);
    const { status, data } = await loginUser(formData);
    console.log(status, data);
    if (status === 400) {
      toast.error(data.message);
    } else {
      window.localStorage.setItem('token', data);
      setTimeout(() => {
        toast.success('Welcome');
        navigate('/about');
        props.setShowLogin(false)
      }, 700);
    }
  };
  return (
    <div ref={ref} className={props.className}>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center items-center gap-5'
      >
        <div className='relative min-w-36 w-48 lg:w-56'>
          <input
            type='email'
            placeholder='Email Address'
            id='email'
            className={`inputClass ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}
            {...register('email')}
          />
          <p className='errorPara'>{errors.email?.message}</p>
        </div>

        <div className='relative min-w-36 w-48 lg:w-56'>
          <input
            type='password'
            placeholder='Password'
            id='password'
            className={`inputClass ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
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
          <p className='errorPara'>{errors.password?.message}</p>
        </div>
        <button type='submit' className='btn btn-active btn-neutral'>
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
});

export default LoginForm;
