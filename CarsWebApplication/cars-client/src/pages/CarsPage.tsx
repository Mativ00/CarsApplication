import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Car } from '../models/Car';
import { getCars, deleteCar } from '../services/carService';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedBrand, setSelectedBrand] = useState('');

  async function loadCars() {
    try {
      setLoading(true);
      const data = await getCars();
      setCars(data);
    } catch (err) {
      setError('Błąd pobierania danych.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCars();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Czy na pewno chcesz usunąć ten samochód?');
    if (!confirmed) return;

    try {
      await deleteCar(id);
      await loadCars();
    } catch (err) {
      alert('Nie udało się usunąć samochodu.');
    }
  }

  if (loading) return <p style={{textAlign: 'center'}}>Ładowanie samochodów...</p>;
  if (error) return <p style={{textAlign: 'center', color: '#da3633'}}>{error}</p>;

  const uniqueBrands = Array.from(new Set(cars.map(car => car.brand)));

  const filteredCars = selectedBrand 
    ? cars.filter(car => car.brand === selectedBrand)
    : cars;

  return (
    <div className="card" style={{ maxWidth: '800px', padding: '1.5rem', background: 'transparent', border: 'none' }}>
      <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        Lista samochodów
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '4px',
            border: '1px solid #444',
            backgroundColor: '#0d1117',
            color: '#fff',
            fontSize: '1rem',
            minWidth: '250px',
            cursor: 'pointer'
          }}
        >
          <option value="">Pokaż wszystkie marki</option>
          {uniqueBrands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {cars.length === 0 ? (
        <p style={{textAlign: 'center'}}>Brak samochodów w bazie.</p>
      ) : filteredCars.length === 0 ? (
        <p style={{textAlign: 'center'}}>Brak samochodów tej marki.</p>
      ) : (
        <ul className="car-list">
          {filteredCars.map((car) => (
            <li key={car.id}>
              <div>
                <strong>{car.brand} {car.model}</strong>
              </div>
              <div className="car-actions">
                <Link to={`/cars/${car.id}`}><button>Szczegóły</button></Link>
                <Link to={`/cars/${car.id}/edit`}><button>Edytuj</button></Link>
                <button className="danger" onClick={() => handleDelete(car.id)}>Usuń</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}