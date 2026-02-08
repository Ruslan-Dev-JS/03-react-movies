import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  function action(formData: FormData) {
    const query = formData.get("query")?.toString().trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
  }

  return (
    <header className={css.header}>
      <div className={css.container}>
        <form className={css.form} action={action}>
          <input
            className={css.input}
            type="text"
            name="query"
            placeholder="Search movies..."
            autoComplete="off"
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
