export interface NavNode {
  label: String;
  icon: String;
  routeTo?: String;
  children?: NavNode[];
  hasAccess: Boolean;
  action?: String;
  css?: String;
  hidden?: Boolean;
}
