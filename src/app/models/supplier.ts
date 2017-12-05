export interface Supplier {
  id?: string;
  type: 'Particulier'|'Société';
  name: string;
  address?: string;
  position?: string;
  phoneNumber?: string;
  isCustomer?: boolean;
  email?: string;
  comment?: string;
}
