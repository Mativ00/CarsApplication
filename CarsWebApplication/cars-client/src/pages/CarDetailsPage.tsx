import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import type { Car } from '../models/Car';
import { getCarById } from '../services/carService';
import { useCarUiStore } from '../store/useCarUiStore';
import axios from 'axios';

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);
  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);

  const isFavorite = car ? favoriteCarIds.includes(car.id) : false;

  useEffect(() => {
    if (!id) return;
    
    const controller = new AbortController();
    setLoading(true);
    
    getCarById(id, controller.signal)
      .then(setCar)
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError('Nie znaleziono samochodu.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) return <p>Ładowanie szczegółów...</p>;
  if (error || !car) return <p>{error}</p>;

  return (
    <div>
      <h2>{car.brand} {car.model}</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <button
          type="button"
          className={isFavorite ? 'favorite-button active-favorite' : 'favorite-button'}
          onClick={() => toggleFavorite(car.id)}
        >
          {isFavorite ? 'Ulubiony' : 'Ulubione'}
        </button>
      </div>

      <ul>
        <li>Liczba drzwi: {car.doorsNumber}</li>
        <li>Pojemność bagażnika: {car.luggageCapacity} l</li>
        <li>Pojemność silnika: {car.engineCapacity} cm3</li>
        <li>Rodzaj paliwa: {car.fuelType}</li>
        <li>Data produkcji: {car.productionDate}</li>
        <li>Średnie spalanie: {car.averageFuelConsumption} l/100km</li>
        <li>Typ nadwozia: {car.bodyType}</li>
      </ul>
      <Link to="/cars"><button>Powrót do listy</button></Link>
    </div>
  );
}