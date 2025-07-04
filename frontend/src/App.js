import './css/Navbar.css';
import './css/App.css';
import './css/Home.css';
import './css/Showcase.css';
import './css/Footer.css';
import './css/SignUp.css';
import './css/Home-lf.css';
import './css/report-form.css';
import './css/showcase-lf.css';
import './css/review.css';
import './css/finder.css';
import './css/Blog.css';
import './css/profile.css';
import './css/ClaimItem.css';
import './css/UserBlog.css';
import './css/About.css';
import './css/Attraction.css';
import './css/faq.css';
import './css/Guide.css';
import './css/userComments.css';
import './css/admin.css';
import './css/adminClaimed.css';
import './css/loading.css';
import './css/toast.css';
import './css/Chatbot.css';

import { HelmetProvider,Helmet } from 'react-helmet-async';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { showOffline, showOnline } from './utils/toast';
import Navbar from './components/navbar';
import Home from './components/Home';
import Blog from './components/Blog';
import BlacktoBlue from './components/BlacktoBlue';
import ClaimItem from './components/ClaimItem';
import BluetoBlack from './components/BluetoBlack';
import Showcase from './components/Showcase';
import Footer from './components/Footer';
import GoTop from './components/GoTop';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Homelf from './components/Homelf';
import Showcaselostandfound from './components/Showcaselostandfound';
import Review from './components/Review';
import BlogReview from './components/BlogReview';
import Toblue from './components/Toblue';
import Profile from './components/Profile';
// import Toblue from './components/Finder';
import Finder from './components/Finder';
import Tofinderblue from './components/FadeToFinderBlue';
import LfState from './context/LfState';
import BlogState from './context/BlogState';
import ScrollToTop from './components/ScrollToTop';
import ResetPasswordForm from './components/ResetPasswordForm';
import { UserState } from './context/UserState';
import EditProfile from './components/EditProfile';
import UserBlog from './components/UserBlog';
import AboutUs from './components/About';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Attractions from './components/Attractions';
import Guide from './components/Guide';
import Prayag from './components/Praygraj';
import Comments from './components/UserComments';
import OtpCheck from './components/OtpCheck';
import Admin from './components/Admin';
import loading from './components/Loading';
import AdminClaimed from './components//AdminClaimed';
import Loading from './components/Loading';
import UserFeedback from './components/UserFeedback';
import Chatbot from './components/Chatbot';

function App() {
  useEffect(() => {
    // Network status detection
    const handleOnline = () => showOnline();
    const handleOffline = () => showOffline();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial connection status
    if (!navigator.onLine) {
      showOffline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <HelmetProvider>
    <LfState>
    <BlogState>
      <UserState>
        <Router>
          <ScrollToTop />
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className='home'>
                    <Home />
                  </section>
                  <BlacktoBlue />
                  <Showcase />
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <AboutUs/>
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/admin-feedback"
              element={
                <>
                  <UserFeedback/>
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/admin"
              element={
                <>
                  <Admin/>
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/admin-claimed"
              element={
                <>
                  <AdminClaimed/>
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/usercomments/:id"
              element={
                <>
                  <Comments/>
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/major-attractions"
              element={
                <>
                  <Guide/>
                  <BluetoBlack />
                  <Attractions/>
                  <Toblue />
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/prayag"
              element={
                <>
                  <Prayag/>
                  <BluetoBlack />
                  <Attractions/>
                  <Toblue />
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Contact/>
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/faq"
              element={
                <>
                  <Faq/>
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <>
                  <UserBlog/>
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/lost-found"
              element={
                <>
                  <section className='home'>
                    <Homelf />
                  </section>
                  <BlacktoBlue />
                  <Showcaselostandfound />
                  <BluetoBlack />
                  <Review />
                  <Toblue />
                  <Footer />

                  <GoTop />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <div className="nav-body">
                    <SignUp />
                    <Footer />
                  </div>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <div className="nav-body">
                    <Profile />
                    <Footer />
                  </div>
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <div className="nav-body">
                    <Login />
                    <Footer />
                  </div>
                </>
              }
            />
            <Route
              path="/forget-password"
              element={
                <>
                  <div className="nav-body">
                    <ResetPassword />
                    <Footer />
                  </div>
                </>
              }
            />
            <Route
              path="/OtpCheck/:token"
              element={
                <>
                  <div className="nav-body">
                    <OtpCheck />
                    <Footer />
                  </div>
                </>
              }
            />
            <Route path="/reset-password/:token" element={
              <>
                <div className="nav-body">
                  <ResetPasswordForm />
                  <Footer />
                </div>
              </>
            } />
            <Route path="/edit-profile" element={
              <>
                <div className="nav-body">
                  <EditProfile />
                  <Footer />
                </div>
              </>
            } />
            <Route
              path="/finder"
              element={
                <>
                  <Finder />
                  <Tofinderblue />
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/finder/type/:type"
              element={
                <>
                  <Finder />
                  <Tofinderblue />
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/claimItem/:id"
              element={
                <>
                  <ClaimItem/>
                  <Tofinderblue />
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/finder/location/:location"
              element={
                <>
                  <Finder />
                  <Tofinderblue />
                  <Footer />
                  <GoTop />
                </>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <>
                  <Blog />
                  <Footer />
                  <GoTop />
                </>
              }
            />
          </Routes>
        </Router>
        <Chatbot />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </UserState>
      </BlogState>
    </LfState>
    </HelmetProvider>
  );
}

export default App;
