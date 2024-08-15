import SignupPage from './SignupPage';
import LoginForm from '../components/LoginForm';
function AuthenticationPage() {
  return (
    <>
      <div className='flex flex-col border p-2'>
        <h1 className='text-2xl text-center'>Only <span className='font-bold'>users</span> can register</h1>
        <h1 className='text-xl text-center my-2'>Please login or signup</h1>
        <LoginForm />
        <SignupPage />
      </div>
    </>
  );
}

export default AuthenticationPage;
