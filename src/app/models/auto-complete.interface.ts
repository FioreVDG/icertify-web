export interface AUTO_COMPLETE_FIELDS {
  title: String;
  item: Array<AUTO_COMPLETE_ITEM_FIELD>;
}

export interface AUTO_COMPLETE_ITEM_FIELD {
  label: String;
  value?: String;
  sub_opt?: Array<any>;
}
