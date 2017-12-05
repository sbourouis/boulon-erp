export interface Supplier {
  id?: string;
  type: 'Particulier'|'Société';
  name: string;
  address?: string;
  position?: string;
  phoneNumber?: string;
  email?: string;
  comment?: string;
}
