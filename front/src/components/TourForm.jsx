import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function TourForm() {
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
      }, 700);
    }
  };

  return (
    <>
      <h1>tour form</h1>
      <form></form>
    </>
  );
}

export default TourForm;
