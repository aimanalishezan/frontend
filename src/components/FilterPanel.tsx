import React, { useState } from 'react';
import { FunnelIcon, XMarkIcon, AdjustmentsHorizontalIcon, MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import ClassificationSelector from './ClassificationSelector';

interface FilterPanelProps {
  filters: {
    search: string;
    company_name: string;
    business_id: string;
    industry: string;
    location: string;
    city: string;
    company_type: string;
    business_categories: string[];
    address: string;
    postal_code: string;
    website: string;
    status: string;
    min_revenue: string;
    max_revenue: string;
    min_date: string;
    max_date: string;
  };
  onFiltersChange: (newFilters: any) => void;
  onSearch: () => void;
  onReset: () => void;
}

export default function FilterPanel({ filters, onFiltersChange, onSearch, onReset }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    company: true,
    location: true,
    additional: false,
    financial: false
  });
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFiltersChange({ ...filters, [name]: value });
  };
  
  const hasActiveFilters = Object.values(filters).some(value => value !== '');
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };
  
  const getSectionActiveCount = (sectionFilters: string[]) => {
    return sectionFilters.filter(key => {
      const value = filters[key as keyof typeof filters];
      return Array.isArray(value) ? value.length > 0 : value !== '';
    }).length;
  };

  return (
    <div className="h-full">
      <div className="px-6 pt-6 pb-4 border-b border-slate-200/80 dark:border-gray-700 bg-gradient-to-r from-green-50/50 to-emerald-50/30 dark:from-gray-800/50 dark:to-gray-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <FunnelIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Advanced Filters</h3>
              <p className="text-xs text-slate-500 dark:text-gray-400">Refine your search criteria</p>
            </div>
          </div>
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 text-green-800 dark:text-green-200 border border-green-300/50 dark:border-green-600/50 shadow-sm">
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                {getActiveFiltersCount()} Active
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        <div className="space-y-8">
          {/* Company Information Section */}
          <div className="space-y-5">
            <button
              onClick={() => toggleSection('company')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-gray-700 dark:to-gray-600/50 border border-slate-200/60 dark:border-gray-600 hover:from-slate-100 hover:to-slate-200/50 dark:hover:from-gray-600 dark:hover:to-gray-500/50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-wide">Company Details</h4>
                {getSectionActiveCount(['company_name', 'business_id', 'industry']) > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
                    {getSectionActiveCount(['company_name', 'business_id', 'industry'])}
                  </span>
                )}
              </div>
              {expandedSections.company ? (
                <ChevronUpIcon className="h-4 w-4 text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors" />
              )}
            </button>
            
            {expandedSections.company && (
              <div className="space-y-4 pl-2">
            
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                value={filters.company_name}
                onChange={handleFilterChange}
                className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
                placeholder="e.g. Tech Solutions"
              />
            </div>
            
            <div>
              <label htmlFor="business_id" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Business ID
              </label>
              <input
                type="text"
                name="business_id"
                id="business_id"
                value={filters.business_id}
                onChange={handleFilterChange}
                className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
                placeholder="e.g. FI12345678"
              />
            </div>
            
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                id="industry"
                value={filters.industry}
                onChange={handleFilterChange}
                className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
                placeholder="e.g. Technology, Healthcare"
             />
           </div>
               </div>
             )}
           </div>
         
         {/* Location & Type Section */}
         <div className="space-y-5">
           <button
             onClick={() => toggleSection('location')}
             className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-gray-700 dark:to-gray-600/50 border border-slate-200/60 dark:border-gray-600 hover:from-slate-100 hover:to-slate-200/50 dark:hover:from-gray-600 dark:hover:to-gray-500/50 transition-all duration-200 group"
           >
             <div className="flex items-center space-x-3">
               <div className="w-2 h-2 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
               <h4 className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-wide">Location & Type</h4>
               {getSectionActiveCount(['city', 'company_type', 'business_categories', 'postal_code']) > 0 && (
                 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
                   {getSectionActiveCount(['city', 'company_type', 'business_categories', 'postal_code'])}
                 </span>
               )}
             </div>
             {expandedSections.location ? (
               <ChevronUpIcon className="h-4 w-4 text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors" />
             ) : (
               <ChevronDownIcon className="h-4 w-4 text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors" />
             )}
           </button>
           
           {expandedSections.location && (
             <div className="space-y-4 pl-2">
           

           <div>
             <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
               Location
             </label>
             <input
               type="text"
               name="city"
               id="city"
               value={filters.city}
               onChange={handleFilterChange}
               className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
               placeholder="e.g. Helsinki"
             />
           </div>
           
           <div>
             <ClassificationSelector
               selectedCategories={filters.business_categories || []}
               onCategoriesChange={(categories) => onFiltersChange({ ...filters, business_categories: categories })}
             />
           </div>
           
           <div>
             <label htmlFor="postal_code" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
               Postal Code
             </label>
             <input
               type="text"
               name="postal_code"
               id="postal_code"
               value={filters.postal_code}
               onChange={handleFilterChange}
               className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
               placeholder="e.g. 00100"
             />
           </div>
               </div>
             )}
           </div>
         
         {/* Additional Information Section */}
         <div className="space-y-5">
           <button
             onClick={() => toggleSection('additional')}
             className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-gray-700 dark:to-gray-600/50 border border-slate-200/60 dark:border-gray-600 hover:from-slate-100 hover:to-slate-200/50 dark:hover:from-gray-600 dark:hover:to-gray-500/50 transition-all duration-200 group"
           >
             <div className="flex items-center space-x-3">
               <div className="w-2 h-2 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
               <h4 className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-wide">Additional Information</h4>
               {getSectionActiveCount(['website', 'status']) > 0 && (
                 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
                   {getSectionActiveCount(['website', 'status'])}
                 </span>
               )}
             </div>
             {expandedSections.additional ? (
               <ChevronUpIcon className="h-4 w-4 text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors" />
             ) : (
               <ChevronDownIcon className="h-4 w-4 text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors" />
             )}
           </button>
           
           {expandedSections.additional && (
             <div className="space-y-4 pl-2">
           
           <div>
             <label htmlFor="website" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
               Website
             </label>
             <input
               type="text"
               name="website"
               id="website"
               value={filters.website}
               onChange={handleFilterChange}
               className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
               placeholder="e.g. example.com"
             />
           </div>
           
           <div>
             <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
               Status
             </label>
             <select
               id="status"
               name="status"
               value={filters.status}
               onChange={handleFilterChange}
               className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
             >
               <option value="">All Statuses</option>
               <option value="active">Active</option>
               <option value="inactive">Inactive</option>
               <option value="pending">Pending</option>
               <option value="suspended">Suspended</option>
             </select>
           </div>
               </div>
             )}
           </div>
         
          {/* Financial & Date Filters Section */}
          <div className="space-y-5">
            <button
              onClick={() => toggleSection('financial')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-gray-700 dark:to-gray-600/50 border border-slate-200/60 dark:border-gray-600 hover:from-slate-100 hover:to-slate-200/50 dark:hover:from-gray-600 dark:hover:to-gray-500/50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-gray-200 uppercase tracking-wide">Financial & Dates</h4>
                {getSectionActiveCount(['min_revenue', 'max_revenue', 'min_date', 'max_date']) > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
                    {getSectionActiveCount(['min_revenue', 'max_revenue', 'min_date', 'max_date'])}
                  </span>
                )}
              </div>
              {expandedSections.financial ? (
                <ChevronUpIcon className="h-4 w-4 text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors" />
              )}
            </button>
            
            {expandedSections.financial && (
              <div className="space-y-4 pl-2">
            
            <div>
              <label htmlFor="min_revenue" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Min Revenue (€)
              </label>
              <input
                type="number"
                name="min_revenue"
                id="min_revenue"
                value={filters.min_revenue}
                onChange={handleFilterChange}
                className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
                placeholder="e.g. 100,000"
                min="0"
                step="1000"
              />
            </div>
            
            <div>
              <label htmlFor="max_revenue" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Max Revenue (€)
              </label>
              <input
                type="number"
                name="max_revenue"
                id="max_revenue"
                value={filters.max_revenue}
                onChange={handleFilterChange}
                className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
                placeholder="e.g. 5,000,000"
                min="0"
                step="1000"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="min_date" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  name="min_date"
                  id="min_date"
                  value={filters.min_date}
                  onChange={handleFilterChange}
                  className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
                />
              </div>
              
              <div>
                <label htmlFor="max_date" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  name="max_date"
                  id="max_date"
                  value={filters.max_date}
                  onChange={handleFilterChange}
                  className="block w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md placeholder:text-slate-400 dark:placeholder:text-gray-500"
                />
              </div>
             </div>
                 </div>
               )}
             </div>
           </div>
         
         {/* Action Buttons */}
         <div className="pt-8 space-y-4">
           <div className="bg-gradient-to-r from-slate-50/80 to-slate-100/40 dark:from-gray-800/80 dark:to-gray-700/40 rounded-2xl p-4 border border-slate-200/60 dark:border-gray-600">
             <button
               type="button"
               onClick={onSearch}
               className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
             >
               <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
               Apply Filters
               {hasActiveFilters && (
                 <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                   {getActiveFiltersCount()}
                 </span>
               )}
             </button>
             
             {hasActiveFilters && (
               <button
                 type="button"
                 onClick={onReset}
                 className="w-full mt-3 inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-gray-600 text-sm font-semibold rounded-xl text-slate-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-slate-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95"
               >
                 <XMarkIcon className="h-4 w-4 mr-2" />
                 Clear All Filters
               </button>
             )}
           </div>
         </div>
      </div>
    </div>
  );
}
