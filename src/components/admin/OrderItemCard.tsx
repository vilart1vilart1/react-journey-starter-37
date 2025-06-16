
import { Button } from '@/components/ui/button';
import { Download, User } from 'lucide-react';
import { OrderItem } from '@/services/adminOrderService';

interface OrderItemCardProps {
  item: OrderItem;
  index: number;
}

const OrderItemCard = ({ item, index }: OrderItemCardProps) => {
  const handleDownloadPhoto = () => {
    if (item.child_photo) {
      const link = document.createElement('a');
      link.href = item.child_photo;
      link.download = `${item.child_name}_photo.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <p className="font-medium text-orange-900">{item.book_title}</p>
        </div>
        <p className="font-bold text-orange-900">€{Number(item.price || 0).toFixed(2)}</p>
      </div>
      
      <div className="flex gap-4">
        {/* Child Photo */}
        <div className="flex-shrink-0">
          {item.child_photo ? (
            <div className="relative group">
              <img 
                src={item.child_photo} 
                alt={`Photo de ${item.child_name}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-orange-300"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPhoto}
                className="absolute -bottom-2 -right-2 w-8 h-8 p-0 bg-white border-orange-300 hover:bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Télécharger la photo"
              >
                <Download className="h-3 w-3 text-orange-600" />
              </Button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-orange-200 border-2 border-orange-300 flex items-center justify-center">
              <User className="h-8 w-8 text-orange-500" />
            </div>
          )}
        </div>
        
        {/* Child Details */}
        <div className="flex-1 text-orange-700 text-sm">
          <p><strong>Enfant:</strong> {item.child_name} ({item.child_age} ans)</p>
          {item.child_objective && (
            <p><strong>Objectif:</strong> {item.child_objective}</p>
          )}
          {item.child_message && (
            <p><strong>Message:</strong> {item.child_message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
