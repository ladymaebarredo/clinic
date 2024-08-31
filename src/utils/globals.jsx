import {
  BaggageClaimIcon,
  BellIcon,
  BookAIcon,
  ChartAreaIcon,
  Paperclip,
  User2Icon,
  Users2Icon,
} from "lucide-react";

export const links = [
  { tag: "Dashboard", href: "/dashboard", icon: ChartAreaIcon },
  { tag: "Profile", href: "/dashboard/profile", icon: User2Icon },
  { tag: "Notifications", href: "/dashboard/notifications", icon: BellIcon },
  { tag: "Appointments", href: "/dashboard/appointments", icon: BookAIcon },
  { tag: "Certificate", href: "/dashboard/certificate", icon: Paperclip },
];

export const adminLinks = [
  { tag: "Inventory", href: "/dashboard/inventory", icon: BaggageClaimIcon },
  { tag: "Users", href: "/dashboard/users", icon: Users2Icon },
];

export const departments = [
  {
    name: "College Of Computer Studies",
    shortname: "CCS",
    programs: [
      {
        name: "Bachelor of Science in Information Technology",
        shortname: "BSIT",
      },
    ],
  },
  {
    name: "College of Criminology",
    shortname: "CC",
    programs: [
      {
        name: "Bachelor of Science in Criminology",
        shortname: "BSCrim",
      },
    ],
  },
  {
    name: "College of Business Administration",
    shortname: "CBA",
    programs: [
      {
        name: "Bachelor of Science in Business Administration",
        shortname: "BSBA",
      },
    ],
  },
  {
    name: "Basic Education Department",
    shortname: "BED",
    programs: [
      {
        name: "Elementary Education",
        shortname: "ElemEd",
      },
      {
        name: "Secondary Education",
        shortname: "SecEd",
      },
    ],
  },
  {
    name: "College of Engineering",
    shortname: "COE",
    programs: [
      {
        name: "Bachelor of Science in Civil Engineering",
        shortname: "BSCE",
      },
      {
        name: "Bachelor of Science in Electrical Engineering",
        shortname: "BSEE",
      },
    ],
  },
];

export const offices = [
  { name: "Office of Student Affairs and Services", shortname: "OSAS" },
  { name: "Guidance Office", shortname: "GUID" },
  { name: "Registrar's Office", shortname: "REG" },
  { name: "Finance Office", shortname: "FIN" },
  { name: "Human Resources Office", shortname: "HR" },
  { name: "Office of the College Dean", shortname: "DEAN" },
  { name: "Library", shortname: "LIB" },
];
