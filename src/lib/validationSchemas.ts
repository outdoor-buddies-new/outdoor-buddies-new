import * as Yup from 'yup';
import { Commitment, Difficulty } from '@prisma/client';

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
    .nullable()
    .notRequired(),
  intensity: Yup.mixed<Commitment>()
    .oneOf(['Casual', 'Sometimes_Casual', 'Moderate', 'Sometimes_Moderate', 'Serious'])
    .required('Commitment is required'),
  description: Yup.string().required(),
});

//export type AddGroupFormData = Yup.InferType<typeof AddGroupSchema>;

export interface AddGroupFormData {
  name: string;
  image: string;
  members: number;
  maxmembers?: number | null;
  intensity: Commitment;
  description: string;
}

export const EditGroupSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required(),
  image: Yup.string().required(),
  members: Yup.number().positive().required(),
  maxmembers: Yup.number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .nullable()
    .notRequired(),
  intensity: Yup.mixed<Commitment>()
    .oneOf(['Casual', 'Sometimes_Casual', 'Moderate', 'Sometimes_Moderate', 'Serious'])
    .required('Commitment is required'),
  description: Yup.string().nullable().optional(),
});

export const AddProfileSchema = Yup.object({
  name: Yup.string().required(),
  image: Yup.string().required(),
  summary: Yup.string().required(),
  description: Yup.string().required(),
  groupname: Yup.string().nullable().defined(),
  descimage: Yup.string().nullable().defined(),
});

export type AddProfileFormData = Yup.InferType<typeof AddProfileSchema>;

export const EditProfileSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required(),
  image: Yup.string().required(),
  summary: Yup.string().required(),
  description: Yup.string().required(),
  groupname: Yup.string().nullable().optional(),
  descimage: Yup.string().nullable().optional(),
});

export const AddNoteSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  groupId: Yup.string().required(),
});

export type AddPostFormData = Yup.InferType<typeof AddNoteSchema>;


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

export const AddHikeSchema = Yup.object({
  name: Yup.string().required('Hike Name is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Description is required'),
  difficulty: Yup.mixed<Difficulty>().oneOf(Object.values(Difficulty)).required('Difficulty is required'),
  distance: Yup.number().positive().required('Distance is required'),
  image: Yup.string().required('Image is required'),
});

export const EditHikeSchema = Yup.object({
  name: Yup.string().required('Hike Name is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Description is required'),
  difficulty: Yup.mixed<Difficulty>().oneOf(Object.values(Difficulty)).required('Difficulty is required'),
  distance: Yup.number().positive().required('Distance is required'),
  image: Yup.string().required('Image is required'),
});
