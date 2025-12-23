import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const contactFormDchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone number"),

  designation: yup.string().required("Designation is required"),

  address: yup.string().required("Address is required"),

  country: yup.string().required("Country is required"),

  city: yup.string().required("City is required"),

  organization: yup.string().required("Organization name is required"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  linkedInProfile: yup
    .string()
    .url("Enter a valid LinkedIn URL")
    .required("LinkedIn profile URL is required"),

  website: yup
    .string()
    .url("Enter a valid website URL")
    .required("Website URL is required"),
});

export const userFormDchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  role: yup
    .string()
    .min(2, "Role must be at least 2 characters")
    .max(50, "Role must not exceed 50 characters")
    .required("Role is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must not exceed 50 characters")
    .required("Password is required"),
});
