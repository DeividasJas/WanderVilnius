import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LoginForm from './components/LoginForm';

function Layout() {
  const [showLogin, setShowLogin] = useState(false);
  const closeSidebar = () => {
    document.getElementById('my-drawer-3').checked = false;
  };
  const token = window.localStorage.getItem('token');
  //   document.addEventListener('click', (e) => {
  //     if (e.target.matches('.login')) {
  //       setShowLogin(false);
  //     }
  //   });

  const loginRef = useRef(null);
  const handleClickLogin = (event) => {
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      // Perform action here when click is outside the element
      setShowLogin(false);
    }
  };
  useEffect(() => {
    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickLogin);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickLogin);
    };
  }, []);
  return (
    <>
      <div className='drawer'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col'>
          {/* Navbar */}
          <div className='navbar bg-base-300 w-full'>
            <div className='flex-none sm:hidden'>
              <label
                htmlFor='my-drawer-3'
                aria-label='open sidebar'
                className='btn btn-square btn-ghost'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block h-6 w-6 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              </label>
            </div>

            <div className='mx-2 flex-1 px-2 lg:text-lg'>
              <NavLink to={'/'}>
                <div>LOGO Wander Vilnius</div>
              </NavLink>
            </div>
            <div className='hidden flex-none sm:block'>
              <ul className='menu menu-horizontal'>
                {/* Navbar menu content here */}
                <div className='flex gap-2 text-lg'>
                  <NavLink to={'/tours'}>
                    <li>Tours</li>
                  </NavLink>
                  <NavLink to={'/news'}>
                    <li>News</li>
                  </NavLink>
                  <NavLink to={'/about'}>
                    <li>About</li>
                  </NavLink>
                  <NavLink to={'/reviews'}>
                    <li>Reviews</li>
                  </NavLink>

                  {token ? (
                    <NavLink to={'/profile'}>
                      <li>Profile</li>
                    </NavLink>
                  ) : (
                    <>
                      <NavLink to={'/signup'}>
                        <li>Signup</li>
                      </NavLink>
                      <li
                        className='login'
                        onClick={() => setShowLogin((p) => !p)}
                      >
                        Login
                      </li>
                    </>
                  )}
                </div>
              </ul>
            </div>
          </div>
          {/* Page content here */}
          {/* NAVBAR / SIDEBAR CONTENT */}

          {showLogin && (
            <div className='relative '>
              <LoginForm
                ref={loginRef}
                className='border border-red-900 rounded-lg p-2 absolute z-10 top-3 right-3 w-2/3 max-w-md bg-white shadow-lg'
              />
            </div>
          )}
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer-3'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu bg-base-200 min-h-full w-80  p-4 flex flex-col justify-between text-lg'>
            {/* Sidebar content here */}
            <div className='border '>
              <NavLink to={'/tours'} onClick={closeSidebar}>
                <li>Tours</li>
              </NavLink>
              <NavLink to={'/news'} onClick={closeSidebar}>
                <li>News</li>
              </NavLink>
              <NavLink to={'/about'} onClick={closeSidebar}>
                <li>About</li>
              </NavLink>
              <NavLink to={'/reviews'} onClick={closeSidebar}>
                <li>Reviews</li>
              </NavLink>
            </div>
            <button
              className='btn btn-square btn-ghost ml-auto'
              aria-label='close sidebar'
              onClick={closeSidebar}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-6 w-6 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            </button>
            <div>
              {/* <NavLink to={'/profile'} onClick={closeSidebar}>
                <li>Profile page + picture</li>
              </NavLink> */}
              {token ? (
                <NavLink to={'/profile'}>
                  <li>Profile page + picture</li>
                </NavLink>
              ) : (
                <>
                  <li onClick={closeSidebar}>Login</li>
                  <NavLink to={'/signup'} onClick={closeSidebar}>
                    <li>Signup</li>
                  </NavLink>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;
