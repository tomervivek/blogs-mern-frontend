import { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Add new blog', href: '/add-new-blog' },
];

export default function HeaderSection(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="bg-white">
      <header className="bg-[#4F6F52] top-0 z-50">
        <nav className="flex items-center justify-between mx-auto max-w-screen-xl p-5">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <img className="h-10 w-auto" src="/logo-tbg.png" alt="Logo" />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-white hover:text-gray-200">
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4 relative">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="rounded-full bg-white text-[#4F6F52] w-10 h-10 flex items-center justify-center font-bold"
                  title={user.name}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-14 bg-white shadow-lg rounded-md w-48 py-2 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 font-semibold">{user.name}</div>
                    <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a href="/login" className="text-sm font-semibold text-white hover:text-gray-200">Login</a>
                <a href="/signup" className="text-sm font-semibold text-white hover:text-gray-200">Sign Up</a>
              </>
            )}
          </div>
        </nav>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <img className="h-8 w-auto" src="/logo-tbg.png" alt="Logo" />
              </a>
              <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  {item.name}
                </a>
              ))}

              <div className="mt-4 border-t pt-4 space-y-2">
                {user ? (
                  <>
                    <div className="px-3 text-sm font-medium text-gray-700">{user.name}</div>
                    <a href="/dashboard" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Dashboard</a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/login" className="block px-3 py-2 text-gray-900 hover:bg-gray-50">Login</a>
                    <a href="/signup" className="block px-3 py-2 text-gray-900 hover:bg-gray-50">Sign Up</a>
                  </>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      {props.children}
      <Footer />
    </div>
  );
}
