import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { NewCar } from '../models/Car';
import { createCar } from '../services/carService';

export default function CreateCarPage() {
  const navigate = useNavigate();
  
  const [car, setCar] = useState<NewCar>({
    brand: '', model: '', doorsNumber: 0, luggageCapacity: 0,
    engineCapacity: 0, fuelType: 0, productionDate: '',
    averageFuelConsumption: 0, bodyType: 0
  });

  const today = new Date().toISOString().split('T')[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createCar(car);
      navigate('/cars');
    } catch (err) {
      alert('Błąd podczas zapisywania');
    }
  }

  return (
    <div className="card">
      <h2>Dodaj samochód</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Marka</label>
          <input value={car.brand} onChange={e => setCar({...car, brand: e.target.value})} required minLength={2} />
        </div>
        
        <div className="form-group">
          <label>Model</label>
          <input value={car.model} onChange={e => setCar({...car, model: e.target.value})} required minLength={2} />
        </div>

        <div className="form-group">
          <label>Liczba drzwi</label>
          
          <input type="number" value={car.doorsNumber || ''} onChange={e => setCar({...car, doorsNumber: Number(e.target.value)})} required min={2} max={7} />
        </div>

        <div className="form-group">
          <label>Bagażnik (litry)</label>
          <input type="number" value={car.luggageCapacity || ''} onChange={e => setCar({...car, luggageCapacity: Number(e.target.value)})} required min={1} />
        </div>

        <div className="form-group">
          <label>Silnik (cm3)</label>
          <input type="number" value={car.engineCapacity || ''} onChange={e => setCar({...car, engineCapacity: Number(e.target.value)})} required min={1} />
        </div>

        <div className="form-group">
          <label>Data produkcji</label>
          <input type="date" value={car.productionDate} max={today} onChange={e => setCar({...car, productionDate: e.target.value})} required />
        </div>

        <div className="form-group">
          <label>Spalanie (l/100km)</label>
          <input type="number" step="0.1" value={car.averageFuelConsumption || ''} onChange={e => setCar({...car, averageFuelConsumption: Number(e.target.value)})} required min={0.1} />
        </div>

        <div className="form-group">
          <label>Typ nadwozia (kod)</label>
          <input type="number" value={car.bodyType || ''} onChange={e => setCar({...car, bodyType: Number(e.target.value)})} required min={1} />
        </div>

        <div className="form-actions">
          <span></span>
          <button type="submit">Zapisz samochód</button>
        </div>
      </form>
    </div>
  );
}