import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import type { Car } from '../models/Car';
import { getCarById } from '../services/carService';

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getCarById(id)
      .then(setCar)
      .catch(() => setError('Nie znaleziono samochodu.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Ładowanie szczegółów...</p>;
  if (error || !car) return <p>{error}</p>;

  return (
    <div>
      <h2>{car.brand} {car.model}</h2>
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