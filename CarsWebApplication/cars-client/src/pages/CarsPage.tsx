import { useEffect, useState } from 'react';
import type { Car } from '../models/Car';
import { getCars, deleteCar } from '../services/carService';
import axios from 'axios';
import { useCarUiStore } from '../store/useCarUiStore';
import CarCard from '../components/carCard';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchTerm = useCarUiStore((state) => state.searchTerm);
  const setSearchTerm = useCarUiStore((state) => state.setSearchTerm);
  const showFavoritesOnly = useCarUiStore((state) => state.showFavoritesOnly);
  const setShowFavoritesOnly = useCarUiStore((state) => state.setShowFavoritesOnly);
  const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);
  const removeFavorite = useCarUiStore((state) => state.removeFavorite);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCars() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCars(controller.signal);
        setCars(data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Błąd pobierania danych.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCars();
    return () => controller.abort();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Czy na pewno chcesz usunąć ten samochód?');
    if (!confirmed) return;

    try {
      await deleteCar(id);
      removeFavorite(id);
      setCars((currentCars) => currentCars.filter((car) => car.id !== id));
    } catch (err) {
      alert('Nie udało się usunąć samochodu.');
    }
  }

  if (loading) return <p style={{textAlign: 'center'}}>Ładowanie samochodów...</p>;
  if (error) return <p style={{textAlign: 'center', color: '#da3633'}}>{error}</p>;

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(normalizedSearch) ||
      car.model.toLowerCase().includes(normalizedSearch);

    const matchesFavorite = !showFavoritesOnly || favoriteCarIds.includes(car.id);

    return matchesSearch && matchesFavorite;
  });

  return (
    <div className="card" style={{ maxWidth: '800px', padding: '1.5rem', background: 'transparent', border: 'none' }}>
      <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        Lista samochodów
      </h2>

      <div className="cars-toolbar">
        <input
          value={searchTerm}
          type="search"
          placeholder="Szukaj po marce lub modelu..."
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <label className="favorite-filter">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(event) => setShowFavoritesOnly(event.target.checked)}
          />
          Tylko ulubione
        </label>
      </div>

      {cars.length === 0 ? (
        <p style={{textAlign: 'center'}}>Brak samochodów w bazie.</p>
      ) : visibleCars.length === 0 ? (
        <p style={{textAlign: 'center'}}>Brak wyników wyszukiwania.</p>
      ) : (
        <ul className="car-list">
          {visibleCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}