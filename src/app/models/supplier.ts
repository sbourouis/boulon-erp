export interface Supplier {
  id?: number;
  type: 'Particulier'|'Société';
  name: string;
  address?: string;
  position?: string;
  phoneNumber?: string;
  isCustomer?: boolean;
  email?: string;
  comment?: string;
}
