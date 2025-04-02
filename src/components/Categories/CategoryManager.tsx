
import React, { useState, useEffect } from 'react';
import { Folder, FolderPlus, Edit, Trash2, Plus, Check, X, ChevronRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoriesService } from '../../services';
import { Category, Subcategory, ENTITY_TYPES } from '../../types/categories';

interface CategoryManagerProps {
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ onError, onSuccess }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<{[key: string]: Subcategory[]}>({});
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    entity_type: 'invoice'
  });
  
  const [newSubcategory, setNewSubcategory] = useState<{
    name: string;
    categoryId: string | null;
  }>({
    name: '',
    categoryId: null
  });
  
  const [editingCategory, setEditingCategory] = useState<{
    id: string | null;
    name: string;
  }>({
    id: null,
    name: ''
  });
  
  const [editingSubcategory, setEditingSubcategory] = useState<{
    id: string | null;
    name: string;
  }>({
    id: null,
    name: ''
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await CategoriesService.getAllCategories();
      setCategories(data || []);
      
      // Initialize expanded state for all categories
      const expanded: {[key: string]: boolean} = {};
      data.forEach((cat: Category) => {
        expanded[cat.id] = false;
      });
      setExpandedCategories(expanded);
      
    } catch (error) {
      console.error('Error loading categories:', error);
      onError('Erreur lors du chargement des catégories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.entity_type) {
      onError('Veuillez fournir un nom et un type pour la catégorie');
      return;
    }

    setIsLoading(true);
    try {
      await CategoriesService.createCategory(newCategory as Category);
      setNewCategory({ name: '', entity_type: 'invoice' });
      await loadCategories();
      onSuccess('Catégorie ajoutée avec succès');
    } catch (error) {
      console.error('Error adding category:', error);
      onError('Erreur lors de l\'ajout de la catégorie');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCategory = async (id: string) => {
    if (editingCategory.id === id) {
      // Save the edit
      if (!editingCategory.name) {
        onError('Le nom de la catégorie ne peut pas être vide');
        return;
      }
      
      setIsLoading(true);
      try {
        const categoryToUpdate = categories.find(c => c.id === id);
        if (categoryToUpdate) {
          await CategoriesService.updateCategory({
            ...categoryToUpdate,
            name: editingCategory.name
          });
          await loadCategories();
          onSuccess('Catégorie mise à jour avec succès');
        }
      } catch (error) {
        console.error('Error updating category:', error);
        onError('Erreur lors de la mise à jour de la catégorie');
      } finally {
        setEditingCategory({ id: null, name: '' });
        setIsLoading(false);
      }
    } else {
      // Start editing
      const category = categories.find(c => c.id === id);
      if (category) {
        setEditingCategory({ id, name: category.name });
      }
    }
  };

  const handleCancelEditCategory = () => {
    setEditingCategory({ id: null, name: '' });
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie? Toutes les sous-catégories associées seront également supprimées.')) {
      setIsLoading(true);
      try {
        await CategoriesService.deleteCategory(id);
        await loadCategories();
        onSuccess('Catégorie supprimée avec succès');
      } catch (error) {
        console.error('Error deleting category:', error);
        onError('Erreur lors de la suppression de la catégorie');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleCategoryExpansion = async (categoryId: string) => {
    const newExpandedState = { ...expandedCategories };
    newExpandedState[categoryId] = !newExpandedState[categoryId];
    setExpandedCategories(newExpandedState);
    
    // Load subcategories if expanding and not already loaded
    if (newExpandedState[categoryId] && (!subcategories[categoryId] || subcategories[categoryId].length === 0)) {
      try {
        const data = await CategoriesService.getSubcategories(categoryId);
        setSubcategories(prev => ({
          ...prev,
          [categoryId]: data || []
        }));
      } catch (error) {
        console.error('Error loading subcategories:', error);
        onError('Erreur lors du chargement des sous-catégories');
      }
    }
  };

  const handleAddSubcategory = async () => {
    if (!newSubcategory.name || !newSubcategory.categoryId) {
      onError('Veuillez fournir un nom et sélectionner une catégorie');
      return;
    }

    setIsLoading(true);
    try {
      await CategoriesService.createSubcategory({
        name: newSubcategory.name,
        category_id: newSubcategory.categoryId
      } as Subcategory);
      
      // Refresh subcategories for this category
      const data = await CategoriesService.getSubcategories(newSubcategory.categoryId);
      setSubcategories(prev => ({
        ...prev,
        [newSubcategory.categoryId!]: data || []
      }));
      
      setNewSubcategory({ name: '', categoryId: null });
      onSuccess('Sous-catégorie ajoutée avec succès');
    } catch (error) {
      console.error('Error adding subcategory:', error);
      onError('Erreur lors de l\'ajout de la sous-catégorie');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubcategory = async (id: string, categoryId: string) => {
    if (editingSubcategory.id === id) {
      // Save the edit
      if (!editingSubcategory.name) {
        onError('Le nom de la sous-catégorie ne peut pas être vide');
        return;
      }
      
      setIsLoading(true);
      try {
        const subcategoryToUpdate = subcategories[categoryId]?.find(sc => sc.id === id);
        if (subcategoryToUpdate) {
          await CategoriesService.updateSubcategory({
            ...subcategoryToUpdate,
            name: editingSubcategory.name
          });
          
          // Refresh subcategories for this category
          const data = await CategoriesService.getSubcategories(categoryId);
          setSubcategories(prev => ({
            ...prev,
            [categoryId]: data || []
          }));
          
          onSuccess('Sous-catégorie mise à jour avec succès');
        }
      } catch (error) {
        console.error('Error updating subcategory:', error);
        onError('Erreur lors de la mise à jour de la sous-catégorie');
      } finally {
        setEditingSubcategory({ id: null, name: '' });
        setIsLoading(false);
      }
    } else {
      // Start editing
      const subcategory = subcategories[categoryId]?.find(sc => sc.id === id);
      if (subcategory) {
        setEditingSubcategory({ id, name: subcategory.name });
      }
    }
  };

  const handleCancelEditSubcategory = () => {
    setEditingSubcategory({ id: null, name: '' });
  };

  const handleDeleteSubcategory = async (id: string, categoryId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette sous-catégorie?')) {
      setIsLoading(true);
      try {
        await CategoriesService.deleteSubcategory(id);
        
        // Refresh subcategories for this category
        const data = await CategoriesService.getSubcategories(categoryId);
        setSubcategories(prev => ({
          ...prev,
          [categoryId]: data || []
        }));
        
        onSuccess('Sous-catégorie supprimée avec succès');
      } catch (error) {
        console.error('Error deleting subcategory:', error);
        onError('Erreur lors de la suppression de la sous-catégorie');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getCategoryIcon = (entityType: string) => {
    const entity = ENTITY_TYPES.find(et => et.value === entityType);
    return entity?.icon || 'folder';
  };

  const getEntityTypeLabel = (entityType: string) => {
    const entity = ENTITY_TYPES.find(et => et.value === entityType);
    return entity?.label || entityType;
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Gestion des catégories</h2>
        
        <div className="mb-6 p-4 bg-gray-700/30 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Ajouter une nouvelle catégorie</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Nom
              </label>
              <input
                type="text"
                className="input w-full"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Nom de la catégorie"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Type d'entité
              </label>
              <select
                className="input w-full"
                value={newCategory.entity_type}
                onChange={(e) => setNewCategory({ ...newCategory, entity_type: e.target.value })}
              >
                {ENTITY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="btn-primary h-[42px]"
                onClick={handleAddCategory}
                disabled={isLoading}
              >
                <FolderPlus className="h-5 w-5 mr-2" />
                Ajouter
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-700/30 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Ajouter une nouvelle sous-catégorie</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Nom
              </label>
              <input
                type="text"
                className="input w-full"
                value={newSubcategory.name}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                placeholder="Nom de la sous-catégorie"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Catégorie parente
              </label>
              <select
                className="input w-full"
                value={newSubcategory.categoryId || ''}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, categoryId: e.target.value || null })}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({getEntityTypeLabel(category.entity_type)})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="btn-primary h-[42px]"
                onClick={handleAddSubcategory}
                disabled={isLoading}
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Catégories existantes</h3>
          
          {isLoading && categories.length === 0 ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-300 mx-auto"></div>
              <p className="mt-2 text-gray-400">Chargement des catégories...</p>
            </div>
          ) : categories.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Aucune catégorie trouvée</p>
          ) : (
            <ul className="divide-y divide-gray-700">
              {ENTITY_TYPES.map(entityType => {
                const entityCategories = categories.filter(c => c.entity_type === entityType.value);
                
                if (entityCategories.length === 0) return null;
                
                return (
                  <li key={entityType.value} className="py-4">
                    <h4 className="text-base font-medium text-gold-400 mb-2">{entityType.label}</h4>
                    <ul className="space-y-2 pl-4">
                      {entityCategories.map(category => (
                        <li key={category.id} className="rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg">
                            <div 
                              className="flex items-center cursor-pointer"
                              onClick={() => toggleCategoryExpansion(category.id)}
                            >
                              {expandedCategories[category.id] ? (
                                <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                              )}
                              <Folder className="h-5 w-5 text-gold-400 mr-2" />
                              
                              {editingCategory.id === category.id ? (
                                <input
                                  type="text"
                                  className="input px-2 py-1 text-sm"
                                  value={editingCategory.name}
                                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                  autoFocus
                                />
                              ) : (
                                <span>{category.name}</span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {editingCategory.id === category.id ? (
                                <>
                                  <button
                                    onClick={() => handleEditCategory(category.id)}
                                    className="text-green-500 hover:text-green-400"
                                    disabled={isLoading}
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={handleCancelEditCategory}
                                    className="text-red-500 hover:text-red-400"
                                    disabled={isLoading}
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleEditCategory(category.id)}
                                    className="text-blue-400 hover:text-blue-300"
                                    disabled={isLoading}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="text-red-400 hover:text-red-300"
                                    disabled={isLoading}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {expandedCategories[category.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-8 pr-2 py-2 bg-gray-800/50 rounded-b-lg border-l border-gray-700"
                            >
                              {subcategories[category.id]?.length > 0 ? (
                                <ul className="space-y-2">
                                  {subcategories[category.id].map(subcategory => (
                                    <li key={subcategory.id} className="flex items-center justify-between p-2 bg-gray-700/20 rounded">
                                      <div className="flex items-center">
                                        <div className="h-2 w-2 bg-gray-400 rounded-full mr-3"></div>
                                        
                                        {editingSubcategory.id === subcategory.id ? (
                                          <input
                                            type="text"
                                            className="input px-2 py-1 text-sm"
                                            value={editingSubcategory.name}
                                            onChange={(e) => setEditingSubcategory({ ...editingSubcategory, name: e.target.value })}
                                            autoFocus
                                          />
                                        ) : (
                                          <span className="text-sm">{subcategory.name}</span>
                                        )}
                                      </div>
                                      
                                      <div className="flex items-center space-x-2">
                                        {editingSubcategory.id === subcategory.id ? (
                                          <>
                                            <button
                                              onClick={() => handleEditSubcategory(subcategory.id, category.id)}
                                              className="text-green-500 hover:text-green-400"
                                              disabled={isLoading}
                                            >
                                              <Check className="h-3 w-3" />
                                            </button>
                                            <button
                                              onClick={handleCancelEditSubcategory}
                                              className="text-red-500 hover:text-red-400"
                                              disabled={isLoading}
                                            >
                                              <X className="h-3 w-3" />
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              onClick={() => handleEditSubcategory(subcategory.id, category.id)}
                                              className="text-blue-400 hover:text-blue-300"
                                              disabled={isLoading}
                                            >
                                              <Edit className="h-3 w-3" />
                                            </button>
                                            <button
                                              onClick={() => handleDeleteSubcategory(subcategory.id, category.id)}
                                              className="text-red-400 hover:text-red-300"
                                              disabled={isLoading}
                                            >
                                              <Trash2 className="h-3 w-3" />
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-gray-400 text-sm py-2">Aucune sous-catégorie</p>
                              )}
                            </motion.div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
