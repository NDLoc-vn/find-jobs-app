export type Job = {
  title: string;
  company: string;
  salary: string;
  location: string;
};

export type Job2 = {
  title: string;
  category: string;
  company: { name: string };
  description: string;
  requirements: string[];
  salary: {
    min: number;
    max: number
    currency: string;
  },
  location: {
    city: string;
    address: string;
  },
  employmentType: string;
  postedDate: string;
  status: string;
}

export type Company = {
  name: string;
  email: string;
  industry: string;
  city: string;
  address: string;
  website: string;
}

export type UserDataType = {
  id: string;
  email: string;
  name: string;
}

export type UserProfileType = {
  name: string;
  location: string;
  skills: string[];
  experience: string[];
  education: string[];
}