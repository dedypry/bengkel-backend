export interface IAuth {
  id: number;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export interface IAddress {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  province: string;
  city: string;
  district: string;
  zip_code: string;
}

export interface ICompany {
  id: number;
  name: string;
  slug: string;
  logo_url: string | null;
  email: string | null;
  phone_number: string | null;
  fax: string | null;
  npwp: string | null;
  address: IAddress; // Relasi HasOne
}

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  nik: string | null;
  name: string;
  email: string;
  companies: ICompany[]; // Relasi HasMany / ManyToMany
  position: string | null;
  join_date: string | null;
  is_active: boolean;
}
