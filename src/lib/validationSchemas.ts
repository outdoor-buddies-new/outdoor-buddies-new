import * as Yup from 'yup';
import { Commitment, Difficulty } from '@prisma/client';

export const AddGroupSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  image: Yup.string().required('Image is required'),
  members: Yup.number().positive().required('Number of People is required'),
  maxmembers: Yup.number().positive().nullable().notRequired()
    .transform((value, originalValue) =>
      originalValue === '' || isNaN(value) ? null : value
    )
    .test(
      'is-less-than-max',
      'Members cannot exceed max members',
      function (value) {
        const { members } = this.parent;
        // If maxmembers is empty/null, pass validation. Otherwise, check if members <= maxmembers
        if (value === null || value === undefined) return true;
        return members <= value;
      }
    ),
  intensity: Yup.mixed<Commitment>()
    .oneOf(['Casual', 'Sometimes_Casual', 'Moderate', 'Sometimes_Moderate', 'Serious'])
    .required('Commitment is required'),
  description: Yup.string().required(),
});

export type AddGroupFormData = Yup.InferType<typeof AddGroupSchema>;

export const EditGroupSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required('Name is required'),
  image: Yup.string().required('Image is required'),
  members: Yup.number().positive().required('Number of People is required'),
  maxmembers: Yup.number().positive().nullable().notRequired()
    .transform((value, originalValue) =>
      originalValue === '' || isNaN(value) ? null : value
    )
    .test(
      'is-less-than-max',
      'Members cannot exceed max members',
      function (value) {
        const { members } = this.parent;
        if (value === null || value === undefined) return true;
        return members <= value;
      }
    ),
  intensity: Yup.mixed<Commitment>()
    .oneOf(['Casual', 'Sometimes_Casual', 'Moderate', 'Sometimes_Moderate', 'Serious'])
    .required('Commitment is required'),
  description: Yup.string().required(),
});

export const AddProfileSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  image: Yup.string().required('Image is required'),
  summary: Yup.string().required('Status is required'),
  description: Yup.string().required('Description is required'),
  groupname: Yup.string().nullable().defined(),
  descimage: Yup.string().nullable().defined(),
});

export type AddProfileFormData = Yup.InferType<typeof AddProfileSchema>;

export const EditProfileSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required('Name is required'),
  image: Yup.string().required('Image is required'),
  summary: Yup.string().required('Status is required'),
  description: Yup.string().required('Description is required'),
  groupname: Yup.string().nullable().optional(),
  descimage: Yup.string().nullable().optional(),
});

export const AddNoteSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Post Content is required'),
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
