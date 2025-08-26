'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MapPin, Star } from 'lucide-react';
import { LocationFilter } from '@/components/shared/LocationFilter';

const cooksData = [
  {
    id: '1',
    name: 'Chef Isabella Rossi',
    description: 'Pâtes italiennes authentiques et sauces maison.',
    cuisine: 'Italienne',
    type: 'Professionnel',
    rating: 4.9,
    image: 'https://placehold.co/600x400.png',
    status: 'Ouvert',
    dataAiHint: 'italian food',
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    id: '2',
    name: 'Marco Chen',
    description: 'Plats épicés du Sichuan qui réchaufferont votre âme.',
    cuisine: 'Chinoise',
    type: 'Particulier',
    rating: 4.7,
    image: 'https://placehold.co/600x400.png',
    status: 'Ouvert',
    dataAiHint: 'chinese food',
    latitude: 48.86,
    longitude: 2.36,
  },
  {
    id: '3',
    name: 'Aisha Jalloh',
    description: 'Ragoûts copieux d\'Afrique de l\'Ouest et poissons grillés.',
    cuisine: 'Africaine',
    type: 'Particulier',
    rating: 4.8,
    image: 'https://placehold.co/600x400.png',
    status: 'Fermé',
    dataAiHint: 'african food',
    latitude: 48.85,
    longitude: 2.34,
  },
  {
    id: '4',
    name: 'Le Coin du Boulanger',
    description: 'Pain frais, pâtisseries et gâteaux du jour.',
    cuisine: 'Boulangerie',
    type: 'Professionnel',
    rating: 5.0,
    image: 'https://placehold.co/600x400.png',
    status: 'Ouvert',
    dataAiHint: 'bakery goods',
    latitude: 48.87,
    longitude: 2.33,
  },
  {
    id: '5',
    name: 'Taco Fiesta',
    description: 'Tacos de rue mexicains authentiques et colorés.',
    cuisine: 'Mexicaine',
    type: 'Professionnel',
    rating: 4.6,
    image: 'https://placehold.co/600x400.png',
    status: 'Ouvert',
    dataAiHint: 'mexican food',
    latitude: 48.84,
    longitude: 2.35,
  },
  {
    id: '6',
    name: 'Sushi par Kenji',
    description: 'Plateaux de sushis et sashimis exquis et frais.',
    cuisine: 'Japonaise',
    type: 'Particulier',
    rating: 4.9,
    image: 'https://placehold.co/600x400.png',
    status: 'Ouvert',
    dataAiHint: 'japanese sushi',
    latitude: 48.88,
    longitude: 2.37,
  },
];

type Cook = (typeof cooksData)[0];

const CookCard = ({ cook }: { cook: Cook }) => (
  <Link href={`/cook/${cook.id}`} className="block group">
    <Card className="shadow-neumo-light dark:shadow-neumo-dark overflow-hidden transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <Image
          src={cook.image}
          alt={cook.name}
          width={600}
          height={400}
          className="aspect-video object-cover"
          data-ai-hint={cook.dataAiHint}
        />
         <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${cook.status === 'Ouvert' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {cook.status}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-headline truncate">{cook.name}</CardTitle>
        <CardDescription className="mt-1 text-sm truncate">{cook.description}</CardDescription>
        <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
          <span>{cook.cuisine}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary" fill="currentColor" />
            <span>{cook.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);


export default function Home() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [radius, setRadius] = useState<string>('nearby');
  const [cooks, setCooks] = useState<Cook[]>(cooksData);

  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (userLocation && radius !== 'nearby') {
      const numericRadius = parseInt(radius, 10);
      const filteredCooks = cooksData
        .map((cook) => ({
          ...cook,
          distance: haversineDistance(
            userLocation.latitude,
            userLocation.longitude,
            cook.latitude,
            cook.longitude
          ),
        }))
        .filter((cook) => cook.distance <= numericRadius)
        .sort((a, b) => a.distance - b.distance);
      setCooks(filteredCooks);
    } else {
      setCooks(cooksData);
    }
  }, [userLocation, radius]);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">Trouvez Votre Saveur</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Découvrez des cuisiniers amateurs et des chefs professionnels talentueux près de chez vous.
        </p>
      </section>

      <div className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 py-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <LocationFilter
            onLocationChange={setUserLocation}
            onRadiusChange={setRadius}
          />
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">Livraison / À emporter</label>
            <Select>
              <SelectTrigger className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset">
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="delivery">Livraison</SelectItem>
                <SelectItem value="takeout">À emporter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">Type de cuisinier</label>
            <Select>
              <SelectTrigger className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset">
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="individual">Particulier</SelectItem>
                <SelectItem value="professional">Professionnel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">Cuisine</label>
            <Select>
              <SelectTrigger className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset">
                <SelectValue placeholder="Toutes les cuisines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les cuisines</SelectItem>
                <SelectItem value="italian">Italienne</SelectItem>
                <SelectItem value="chinese">Chinoise</SelectItem>
                <SelectItem value="african">Africaine</SelectItem>
                <SelectItem value="bakery">Boulangerie</SelectItem>
                <SelectItem value="mexican">Mexicaine</SelectItem>
                <SelectItem value="japanese">Japonaise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cooks.map((cook) => (
          <CookCard key={cook.id} cook={cook} />
        ))}
      </div>
    </div>
  );
}
