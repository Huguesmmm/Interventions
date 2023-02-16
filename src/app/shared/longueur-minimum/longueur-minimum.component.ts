import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    static longueurMinimum(longueur: Number): ValidatorFn {
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {
            if (valeurControle.value != null && valeurControle.value.trim().length >= longueur) {
                return null;
            }
            return { 'nbCaracteresInsuffisants': true };
        };
    }
}