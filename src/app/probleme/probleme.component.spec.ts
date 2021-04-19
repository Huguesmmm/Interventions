import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers: [TypeproblemeService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('champ prenom invalide avec 2 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['nbCaracteresInsuffisants']).toBe(true);
  });

  it('champ prenom valide avec 3 caractères', () => {
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('champ prenom valide avec 200 caractères', () => {
    let zone = component.problemeForm.get('prenom');
    zone.setValue('f'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('champ prenom invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('champ prenom invalide avec 10 espaces', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    errors = zone.errors || {};
    zone.setValue(' '.repeat(10));
    expect(errors['nbCaracteresInsuffisants']).toBe(true);
  });

  it('champ prenom invalide avec 2 espaces et un caractère', () => {
    let zone = component.problemeForm.get('prenom');
    zone.setValue('  e');
    expect(zone.valid).toBeFalse();
  });

  it('#15 Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#16 Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  it('#17 Zone ADRESSE COURRIEL est désactivé quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#18 Zone CONFIRMER COURRIEL est désactivé quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');

  });
  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTrue();
  });
  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel')

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBeTrue();
  });
  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifer par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('#24 | Zone CONFIRMER COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('bob.qwer$12');
    errors = zone.errors || {};
    expect(errors['email']).toBeTruthy();

  });
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zoneCourrielConfirmation.setValue('bob.123@gmail.com');

    let zoneGroupCourriel = component.problemeForm.get('courrielGroup');

    errors = zoneGroupCourriel.errors || {};
    expect(zoneGroupCourriel.valid).toBeFalse();

  });
  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zoneCourriel.setValue('bob.123@gmail.com');

    let zoneGroupCourriel = component.problemeForm.get('courrielGroup');

    errors = zoneGroupCourriel.errors || {};
    expect(zoneGroupCourriel.valid).toBeFalse();
  });
  it('#27 | Zone ADRESSE COURRIEL et CONFIRMER COURRIEL ' +
    'sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
      component.appliquerNotifications('ParCourriel');
      let errors = {};

      let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
      let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
      zoneCourriel.setValue('letters.123@gmail.com');
      zoneCourrielConfirmation.setValue('letters@gmail.com');

      let groupe = component.problemeForm.get('courrielGroup');
      errors = groupe.errors || {};
      expect(errors['notmatch']).toBeTruthy();
    });
  it('#28 | Zone ADRESSE COURRIEL et CONFIRMER COURRIEL ' +
    'sont valides si les valeurs sont identiques quand notifier par courriel', () => {
      component.appliquerNotifications('ParCourriel');
      let errors = {};

      let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
      let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
      zoneCourriel.setValue('letters.123@gmail.com');
      zoneCourrielConfirmation.setValue('letters.123@gmail.com');

      let groupe = component.problemeForm.get('courrielGroup');
      errors = groupe.errors || {};
      expect(errors['notmatch']).toBeUndefined();
    });
  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let zone = component.problemeForm.get('telephone');
    expect(zone.enabled).toBeTrue();
  });
  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('#33 | Zone TELEPHONE est invalide avec des caractères non - numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('abc');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });
  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('123456789');
    errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });
  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte ', () => {
    component.appliquerNotifications('ParTelephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('12345678912');
    errors = zone.errors || {};
    expect(errors['maxlength']).toBeTruthy();
  });
  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('0123456789');
    expect(zone.valid).toBeTrue();
  });
});
