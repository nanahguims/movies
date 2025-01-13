import { SearchBar } from "../search-bar/SearchBar";
import { useSearch } from "../../../utils/SearchContext";

export const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};
