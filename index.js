const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/fill_form', async (req, res) => {
  const url = req.query.url || 'https://www.homeday.de/de/preisatlas/';
  const zipCode = req.query.zip || '67549';

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Fill form (assuming there's an input field with a specific selector)
    await page.type('input[name="postcode"]', zipCode);

    // Click button (assuming there's a submit button with a specific selector)
    await page.click('button[type="submit"]');

    // Wait for the results page to load
    await page.waitForNavigation();

    // Get the final URL or result
    const result = await page.url();

    await browser.close();

    res.json({ message: 'Form submitted successfully', result });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting form');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
