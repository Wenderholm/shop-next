export type AddressMode = "existing" | "new";

export interface CheckoutAddressFormState {
  newAddressCountry: string;
  setNewAddressCountry: (value: string) => void;
  province: string;
  setProvince: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  streetAddress: string;
  setStreetAddress: (value: string) => void;
  isMainAddress: boolean;
  toggleMainAddress: () => void;
}
