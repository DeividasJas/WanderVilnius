import { forwardRef } from 'react';
const LoginForm = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={props.className}>
      <h1>this is login form</h1>
      <form className='flex flex-col gap-2 ' data-theme='dark'>
        <input type='text' />
        <input type='text' />
        <input type='text' />
      </form>
    </div>
  );
});

export default LoginForm;
