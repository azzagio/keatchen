import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Image from "next/image";
import { Star } from "lucide-react";

const orders = [
    { id: 'o1', cook: 'Chef Isabella Rossi', total: 34.50, status: 'Livrée', date: '2023-10-25' },
    { id: 'o2', cook: 'Taco Fiesta', total: 22.00, status: 'Livrée', date: '2023-10-22' },
    { id: 'o3', cook: 'Sushi by Kenji', total: 55.75, status: 'Annulée', date: '2023-10-20' },
];

const favoriteCooks = [
    { id: '1', name: 'Chef Isabella Rossi', cuisine: 'Italienne', image: 'https://placehold.co/100x100.png', dataAiHint: 'chef portrait' },
    { id: '6', name: 'Sushi by Kenji', cuisine: 'Japonaise', image: 'https://placehold.co/100x100.png', dataAiHint: 'sushi chef' },
]

export default function ClientDashboardPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold font-headline mb-6">Mon Compte</h1>
            <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted shadow-neumo-light-inset dark:shadow-neumo-dark-inset">
                    <TabsTrigger value="history">Historique</TabsTrigger>
                    <TabsTrigger value="favorites">Favoris</TabsTrigger>
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="payment">Paiement</TabsTrigger>
                </TabsList>

                <TabsContent value="history" className="mt-6">
                    <Card className="shadow-neumo-light dark:shadow-neumo-dark">
                        <CardHeader>
                            <CardTitle>Vos Commandes</CardTitle>
                            <CardDescription>Consultez vos commandes passées et actuelles.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID Commande</TableHead>
                                        <TableHead>Cuisinier</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map(order => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{order.cook}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell><Badge variant={order.status === 'Livrée' ? 'default' : 'destructive'} className={order.status === 'Livrée' ? 'bg-green-500' : 'bg-red-500'}>{order.status}</Badge></TableCell>
                                            <TableCell>${order.total.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Button size="sm" variant="outline" className="shadow-neumo-light dark:shadow-neumo-dark">Recommander</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="favorites" className="mt-6">
                    <Card className="shadow-neumo-light dark:shadow-neumo-dark">
                        <CardHeader>
                            <CardTitle>Vos Favoris</CardTitle>
                            <CardDescription>Vos cuisiniers et plats enregistrés.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold mb-4 font-headline">Cuisiniers Favoris</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {favoriteCooks.map(cook => (
                                   <Link href={`/cook/${cook.id}`} key={cook.id} className="block">
                                       <Card className="p-4 flex items-center gap-4 shadow-neumo-light dark:shadow-neumo-dark hover:shadow-neumo-light-inset dark:hover:shadow-neumo-dark-inset transition-shadow">
                                           <Image src={cook.image} alt={cook.name} width={80} height={80} className="rounded-full object-cover" data-ai-hint={cook.dataAiHint} />
                                           <div>
                                               <p className="font-semibold">{cook.name}</p>
                                               <p className="text-sm text-muted-foreground">{cook.cuisine}</p>
                                           </div>
                                       </Card>
                                   </Link>
                               ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="profile" className="mt-6">
                    <Card className="shadow-neumo-light dark:shadow-neumo-dark">
                        <CardHeader>
                            <CardTitle>Votre Profil</CardTitle>
                            <CardDescription>Mettez à jour vos informations personnelles et votre adresse.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom complet</Label>
                                <Input id="name" defaultValue="Jane Doe" className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Adresse e-mail</Label>
                                <Input id="email" type="email" defaultValue="jane.doe@example.com" disabled className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Adresse de livraison par défaut</Label>
                                <Input id="address" defaultValue="456 Suburbia Ave, Metro City" className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
                            </div>
                            <Button className="shadow-neumo-light dark:shadow-neumo-dark">Enregistrer</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payment" className="mt-6">
                    <Card className="shadow-neumo-light dark:shadow-neumo-dark">
                        <CardHeader>
                            <CardTitle>Moyens de paiement</CardTitle>
                            <CardDescription>Gérez vos moyens de paiement enregistrés.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 border rounded-lg flex justify-between items-center shadow-neumo-light-inset dark:shadow-neumo-dark-inset">
                                <div>
                                    <p className="font-medium">Visa se terminant par 1234</p>
                                    <p className="text-sm text-muted-foreground">Expire le 12/2025</p>
                                </div>
                                <Button variant="destructive" size="sm">Supprimer</Button>
                            </div>
                            <Button className="shadow-neumo-light dark:shadow-neumo-dark">Ajouter un moyen de paiement</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
}
