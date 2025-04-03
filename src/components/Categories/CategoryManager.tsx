
import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CategoriesService } from '@/services/categories.service';
import { Category, Subcategory } from '@/types/categories';
import { toast } from 'sonner';
import { SubcategoriesService } from '@/services/subcategories.service';
import { useAuth } from '@/hooks/useAuth';

interface CategoryManagerProps {
  entityType: string;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ entityType }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetchCategories();
  }, [entityType, user]);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory.id);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    if (!user) return;
    try {
      const fetchedCategories = await CategoriesService.getAllCategories(user.id, entityType);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error("Failed to fetch categories");
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const fetchedSubcategories = await SubcategoriesService.getAllSubcategories(categoryId, user?.id);
      setSubcategories(fetchedSubcategories);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
      toast.error("Failed to fetch subcategories");
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    if (!user) return;

    try {
      await CategoriesService.createCategory({
        name: newCategoryName,
        entity_type: entityType,
        user_id: user.id,
      });
      setNewCategoryName('');
      fetchCategories();
      toast.success("Category created successfully");
    } catch (error) {
      console.error('Failed to create category:', error);
      toast.error("Failed to create category");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!user) return;
    try {
      await CategoriesService.deleteCategory(categoryId, user.id);
      setCategories(categories.filter(category => category.id !== categoryId));
      setSelectedCategory(null);
      setSubcategories([]);
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error("Failed to delete category");
    }
  };

  const handleCreateSubcategory = async () => {
    if (!newSubcategoryName.trim() || !selectedCategory) return;
    if (!user) return;

    try {
      await SubcategoriesService.createSubcategory({
        name: newSubcategoryName,
        category_id: selectedCategory.id,
        user_id: user.id,
      });
      setNewSubcategoryName('');
      fetchSubcategories(selectedCategory.id);
      toast.success("Subcategory created successfully");
    } catch (error) {
      console.error('Failed to create subcategory:', error);
      toast.error("Failed to create subcategory");
    }
  };

  const handleDeleteSubcategory = async (subcategoryId: string) => {
    if (!selectedCategory || !user) return;
    try {
      await SubcategoriesService.deleteSubcategory(subcategoryId, user.id);
      setSubcategories(subcategories.filter(subcategory => subcategory.id !== subcategoryId));
      toast.success("Subcategory deleted successfully");
    } catch (error) {
      console.error('Failed to delete subcategory:', error);
      toast.error("Failed to delete subcategory");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Category Management Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="mr-2 px-3 py-2 border border-gray-300 rounded-md w-full"
          />
          <button 
            onClick={handleCreateCategory}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />Create Category
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <caption className="text-sm text-gray-500 my-2">A list of your categories.</caption>
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr 
                  key={category.id} 
                  onClick={() => setSelectedCategory(category)} 
                  className={`cursor-pointer ${selectedCategory?.id === category.id ? 'bg-gray-100' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      className="flex items-center text-red-600 hover:text-red-900" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.id);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subcategory Management Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-2">Subcategories</h2>
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="New subcategory name"
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
            className="mr-2 px-3 py-2 border border-gray-300 rounded-md w-full"
            disabled={!selectedCategory}
          />
          <button 
            onClick={handleCreateSubcategory} 
            disabled={!selectedCategory}
            className={`flex items-center px-4 py-2 rounded ${!selectedCategory ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            <Plus className="mr-2 h-4 w-4" />Create Subcategory
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <caption className="text-sm text-gray-500 my-2">A list of subcategories for the selected category.</caption>
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subcategories.map((subcategory) => (
                <tr key={subcategory.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subcategory.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      className="flex items-center text-red-600 hover:text-red-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSubcategory(subcategory.id);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
