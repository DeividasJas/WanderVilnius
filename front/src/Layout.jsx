import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './components/LoginForm';
import ThemeController from './components/ThemeController';
import { useTheme } from './context/ThemeContext';
import ToursDropdown from './components/ToursDropdown';

function Layout() {
  const token = window.localStorage.getItem('token');
  let decoded;
  if (token) {
    decoded = jwtDecode(token);
  }
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const shouldShowLogin = location.pathname !== '/login';
  const loginRef = useRef(null);
  const removeLoginFromNavbar = (event) => {
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      // Perform action here when click is outside the element
      setShowLogin(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to the document
    document.addEventListener('mousedown', removeLoginFromNavbar);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', removeLoginFromNavbar);
    };
  }, []);

  const closeSidebar = () => {
    document.getElementById('my-drawer-3').checked = false;
  };
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/about');
  };
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

            <div className='mx-2 flex-1 flex-nowrap px-2 text-lg'>
              <NavLink to={'/'}>
                <div>LOGO Wander Vilnius</div>
              </NavLink>
            </div>
            <div className='hidden flex-none sm:block text-lg '>
              <ul className='menu menu-horizontal p-0'>
                {/* Navbar menu content here */}
                <div className='flex text-lg items-center'>
                  <ToursDropdown />

                  <NavLink to={'/news'}>
                    <li
                      className={`w-fit ${
                        isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-300'
                      } rounded-lg px-3 py-1`}
                    >
                      News
                    </li>
                  </NavLink>
                  <NavLink to={'/about'}>
                    <li
                      className={`w-fit ${
                        isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-300'
                      } rounded-lg px-3 py-1`}
                    >
                      About
                    </li>
                  </NavLink>
                  <NavLink to={'/reviews'}>
                    <li
                      className={`w-fit ${
                        isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-300'
                      } rounded-lg px-3 py-1`}
                    >
                      Reviews
                    </li>
                  </NavLink>

                  {token ? (
                    <>
                      <NavLink to={'/profile'}>
                        <li
                          className={`w-fit ${
                            isDarkMode
                              ? 'hover:bg-slate-600'
                              : 'hover:bg-slate-300'
                          } rounded-lg px-3 py-1`}
                        >
                          {decoded && (
                            <>
                              {decoded.name} {decoded.lastname}
                            </>
                          )}
                        </li>
                      </NavLink>
                      <li
                        className={`w-fit ${
                          isDarkMode
                            ? 'hover:bg-slate-600'
                            : 'hover:bg-slate-300'
                        } rounded-lg px-3 py-1`}
                        onClick={logout}
                      >
                        Logout
                      </li>
                    </>
                  ) : (
                    <>
                      <NavLink to={'/signup'}>
                        <li
                          className={`w-fit ${
                            isDarkMode
                              ? 'hover:bg-slate-600'
                              : 'hover:bg-slate-300'
                          } rounded-lg px-3 py-1`}
                        >
                          Signup
                        </li>
                      </NavLink>
                      {shouldShowLogin && (
                        <li
                          className={`w-fit ${
                            isDarkMode
                              ? 'hover:bg-slate-600'
                              : 'hover:bg-slate-300'
                          } rounded-lg px-3 py-1`}
                          onClick={() => setShowLogin((p) => !p)}
                        >
                          Login
                        </li>
                      )}
                    </>
                  )}
                </div>
                <li>
                  <ThemeController />
                </li>
              </ul>
            </div>
          </div>
          {/* Page content here */}
          {/* NAVBAR / SIDEBAR CONTENT */}
          {showLogin && (
            <div className='relative '>
              <LoginForm
                ref={loginRef}
                className={`border border-slate-900 rounded-lg p-2 absolute z-10 top-3 right-3 w-2/3 max-w-md shadow-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
                }`}
                setShowLogin={setShowLogin}
              />
            </div>
          )}
        </div>
        <div className='drawer-side z-20'>
          <label
            htmlFor='my-drawer-3'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu bg-base-200 min-h-full w-80  p-4 flex flex-col justify-between text-lg'>
            {/* Sidebar content here */}
            <div className='border '>
              <NavLink to={'/tours'} onClick={closeSidebar}>
                <li
                  className={`w-fit ${
                    isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-300'
                  } rounded-lg px-3 py-1`}
                >
                  Tours
                </li>
              </NavLink>
              <NavLink to={'/news'} onClick={closeSidebar}>
                <li
                  className={`w-fit ${
                    isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-300'
                  } rounded-lg px-3 py-1`}
                >
                  News
                </li>
              </NavLink>
              <NavLink to={'/about'} onClick={closeSidebar}>
                <li
                  className={`w-fit ${
                    isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-300'
                  } rounded-lg px-3 py-1`}
                >
                  About
                </li>
              </NavLink>
              <NavLink to={'/reviews'} onClick={closeSidebar}>
                <li
                  className={`w-fit ${
                    isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-300'
                  } rounded-lg px-3 py-1`}
                >
                  Reviews
                </li>
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
            <div className='border flex justify-between items-center '>
              <div>
                {token ? (
                  <>
                    <NavLink to={'/profile'}>
                      <li
                        className={`w-fit ${
                          isDarkMode
                            ? 'hover:bg-slate-600'
                            : 'hover:bg-slate-300'
                        } rounded-lg px-3 py-1`}
                      >
                        {decoded.name} {decoded.lastname}
                      </li>
                    </NavLink>
                    <li
                      className={`w-fit ${
                        isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-300'
                      } rounded-lg px-3 py-1`}
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <NavLink to={'/login'}>
                      <li
                        onClick={closeSidebar}
                        className={`w-fit ${
                          isDarkMode
                            ? 'hover:bg-slate-600'
                            : 'hover:bg-slate-300'
                        } rounded-lg px-3 py-1`}
                      >
                        Login
                      </li>
                    </NavLink>
                    <NavLink to={'/signup'} onClick={closeSidebar}>
                      <li
                        className={`w-fit ${
                          isDarkMode
                            ? 'hover:bg-slate-600'
                            : 'hover:bg-slate-300'
                        } rounded-lg px-3 py-1`}
                      >
                        Signup
                      </li>
                    </NavLink>
                  </>
                )}
              </div>
              <li>
                <ThemeController />
              </li>
            </div>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;
