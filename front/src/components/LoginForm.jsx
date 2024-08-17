import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { loginUser } from '../services/post.mjs';
import { forwardRef } from 'react';
import FormInput from './FormInput';

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

  const yolo = (arg) => {
    console.log(arg);
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
        props.setShowLogin(false);
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
        <FormInput
          inputType={'email'}
          register={register}
          registerValue={'email'}
          errors={errors}
          placeholder={'Email'}
          // callback={yolo}
          // callbackArg={'for sure'}
        />
        <FormInput
          inputType={'password'}
          register={register}
          registerValue={'password'}
          errors={errors}
          placeholder={'Password'}
          id={'password'}
          // callback={yolo}
          // callbackArg={'for sure'}
          inputTypeTwo={'checkbox'}
          callbackTwo={showInput}
          callbackArgTwo={'password'}
        />
        <button type='submit' className='btn btn-active btn-neutral'>
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
});

export default LoginForm;
