import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

// modalRoot має бути в index.html на рівні <body>
const modalRoot = document.getElementById("modal-root")!;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // Обробка ESC і заборона скролу тіла
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden"; // блокуємо скрол
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = ""; // відновлюємо скрол
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Закриття при кліку на backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick} // клік по заднику закриває
    >
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()} // зупиняємо спливання
      >
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose} // кнопка закриває
        >
          &times;
        </button>

        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
