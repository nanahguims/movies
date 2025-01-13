import { SearchBar } from "../search-bar/SearchBar";
import { useSearch } from "../../../utils/SearchContext";
import "./styles.css";

export const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="header-container">
      <img src="./ghibli-logo.png" alt="logo" />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};
