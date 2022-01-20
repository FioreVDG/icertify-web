import { Column } from 'src/app/models/column.interface';
import { Populate } from 'src/app/models/queryparams.interface';
import { NavNode } from 'src/app/models/treesidenav.interface';

export const ROLE_TABLE: Column[] = [
  {
    title: 'Role Name',
    breakpoint: 'sm',
    path: 'name',
    type: 'text',
    selected: true,
  },
  {
    title: 'Description',
    breakpoint: 'xs',
    path: 'description',
    type: 'text',
    selected: true,
  },
  {
    title: 'Status',
    breakpoint: 'xs',
    path: 'status',
    type: 'text',
    selected: true,
    textColor: [
      {
        value: 'Active',
        color: '#83b9a1' || 'green',
      },
      {
        value: 'Completed',
        color: '#83b9a1' || 'green',
      },
      {
        value: 'Todo',
        color: '#fbcb51' || 'yellow',
      },
      {
        value: 'Suspended',
        color: '#e58086' || 'red',
      },
      {
        value: 'Declined',
        color: '#e58086' || 'red',
      },
    ],
  },
  {
    title: 'Created By',
    breakpoint: 'xs',
    path: '_createdBy',
    paths: ['_createdBy.firstName', '_createdBy.lastName'],
    type: 'special',
    selected: true,
  },
  {
    title: 'Users Count',
    breakpoint: 'xs',
    path: 'accessCount',
    type: 'text',
    selected: true,
  },
];

export const ROLE_OPTIONS: NavNode[] = [
  {
    action: 'add',
    label: 'Add Role',
    icon: 'add',
    css: '',
    hasAccess: false,
    hidden: true,
  },
  {
    action: 'update',
    label: 'View/Manage Role Details',
    icon: 'edit',
    css: '',
    hasAccess: false,
  },
  {
    action: 'delete',
    label: 'Delete Role',
    icon: 'delete',
    css: 'bsDanger',
    hasAccess: false,
  },
];

export const ROLE_POPULATES: Populate[] = [
  {
    field: '_createdBy',
    select: 'firstName,lastName',
  },
];
