import React from 'react';
import { File } from 'lucide-react';
import { File as FileType } from '@/types';
import { formatBytes } from '@/lib/utils';

interface DocumentsListProps {
  files: FileType[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({ files }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Documents</h3>
      {files.length > 0 ? (
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file.id} className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              <div className="flex items-center">
                <File className="w-5 h-5 mr-2 text-gray-600" />
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {file.name}
                </a>
              </div>
              <span className="text-sm text-gray-500">{formatBytes(parseInt(file.size))}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No documents uploaded yet.</p>
      )}
    </div>
  );
};

export default DocumentsList;
