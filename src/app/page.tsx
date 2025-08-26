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

const cooks = [
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
  },
];

const CookCard = ({ cook }: { cook: (typeof cooks)[0] }) => (
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
            <div className="flex-grow">
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Lieu</label>
              <Input placeholder="Entrez votre adresse ou ville..." className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
            </div>
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
