import { Link } from 'react-router';
import type { Car } from '../models/Car';
import { useCarUiStore } from '../store/useCarUiStore';
import { useAuthStore } from '../store/useAuthStore'; // DODANO

interface CarCardProps {
  car: Car;
  onDelete: (id: string) => void;
}

export default function CarCard({ car, onDelete }: CarCardProps) {
  const user = useAuthStore((state) => state.user);

  const favoriteCarIdsByUser = useCarUiStore((state) => state.favoriteCarIdsByUser);
  const favoriteCarIds = user ? favoriteCarIdsByUser[user.id] ?? [] : [];
  const isFavorite = favoriteCarIds.includes(car.id);
  
  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);

  const isAdmin = user?.roles.includes('Admin') ?? false;

  return (
    <li>
      <div>
        <strong>{car.brand} {car.model}</strong>
      </div>
      <div className="car-actions">
        <button
          type="button"
          className={isFavorite ? 'favorite-button active-favorite' : 'favorite-button'}
          onClick={() => {
            if (user) {
              toggleFavorite(user.id, car.id);
            }
          }}
        >
          {isFavorite ? 'Ulubiony' : 'Ulubione'}
        </button>

        <Link to={`/cars/${car.id}`}>
          <button>Szczegóły</button>
        </Link>
        <Link to={`/cars/${car.id}/edit`}>
          <button>Edytuj</button>
        </Link>

        {isAdmin && (
          <button className="danger" onClick={() => onDelete(car.id)}>
            Usuń
          </button>
        )}
      </div>
    </li>
  );
}