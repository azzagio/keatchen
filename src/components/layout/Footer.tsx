import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  return (
    <footer className="bg-background/50 border-t border-border/50 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <Logo />
            <p className="text-muted-foreground mt-2 text-sm">
              Votre cuisine, à portée de clic.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4 font-headline">Keatchen</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">À propos</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Devenez cuisinier</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4 font-headline">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Centre d'aide</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Conditions d'utilisation</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Keatchen. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
