
export interface Category {
  id: string;
  name: string;
  entity_type: string;
  user_id: string;
  created_at?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  category_id: string;
  user_id: string;
  created_at?: string;
}
