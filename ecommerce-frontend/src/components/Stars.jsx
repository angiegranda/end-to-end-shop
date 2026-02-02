import './Stars.css';

const DEFAULT_COUNT = 5;

export function Stars({ rating = 0, starSize = 16 }) {
  return (
    <div className="stars-container">
      {
        // The spread operator creates iterable slots undefined [undefined, undefined, undefined]
        // while using Array(DEFAULT_COUNT).map() wont work because
        // Array(DEFAULT_COUNT) returns an array with empty elems [,,,]
        [...Array(DEFAULT_COUNT)].map((_, index) => {
            const starValue = index + 1; 
            let starClass = "star empty";


            if (rating >= starValue) {
                starClass = "star full";
            }
            else if (rating >= starValue - 0.5) {
                starClass = "star half";
            }

            return (
            <span
                key={index}
                className={starClass}
                style={{ fontSize: `${starSize}px` }}
            >
                ★
            </span>
            );
        })
      }
    </div>
  );
}
