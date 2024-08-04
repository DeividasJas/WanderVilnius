import { useForm } from 'react-hook-form';
function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>signup bro</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type='text'
            placeholder='Firstname'
            id='name'
            {...register('name', {
              required: 'Please enter your name',
              validate: {
                notEmpty: (fieldValue) => {
                  return (
                    fieldValue.trim().length !== 0 ||
                    'Empty name is not allowed'
                  );
                },
              },
            })}
          />
          <p className='text-red-800'>{errors.name?.message}</p>
        </div>
        <div>
          <input
            type='text'
            placeholder='Lastname'
            id='name'
            {...register('lastname', {
              required: 'Please enter your lastname',
            })}
          />
          <p className='text-red-800'>{errors.lastname?.message}</p>
        </div>
        <div>
          <input
            type='email'
            placeholder='Email address'
            id='name'
            {...register('email', {
              required: 'Please enter your email address',
              validate: (fieldValue) => {
                console.log(fieldValue);
                return fieldValue === 'admin@mail.com' || 'You are not admin';
              },
            })}
          />
          <p className='text-red-800'>{errors.email?.message}</p>
        </div>
        <button type='submit'>done</button>
      </form>
    </div>
  );
}

export default SignupPage;
