import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ onToggleSidebar, showSidebarToggle = false }: NavbarProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Disclosure as="nav" className={`bg-green-600 shadow-lg transition-colors duration-200 ${location.pathname === '/' || location.pathname === '/about' || location.pathname === '/contact' || location.pathname === '/classifications' ? 'sticky top-0 z-50' : ''}`}>
      {({ open }) => (
        <>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex items-center">
                {showSidebarToggle && (
                  <button
                    onClick={onToggleSidebar}
                    className="mr-3 inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300 transition-colors duration-200"
                  >
                    <span className="sr-only">Toggle filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-xl font-bold text-white hover:text-green-100 transition-colors">
                    CompanyFinder
                  </Link>
                </div>

              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
                {/* About Us and Contact - Right side */}
                <div className="flex items-center space-x-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:text-green-100 hover:bg-green-700 rounded-md transition-colors duration-200"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:text-green-100 hover:bg-green-700 rounded-md transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </div>
                
                {/* Dashboard and Classifications - Right side */}
                {isAuthenticated && (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:text-green-100 hover:bg-green-700 rounded-md transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/classifications"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:text-green-100 hover:bg-green-700 rounded-md transition-colors duration-200"
                    >
                      Classifications
                    </Link>
                  </div>
                )}
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300 transition-colors duration-200"
                >
                  <span className="sr-only">Toggle dark mode</span>
                  {isDark ? (
                    <SunIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <MoonIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                {isAuthenticated ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        {user?.photoURL ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.photoURL}
                            alt={user.displayName || user.email || 'User'}
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                            {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black dark:ring-gray-600 ring-opacity-5 dark:ring-opacity-20 focus:outline-none">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-900 dark:text-white font-medium">
                            {user?.displayName || 'User'}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 transition-colors duration-200'
                              )}
                            >
                              <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile?tab=settings"
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 transition-colors duration-200'
                              )}
                            >
                              <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Account Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile?tab=downloads"
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                'flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 transition-colors duration-200'
                              )}
                            >
                              <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Downloads
                            </Link>
                          )}
                        </Menu.Item>
                        <div className="border-t border-gray-200 dark:border-gray-700">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                  'flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 transition-colors duration-200'
                                )}
                              >
                                <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      to="/login"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-green-600 shadow-sm ring-1 ring-inset ring-green-300 hover:bg-green-50"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center space-x-2 sm:hidden">
                {/* Mobile Dark Mode Toggle */}
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300 transition-colors duration-200"
                >
                  <span className="sr-only">Toggle dark mode</span>
                  {isDark ? (
                    <SunIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <MoonIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300 transition-colors duration-200">
                  <span className="sr-only">Toggle filters</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FunnelIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-green-600 transition-colors duration-200">
            <div className="space-y-1 pb-3 pt-2">
              <Disclosure.Button
                as={Link}
                to="/dashboard"
                className="block border-l-4 border-green-300 bg-green-700 py-2 pl-3 pr-4 text-base font-medium text-white"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/classifications"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:bg-green-700 hover:border-green-300 transition-colors"
              >
                Classifications
              </Disclosure.Button>
            </div>
            <div className="border-t border-green-500 pb-3 pt-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {user?.photoURL ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.photoURL}
                          alt={user.displayName || user.email || 'User'}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                          {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {user?.displayName || user?.email || 'User'}
                      </div>
                      <div className="text-sm font-medium text-green-100">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      as="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-base font-medium text-green-100 hover:bg-green-700 hover:text-white transition-colors duration-200"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </>
              ) : (
                <div className="space-y-1 px-2">
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green-700 hover:text-white transition-colors duration-200"
                  >
                    Log in
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green-700 hover:text-white transition-colors duration-200"
                  >
                    Sign up
                  </Disclosure.Button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
