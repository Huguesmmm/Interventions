import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProblemeComponent]
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
    let zone = component.problemeForm.get('prenomProbleme');
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['minLength']).toBeFalsy();
  });

  it('champ prenom valide avec 3 caractères', () => {
    let zone = component.problemeForm.get('prenomProbleme');
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  // it('champ nom du probleme doit comporter entre 0 et 50 caractères', () => {
  //   let zone = component.problemeForm.controls['prenomProbleme'];
  //   zone.setValue('a'.repeat(51));
  //   expect(zone.valid).toBeFalsy();
  // });
});
