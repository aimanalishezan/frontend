import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Company } from '../types/company';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  BuildingOfficeIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface CompanyTableProps {
  companies: Company[];
  loading: boolean;
  error: any;
  onSort?: (field: string) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export default function CompanyTable({ companies, loading, error, onSort, sortField, sortDirection }: CompanyTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Company; direction: 'asc' | 'desc' } | null>(null);
  const navigate = useNavigate();

  const handleSort = (key: keyof Company) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCompanies = [...companies];
  if (sortConfig !== null) {
    sortedCompanies.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const getSortIndicator = (field: keyof Company) => {
    if (sortConfig?.key === field) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpIcon className="h-4 w-4" />
      ) : (
        <ArrowDownIcon className="h-4 w-4" />
      );
    }
    return (
      <div className="flex flex-col">
        <ArrowUpIcon className="h-3 w-3 opacity-30" />
        <ArrowDownIcon className="h-3 w-3 opacity-30 -mt-1" />
      </div>
    );
  };

  const handleRowClick = (companyId: number) => {
    navigate(`/companies/${companyId}`);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-100 dark:border-green-900 border-t-green-600 dark:border-t-green-400 mx-auto"></div>
            <BuildingOfficeIcon className="h-6 w-6 text-green-600 dark:text-green-400 absolute top-3 left-1/2 transform -translate-x-1/2" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-gray-200">Loading Companies</h3>
          <p className="mt-2 text-slate-600 dark:text-gray-400">Please wait while we fetch the latest company data...</p>
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-gray-200">Unable to Load Companies</h3>
          <p className="mt-2 text-red-600 dark:text-red-400 max-w-md mx-auto">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-gray-700">
            <MagnifyingGlassIcon className="h-8 w-8 text-slate-400 dark:text-gray-500" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-gray-200">No Companies Found</h3>
          <p className="mt-2 text-slate-600 dark:text-gray-400 max-w-md mx-auto">
            We couldn't find any companies matching your current search criteria. Try adjusting your filters or search terms.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-gray-600 text-sm font-medium rounded-md text-slate-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              Clear Filters
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              Browse All Companies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-700 dark:to-gray-600">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200 cursor-pointer hover:bg-slate-200/50 dark:hover:bg-gray-600/50 transition-all duration-200 group"
                onClick={() => handleSort('name')}
              >
                <div className="inline-flex items-center space-x-2">
                  <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Company Name</span>
                  <span className="text-slate-400 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {getSortIndicator('name')}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200 cursor-pointer hover:bg-slate-200/50 dark:hover:bg-gray-600/50 transition-all duration-200 group"
                onClick={() => handleSort('business_id')}
              >
                <div className="inline-flex items-center space-x-2">
                  <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Business ID</span>
                  <span className="text-slate-400 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {getSortIndicator('business_id')}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200"
              >
                Industry
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200 cursor-pointer hover:bg-slate-200/50 dark:hover:bg-gray-600/50 transition-all duration-200 group"
                onClick={() => handleSort('revenue')}
              >
                <div className="inline-flex items-center space-x-2">
                  <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Revenue (€)</span>
                  <span className="text-slate-400 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {getSortIndicator('revenue')}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200"
              >
                Postal Code
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200"
              >
                Website
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200"
              >
                Registered
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200"
              >
                Created
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-gray-200"
              >
                Updated
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {sortedCompanies.map((company, index) => (
              <tr 
                key={company.id} 
                className={`group hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-gray-700 dark:hover:to-gray-600 cursor-pointer transition-all duration-200 hover:shadow-sm hover:scale-[1.001] ${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-slate-50/30 dark:bg-gray-800/50'
                }`}
                onClick={() => handleRowClick(company.id)}
              >
                <td className="whitespace-nowrap py-4 px-6 text-sm font-medium text-slate-900 dark:text-gray-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-full flex items-center justify-center mr-3 group-hover:shadow-md transition-all duration-200">
                      <span className="text-sm font-bold text-green-600 dark:text-green-200">
                        {company.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{company.name}</span>
                      <span className="text-xs text-slate-500 dark:text-gray-400">{company.industry || 'Industry not specified'}</span>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-gray-400">
                  <span className="font-mono bg-slate-100 dark:bg-gray-700 px-2 py-1 rounded text-xs group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                    {company.business_id}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-gray-400">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-200 dark:from-gray-700 dark:to-gray-600 text-slate-800 dark:text-gray-200 group-hover:from-green-100 group-hover:to-emerald-100 dark:group-hover:from-green-900/30 dark:group-hover:to-emerald-900/30 transition-all duration-200">
                    {company.industry || 'Not specified'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-gray-400">
                  {company.city || '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-gray-400">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 text-green-800 dark:text-green-200 group-hover:shadow-sm transition-all duration-200">
                    {company.company_type || 'Unknown'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-gray-400">
                  <span className="font-semibold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {company.revenue 
                      ? `€${company.revenue.toLocaleString()}` 
                      : '-'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-gray-400 max-w-xs">
                  <span className="truncate block group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors" title={company.address}>
                    {company.address || '-'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-gray-400">
                  <span className="font-mono bg-slate-100 dark:bg-gray-700 px-2 py-1 rounded text-xs group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                    {company.postal_code || '-'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-gray-400">
                  {company.website ? (
                    <a 
                      href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:underline transition-all duration-200 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 px-2 py-1 rounded"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="truncate max-w-32">
                        {company.website.replace(/^https?:\/\//, '')}
                      </span>
                      <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-slate-400 dark:text-gray-500">-</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-gray-400">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 group-hover:shadow-sm ${
                    company.status === 'active' ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 text-green-800 dark:text-green-200' :
                    company.status === 'inactive' ? 'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-800 dark:to-rose-800 text-red-800 dark:text-red-200' :
                    'bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-700 dark:to-slate-700 text-gray-800 dark:text-gray-200'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      company.status === 'active' ? 'bg-green-500 animate-pulse' :
                      company.status === 'inactive' ? 'bg-red-500' :
                      'bg-gray-400'
                    }`}></div>
                    {company.status || 'Unknown'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-gray-500">
                  <span className="group-hover:text-slate-600 dark:group-hover:text-gray-400 transition-colors">
                    {company.registration_date 
                      ? new Date(company.registration_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : '-'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-gray-500">
                  <span className="group-hover:text-slate-600 dark:group-hover:text-gray-400 transition-colors">
                    {company.created_at 
                      ? new Date(company.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : '-'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-gray-500">
                  <span className="group-hover:text-slate-600 dark:group-hover:text-gray-400 transition-colors">
                    {company.updated_at 
                      ? new Date(company.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : '-'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
