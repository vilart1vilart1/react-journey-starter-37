
import { CheckCircle, Circle, Clock } from 'lucide-react';

// Helper function to get the appropriate icon for a task status
export const getTaskStatusIcon = (status: string) => {
  switch (status) {
    case 'terminé':
      return CheckCircle;
    case 'en_cours':
      return Clock;
    case 'à_faire':
    default:
      return Circle;
  }
};
