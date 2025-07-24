import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

// Finnish Business Classifications based on the official classification system
const BUSINESS_CATEGORIES = [
  {
    id: 'A',
    name: 'Agriculture & Farming',
    icon: '🌾',
    color: 'from-green-500 to-emerald-600',
    keywords: ['agriculture', 'forestry', 'fishing', 'farming', 'crop', 'animal', 'hunting', 'aquaculture', 'silviculture', 'logging', 'marine', 'freshwater', 'cattle', 'dairy', 'poultry', 'livestock', 'cereals', 'vegetables', 'fruits', 'grapes', 'tobacco', 'flowers', 'plant', 'propagation']
  },
  {
    id: 'B',
    name: 'Mining & Extraction',
    icon: '⛏️',
    color: 'from-amber-500 to-orange-600',
    keywords: ['mining', 'quarrying', 'extraction', 'coal', 'lignite', 'petroleum', 'natural gas', 'metal', 'iron', 'uranium', 'stone', 'sand', 'clay', 'gravel', 'salt', 'peat', 'chemical', 'fertiliser', 'minerals']
  },
  {
    id: 'C',
    name: 'Manufacturing & Production',
    icon: '🏭',
    color: 'from-blue-500 to-indigo-600',
    keywords: ['manufacturing', 'production', 'food', 'beverage', 'tobacco', 'textile', 'clothing', 'leather', 'wood', 'paper', 'printing', 'coke', 'petroleum', 'chemical', 'pharmaceutical', 'rubber', 'plastic', 'metal', 'machinery', 'equipment', 'furniture', 'repair', 'meat', 'dairy', 'bakery', 'sugar', 'wine', 'beer', 'spirits']
  },
  {
    id: 'D',
    name: 'Energy & Utilities',
    icon: '⚡',
    color: 'from-yellow-500 to-amber-600',
    keywords: ['electricity', 'gas', 'steam', 'air conditioning', 'energy', 'power', 'utility', 'electric', 'generation', 'transmission', 'distribution', 'supply']
  },
  {
    id: 'E',
    name: 'Water & Waste Management',
    icon: '💧',
    color: 'from-blue-400 to-cyan-500',
    keywords: ['water', 'supply', 'sewerage', 'waste', 'management', 'remediation', 'collection', 'treatment', 'disposal', 'recovery', 'materials', 'recycling']
  },
  {
    id: 'F',
    name: 'Construction & Building',
    icon: '🏗️',
    color: 'from-orange-500 to-red-600',
    keywords: ['construction', 'building', 'civil', 'engineering', 'specialized', 'residential', 'non-residential', 'demolition', 'site', 'preparation', 'electrical', 'plumbing', 'installation', 'finishing']
  },
  {
    id: 'G',
    name: 'Trade & Retail',
    icon: '🛒',
    color: 'from-purple-500 to-pink-600',
    keywords: ['wholesale', 'retail', 'trade', 'sale', 'motor', 'vehicle', 'repair', 'maintenance', 'parts', 'accessories', 'fuel', 'food', 'beverage', 'tobacco', 'household', 'goods', 'machinery', 'equipment']
  },
  {
    id: 'H',
    name: 'Transportation & Logistics',
    icon: '🚛',
    color: 'from-cyan-500 to-blue-600',
    keywords: ['transportation', 'storage', 'land', 'water', 'air', 'warehousing', 'postal', 'courier', 'logistics', 'railway', 'road', 'freight', 'passenger', 'pipeline', 'supporting', 'handling']
  },
  {
    id: 'I',
    name: 'Hospitality & Tourism',
    icon: '🏨',
    color: 'from-rose-500 to-pink-600',
    keywords: ['accommodation', 'food', 'service', 'hotel', 'restaurant', 'tourism', 'hospitality', 'short-term', 'camping', 'recreational', 'vehicle', 'parks', 'beverage', 'serving']
  },
  {
    id: 'J',
    name: 'Media & Publishing',
    icon: '📺',
    color: 'from-indigo-500 to-purple-600',
    keywords: ['publishing', 'broadcasting', 'content', 'production', 'distribution', 'books', 'journals', 'newspapers', 'software', 'motion', 'picture', 'video', 'television', 'radio', 'music', 'sound', 'recording']
  },
  {
    id: 'K',
    name: 'Technology & IT Services',
    icon: '💻',
    color: 'from-blue-600 to-indigo-700',
    keywords: ['telecommunication', 'computer', 'programming', 'consulting', 'computing', 'infrastructure', 'information', 'service', 'wired', 'wireless', 'satellite', 'internet', 'data', 'processing', 'hosting', 'web', 'portals']
  },
  {
    id: 'L',
    name: 'Finance & Insurance',
    icon: '💰',
    color: 'from-emerald-500 to-teal-600',
    keywords: ['financial', 'insurance', 'banking', 'credit', 'fund', 'pension', 'investment', 'monetary', 'intermediation', 'central', 'bank', 'deposit', 'taking', 'life', 'non-life', 'reinsurance', 'auxiliary']
  },
  {
    id: 'M',
    name: 'Real Estate & Property',
    icon: '🏢',
    color: 'from-slate-500 to-gray-600',
    keywords: ['real estate', 'property', 'rental', 'leasing', 'estate', 'buying', 'selling', 'renting', 'operating', 'own', 'leased', 'residential', 'non-residential']
  },
  {
    id: 'N',
    name: 'Professional Services',
    icon: '👔',
    color: 'from-violet-500 to-purple-600',
    keywords: ['professional', 'scientific', 'technical', 'legal', 'accounting', 'management', 'consulting', 'architectural', 'engineering', 'research', 'development', 'advertising', 'market', 'design', 'photography', 'translation', 'veterinary', 'head', 'offices', 'specialized']
  },
  {
    id: 'O',
    name: 'Administrative Support',
    icon: '📋',
    color: 'from-teal-500 to-cyan-600',
    keywords: ['administrative', 'support', 'service', 'rental', 'leasing', 'employment', 'travel', 'security', 'investigation', 'services', 'building', 'landscape', 'office', 'machinery', 'equipment', 'agency', 'tour', 'operator']
  },
  {
    id: 'P',
    name: 'Government & Public Services',
    icon: '🏛️',
    color: 'from-red-500 to-rose-600',
    keywords: ['public', 'administration', 'defence', 'social', 'security', 'government', 'general', 'regulation', 'economic', 'affairs', 'foreign', 'justice', 'order', 'safety', 'compulsory']
  },
  {
    id: 'Q',
    name: 'Education & Training',
    icon: '🎓',
    color: 'from-blue-500 to-cyan-600',
    keywords: ['education', 'teaching', 'school', 'university', 'training', 'learning', 'pre-primary', 'primary', 'secondary', 'higher', 'technical', 'vocational', 'cultural', 'sports', 'recreation', 'educational', 'support']
  },
  {
    id: 'R',
    name: 'Healthcare & Social Services',
    icon: '🏥',
    color: 'from-green-500 to-blue-600',
    keywords: ['health', 'social', 'work', 'human', 'medical', 'hospital', 'nursing', 'care', 'residential', 'diagnostic', 'therapy', 'dental', 'practice', 'activities', 'mental', 'disability', 'elderly', 'child', 'day']
  },
  {
    id: 'S',
    name: 'Arts & Entertainment',
    icon: '🎭',
    color: 'from-pink-500 to-rose-600',
    keywords: ['arts', 'entertainment', 'recreation', 'creative', 'sports', 'amusement', 'gambling', 'library', 'museum', 'performing', 'artistic', 'literary', 'cultural', 'facilities', 'fitness', 'other']
  },
  {
    id: 'T',
    name: 'Personal & Other Services',
    icon: '🔧',
    color: 'from-gray-500 to-slate-600',
    keywords: ['other', 'service', 'activities', 'membership', 'organizations', 'repair', 'maintenance', 'personal', 'household', 'goods', 'religious', 'political', 'trade', 'unions', 'professional']
  },
  {
    id: 'U',
    name: 'Household Services',
    icon: '🏠',
    color: 'from-amber-400 to-yellow-500',
    keywords: ['households', 'employers', 'domestic', 'personnel', 'undifferentiated', 'goods', 'services', 'producing', 'activities', 'own', 'use']
  },
  {
    id: 'V',
    name: 'International Organizations',
    icon: '🌐',
    color: 'from-indigo-400 to-blue-500',
    keywords: ['extraterritorial', 'organisations', 'bodies', 'international', 'diplomatic', 'consular', 'missions', 'foreign', 'embassies']
  }
];

