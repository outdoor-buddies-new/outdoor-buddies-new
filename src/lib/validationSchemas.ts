import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddGroupSchema = Yup.object({
  name: Yup.string().required(),
  image: Yup.string().required(),
  members: Yup.number().positive().required(),
  maxmembers: Yup.number()
  .transform((value, originalValue) => (originalValue === '' ? null : value))
  .nullable().optional(),
  intensity: Yup.string().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});

export const AddProfileSchema = Yup.object({
  name: Yup.string().required(),
  image: Yup.string().required(),
  summary: Yup.string().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
  groupname: Yup.string().nullable(),
  descimage: Yup.string().nullable(),
});

export const EditProfileSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required(),
  image: Yup.string().required(),
  summary: Yup.string().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
  groupname: Yup.string().nullable(),
  descimage: Yup.string().nullable(),
});

export const AddEventSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date().required('Date is required'),
});

export const EditEventSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.string().required('Date is required'),
});