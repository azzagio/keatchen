'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type Cook = {
  id: string;
  publicName: string;
  bio: string;
  specialties: string;
  cookType: string;
  rating?: number;
  profilePicture: string;
  status?: string;
  dataAiHint?: string;
  location: {
    lat: number;
    lon: number;
  };
};

const CookCard = ({ cook }: { cook: Cook }) => (
  <Link href={`/cook/${cook.id}`} className="block group">
    <Card className="shadow-neumo-light dark:shadow-neumo-dark overflow-hidden transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <Image
          src={cook.profilePicture || `https://placehold.co/600x400.png?text=${cook.publicName ? cook.publicName.charAt(0) : 'K'}`}
          alt={cook.publicName || 'Cuisinier'}
          width={600}
          height={400}
          className="aspect-video object-cover"
          data-ai-hint={cook.dataAiHint || 'placeholder image'}
        />
        {cook.status && (
          <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${cook.status === 'Ouvert' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {cook.status}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-headline truncate">{cook.publicName || 'Nom indisponible'}</CardTitle>
        <CardDescription className="mt-1 text-sm truncate">{cook.bio}</CardDescription>
        <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
          <span>{cook.specialties}</span>
          {cook.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-primary" fill="currentColor" />
              <span>{cook.rating}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </Link>
);


export default function Home() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [radius, setRadius] = useState<string>('nearby');
  const [cooks, setCooks] = useState<Cook[]>([]);
  const [allCooks, setAllCooks] = useState<Cook[]>([]);
  const [deliveryOption, setDeliveryOption] = useState('takeaway');
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [cookType, setCookType] = useState('all');

  useEffect(() => {
    const fetchCooks = async () => {
      const cooksCollection = collection(db, 'cooks');
      const cooksSnapshot = await getDocs(cooksCollection);
      const cooksList = cooksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Cook));
      setCooks(cooksList);
      setAllCooks(cooksList);
    };

    fetchCooks();
  }, []);

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
    let filteredCooks = [...allCooks];

    // Filter by location and radius
    if (userLocation && radius !== 'nearby') {
      const numericRadius = parseInt(radius, 10);
      filteredCooks = filteredCooks
        .map((cook) => ({
          ...cook,
          distance: haversineDistance(
            userLocation.latitude,
            userLocation.longitude,
            cook.location.lat,
            cook.location.lon
          ),
        }))
        .filter((cook) => cook.distance <= numericRadius)
        .sort((a, b) => a.distance - b.distance);
    }

    // Filter by open now
    if (isOpenNow) {
      filteredCooks = filteredCooks.filter(cook => cook.status === 'Ouvert');
    }

    // Filter by cook type
    if (cookType !== 'all') {
      filteredCooks = filteredCooks.filter(cook => cook.cookType === cookType);
    }

    setCooks(filteredCooks);
  }, [userLocation, radius, allCooks, isOpenNow, cookType]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 py-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <LocationFilter
            onLocationChange={setUserLocation}
            onRadiusChange={setRadius}
          />
          <div>
            <Label>Option</Label>
            <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="flex items-center mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="takeaway" id="takeaway" />
                <Label htmlFor="takeaway">À emporter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">Livraison</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-2 mt-auto mb-2">
            <Checkbox id="open-now" checked={isOpenNow} onCheckedChange={(checked: boolean) => setIsOpenNow(!!checked)} />
            <Label htmlFor="open-now">Ouvert actuellement</Label>
          </div>
          <div>
            <Label htmlFor="cook-type">Type de cuisinier</Label>
            <Select value={cookType} onValueChange={setCookType}>
              <SelectTrigger id="cook-type">
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="particulier">Particulier</SelectItem>
                <SelectItem value="professionnel">Professionnel</SelectItem>
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

      <div className="mt-12 text-center">
        <Button className="bg-vibrant-green text-white hover:bg-vibrant-green/90">
          Voir plus de cuisiniers
        </Button>
      </div>
    </div>
  );
}
