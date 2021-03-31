import { AbstractControl } from "@angular/forms";
import { ZonesValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
    it('une chaine avec 10 characteres est invalide', () => {
        // préparer une variable pour manipuler le validateur
        let longueur = ZonesValidator.longueurMinimum(3);
        let controle = { value: " ".repeat(10) };
        // Faire l'appel du validateur
        let valeurControle = longueur(controle as AbstractControl)
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(valeurControle['nbCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec des mots est valide', () => {
        // préparer une variable pour manipuler le validateur
        let longueur = ZonesValidator.longueurMinimum(3);
        let controle = { value: "Vive angular" };
        // Faire l'appel du validateur
        let valeurControle = longueur(controle as AbstractControl)
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(valeurControle).toBeNull();
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espace est valide', () => {
        // préparer une variable pour manipuler le validateur
        let longueur = ZonesValidator.longueurMinimum(3);
        let controle = { value: "   je le veux   " };
        // Faire l'appel du validateur
        let valeurControle = longueur(controle as AbstractControl)
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(valeurControle).toBeNull();
    });

    it('Une phrase avec 1 espace et deux caractères est invalide', () => {
        // préparer une variable pour manipuler le validateur
        let longueur = ZonesValidator.longueurMinimum(3);
        let controle = { value: "" };
        // Faire l'appel du validateur
        let valeurControle = longueur(controle as AbstractControl)
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(valeurControle['nbCaracteresInsuffisants']).toBe(true);
    });

    it('Une phrase avec deux espaces et un caractères est invalide', () => {
        // préparer une variable pour manipuler le validateur
        let longueur = ZonesValidator.longueurMinimum(3);
        let controle = { value: "  x" };
        // Faire l'appel du validateur
        let valeurControle = longueur(controle as AbstractControl)
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(valeurControle['nbCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec 3 espaces et 3 caractères est valide', () => {
        // préparer une variable pour manipuler le validateur
        let longueur = ZonesValidator.longueurMinimum(3);
        let controle = { value: "   xxx" };
        // Faire l'appel du validateur
        let valeurControle = longueur(controle as AbstractControl)
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(valeurControle).toBeNull();
    });

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        // préparer une variable pour manipuler le validateur
        let longueur = ZonesValidator.longueurMinimum(3);
        let controle = { value: "     xxxxx     " };
        // Faire l'appel du validateur
        let valeurControle = longueur(controle as AbstractControl)
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(valeurControle).toBeNull();
    });

    it('Une phrase avec deux espaces et un caractères est invalide', () => {
        // préparer une variable pour manipuler le validateur
        let longueur = ZonesValidator.longueurMinimum(3);
        let controle = { value: null };
        // Faire l'appel du validateur
        let valeurControle = longueur(controle as AbstractControl)
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(valeurControle['nbCaracteresInsuffisants']).toBe(true);
    });
});