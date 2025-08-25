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
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const salesData = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
];

const dishes = [
    { id: 'm1', name: 'Classic Lasagna', price: 15.99, stock: 10, visible: true },
    { id: 'm2', name: 'Spaghetti Carbonara', price: 13.50, stock: 15, visible: true },
    { id: 'm3', name: 'Margherita Pizza', price: 12.00, stock: 0, visible: false },
]

const orders = [
    { id: 'o1', customer: 'Jane Doe', total: 34.50, status: 'In Progress', date: '2023-10-26' },
    { id: 'o2', customer: 'John Smith', total: 15.99, status: 'Delivered', date: '2023-10-25' },
    { id: 'o3', customer: 'Peter Jones', total: 27.00, status: 'Pending', date: '2023-10-26' },
]


export default function CookDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Cook Dashboard</h1>
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-muted shadow-neumo-light-inset dark:shadow-neumo-dark-inset">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="dishes">My Dishes</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="stats">Sales Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-6">
          <Card className="shadow-neumo-light dark:shadow-neumo-dark">
            <CardHeader>
              <CardTitle>Current Orders</CardTitle>
              <CardDescription>Manage and track your incoming orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell><Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className={order.status === 'In Progress' ? 'bg-blue-500' : order.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'}>{order.status}</Badge></TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell><Button size="sm" variant="outline" className="shadow-neumo-light dark:shadow-neumo-dark">View</Button></TableCell>
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
                        <CardTitle>My Dishes</CardTitle>
                        <CardDescription>Add, edit, or remove dishes from your menu.</CardDescription>
                    </div>
                    <Button className="shadow-neumo-light dark:shadow-neumo-dark">Add New Dish</Button>
                 </CardHeader>
                 <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
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
                                    <TableCell>{dish.visible ? 'Yes' : 'No'}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button size="sm" variant="outline" className="shadow-neumo-light dark:shadow-neumo-dark">Edit</Button>
                                        <Button size="sm" variant="destructive">Delete</Button>
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
                    <CardTitle>Edit Your Profile</CardTitle>
                    <CardDescription>Keep your information up to date for your customers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Cook Name / Restaurant Name</Label>
                        <Input id="name" defaultValue="Chef Isabella Rossi" className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" defaultValue="Passionate about bringing the heart of Italy to your table..." className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cuisine">Cuisine Type</Label>
                        <Input id="cuisine" defaultValue="Italian" className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset"/>
                    </div>
                    <Button className="shadow-neumo-light dark:shadow-neumo-dark">Save Changes</Button>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <Card className="shadow-neumo-light dark:shadow-neumo-dark">
            <CardHeader>
              <CardTitle>Sales Statistics</CardTitle>
              <CardDescription>Your sales performance over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={salesData}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`}/>
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
