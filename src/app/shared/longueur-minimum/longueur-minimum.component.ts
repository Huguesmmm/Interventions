import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    static longueurMinimum(longueur: Number): ValidatorFn {
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {
            if (valeurControle.value.split(" ").join("") >= longueur) {
                return null;
            }
            return { 'nbCharacteresInsuffisants': true };
        };
    }
}