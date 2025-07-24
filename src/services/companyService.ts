import { supabase } from '../config/supabase';
import { Company } from '../types/company';
import { BUSINESS_CATEGORIES } from '../components/ClassificationSelector';

// Helper function to convert business categories to industry keywords
const getIndustryKeywordsFromCategories = (categoryIds: string[]): string[] => {
  if (!categoryIds || categoryIds.length === 0) return [];
  
  const keywords: string[] = [];
  categoryIds.forEach(categoryId => {
    const category = BUSINESS_CATEGORIES.find(cat => cat.id === categoryId);
    if (category) {
      keywords.push(...category.keywords);
    }
  });
  
  return [...new Set(keywords)]; // Remove duplicates
};

export const fetchCompanies = async (filters: any = {}) => {
  let query = supabase.from('companies').select('*', { count: 'exact' });

  // Apply search
  if (filters.search) {
    const search = filters.search.toLowerCase();
    query = query.or(`name.ilike.%${search}%,business_id.ilike.%${search}%`);
  }

  // Apply filters
  const { 
    company_name, 
    business_id, 
    industry, 
    location, 
    city, 
    company_type, 
    business_categories,
    address, 
    postal_code, 
    website, 
    status, 
    min_revenue, 
    max_revenue, 
    min_date, 
    max_date 
  } = filters;
  
  if (company_name) query = query.ilike('name', `%${company_name}%`);
  if (business_id) query = query.ilike('business_id', `%${business_id}%`);
  if (industry) query = query.ilike('industry', `%${industry}%`);
  
  // Handle business categories filter
  if (business_categories && business_categories.length > 0) {
    const industryKeywords = getIndustryKeywordsFromCategories(business_categories);
    if (industryKeywords.length > 0) {
      // Create OR conditions for company_type field matching any of the keywords
      const companyTypeConditions = industryKeywords.map(keyword => `company_type.ilike.%${keyword}%`).join(',');
      query = query.or(companyTypeConditions);
    }
  }
  
  // Map location filter to city field since location column doesn't exist
  if (location) query = query.ilike('city', `%${location}%`);
  if (city) query = query.ilike('city', `%${city}%`);
  if (company_type) query = query.eq('company_type', company_type);
  if (address) query = query.ilike('address', `%${address}%`);
  if (postal_code) query = query.ilike('postal_code', `%${postal_code}%`);
  if (website) query = query.ilike('website', `%${website}%`);
  if (status) query = query.eq('status', status);
  if (min_revenue) query = query.gte('revenue', parseFloat(min_revenue));
  if (max_revenue) query = query.lte('revenue', parseFloat(max_revenue));
  if (min_date) query = query.gte('registration_date', min_date);
  if (max_date) query = query.lte('registration_date', max_date);

  // Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw error;

  return { data: data as Company[], count: count || 0 };
};

export const fetchCompanyById = async (id: number): Promise<Company> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Company;
};

export const exportCompanies = async (filters: any = {}) => {
  const { data, error } = await supabase
    .from('companies')
    .select('*');
  if (error) throw error;
  return data;
};
