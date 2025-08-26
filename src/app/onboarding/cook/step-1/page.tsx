"use client";

import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OnboardingStep1() {
  const router = useRouter();
  const [cookType, setCookType] = useState("Particulier");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the data to a state management solution or Firestore
    console.log("Onboarding Step 1 Data:", { cookType /* ...other form data */ });
    router.push("/onboarding/cook/step-2");
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-neumo-light dark:shadow-neumo-dark border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Bienvenue, Cuisinier !</CardTitle>
          <CardDescription>
            Commençons par configurer votre profil public. C'est ce que les clients verront en premier.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                    <AvatarImage src="https://placehold.co/150x150.png" alt="Avatar" />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <Label htmlFor="picture">Photo de profil</Label>
                    <Input id="picture" type="file" className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
                    <p className="text-xs text-muted-foreground mt-1">Téléchargez une photo claire de vous ou de votre logo.</p>
                </div>
            </div>

            <div className="space-y-2">
              <Label>Vous êtes un(e)...</Label>
              <RadioGroup
                value={cookType}
                onValueChange={setCookType}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="Particulier" id="Particulier" className="peer sr-only" />
                  <Label htmlFor="Particulier" className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary shadow-neumo-light-inset dark:shadow-neumo-dark-inset cursor-pointer">
                    Particulier
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="Professionnel" id="Professionnel" className="peer sr-only" />
                  <Label htmlFor="Professionnel" className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary shadow-neumo-light-inset dark:shadow-neumo-dark-inset cursor-pointer">
                    Professionnel
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicName">Nom du Cuisinier / Boutique</Label>
              <Input id="publicName" placeholder="Ex: Les délices de Marie" required className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biographie</Label>
              <Textarea id="bio" placeholder="Décrivez votre passion pour la cuisine, vos spécialités..." required className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialties">Spécialités / Tags</Label>
              <Input id="specialties" placeholder="Ex: Italienne, Pâtes fraîches, Végétarien" required className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
               <p className="text-xs text-muted-foreground">Séparez les tags par des virgules.</p>
            </div>

            <Button type="submit" className="w-full shadow-neumo-light dark:shadow-neumo-dark hover:shadow-neumo-light-inset dark:hover-shadow-neumo-dark-inset">
              Continuer vers l'étape 2
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
