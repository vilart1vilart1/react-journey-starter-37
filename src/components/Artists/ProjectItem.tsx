import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Projet } from '@/types';

interface ProjectItemProps {
  project: Projet;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <Card className="relative p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{project.nom}</h3>
          <p className="text-sm text-gray-500">{project.description || 'No description'}</p>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{project.date_debut ? new Date(project.date_debut).toLocaleDateString() : 'No start date'}</span>
          </div>
        </div>
        <Badge variant="secondary">{project.statut}</Badge>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">Budget: {formatPrice(project.budget)}</p>
        </div>
        <Button size="sm">View Details</Button>
      </div>
    </Card>
  );
};

export default ProjectItem;
