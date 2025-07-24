import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  GlobeAltIcon, 
  MapPinIcon, 
  BuildingOfficeIcon, 
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useCompany } from '../hooks/useCompanies';
import { Company } from '../types/company';
import Navbar from '../components/Navbar';

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: company, isLoading, isError } = useCompany(Number(id));

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-indigo-500 dark:border-green-500"></div>
      </div>
    );
  }

  if (isError || !company) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Company Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The company you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-600"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar showSidebarToggle={false} />
      <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-slate-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{company.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">Business ID: {company.business_id}</p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                company.status === '2' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}>
                {company.status === '2' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-slate-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <BuildingOfficeIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-3" />
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Company Type</dt>
                <dd className="text-sm text-gray-900 dark:text-gray-200">{company.company_type || 'N/A'}</dd>
              </div>
            </div>

            <div className="flex items-start">
              <MapPinIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-3" />
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                <dd className="text-sm text-gray-900 dark:text-gray-200">
                  {company.city && company.postal_code 
                    ? `${company.city}, ${company.postal_code}`
                    : company.city || 'N/A'
                  }
                </dd>
              </div>
            </div>

            <div className="flex items-start">
              <CalendarIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-3" />
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Registration Date</dt>
                <dd className="text-sm text-gray-900 dark:text-gray-200">{formatDate(company.registration_date)}</dd>
              </div>
            </div>

            {company.website && (
              <div className="flex items-start">
                <GlobeAltIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-3" />
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</dt>
                  <dd className="text-sm text-gray-900 dark:text-gray-200">
                    <a
                      href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
                    >
                      {company.website}
                    </a>
                  </dd>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-slate-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Business Details</h2>
          
          <div className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Industry</dt>
              <dd className="text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                {company.industry || 'Not specified'}
              </dd>
            </div>

            {company.address && (
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Address</dt>
                <dd className="text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  {company.address}
                  {company.postal_code && `, ${company.postal_code}`}
                  {company.city && `, ${company.city}`}
                </dd>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-slate-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500 dark:text-gray-400">Created</dt>
            <dd className="text-gray-900 dark:text-gray-200">{formatDate(company.created_at)}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
            <dd className="text-gray-900 dark:text-gray-200">{formatDate(company.updated_at)}</dd>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
