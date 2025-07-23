import { useQuery } from '@tanstack/react-query';
import { fetchCompanies, fetchCompanyById, CompanyFilters } from '../api/company';

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
