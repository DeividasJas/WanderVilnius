import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import Layout from './Layout.jsx';
import ErrorPage from './Error-page.jsx';
import Home from './components/Home.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ToursPage from './pages/ToursPage.jsx';
import About from './pages/About.jsx';
import NewsPage from './pages/NewsPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home />, errorElement: <ErrorPage /> },
      {
        path: '/about',
        element: <About />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/login',
        element: <LoginPage/>,
        errorElement: <ErrorPage />,
      },
      {
        path: '/profile',
        children: [
          {
            index: true,
            element: <ProfilePage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: '/tours',
        children: [
          {
            index: true,
            element: <ToursPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: '/news',
        children: [
          {
            index: true,
            element: <NewsPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: '/reviews',
        children: [
          { index: true, element: <ReviewPage />, errorElement: <ErrorPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
