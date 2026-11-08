import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { NewCar } from '../models/Car';
import { getCarById, updateCar } from '../services/carService';
import axios from 'axios';

export default function EditCarPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<NewCar | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!id) return;
    
    const controller = new AbortController();

    async function loadCar() {
      try {
        const data = await getCarById(id as string, controller.signal);
        const { id: _, ...carData } = data; 
        setCar(carData);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        console.error('Błąd pobierania samochodu do edycji:', err);
      }
    }

    loadCar();

    return () => {
      controller.abort();
    };
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (id && car) {
      await updateCar(id, car);
      navigate(`/cars/${id}`);
    }
  }

  if (!car) return <div className="card"><p style={{textAlign: 'center'}}>Ładowanie formularza...</p></div>;

  return (
    <div className="card">
      <h2>Edytuj samochód</h2>
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
          <input type="number" value={car.doorsNumber} onChange={e => setCar({...car, doorsNumber: Number(e.target.value)})} required min={2} max={7} />
        </div>

        <div className="form-group">
          <label>Bagażnik (litry)</label>
          <input type="number" value={car.luggageCapacity} onChange={e => setCar({...car, luggageCapacity: Number(e.target.value)})} required min={1} />
        </div>

        <div className="form-group">
          <label>Silnik (cm3)</label>
          <input type="number" value={car.engineCapacity} onChange={e => setCar({...car, engineCapacity: Number(e.target.value)})} required min={1} />
        </div>

        <div className="form-group">
          <label>Data produkcji</label>
          <input type="date" value={car.productionDate} max={today} onChange={e => setCar({...car, productionDate: e.target.value})} required />
        </div>

        <div className="form-group">
          <label>Spalanie (l/100km)</label>
          <input type="number" step="0.1" value={car.averageFuelConsumption} onChange={e => setCar({...car, averageFuelConsumption: Number(e.target.value)})} required min={0.1} />
        </div>

        <div className="form-group">
          <label>Typ nadwozia (kod)</label>
          <input type="number" value={car.bodyType} onChange={e => setCar({...car, bodyType: Number(e.target.value)})} required min={1} />
        </div>

        <div className="form-actions">
          <span></span>
          <button type="submit">Zapisz zmiany</button>
        </div>
      </form>
    </div>
  );
}