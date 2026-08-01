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

export interface Profile {
  firstName: string;
  lastName: string;
  address: string;
  groupname : string;
  image: string;
  description: string;
}

export interface Groups {
  id : number;
  name : string;
  image: string;
  description: string;
  members: number;
}

export const AddGroupSchema = Yup.object({
  name: Yup.string().required(),
  image: Yup.string().required(),
  description: Yup.string().required(),
  members: Yup.number().positive().required(),
});

export const EditProfileSchema = Yup.object({
  name: Yup.string().required(),
  image: Yup.string().required(),
  description: Yup.string().required(),
  members: Yup.number().positive().required(),
});