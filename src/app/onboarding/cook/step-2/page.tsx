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
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddressSearch } from "@/components/shared/AddressSearch";

export default function OnboardingStep2() {
  const router = useRouter();
  const [location, setLocation] = useState<{ address: string; lat: number; lon: number } | null>(null);
  const [deliveryEnabled, setDeliveryEnabled] = useState(false);
  const [deliveryFeeType, setDeliveryFeeType] = useState("Gratuite");
  const [deliveryRadius, setDeliveryRadius] = useState([5]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save data
    console.log("Onboarding Step 2 Data:", { location, deliveryEnabled, deliveryFeeType, deliveryRadius });
    router.push("/onboarding/cook/step-3");
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-neumo-light dark:shadow-neumo-dark border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Localisation et Livraison</CardTitle>
          <CardDescription>
            Indiquez où vous vous trouvez et comment les clients peuvent obtenir vos plats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <AddressSearch onLocationSelect={setLocation} />

            <div className="space-y-4">
                <Label>Options de service</Label>
                <div className="flex items-center space-x-2">
                    <Checkbox id="takeout" defaultChecked disabled />
                    <Label htmlFor="takeout" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        À emporter (Click & Collect)
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="delivery" checked={deliveryEnabled} onCheckedChange={(checked) => setDeliveryEnabled(checked as boolean)} />
                    <Label htmlFor="delivery" className="text-sm font-medium leading-none">
                        Livraison
                    </Label>
                </div>
            </div>

            {deliveryEnabled && (
              <div className="p-4 border rounded-md space-y-6 shadow-neumo-light-inset dark:shadow-neumo-dark-inset">
                <div className="space-y-2">
                    <Label>Zone de livraison (rayon en km)</Label>
                    <div className="flex items-center space-x-4">
                        <Slider
                            value={deliveryRadius}
                            onValueChange={setDeliveryRadius}
                            max={50}
                            step={1}
                        />
                        <span className="font-bold text-primary w-12 text-center">{deliveryRadius[0]} km</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Frais de livraison</Label>
                     <RadioGroup
                        value={deliveryFeeType}
                        onValueChange={setDeliveryFeeType}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div>
                            <RadioGroupItem value="Gratuite" id="free" className="peer sr-only" />
                            <Label htmlFor="free" className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                Gratuite
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="Payante" id="paid" className="peer sr-only" />
                            <Label htmlFor="paid" className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                Payante
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {deliveryFeeType === 'Payante' && (
                    <div className="space-y-2">
                        <Label htmlFor="fee">Montant des frais de livraison (€)</Label>
                        <Input id="fee" type="number" placeholder="Ex: 3.50" className="shadow-neumo-light-inset dark:shadow-neumo-dark-inset" />
                    </div>
                )}
              </div>
            )}

            <div className="flex justify-between">
                <Button type="button" variant="ghost" onClick={() => router.back()}>
                    Retour
                </Button>
                <Button type="submit" className="shadow-neumo-light dark:shadow-neumo-dark hover:shadow-neumo-light-inset dark:hover-shadow-neumo-dark-inset">
                    Continuer vers l'étape 3
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
