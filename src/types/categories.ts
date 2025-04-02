
export interface Category {
  id: string;
  name: string;
  entity_type: 'invoice' | 'file' | 'event' | 'task' | 'project';
  created_at?: string;
  user_id?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  category_id: string;
  created_at?: string;
  user_id?: string;
}

export interface EntityType {
  value: string;
  label: string;
  icon: string;
}

export const ENTITY_TYPES: EntityType[] = [
  { value: 'invoice', label: 'Factures/Devis', icon: 'receipt' },
  { value: 'file', label: 'Fichiers', icon: 'file' },
  { value: 'event', label: 'Événements', icon: 'calendar' },
  { value: 'task', label: 'Tâches', icon: 'check-square' },
  { value: 'project', label: 'Projets', icon: 'briefcase' }
];
