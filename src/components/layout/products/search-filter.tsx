import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface SearchFilterProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const SearchFilter = ({ onSearchChange, onCategoryChange, categories }: SearchFilterProps) => {
  return (
    <div className="flex justify-between flex-col sm:flex-row items-center mb-4 gap-3">
      <Input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="border px-4 py-2 rounded-md w-full mx-2"
      />
      <div className="w-full">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Select one" disabled>All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilter;
