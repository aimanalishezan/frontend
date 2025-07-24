import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon, DocumentArrowDownIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import CompanyTable from '../components/CompanyTable';
import FilterPanel from '../components/FilterPanel';
import Navbar from '../components/Navbar';
import { exportToExcel } from '../utils/export';
import { useCompanies } from '../hooks/useCompanies';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { fetchCompanies } from '../services/companyService';

export default function Dashboard() {
  const [filters, setFilters] = useState({
    search: '',
    company_name: '',
    business_id: '',
    industry: '',
    location: '',
    city: '',
    company_type: '',
    business_categories: [] as string[],
    address: '',
    postal_code: '',
    website: '',
    status: '',
    min_revenue: '',
    max_revenue: '',
    min_date: '',
    max_date: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Fetch companies with filters and pagination using custom hook
  const { data, isLoading, isError, error, refetch } = useCompanies({
    ...filters,
    page: currentPage,
    limit: itemsPerPage,
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Check for selected classifications from sessionStorage on component mount
  useEffect(() => {
    const selectedClassifications = sessionStorage.getItem('selectedClassifications');
    if (selectedClassifications) {
      try {
        const categories = JSON.parse(selectedClassifications);
        if (Array.isArray(categories) && categories.length > 0) {
          setFilters(prev => ({
            ...prev,
            business_categories: categories
          }));
          // Clear the sessionStorage after applying
          sessionStorage.removeItem('selectedClassifications');
        }
      } catch (error) {
        console.error('Error parsing selected classifications:', error);
        sessionStorage.removeItem('selectedClassifications');
      }
    }
  }, []);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    refetch();
  };

  const handleReset = () => {
    setFilters({
      search: '',
      company_name: '',
      business_id: '',
      industry: '',
      location: '',
      city: '',
      company_type: '',
      business_categories: [],
      address: '',
      postal_code: '',
      website: '',
      status: '',
      min_revenue: '',
      max_revenue: '',
      min_date: '',
      max_date: '',
    });
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    // Sorting logic can be implemented here if needed
    console.log('Sort by:', field);
  };

  const handleExport = async () => {
    try {
      const response = await fetchCompanies({
        ...filters,
        limit: 1000, // Export more records if needed
      });
      
      if (response?.data?.length > 0) {
        exportToExcel(response.data, 'companies_export');
        toast.success('Export completed successfully');
      } else {
        toast.error('No data to export');
      }
    } catch (err) {
      console.error('Export error:', err);
      toast.error('Failed to export data');
    }
  };

  if (isError) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-red-600">Error loading companies</h3>
        <p className="mt-2 text-sm text-gray-500">
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} showSidebarToggle={true} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Drawer Style */}
        <div className={`fixed top-16 bottom-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-2xl transform transition-all duration-500 ease-in-out xl:relative xl:top-0 xl:translate-x-0 xl:shadow-lg xl:border-r xl:border-slate-200/80 dark:xl:border-gray-700 ${
          sidebarOpen ? 'translate-x-0 w-80 sm:w-96' : 'translate-x-0 w-0 xl:w-0'
        } overflow-hidden`}>
          <div className="flex h-full flex-col bg-gradient-to-b from-white to-slate-50/30 dark:from-gray-800 dark:to-gray-900/30 w-80 sm:w-96">
            {/* Sidebar Header - Mobile Only */}
            <div className="flex items-center justify-end px-4 py-3 border-b border-slate-200/80 dark:border-gray-700 xl:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-2 text-slate-400 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* Filter Panel */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onSearch={handleSearch}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
        
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main Content */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
          sidebarOpen ? 'xl:ml-0' : 'xl:ml-0'
        }`}>
          <div className="flex-1 flex flex-col p-3 sm:p-4 xl:p-6 overflow-hidden">
            <div className="flex-1 flex flex-col space-y-3 sm:space-y-4 overflow-hidden">
              {/* Header Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 p-4 xl:p-6 flex-shrink-0">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-1">
                    <h1 className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-slate-900 via-emerald-700 to-green-600 dark:from-white dark:via-emerald-300 dark:to-green-400 bg-clip-text text-transparent">
                      Company Dashboard
                    </h1>
                    <p className="text-slate-600 dark:text-gray-300 text-base">
                      Discover and analyze companies with advanced filtering
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 xl:hidden"
                    >
                      <FunnelIcon className="h-5 w-5" />
                      Filters
                    </button>
                    
                    <button
                      onClick={handleExport}
                      disabled={!data?.data?.length}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" />
                      Export ({data?.data?.length || 0})
                    </button>
                  </div>
                </div>
              </div>

              {/* Company Table */}
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden flex flex-col">
                <CompanyTable
                  companies={data?.data || []}
                  loading={isLoading}
                  error={error}
                  onSort={handleSort}
                  sortField=""
                  sortDirection="asc"
                />
              </div>

              {/* Pagination */}
              {data && data.count > itemsPerPage && (
                <div className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setCurrentPage(Math.min(Math.ceil((data.count || 0) / itemsPerPage), currentPage + 1))}
                          disabled={currentPage === Math.ceil((data.count || 0) / itemsPerPage)}
                          className="relative ml-3 inline-flex items-center rounded-xl border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Next
                        </button>
                      </div>
                      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-slate-700 dark:text-gray-300">
                            Showing{' '}
                            <span className="font-semibold text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span>
                            {' '}to{' '}
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {Math.min(currentPage * itemsPerPage, data.count)}
                            </span>
                            {' '}of{' '}
                            <span className="font-semibold text-slate-900 dark:text-white">{data.count}</span>
                            {' '}results
                          </p>
                        </div>
                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm" aria-label="Pagination">
                          {/* First Page Button */}
                          <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-xl px-3 py-2 text-slate-400 dark:text-gray-400 ring-1 ring-inset ring-slate-300 dark:ring-gray-600 hover:bg-slate-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <span className="sr-only">First</span>
                            <span className="text-xs font-medium">First</span>
                          </button>
                          
                          {/* Previous Page Button */}
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-3 py-2 text-slate-400 dark:text-gray-400 ring-1 ring-inset ring-slate-300 dark:ring-gray-600 hover:bg-slate-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          
                          {/* Page Numbers */}
                          {(() => {
                            const totalPages = Math.ceil((data.count || 0) / itemsPerPage);
                            const maxVisiblePages = 7;
                            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                            
                            if (endPage - startPage + 1 < maxVisiblePages) {
                              startPage = Math.max(1, endPage - maxVisiblePages + 1);
                            }
                            
                            const pages = [];
                            
                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(
                                <button
                                  key={i}
                                  onClick={() => setCurrentPage(i)}
                                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors ${
                                    i === currentPage
                                      ? 'z-10 bg-green-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                                      : 'text-slate-900 dark:text-gray-200 ring-1 ring-inset ring-slate-300 dark:ring-gray-600 hover:bg-slate-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0'
                                  }`}
                                >
                                  {i}
                                </button>
                              );
                            }
                            
                            return pages;
                          })()}
                          
                          {/* Next Page Button */}
                          <button
                            onClick={() => setCurrentPage(Math.min(Math.ceil((data.count || 0) / itemsPerPage), currentPage + 1))}
                            disabled={currentPage === Math.ceil((data.count || 0) / itemsPerPage)}
                            className="relative inline-flex items-center px-3 py-2 text-slate-400 dark:text-gray-400 ring-1 ring-inset ring-slate-300 dark:ring-gray-600 hover:bg-slate-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          
                          {/* Last Page Button */}
                          <button
                            onClick={() => setCurrentPage(Math.ceil((data.count || 0) / itemsPerPage))}
                            disabled={currentPage === Math.ceil((data.count || 0) / itemsPerPage)}
                            className="relative inline-flex items-center rounded-r-xl px-3 py-2 text-slate-400 dark:text-gray-400 ring-1 ring-inset ring-slate-300 dark:ring-gray-600 hover:bg-slate-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <span className="sr-only">Last</span>
                            <span className="text-xs font-medium">Last</span>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
