
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gradient-to-b from-gray-800 to-gray-800/70 border border-gray-700/50 rounded-xl p-4 mb-4 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
