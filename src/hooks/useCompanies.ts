import { useQuery } from '@tanstack/react-query';
import { fetchCompanies, fetchCompanyById } from '../services/companyService';

// Define CompanyFilters interface locally since it's not exported from services
interface CompanyFilters {
  search?: string;
  company_name?: string;
  business_id?: string;
  industry?: string;
  location?: string;
  city?: string;
  company_type?: string;
  address?: string;
  postal_code?: string;
  website?: string;
  status?: string;
  min_revenue?: string;
  max_revenue?: string;
  min_date?: string;
  max_date?: string;
}

export type { CompanyFilters };

export const useCompanies = (filters: CompanyFilters & { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ['companies', filters],
    queryFn: async () => {
      const response = await fetchCompanies(filters);
      return {
        data: response.data,
        count: response.count,
        total: response.count, // For backward compatibility
        page: filters.page || 1,
        limit: filters.limit || 10,
      };
    },
    keepPreviousData: true,
  });
};

export const useCompany = (id: number) => {
  return useQuery({
    queryKey: ['company', id],
    queryFn: () => fetchCompanyById(id),
    enabled: !!id,
  });
};
