import { fetchCompanies as supabaseFetchCompanies, fetchCompanyById as supabaseFetchCompanyById, exportCompanies as supabaseExportCompanies } from '../services/companyService';
import { Company } from '../types/company';

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  skip?: number;
  limit?: number;
}

export interface CompanyFilters {
  search?: string;
  company_name?: string;
  business_id?: string;
  industry?: string;
  location?: string;
  city?: string;
  company_type?: string;
  min_revenue?: string;
  max_revenue?: string;
  min_date?: string;
  max_date?: string;
  skip?: number;
  limit?: number;
  page?: number;
}

export const fetchCompanies = async (filters: CompanyFilters = {}) => {
  try {
    return await supabaseFetchCompanies(filters);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return { data: [], count: 0 };
  }
};

export const fetchCompanyById = async (id: number) => {
  try {
    return await supabaseFetchCompanyById(id);
  } catch (error) {
    console.error(`Error fetching company with ID ${id}:`, error);
    return null;
  }
};

export const exportCompanies = async (filters: CompanyFilters = {}) => {
  try {
    return await supabaseExportCompanies(filters);
  } catch (error) {
    console.error('Error exporting companies:', error);
    return [];
  }
};
