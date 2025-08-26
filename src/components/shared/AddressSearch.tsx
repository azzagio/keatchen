"use client";

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface Suggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface AddressSearchProps {
  onLocationSelect: (location: { address: string; lat: number; lon: number }) => void;
}

// Debounce function
const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

export const AddressSearch = ({ onLocationSelect }: AddressSearchProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchSuggestions, 500), []);

  useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);

  const handleSelect = (suggestion: Suggestion) => {
    const location = {
      address: suggestion.display_name,
      lat: parseFloat(suggestion.lat),
      lon: parseFloat(suggestion.lon),
    };
    setQuery(location.address);
    setSuggestions([]);
    onLocationSelect(location);
  };

  return (
    <div className="relative space-y-2">
      <Label htmlFor="address">Adresse Principale</Label>
      <Input
        id="address"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Commencez à taper votre adresse..."
        autoComplete="off"
        className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset"
      />
       <p className="text-xs text-muted-foreground">Votre adresse précise ne sera pas montrée publiquement.</p>
      {loading && <p className="text-xs text-muted-foreground">Recherche...</p>}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-accent flex items-start"
            >
              <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm">{suggestion.display_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
