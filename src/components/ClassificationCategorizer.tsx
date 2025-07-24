import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Tag, Building2, Factory, Truck, ShoppingCart, Briefcase, Heart, GraduationCap, Palette, TreePine, Hammer, Zap, Globe, Users, Home, Wrench, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClassificationItem {
  code: string;
  level: number;
  classificationName: string;
}

interface CategoryGroup {
  name: string;
  icon: React.ReactNode;
  color: string;
  keywords: string[];
  items: ClassificationItem[];
}

interface ClassificationCategorizerProps {
  onCategoriesSelect?: (categories: string[]) => void;
  selectedCategories?: string[];
  showBackButton?: boolean;
}

const ClassificationCategorizer: React.FC<ClassificationCategorizerProps> = ({ 
  onCategoriesSelect, 
  selectedCategories = [], 
  showBackButton = false 
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<ClassificationItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>(selectedCategories);
  const [loading, setLoading] = useState(true);

  // Define category groups with keywords for automatic classification
  const categoryGroups: { [key: string]: Omit<CategoryGroup, 'items'> } = {
    agriculture: {
      name: 'Agriculture & Forestry',
      icon: <TreePine className="w-5 h-5" />,
      color: 'bg-green-100 text-green-800 border-green-200',
      keywords: ['agriculture', 'forestry', 'fishing', 'crop', 'animal', 'farming', 'growing', 'hunting', 'silviculture', 'logging', 'aquaculture']
    },
    mining: {
      name: 'Mining & Extraction',
      icon: <Factory className="w-5 h-5" />,
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      keywords: ['mining', 'quarrying', 'extraction', 'petroleum', 'gas', 'coal', 'ore', 'stone', 'sand', 'clay']
    },
    manufacturing: {
      name: 'Manufacturing',
      icon: <Factory className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      keywords: ['manufacture', 'production', 'processing', 'food products', 'beverages', 'textiles', 'chemicals', 'machinery', 'equipment']
    },
    energy: {
      name: 'Energy & Utilities',
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      keywords: ['electricity', 'gas', 'steam', 'water', 'sewerage', 'waste', 'supply', 'distribution', 'energy']
    },
    construction: {
      name: 'Construction',
      icon: <Hammer className="w-5 h-5" />,
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      keywords: ['construction', 'building', 'civil engineering', 'demolition', 'installation', 'roofing', 'plumbing', 'electrical']
    },
    trade: {
      name: 'Trade & Retail',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      keywords: ['wholesale', 'retail', 'trade', 'sale', 'motor vehicles', 'repair', 'maintenance']
    },
    transport: {
      name: 'Transportation & Logistics',
      icon: <Truck className="w-5 h-5" />,
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      keywords: ['transport', 'storage', 'postal', 'courier', 'warehousing', 'logistics', 'shipping']
    },
    hospitality: {
      name: 'Hospitality & Tourism',
      icon: <Building2 className="w-5 h-5" />,
      color: 'bg-pink-100 text-pink-800 border-pink-200',
      keywords: ['accommodation', 'food service', 'restaurant', 'hotel', 'tourism', 'catering']
    },
    information: {
      name: 'Information & Technology',
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      keywords: ['information', 'communication', 'publishing', 'telecommunications', 'computer', 'software', 'data processing']
    },
    finance: {
      name: 'Finance & Insurance',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      keywords: ['financial', 'insurance', 'banking', 'credit', 'investment', 'pension', 'fund']
    },
    realestate: {
      name: 'Real Estate',
      icon: <Home className="w-5 h-5" />,
      color: 'bg-teal-100 text-teal-800 border-teal-200',
      keywords: ['real estate', 'property', 'rental', 'leasing']
    },
    professional: {
      name: 'Professional Services',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-slate-100 text-slate-800 border-slate-200',
      keywords: ['professional', 'scientific', 'technical', 'legal', 'accounting', 'consulting', 'research', 'development']
    },
    administrative: {
      name: 'Administrative Services',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-violet-100 text-violet-800 border-violet-200',
      keywords: ['administrative', 'support', 'employment', 'travel', 'security', 'cleaning', 'office']
    },
    public: {
      name: 'Public Administration',
      icon: <Building2 className="w-5 h-5" />,
      color: 'bg-red-100 text-red-800 border-red-200',
      keywords: ['public administration', 'defence', 'social security', 'government']
    },
    education: {
      name: 'Education',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      keywords: ['education', 'teaching', 'training', 'school', 'university']
    },
    health: {
      name: 'Health & Social Care',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-rose-100 text-rose-800 border-rose-200',
      keywords: ['health', 'medical', 'social', 'care', 'hospital', 'nursing', 'residential']
    },
    arts: {
      name: 'Arts & Recreation',
      icon: <Palette className="w-5 h-5" />,
      color: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
      keywords: ['arts', 'entertainment', 'recreation', 'sports', 'cultural', 'gambling', 'amusement']
    },
    other: {
      name: 'Other Services',
      icon: <Wrench className="w-5 h-5" />,
      color: 'bg-stone-100 text-stone-800 border-stone-200',
      keywords: ['repair', 'personal service', 'membership', 'household', 'extraterritorial']
    }
  };

  // Function to categorize an item based on its classification name
  const categorizeItem = (item: ClassificationItem): string => {
    const name = item.classificationName.toLowerCase();
    
    for (const [categoryKey, category] of Object.entries(categoryGroups)) {
      if (category.keywords.some(keyword => name.includes(keyword))) {
        return categoryKey;
      }
    }
    
    return 'other';
  };

  // Parse CSV data
  const parseCSV = (csvText: string): ClassificationItem[] => {
    const lines = csvText.split('\n');
    const result: ClassificationItem[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const matches = line.match(/"([^"]*)";(\d+);"([^"]*)";/);
      if (matches) {
        result.push({
          code: matches[1].replace(/'/g, ''),
          level: parseInt(matches[2]),
          classificationName: matches[3]
        });
      }
    }
    
    return result;
  };

  // Load and parse CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/toimiala_1_20250101.csv');
        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setData(parsedData);
      } catch (error) {
        console.error('Error loading CSV data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    if (onCategoriesSelect) {
      // Multi-select mode for filtering
      const newSelection = tempSelectedCategories.includes(categoryId)
        ? tempSelectedCategories.filter(id => id !== categoryId)
        : [...tempSelectedCategories, categoryId];
      setTempSelectedCategories(newSelection);
    } else {
      // Single-select mode for browsing
      setSelectedCategory(selectedCategory === categoryId ? 'all' : categoryId);
    }
  };

  const handleApplySelection = () => {
    if (onCategoriesSelect) {
      onCategoriesSelect(tempSelectedCategories);
      if (showBackButton) {
        navigate('/dashboard');
      }
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Categorized data with memoization for performance
  const categorizedData = useMemo(() => {
    const categories: { [key: string]: CategoryGroup } = {};
    
    // Initialize categories
    Object.entries(categoryGroups).forEach(([key, group]) => {
      categories[key] = { ...group, items: [] };
    });
    
    // Categorize items
    data.forEach(item => {
      const category = categorizeItem(item);
      categories[category].items.push(item);
    });
    
    return categories;
  }, [data]);

  // Filtered data based on search and category selection
  const filteredData = useMemo(() => {
    let items: ClassificationItem[] = [];
    
    if (selectedCategory === 'all') {
      items = data;
    } else {
      items = categorizedData[selectedCategory]?.items || [];
    }
    
    if (searchTerm) {
      items = items.filter(item => 
        item.classificationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return items;
  }, [data, categorizedData, selectedCategory, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      {showBackButton && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToDashboard}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
            {onCategoriesSelect && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {tempSelectedCategories.length} categories selected
                </span>
                <button
                  onClick={handleApplySelection}
                  disabled={tempSelectedCategories.length === 0}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Check className="h-4 w-4" />
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Finnish Business Classification System
          </h1>
          <p className="text-gray-600">
            Search and categorize business activities by industry type. Total classifications: {data.length}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search classifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Categories</option>
                  {Object.entries(categoryGroups).map(([key, group]) => (
                    <option key={key} value={key}>
                      {group.name} ({categorizedData[key]?.items.length || 0})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {Object.entries(categorizedData).map(([key, category]) => (
            <div
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md relative ${
                (onCategoriesSelect ? tempSelectedCategories.includes(key) : selectedCategory === key) ? 'ring-2 ring-blue-500' : ''
              } ${category.color}`}
            >
              <div className="flex items-center gap-3 mb-2">
                {category.icon}
                <h3 className="font-semibold text-sm">{category.name}</h3>
                {onCategoriesSelect && (
                  <div className={`ml-auto w-4 h-4 rounded border-2 transition-colors ${
                    tempSelectedCategories.includes(key)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {tempSelectedCategories.includes(key) && (
                      <Check className="h-2 w-2 text-white m-0.5" />
                    )}
                  </div>
                )}
              </div>
              <p className="text-2xl font-bold">{category.items.length}</p>
              <p className="text-xs opacity-75">classifications</p>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory === 'all' ? 'All Classifications' : categoryGroups[selectedCategory]?.name}
              <span className="text-gray-500 font-normal ml-2">({filteredData.length} results)</span>
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {filteredData.map((item, index) => {
              const category = categorizeItem(item);
              const categoryInfo = categoryGroups[category];
              
              return (
                <div key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {item.code}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${categoryInfo.color}`}>
                          {categoryInfo.icon}
                          {categoryInfo.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Level {item.level}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900">
                        {item.classificationName}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredData.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No classifications found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ClassificationCategorizer;