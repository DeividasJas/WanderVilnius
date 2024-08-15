import LoginForm from '../components/LoginForm';
import { useLocation, Link } from 'react-router-dom';
function LoginPage() {
  const location = useLocation();

  const fromTourRegistration = location.state?.from === 'protected-route';
  console.log(fromTourRegistration);
  return (
    <>
      <h1 className='text-center text-2xl my-8'>Please Login</h1>
      <div>
        {fromTourRegistration && (
          <p className='text-center mb-4'>
            Only <span className='font-bold'>users</span> can register for a
            tour
          </p>
        )}
        <LoginForm />

        <p className='text-center mt-3'>
          Do not have an account? <br />
          <span className='underline font-bold'>
            <Link to={'/signup'}>Register here!</Link>
          </span>
        </p>
      </div>
    </>
  );
}

export default LoginPage;
