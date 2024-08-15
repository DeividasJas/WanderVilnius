import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import {
  getAllTours,
  getGroupTours,
  getSoloTours,
  getTourById,
  getTours,
} from './services/get.mjs';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import Layout from './Layout.jsx';
import ErrorPage from './Error-page.jsx';
import Home from './components/Home.jsx';
import ProfilePage from './pages/profile_page/ProfilePage.jsx';
import ToursPage from './pages/tours_page/TourPage.jsx';
import About from './pages/About.jsx';
import NewsPage from './pages/NewsPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SoloTours from './pages/tours_page/SoloTours.jsx';
import TourRegistration from './pages/tours_page/TourRegistration.jsx';
import ProtectedRoute from './pages/ProtetedRoute.jsx';
import AuthenticationPage from './pages/AuthenticationPage.jsx';

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
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/authentication',
        element: <AuthenticationPage />,
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
          {
            path: '/profile/tour',
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
          {
            path: '/tours/:tourType',
            element: <SoloTours />,
            errorElement: <ErrorPage />,
            loader: async ({ params }) => {
              const { tourType } = params;
              const tours = await getTours(tourType);
              return tours;
            },
          },
          {
            path: '/tours/:tourType/:tourId',
            element: <ToursPage />,
            errorElement: <ErrorPage />,
            loader: async ({ params }) => {
              const { tourId } = params;
              return await getTourById(tourId);
            },
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute>
                    {' '}
                    <TourRegistration />
                  </ProtectedRoute>
                ),
                errorElement: <ErrorPage />,
              },
            ],
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
