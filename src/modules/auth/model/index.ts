export interface ILoginPayload {
    email: string;
    password: string;
  }

  export interface IRegistrationPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }

  export interface IOwnerRegistrationPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    companyName: string,
    roleInCompany: string,
    country: string
  }