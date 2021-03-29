import { ZonesValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
    it('une chaine avec 10 characteres est invalide', () => {
        let longueur = ZonesValidator.longueurMinimum();
        let valeurControle = { value: " ".repeat(10) };

        expect(valeurControle).toBeNull();
    });
});