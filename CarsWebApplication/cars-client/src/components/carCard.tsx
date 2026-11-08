import { Link } from 'react-router';
import type { Car } from '../models/Car';
import { useCarUiStore } from '../store/useCarUiStore';

interface CarCardProps {
  car: Car;
  onDelete: (id: string) => void;
}

export default function CarCard({ car, onDelete }: CarCardProps) {
  const isFavorite = useCarUiStore((state) =>
    state.favoriteCarIds.includes(car.id)
  );
  
  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);

  return (
    <li>
      <div>
        <strong>{car.brand} {car.model}</strong>
      </div>
      <div className="car-actions">
        <button
          type="button"
          className={isFavorite ? 'favorite-button active-favorite' : 'favorite-button'}
          onClick={() => toggleFavorite(car.id)}
        >
          {isFavorite ? 'Ulubiony' : 'Ulubione'}
        </button>

        <Link to={`/cars/${car.id}`}>
          <button>Szczegóły</button>
        </Link>
        <Link to={`/cars/${car.id}/edit`}>
          <button>Edytuj</button>
        </Link>
        <button className="danger" onClick={() => onDelete(car.id)}>
          Usuń
        </button>
      </div>
    </li>
  );
}