import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Phone, Calendar, Clock, ShoppingCart, MessageSquare, Utensils } from 'lucide-react';

const cookData = {
  id: '1',
  name: 'Chef Isabella Rossi',
  bio: 'Passionnée par l\'idée d\'amener le cœur de l\'Italie à votre table. Chaque plat est préparé avec amour, en utilisant des recettes familiales traditionnelles transmises de génération en génération.',
  cuisine: 'Italienne',
  specialties: ['Lasagnes', 'Carbonara', 'Tiramisu'],
  type: 'Professionnel',
  rating: 4.9,
  reviewCount: 124,
  image: 'https://placehold.co/150x150.png',
  dataAiHint: 'chef portrait',
  address: '123 Ruelle des Pâtes, Ville des Saveurs',
  phone: '555-123-4567',
  availability: 'Lun - Sam: 11h - 21h',
  deliveryTime: '30-45 min',
  menu: [
    { id: 'm1', name: 'Lasagnes Classiques', description: 'Couches de pâtes fraîches, sauce bolognaise riche et béchamel onctueuse.', price: 15.99, image: 'https://placehold.co/600x400.png', dataAiHint: 'lasagna dish' },
    { id: 'm2', name: 'Spaghetti Carbonara', description: 'Un classique romain avec des œufs, du fromage pecorino, du guanciale et du poivre noir.', price: 13.50, image: 'https://placehold.co/600x400.png', dataAiHint: 'carbonara pasta' },
    { id: 'm3', name: 'Pizza Margherita', description: 'Simple et délicieuse avec des tomates San Marzano, de la mozzarella fraîche et du basilic.', price: 12.00, image: 'https://placehold.co/600x400.png', dataAiHint: 'margherita pizza' },
  ],
  reviews: [
    { id: 'r1', author: 'Jane Doe', rating: 5, comment: 'Absolument les meilleures lasagnes que j\'ai jamais mangées ! J\'avais l\'impression d\'être en Italie.' },
    { id: 'r2', author: 'John Smith', rating: 4, comment: 'La Carbonara était fantastique, très authentique. Un peu cher mais ça vaut le coup.' },
  ],
};

const DishCard = ({ dish }: { dish: (typeof cookData.menu)[0] }) => (
  <Card className="shadow-neumo-light dark:shadow-neumo-dark overflow-hidden flex flex-col">
    <CardHeader className="p-0">
      <Image
        src={dish.image}
        alt={dish.name}
        width={400}
        height={300}
        className="aspect-4/3 object-cover"
        data-ai-hint={dish.dataAiHint}
      />
    </CardHeader>
    <CardContent className="p-4 flex flex-col flex-grow">
      <CardTitle className="text-md font-headline">{dish.name}</CardTitle>
      <CardDescription className="text-sm mt-1 flex-grow">{dish.description}</CardDescription>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-primary">${dish.price.toFixed(2)}</span>
        <Button size="sm" className="shadow-neumo-light dark:shadow-neumo-dark hover:shadow-neumo-light-inset dark:hover:shadow-neumo-dark-inset">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ReviewCard = ({ review }: { review: (typeof cookData.reviews)[0] }) => (
    <Card className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset p-4">
        <div className="flex items-start gap-4">
            <Avatar>
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-primary' : 'text-muted'}`} fill="currentColor" />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
            </div>
        </div>
    </Card>
);


export default function CookProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-neumo-light dark:shadow-neumo-dark border-0 overflow-hidden">
        <div className="bg-secondary/50 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 shadow-neumo-light dark:shadow-neumo-dark">
              <AvatarImage src={cookData.image} alt={cookData.name} data-ai-hint={cookData.dataAiHint} />
              <AvatarFallback>{cookData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <Badge className="mb-2 shadow-sm">{cookData.type}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold font-headline">{cookData.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-primary" fill="currentColor" />
                  <span className="font-bold text-foreground">{cookData.rating}</span>
                </div>
                <span>({cookData.reviewCount} avis)</span>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 md:p-8">
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted shadow-neumo-light-inset dark:shadow-neumo-dark-inset">
              <TabsTrigger value="menu"><Utensils className="w-4 h-4 mr-2" />Menu</TabsTrigger>
              <TabsTrigger value="info"><MapPin className="w-4 h-4 mr-2" />Infos</TabsTrigger>
              <TabsTrigger value="reviews"><MessageSquare className="w-4 h-4 mr-2" />Avis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="menu" className="mt-6">
                <p className="mb-6 text-muted-foreground">{cookData.bio}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cookData.menu.map((dish) => (
                    <DishCard key={dish.id} dish={dish} />
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="info" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-foreground">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Adresse</h3>
                                <p className="text-muted-foreground">{cookData.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Contact</h3>
                                <p className="text-muted-foreground">{cookData.phone}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Utensils className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Cuisine</h3>
                                <p className="text-muted-foreground">{cookData.cuisine}</p>
                            </div>
                        </div>
                    </div>
                     <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Disponibilité</h3>
                                <p className="text-muted-foreground">{cookData.availability}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Temps de liv. moyen</h3>
                                <p className="text-muted-foreground">{cookData.deliveryTime}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Star className="h-5 w-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Spécialités</h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {cookData.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
                 <div className="space-y-4">
                    {cookData.reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                 </div>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
