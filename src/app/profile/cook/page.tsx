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
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { SalesChart } from "@/components/shared/SalesChart";

const dishes = [
    { id: 'm1', name: 'Lasagnes Classiques', price: 15.99, stock: 10, visible: true },
    { id: 'm2', name: 'Spaghetti Carbonara', price: 13.50, stock: 15, visible: true },
    { id: 'm3', name: 'Pizza Margherita', price: 12.00, stock: 0, visible: false },
]

const orders = [
    { id: 'o1', customer: 'Jane Doe', total: 34.50, status: 'En cours', date: '2023-10-26' },
    { id: 'o2', customer: 'John Smith', total: 15.99, status: 'Livrée', date: '2023-10-25' },
    { id: 'o3', customer: 'Peter Jones', total: 27.00, status: 'En attente', date: '2023-10-26' },
]


export default function CookDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Tableau de bord Cuisinier</h1>
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted shadow-neumo-light-inset dark:shadow-neumo-dark-inset">
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="dishes">Mes Plats</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-6">
          <Card className="shadow-neumo-light dark:shadow-neumo-dark">
            <CardHeader>
              <CardTitle>Commandes Actuelles</CardTitle>
              <CardDescription>Gérez et suivez vos commandes entrantes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID Commande</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell><Badge variant={order.status === 'Livrée' ? 'default' : 'secondary'} className={order.status === 'En cours' ? 'bg-blue-500' : order.status === 'En attente' ? 'bg-yellow-500' : 'bg-green-500'}>{order.status}</Badge></TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell><Button size="sm" variant="outline" className="shadow-neumo-light dark:shadow-neumo-dark">Voir</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="dishes" className="mt-6">
            <Card className="shadow-neumo-light dark:shadow-neumo-dark">
                 <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Mes Plats</CardTitle>
                        <CardDescription>Ajoutez, modifiez ou supprimez des plats de votre menu.</CardDescription>
                    </div>
                    <Button className="shadow-neumo-light dark:shadow-neumo-dark">Ajouter un plat</Button>
                 </CardHeader>
                 <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Prix</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Visible</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {dishes.map(dish => (
                                <TableRow key={dish.id}>
                                    <TableCell className="font-medium">{dish.name}</TableCell>
                                    <TableCell>${dish.price.toFixed(2)}</TableCell>
                                    <TableCell>{dish.stock}</TableCell>
                                    <TableCell>{dish.visible ? 'Oui' : 'Non'}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button size="sm" variant="outline" className="shadow-neumo-light dark:shadow-neumo-dark">Modifier</Button>
                                        <Button size="sm" variant="destructive">Supprimer</Button>
                                    </TableCell>
                                </TableRow>
                           ))}
                        </TableBody>
                    </Table>
                 </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="profile" className="mt-6">
            <Card className="shadow-neumo-light dark:shadow-neumo-dark">
                <CardHeader>
                    <CardTitle>Modifier votre profil</CardTitle>
                    <CardDescription>Gardez vos informations à jour pour vos clients.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nom du cuisinier / restaurant</Label>
                        <Input id="name" defaultValue="Chef Isabella Rossi" className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bio">Biographie</Label>
                        <Textarea id="bio" defaultValue="Passionnée par l'idée d'amener le cœur de l'Italie à votre table..." className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cuisine">Type de cuisine</Label>
                        <Input id="cuisine" defaultValue="Italienne" className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset"/>
                    </div>
                    <Button className="shadow-neumo-light dark:shadow-neumo-dark">Enregistrer</Button>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <Card className="shadow-neumo-light dark:shadow-neumo-dark">
            <CardHeader>
              <CardTitle>Statistiques de Ventes</CardTitle>
              <CardDescription>Votre performance de ventes des 6 derniers mois.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <SalesChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
