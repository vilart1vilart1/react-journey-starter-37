import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Trash, 
  Plus, 
  CheckSquare,
  Briefcase, 
  MoreVertical, 
  Edit,
  ChevronDown,
  ChevronRight,
  CircleDollarSign
} from 'lucide-react';
import { Projet, ProjetTache } from '../../types';
import { getTaskStatusIcon } from './utils/taskUtils';

interface ProjectItemProps {
  projet: Projet;
  onAddTask: (project: Projet) => void;
  onDeleteProject: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ 
  projet, 
  onAddTask, 
  onDeleteProject, 
  onDeleteTask 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      onDeleteProject(id);
    }
  };

  const handleTaskDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      onDeleteTask(id);
    }
  };

  return (
    <div className="card rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button onClick={toggleExpansion}>
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          <Briefcase className="h-6 w-6 text-gold-400" />
          <h3 className="text-lg font-semibold">{projet.nom}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="btn-icon"
            onClick={() => onAddTask(projet)}
          >
            <Plus className="h-4 w-4" />
          </button>
          <button 
            className="btn-icon"
            onClick={() => handleDelete(projet.id)}
          >
            <Trash className="h-4 w-4 text-red-400" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-700">
          <div className="p-4">
            <p className="text-gray-400">{projet.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>
                  {projet.date_debut ? new Date(projet.date_debut).toLocaleDateString() : 'Non défini'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span>
                  {projet.date_fin ? new Date(projet.date_fin).toLocaleDateString() : 'Non défini'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CircleDollarSign className="h-4 w-4" />
                <span>{projet.budget}</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-700">
            <h4 className="text-md font-semibold mb-2">Tâches</h4>
            {projet.taches && projet.taches.length > 0 ? (
              <ul className="space-y-2">
                {projet.taches.map((tache) => {
                  const StatusIcon = getTaskStatusIcon(tache.statut);

                  return (
                    <li key={tache.id} className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <StatusIcon className="h-5 w-5 text-blue-400" />
                        <span>{tache.titre}</span>
                      </div>
                      <button 
                        className="btn-icon"
                        onClick={() => handleTaskDelete(tache.id)}
                      >
                        <Trash className="h-4 w-4 text-red-400" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-400">Aucune tâche pour ce projet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectItem;
