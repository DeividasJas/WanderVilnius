import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '../context/ThemeContext';
import { signupUser } from '../services/post.mjs';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
function SignupPage() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const phoneRegex = new RegExp(
    '^\\+?(?:\\d{1,3})?[-.\\s]?(?:\\(?\\d{1,4}\\)?[-.\\s]?)?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$'
  );

  const formSchema = yup.object().shape({
    name: yup.string().trim().required('Name cannot be blank'),
    lastname: yup.string().trim().required('Lastname cannot be blank'),
    phone_number: yup.string().matches(phoneRegex, 'Phone number is not valid'),
    email: yup.string().email().required('Email cannot be blank'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    repeat_password: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
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
    try {
      const { status, data } = await signupUser(formData);
      console.log(status);
      console.log(data);
      if (status === 409) {
        toast.error(data.message);
      } else {
        window.localStorage.setItem('token', data);
        toast.success('Registration completed successfully');
        setTimeout(() => {
          navigate('/about');
        }, 1000);
      }
    } catch (error) {}
  };
  console.log(register('name'));
  console.log(errors);
  return (
    <>
      <h1 className='text-center text-2xl my-8'>Please Signup</h1>
      <div>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-wrap gap-5 justify-center max-w-lg  mx-auto'>
            <FormInput
              inputType={'text'}
              placeholder={'Name'}
              register={register}
              registerValue={'name'}
              errors={errors}
              id={'name'}
            />
            <FormInput
              inputType={'text'}
              placeholder={'Lastname'}
              register={register}
              registerValue={'lastname'}
              errors={errors}
              id={'lastname'}
            />

            <FormInput
              inputType={'tel'}
              placeholder={'Phone number'}
              register={register}
              registerValue={'phone_number'}
              errors={errors}
              id={'phone_number'}
            />

            <FormInput
              inputType={'mail'}
              placeholder={'Email Address'}
              register={register}
              registerValue={'email'}
              errors={errors}
              id={'email'}
            />

            <FormInput
              inputType={'password'}
              placeholder={'Password'}
              register={register}
              registerValue={'password'}
              errors={errors}
              id={'password'}
              inputTypeTwo={'checkbox'}
              callbackTwo={showInput}
              callbackArgTwo={'password'}
            />

            <FormInput
              inputType={'password'}
              placeholder={'Repeat Password'}
              register={register}
              registerValue={'repeat_password'}
              errors={errors}
              id={'repeat_password'}
              inputTypeTwo={'checkbox'}
              callbackTwo={showInput}
              callbackArgTwo={'repeat_password'}
            />
          </div>
          <div className='flex justify-center mt-5'>
            <button type='submit' className='btn btn-neutral '>
              Join now
            </button>
          </div>
        </form>
        <p className='text-center mt-3'>
          Already have an account? <br />
          <span className='underline font-bold'>
            <Link to={'/login'}>Login here!</Link>
          </span>
        </p>
        <Toaster richColors />
      </div>
    </>
  );
}

export default SignupPage;

//MAKE SURE SHOW PASSWORD CHECKBOX SHOW ONLY DESIRED FIELD. NOT BOTH
