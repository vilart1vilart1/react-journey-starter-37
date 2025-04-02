import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { CategoriesService } from '@/services/categories.service';
import { Category, Subcategory } from '@/types/categories';
import { toast } from 'sonner';
import { SubcategoriesService } from '@/services/subcategories.service';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  const { toast } = useToast();
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
      toast({
        title: "Error!",
        description: "Failed to fetch categories",
        variant: "destructive",
      })
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const fetchedSubcategories = await SubcategoriesService.getAllSubcategories(categoryId, user?.id);
      setSubcategories(fetchedSubcategories);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
      toast({
        title: "Error!",
        description: "Failed to fetch subcategories",
        variant: "destructive",
      })
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
      toast({
        title: "Success!",
        description: "Category created successfully",
      })
    } catch (error) {
      console.error('Failed to create category:', error);
      toast({
        title: "Error!",
        description: "Failed to create category",
        variant: "destructive",
      })
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!user) return;
    try {
      await CategoriesService.deleteCategory(categoryId, user.id);
      setCategories(categories.filter(category => category.id !== categoryId));
      setSelectedCategory(null);
      setSubcategories([]);
      toast({
        title: "Success!",
        description: "Category deleted successfully",
      })
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast({
        title: "Error!",
        description: "Failed to delete category",
        variant: "destructive",
      })
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
      toast({
        title: "Success!",
        description: "Subcategory created successfully",
      })
    } catch (error) {
      console.error('Failed to create subcategory:', error);
      toast({
        title: "Error!",
        description: "Failed to create subcategory",
        variant: "destructive",
      })
    }
  };

  const handleDeleteSubcategory = async (subcategoryId: string) => {
    if (!selectedCategory || !user) return;
    try {
      await SubcategoriesService.deleteSubcategory(subcategoryId, user.id);
      setSubcategories(subcategories.filter(subcategory => subcategory.id !== subcategoryId));
      toast({
        title: "Success!",
        description: "Subcategory deleted successfully",
      })
    } catch (error) {
      console.error('Failed to delete subcategory:', error);
      toast({
        title: "Error!",
        description: "Failed to delete subcategory",
        variant: "destructive",
      })
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Category Management Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="flex items-center mb-2">
          <Input
            type="text"
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleCreateCategory}><Plus className="mr-2" />Create Category</Button>
        </div>
        <Table>
          <TableCaption>A list of your categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id} onClick={() => setSelectedCategory(category)} className={`cursor-pointer ${selectedCategory?.id === category.id ? 'bg-muted' : ''}`}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(category.id);
                  }}><Trash2 className="mr-2" />Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Subcategory Management Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-2">Subcategories</h2>
        <div className="flex items-center mb-2">
          <Input
            type="text"
            placeholder="New subcategory name"
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
            className="mr-2"
            disabled={!selectedCategory}
          />
          <Button onClick={handleCreateSubcategory} disabled={!selectedCategory}><Plus className="mr-2" />Create Subcategory</Button>
        </div>
        <Table>
          <TableCaption>A list of subcategories for the selected category.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subcategories.map((subcategory) => (
              <TableRow key={subcategory.id}>
                <TableCell className="font-medium">{subcategory.name}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSubcategory(subcategory.id);
                  }}><Trash2 className="mr-2" />Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryManager;
