const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json());

app.post("/puppeteer-run", async (req, res) => {
  const { url, postCode } = req.body; // Daten von Zapier

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Füge hier den Puppeteer-Code hinzu, um die Website zu manipulieren
    await page.type("input[name='postcode']", postCode); // Beispiel für die Eingabe eines Postcodes
    await page.click("button[type='submit']"); // Beispiel für Button-Klick

    await page.waitForTimeout(3000); // Wartezeit zum Laden der Seite
    await browser.close();

    res.status(200).json({ message: "Puppeteer execution successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Puppeteer execution failed", error });
  }
});

app.listen(3000, () => {
  console.log("Puppeteer server is running on port 3000");
});
