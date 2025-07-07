// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Switch from '../DarkModeToggle';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <header 
//       className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-[hsla(240,5%,15%,0.8)] backdrop-blur"
//       style={{
//         '--tw-bg-opacity': '0.95',
//         backgroundColor: 'rgba(255, 255, 255, 0.95)'
//       }}
//     >
//       <div className="container flex h-14 items-center justify-between">
//         <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-emerald-500 transition-colors duration-300">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-6 w-6 text-emerald-500"
//           >
//             <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//             <circle cx="12" cy="10" r="3" />
//           </svg>
//           <span className="text-xl font-bold">Civix</span>
//         </button>
//         <nav className="hidden md:flex gap-6">
//           <a href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             Features
//           </a>
//           <a href="#how-it-works" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             How It Works
//           </a>
//           <a href="#testimonials" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             Testimonials
//           </a>
//           <a href="#faqs" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             FAQ
//           </a>
//         </nav>
//         <div className="flex items-center gap-4">
//           <Switch />
//           <button
//             onClick={() => navigate('/login')}
//             className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate('/signup')}
//             className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500 text-primary-foreground hover:bg-emerald-500/90 h-9 px-4 py-2"
//           >
//             Get Started
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Switch from '../DarkModeToggle';
import { jwtDecode } from 'jwt-decode';


const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on route change or navigation
  const handleNav = (cb) => {
    setMobileMenuOpen(false);
    if (cb) cb();
  };

  // Close menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onClick = (e) => {
      if (e.target.closest('#mobile-nav-panel') || e.target.closest('#mobile-nav-toggle')) return;
      setMobileMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [mobileMenuOpen]);

  // ✅ Check if logged-in user is admin
  const token = localStorage.getItem('token');
  let isAdmin = false;

  try {
    if (token) {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === 'admin';
    }
  } catch (err) {
    console.error('Invalid token');
  }

  return (

    <header
      className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-[hsla(240,5%,15%,0.8)] backdrop-blur"
    >
      <div className="container flex h-14 items-center justify-between">
        <button onClick={() => { setMobileMenuOpen(false); navigate('/'); }} className="flex items-center gap-2 hover:text-emerald-500 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-emerald-500"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-xl font-bold">Civix</span>
        </button>

        {/* Desktop nav - only show on large screens */}
        <nav className="hidden lg:flex gap-6">
          <a href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">How It Works</a>
          <a href="#testimonials" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Testimonials</a>
          <a href="#faqs" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">FAQ</a>
          <Link to="/civic-education" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Civic Education & Rights</Link>
        </nav>

        {/* Hamburger for mobile and tablet */}
        <button
          id="mobile-nav-toggle"
          className="lg:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <svg className="h-7 w-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>

        <div className="flex items-center gap-4 ml-8">
          <Switch />


          <button
            onClick={() => navigate('/login')}
            className="hidden lg:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="hidden lg:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500 text-primary-foreground hover:bg-emerald-500/90 h-9 px-4 py-2"
          >
            Get Started
          </button>
        </div>
 
       {isAdmin && (
          <div className="ml-auto hidden lg:block">
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 h-9 px-4 py-2"
            >
              Admin Dashboard
            </button>
          </div>
        )} 
      </div>

      {/* Mobile/Tablet menu overlay and panel */}
      {mobileMenuOpen && (
        <>
          {/* Dark overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="lg:hidden fixed inset-x-0 top-0 z-[100] animate-fade-slide-up">
            <nav id="mobile-nav-panel" className="relative flex flex-col items-center w-full h-[100vh] bg-white dark:bg-[#18181b] pt-24 gap-6 shadow-xl">
              <button
                className="absolute top-6 right-6 text-3xl text-emerald-600 focus:outline-none"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                &times;
              </button>
              <a href="#features" className="text-lg font-medium hover:text-emerald-500 transition-colors duration-300" onClick={() => handleNav()}>Features</a>
              <a href="#how-it-works" className="text-lg font-medium hover:text-emerald-500 transition-colors duration-300" onClick={() => handleNav()}>How It Works</a>
              <a href="#testimonials" className="text-lg font-medium hover:text-emerald-500 transition-colors duration-300" onClick={() => handleNav()}>Testimonials</a>
              <a href="#faqs" className="text-lg font-medium hover:text-emerald-500 transition-colors duration-300" onClick={() => handleNav()}>FAQ</a>
              <Link to="/civic-education" className="text-lg font-medium hover:text-emerald-500 transition-colors duration-300" onClick={() => handleNav()}>Civic Education & Rights</Link>
              {isAdmin && (
                <button
                  onClick={() => handleNav(() => navigate('/admin'))}
                  className="w-11/12 rounded-md text-base font-medium border border-emerald-500 text-emerald-600 hover:bg-emerald-50 h-11 px-4 py-2"
                >
                  Admin Dashboard
                </button>
              )}
              <button
                onClick={() => handleNav(() => navigate('/login'))}
                className="w-11/12 rounded-md text-base font-medium border border-input hover:bg-accent hover:text-accent-foreground h-11 px-4 py-2"
              >
                Login
              </button>
              <button
                onClick={() => handleNav(() => navigate('/signup'))}
                className="w-11/12 rounded-md text-base font-medium bg-emerald-500 text-white hover:bg-emerald-600 h-11 px-4 py-2"
              >
                Get Started
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;





{/* // import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Switch from '../DarkModeToggle';

// const Navbar = () => { */}
{/* //   const navigate = useNavigate();

//   const scrollToTop = () => { */}
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <header
//       className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-[hsla(240,5%,15%,0.8)] backdrop-blur"
//       style={{
//         '--tw-bg-opacity': '0.95',
//         backgroundColor: 'rgba(255, 255, 255, 0.95)'
//       }}
//     >
//       <div className="container flex h-14 items-center justify-between">
//         <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-emerald-500 transition-colors duration-300">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-6 w-6 text-emerald-500"
//           >
//             <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//             <circle cx="12" cy="10" r="3" />
//           </svg>
//           <span className="text-xl font-bold">Civix</span>
//         </button>
//         <nav className="hidden md:flex gap-6">
//           <a href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             Features
//           </a>
//           <a href="#how-it-works" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             How It Works
//           </a>
//           <a href="#testimonials" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             Testimonials
//           </a>
//           <a href="#faq" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
//             FAQ
//           </a>
//         </nav>
//         <div className="flex items-center gap-4">
//           <Switch />
//           <button
//             onClick={() => navigate('/login')}
//             className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate('/signup')}
//             className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500 text-primary-foreground hover:bg-emerald-500/90 h-9 px-4 py-2"
//           >
//             Get Started
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
