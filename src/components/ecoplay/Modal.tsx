import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  illustration?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, illustration }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="glassmorphism rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-3xl animate-slideUp border border-white/20">
        <div className="flex items-center justify-between p-8 border-b border-white/10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{title}</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
          >
            <X size={28} className="text-gray-700" />
          </button>
        </div>
        
        {illustration ? (
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 p-8 flex items-center justify-center bg-gradient-to-br from-green-50/50 to-blue-50/50">
              {illustration}
            </div>
            <div className="lg:w-2/3 p-8">{children}</div>
          </div>
        ) : (
          <div className="p-8">{children}</div>
        )}
      </div>
    </div>
  );
};