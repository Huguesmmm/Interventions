import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typeproblemeTab: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private typeprobleme: TypeproblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [Validators.required, ZonesValidator.longueurMinimum(3)]],
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      noTypeprobleme: ['', [Validators.required]],
      notification: ['ParCourriel'],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }]
      }),
      telephone: [{ value: '', disabled: true }]
    });

    this.typeprobleme.obtenirTypeProbleme()
      .subscribe(cat => this.typeproblemeTab = cat,
        error => this.errorMessage = <any>error);

  }
  faSave = faSave;
  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const telephoneControl = this.problemeForm.get('telephone');


    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset(); // Pour enlever les messages d'erreur si le controle contenait des données i
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    courrielGroupControl.clearValidators();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (typeNotification === 'ParCourriel') {
      courrielControl.setValidators([Validators.required, Validators.email]);
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.required, Validators.email]);
      courrielConfirmationControl.enable();
      courrielGroupControl.setValidators(Validators.compose([emailMatcherValidator.courrielDifferents()]));
    } else if (typeNotification === 'ParMessageTexte') {
      telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
      telephoneControl.enable();
    }
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
  }
  save(): void { }

}
