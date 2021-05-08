import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + 'probleme');
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root div.card-header')).getText();
  }

  async getParagraphText(): Promise<string> {
    return element(by.css('app-root h5')).getText();
  }

  // Permet de vider toutes les zones.  A appeller dans chaque test.
  async viderToutesLesZones(): Promise<void> {
    await element(by.id('prenomId')).clear();
    await element(by.id('nomId')).clear();
    // Sélectionner le premier élément dans la zone de liste déroulante (Sélectionner un type de problème (obligatoire))
    await element(by.id('noTypeproblemeId')).all(by.tagName('option')).get(0).click();
    // Cliquer sur le bouton radio par défaut (Pas de notification)
    element.all(by.id('NotifiezMoiId')).get(0).click();
    // element(by.id('courrielId')).clear();
    // element(by.id('courrielConfirmationId')).clear();
    // element(by.id('telephoneId')).clear();
    await element(by.id('noUniteId')).clear();
    await element(by.id('descriptionProblemeId')).clear();
  }

  // Inscrire tous les renseignements obligatoires pour le scénario de base HAPPY PATH (saisie minimum obligatoire pour rendre le formulaire valide)
  async setChampsValidesScenarioNominal(): Promise<void> {
    await element(by.id('prenomId')).sendKeys('Percy');
    await element(by.id('nomId')).sendKeys('Jackson');
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noTypeproblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('NotifiezMoiId')).get(0).click();
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setChampsValidesScenarioAlternatifParMessageTexte(): Promise<void> {
    await element(by.id('prenomId')).sendKeys('Harry');
    await element(by.id('nomId')).sendKeys('Potter');
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noTypeproblemeId')).all(by.tagName('option')).get(3).click();
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('NotifiezMoiId')).get(2).click();
    await element(by.id('telephoneId')).sendKeys('4443334444');
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setChampsValidesScenarioAlternatifParCourriel(): Promise<void> {
    await element(by.id('prenomId')).sendKeys('Harry');
    await element(by.id('nomId')).sendKeys('Potter');
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noTypeproblemeId')).all(by.tagName('option')).get(3).click();
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('NotifiezMoiId')).get(1).click();
    await element(by.id('courrielId')).sendKeys('Dolores@Ombrage.bad')
    await element(by.id('courrielConfirmationId')).sendKeys('Dolores@Ombrage.bad');
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  async setZoneDescriptionProblemeCaracteresSuffisant() {
    await element(by.id('descriptionProblemeId')).sendKeys('Percy a un ami au enfer...');
  }

  async setZoneDescriptionProblemeCaracteresInsuffisant() {
    await element(by.id('descriptionProblemeId')).sendKeys('Bob');
  }

  // Permet d'obtenir toutes les propriétés et leurs valeurs du bouton Sauvegarder
  boutonSubmit(): ElementFinder {
    return element(by.buttonText('Sauvegarder'));
  }

  // Permet d'obtenir la classe appliquee actuellement dans la zone Description (entre autres is-valid ou is-invalid)
  obtenirClasseZoneDescriptionProbleme() {
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  }
}
