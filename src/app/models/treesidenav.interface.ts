export interface NavNode {
  label: string;
  icon: string;
  route?: string;
  children?: NavNode[];
  hasAccess: boolean;
  action?: string;
  css?: string;
  hidden?: boolean;
}
