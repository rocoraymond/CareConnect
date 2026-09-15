export interface Facility {
  id: string;
  name: string;
  type: 'Senior Living' | 'Memory Care' | 'Community Care Center' | 'Hospice & Palliative Care';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  verified: boolean;
  description: string;
  activeOpportunitiesCount: number;
  rating: number;
  reviewCount: number;
}
