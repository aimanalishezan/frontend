import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { UserIcon, Cog6ToothIcon, ArrowDownTrayIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface DownloadHistory {
  id: string;
  filename: string;
  downloadDate: Date;
  filterCriteria: {
    searchTerm?: string;
    location?: string;
    postalCode?: string;
    website?: string;
    minRevenue?: number;
    classifications?: string[];
  };
  recordCount: number;
}

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') as 'profile' | 'settings' | 'downloads' | null;
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'downloads'>(tabFromUrl || 'profile');
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile form state
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dataRetention, setDataRetention] = useState('30');
  const [exportFormat, setExportFormat] = useState('csv');

  useEffect(() => {
    // Update active tab when URL changes
    if (tabFromUrl && ['profile', 'settings', 'downloads'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  useEffect(() => {
    // Load download history from localStorage
    const savedHistory = localStorage.getItem('downloadHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          downloadDate: new Date(item.downloadDate)
        }));
        setDownloadHistory(parsed);
      } catch (error) {
        console.error('Error parsing download history:', error);
      }
    }

    // Load user settings
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setEmailNotifications(settings.emailNotifications ?? true);
        setDataRetention(settings.dataRetention ?? '30');
        setExportFormat(settings.exportFormat ?? 'csv');
      } catch (error) {
        console.error('Error parsing user settings:', error);
      }
    }
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, you would update the user profile via API
      // For now, we'll just show a success message
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Save settings to localStorage
      const settings = {
        emailNotifications,
        dataRetention,
        exportFormat
      };
      localStorage.setItem('userSettings', JSON.stringify(settings));
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  const clearDownloadHistory = () => {
    localStorage.removeItem('downloadHistory');
    setDownloadHistory([]);
    toast.success('Download history cleared');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderProfileTab = () => (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Profile Information</h3>
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            {user?.photoURL ? (
              <img
                className="h-20 w-20 rounded-full"
                src={user.photoURL}
                alt={user.displayName || user.email || 'User'}
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 font-semibold text-2xl">
                {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="flex-1">
            <button
              type="button"
              className="bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Change Photo
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Account Settings</h3>
      <form onSubmit={handleSettingsUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Notifications
          </label>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="emailNotifications"
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Email notifications for new features and updates
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="dataRetention" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Data Retention Period
          </label>
          <select
            id="dataRetention"
            value={dataRetention}
            onChange={(e) => setDataRetention(e.target.value)}
            className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="90">90 days</option>
            <option value="365">1 year</option>
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            How long to keep your download history and filter preferences
          </p>
        </div>
        
        <div>
          <label htmlFor="exportFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Default Export Format
          </label>
          <select
            id="exportFormat"
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
            <option value="json">JSON</option>
          </select>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderDownloadsTab = () => (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Download History</h3>
        {downloadHistory.length > 0 && (
          <button
            onClick={clearDownloadHistory}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Clear History
          </button>
        )}
      </div>
      
      {downloadHistory.length === 0 ? (
        <div className="text-center py-12">
          <ArrowDownTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No downloads yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your download history will appear here when you export data from the dashboard.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {downloadHistory.map((download) => (
            <div key={download.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {download.filename}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(download.downloadDate)}
                      </span>
                      <span>{download.recordCount} records</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {Object.keys(download.filterCriteria).length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Filter Criteria:</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(download.filterCriteria).map(([key, value]) => {
                      if (!value || (Array.isArray(value) && value.length === 0)) return null;
                      return (
                        <span
                          key={key}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        >
                          {key}: {Array.isArray(value) ? value.join(', ') : value}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Profile</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your account settings and view your activity history.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setSearchParams({});
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <UserIcon className="mr-3 h-5 w-5" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setSearchParams({ tab: 'settings' });
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Cog6ToothIcon className="mr-3 h-5 w-5" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    setActiveTab('downloads');
                    setSearchParams({ tab: 'downloads' });
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'downloads'
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <ArrowDownTrayIcon className="mr-3 h-5 w-5" />
                  Downloads
                </button>
              </nav>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'settings' && renderSettingsTab()}
              {activeTab === 'downloads' && renderDownloadsTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;