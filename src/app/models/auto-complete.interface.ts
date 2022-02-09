export interface AUTO_COMPLETE_FIELDS {
  title: String;
  item: Array<AUTO_COMPLETE_ITEM_FIELD>;
}

export interface AUTO_COMPLETE_ITEM_FIELD {
  label?: String;
  value?: VALUE_ITEM_FIELD;
  sub_opt?: Array<any>;
}
export interface VALUE_ITEM_FIELD {
  name: string;
  obj?: object;
  id?: string;
}
