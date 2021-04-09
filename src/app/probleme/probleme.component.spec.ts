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



  // it('test champ vide invalide', () => {
  //   expect(component.problemeForm.valid).toBeFalsy();
  // });

  // it('champ nom du probleme doit comporter entre 0 et 50 caractères', () => {
  //   let zone = component.problemeForm.controls['prenomProbleme'];
  //   zone.setValue('a'.repeat(51));
  //   expect(zone.valid).toBeFalsy();
  // });
});
