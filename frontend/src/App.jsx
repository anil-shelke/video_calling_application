import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import { Toaster } from "react-hot-toast"

import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from './lib/axios.js'
import PageLoader from './components/PageLoader.jsx'
import { getAuthUser } from './lib/api.js'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'


function App() {

  const { isLoading, authUser } = useAuthUser();
  const { theme, setTheme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />

  // console.log(authUser)

  return (
    <div>
      {/* <button onClick={() => setTheme("night")}>update theme</button> */}
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (<Layout showSidebar={true}> <HomePage /> </Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
        <Route path='signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route
          path='notifications'
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
          ) : (<Navigate to={!isAuthenticated ? "login" : "onboarding"} />)
          } />

        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route path='onboarding'
          element={
            isAuthenticated ?
              (
                !isOnboarded ? (
                  <OnboardingPage />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />)} />
      </Routes>

    </div>
  )
}

export default App
