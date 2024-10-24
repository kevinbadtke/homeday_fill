const puppeteer = require('puppeteer');

(async () => {
  // Browser starten
  const browser = await puppeteer.launch({ headless: false }); // Setze auf true, wenn du das Fenster nicht sehen möchtest
  const page = await browser.newPage();

  // Navigiere zur URL
  await page.goto('https://www.homeday.de/de/preisatlas/frankfurt+am+main/liebfrauenstrasse+2,+60313?map_layer=standard&marketing_type=rent&property_type=apartment');

  // Warte, bis das Feld vorhanden ist
  await page.waitForSelector('input[name="postcode"]'); // Passe den Selector an das Feld an, in das die Postleitzahl eingegeben werden soll

  // Trage die Postleitzahl ein
  await page.type('input[name="postcode"]', '67549');

  // Warte auf den Button und klicke darauf
  await page.waitForSelector('button[type="submit"]'); // Passe den Button-Selector entsprechend an
  await page.click('button[type="submit"]');

  // Warte auf die Resultate (je nach Seite eventuell)
  await page.waitForTimeout(5000); // Warte 5 Sekunden oder passe die Zeit an

  // Browser schließen
  await browser.close();
})();
