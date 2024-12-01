import React from 'react';
import { Hash } from 'lucide-react';

interface CategoryBadgeProps {
    category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
    const getCategoryStyles = () => {
        switch (category) {
            case 'tech':
                return 'bg-blue-900/30 text-blue-200 border-blue-700/50';
            case 'design':
                return 'bg-purple-900/30 text-purple-200 border-purple-700/50';
            case 'business':
                return 'bg-green-900/30 text-green-200 border-green-700/50';
            default:
                return 'bg-zinc-800/30 text-zinc-200 border-zinc-700/50';
        }
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryStyles()}`}>
            <Hash className="w-3 h-3 mr-1" />
            {category}
        </span>
    );
};

export default CategoryBadge;