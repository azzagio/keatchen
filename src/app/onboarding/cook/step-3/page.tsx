"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function OnboardingStep3() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save dish data
    console.log("Onboarding Step 3 Data: First Dish Added");
    router.push("/profile/cook");
  };

  const handleSkip = () => {
    console.log("Skipped adding first dish.");
    router.push("/profile/cook");
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-neumo-light dark:shadow-neumo-dark border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Ajoutez votre premier plat</CardTitle>
          <CardDescription>
            C'est la dernière étape ! Mettez en ligne un de vos plats phares pour que les clients puissent le découvrir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label>Photo du plat</Label>
                <div className="flex items-center space-x-4">
                    <Image src="https://placehold.co/400x300.png" alt="Placeholder" width={150} height={112} className="rounded-md aspect-4/3 object-cover" />
                    <Input id="dish-image" type="file" required className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
                </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dishName">Nom du plat</Label>
              <Input id="dishName" placeholder="Ex: Lasagnes Classiques" required className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dishDescription">Description</Label>
              <Textarea id="dishDescription" placeholder="Décrivez ce plat délicieux..." required className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input id="price" type="number" placeholder="Ex: 12.50" required className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
            </div>

            <div className="flex flex-col sm:flex-row-reverse gap-2">
                <Button type="submit" className="w-full sm:w-auto shadow-neumo-light dark:shadow-neumo-dark hover:shadow-neumo-light-inset dark:hover-shadow-neumo-dark-inset">
                    Terminer et aller au tableau de bord
                </Button>
                 <Button type="button" variant="ghost" onClick={handleSkip} className="w-full sm:w-auto">
                    Ignorer pour le moment
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
