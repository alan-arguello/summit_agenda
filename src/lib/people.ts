import records from "@/data/people.json";

export type Person = {
  slug: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  topics: string[];
  linkedin: string;
  photo: string;
  photoPosition?: string;
  photoFit?: "cover" | "contain";
  logo?: string;
  logoDark?: boolean;
  logoIcon?: boolean;
  category: "speaker" | "attendee";
};

export const people = records as Person[];
