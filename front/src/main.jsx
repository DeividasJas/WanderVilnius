import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { getGroupTours, getSoloTours } from './services/get.mjs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import ErrorPage from './Error-page.jsx';
import Home from './components/Home.jsx';
import ProfilePage from './pages/profile_page/ProfilePage.jsx';
import ToursPage from './pages/tours_page/ToursPage.jsx';
import About from './pages/About.jsx';
import NewsPage from './pages/NewsPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import GroupTours from './pages/tours_page/GroupTours.jsx';
import SoloTours from './pages/tours_page/SoloTours.jsx';

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
            path: '/tours/group',
            element: <GroupTours />,
            errorElement: <ErrorPage />,
            loader: getGroupTours,
          },
          {
            path: '/tours/solo',
            element: <SoloTours />,
            errorElement: <ErrorPage />,
            loader: getSoloTours,
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
