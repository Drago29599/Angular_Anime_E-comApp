export interface UserDetails {
    name: string;
  email: string;
  address: {
    flatNo: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  contactNo: string;
}
