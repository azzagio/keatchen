'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Position {
  latitude: number;
  longitude: number;
}

interface LocationFilterProps {
  onLocationChange: (position: Position | null) => void;
  onRadiusChange: (radius: string) => void;
}

export const LocationFilter = ({
  onLocationChange,
  onRadiusChange,
}: LocationFilterProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPosition = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        onLocationChange(newPosition);
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground mb-1 block">Lieu</label>
      <Select
        defaultValue="nearby"
        onValueChange={(value) => onRadiusChange(value)}
      >
        <SelectTrigger className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset">
          <SelectValue placeholder="À proximité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nearby">À proximité</SelectItem>
          <SelectItem value="5">5 km</SelectItem>
          <SelectItem value="10">10 km</SelectItem>
          <SelectItem value="50">50 km</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