interface ClassificationSelectorProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  className?: string;
}

export default function ClassificationSelector({ 
  selectedCategories, 
  onCategoriesChange, 
  className = '' 
}: ClassificationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = BUSINESS_CATEGORIES.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoriesChange(newCategories);
  };

  const handleClearAll = () => {
    onCategoriesChange([]);
  };

  const getSelectedCategoryNames = () => {
    return selectedCategories
      .map(id => BUSINESS_CATEGORIES.find(cat => cat.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
        Business Categories
        {selectedCategories.length > 0 && (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
            {selectedCategories.length} selected
          </span>
        )}
      </label>
      
      {/* Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full rounded-xl border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-100 px-4 py-3 text-left text-sm text-slate-900 dark:text-gray-900 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-slate-400 dark:hover:border-gray-500 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TagIcon className="h-4 w-4 text-slate-500 dark:text-gray-500" />
            <span className={selectedCategories.length > 0 ? 'text-slate-900 dark:text-gray-900' : 'text-slate-400 dark:text-gray-500'}>
              {selectedCategories.length > 0 
                ? `${selectedCategories.length} categories selected`
                : 'Select business categories'
              }
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {selectedCategories.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
            {isOpen ? (
              <ChevronUpIcon className="h-4 w-4 text-slate-500 dark:text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-slate-500 dark:text-gray-500" />
            )}
          </div>
        </div>
      </button>

      {/* Selected Categories Preview */}
      {selectedCategories.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedCategories.slice(0, 3).map(categoryId => {
            const category = BUSINESS_CATEGORIES.find(cat => cat.id === categoryId);
            if (!category) return null;
            return (
              <span
                key={categoryId}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </span>
            );
          })}
          {selectedCategories.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300">
              +{selectedCategories.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl shadow-lg max-h-80 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-slate-200 dark:border-gray-600">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-100 text-slate-900 dark:text-gray-900 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Categories List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCategories.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors border-b border-slate-100 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-gray-100">
                        {category.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-gray-400">
                        {category.keywords.slice(0, 3).join(', ')}
                        {category.keywords.length > 3 && '...'}
                      </div>
                    </div>
                  </div>
                  {selectedCategories.includes(category.id) && (
                    <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="p-3 border-t border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600 dark:text-gray-300">
                {selectedCategories.length} of {BUSINESS_CATEGORIES.length} selected
              </span>
              <div className="flex space-x-2">
                {selectedCategories.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="px-3 py-1 text-xs font-medium text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-gray-100 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 text-xs font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export the categories for use in other components
export { BUSINESS_CATEGORIES };