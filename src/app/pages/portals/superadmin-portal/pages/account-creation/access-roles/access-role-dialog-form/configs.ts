import { Section } from 'src/app/models/form.interface';

export const ROLE_FORM: Section[] = [
  {
    section: 'Role Details',
    show: false,
    items: [
      {
        label: 'Role Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
        fcname: 'name',
        show: true,
        default: '',
        path: 'name',
      },
      {
        label: 'Description',
        type: 'textarea',
        colspan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
        fcname: 'description',
        show: true,
        default: '',
        path: 'description',
      },
    ],
  },
];
