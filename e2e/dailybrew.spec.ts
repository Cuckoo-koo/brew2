import { test, expect } from '@playwright/test';

test.describe('The Daily Brew - End-to-End Suite', () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

  test('1. Loads homepage and verifies brand identity, title, and initial loader', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/The Daily Brew/i);

    // Verify main brand mark appears in sticky navbar
    const brandName = page.locator('header span:has-text("The Daily Brew")');
    await expect(brandName).toBeVisible();

    // Verify Hero headline
    const headline = page.locator('h1');
    await expect(headline).toContainText('Your Everyday Coffee Destination');
  });

  test('2. Navigation and smooth scroll links', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check all main links in desktop nav
    const menuLink = page.locator('nav a, nav button').filter({ hasText: 'Menu' });
    const ambienceLink = page.locator('nav a, nav button').filter({ hasText: 'Ambience' });
    const aboutLink = page.locator('nav a, nav button').filter({ hasText: 'About' });
    const contactLink = page.locator('nav a, nav button').filter({ hasText: 'Contact' });

    await expect(menuLink).toBeVisible();
    await expect(ambienceLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(contactLink).toBeVisible();

    // Click Menu and verify menu section is visible
    await menuLink.click();
    await page.waitForTimeout(300);
    const menuSection = page.locator('#menu');
    await expect(menuSection).toBeVisible();
  });

  test('3. Interactive Menu Cards and Quick Order Flow', async ({ page }) => {
    await page.goto(BASE_URL);

    // Verify all 4 required items with exact pricing
    const cappuccino = page.locator('article:has-text("Cappuccino")');
    const coldCoffee = page.locator('article:has-text("Cold Coffee")');
    const sandwich = page.locator('article:has-text("Classic Sandwich")');
    const brownie = page.locator('article:has-text("Chocolate Brownie")');

    await expect(cappuccino).toContainText('₹150');
    await expect(coldCoffee).toContainText('₹180');
    await expect(sandwich).toContainText('₹120');
    await expect(brownie).toContainText('₹100');

    // Click Details button to trigger Quick View Modal
    const detailsBtn = cappuccino.locator('button:has-text("Details")');
    await detailsBtn.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Cappuccino');
    await expect(modal).toContainText('100% Arabica Espresso');

    // Close modal
    const closeBtn = modal.locator('button[aria-label="Close modal"]');
    await closeBtn.click();
    await expect(modal).not.toBeVisible();

    // Click Order Now button and verify toast feedback
    const orderNowBtn = cappuccino.locator('button:has-text("Order Now")');
    await orderNowBtn.click();

    const toast = page.locator('[role="status"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Cappuccino');
  });

  test('4. Ambience and Visual Gallery sections', async ({ page }) => {
    await page.goto(BASE_URL);

    const ambience = page.locator('#ambience');
    await expect(ambience).toBeVisible();
    await expect(ambience).toContainText('A Sanctuary of Warmth & Flavor');

    const gallery = page.locator('#gallery');
    await expect(gallery).toBeVisible();
    await expect(gallery).toContainText('Moments at The Daily Brew');
  });

  test('5. Table Reservation Modal', async ({ page }) => {
    await page.goto(BASE_URL);

    const visitUsBtn = page.locator('header button:has-text("Visit Us")');
    await visitUsBtn.click();

    const resModal = page.locator('[role="dialog"]');
    await expect(resModal).toBeVisible();
    await expect(resModal).toContainText('Reserve a Table or Booth');

    // Fill form and submit
    await resModal.locator('#res-name').fill('Aishwarya');
    await resModal.locator('#res-phone').fill('+91 98765 12345');
    await resModal.locator('button[type="submit"]').click();

    await expect(resModal).toContainText('Table Reserved!');
  });

  test('6. Contact Section and Location details', async ({ page }) => {
    await page.goto(BASE_URL);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    // Verify clickable phone and email
    const phoneLink = contactSection.locator('a[href^="tel:"]');
    const emailLink = contactSection.locator('a[href^="mailto:"]');

    await expect(phoneLink).toContainText('+91 98765 43210');
    await expect(emailLink).toContainText('hello@thedailybrew.example');

    // Verify location is strictly Chennai
    await expect(contactSection).toContainText('Chennai');
  });

  test('7. Custom Themed 404 Error Page and Recovery', async ({ page }) => {
    await page.goto(`${BASE_URL}/non-existent-table`);

    // Verify 404 page is rendered with coffee theme
    const heading = page.locator('h1');
    await expect(heading).toContainText('Looks like this coffee order got lost');

    // Click Return Home and verify return to home view
    const returnHomeBtn = page.locator('button:has-text("Return to Café Home")');
    await expect(returnHomeBtn).toBeVisible();
    await returnHomeBtn.click();

    await expect(page.locator('h1')).toContainText('Your Everyday Coffee Destination');
  });

  test('8. Accessibility and Semantic Checks', async ({ page }) => {
    await page.goto(BASE_URL);

    // Verify skip to main content link exists
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();

    // Verify main landmarks
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Verify copyright notice
    const footer = page.locator('footer');
    await expect(footer).toContainText('© 2026 The Daily Brew. All Rights Reserved.');
  });

  test('9. Admin CMS Authentication and Product Management Flow', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin`);

    // Should render Admin Login Page
    const loginHeading = page.locator('h1');
    await expect(loginHeading).toContainText('The Daily Brew CMS');

    // Click Fill Owner Credentials
    const demoBtn = page.locator('button:has-text("Fill Owner Credentials")');
    await demoBtn.click();

    // Submit Login Form
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // Verify redirected to Dashboard Overview
    const dashboardHeading = page.locator('h2:has-text("Dashboard Overview")');
    await expect(dashboardHeading).toBeVisible();

    // Navigate to Product Catalog
    const productsTab = page.locator('button:has-text("Product Catalog")');
    await productsTab.click();

    const productCatalogHeading = page.locator('h2:has-text("Product Catalog")');
    await expect(productCatalogHeading).toBeVisible();
  });

  test('10. Tier-1 SEO Verification (Robots, Sitemap & Structured Data)', async ({ page }) => {
    await page.goto(BASE_URL);

    // Verify Meta Title & Description
    await expect(page).toHaveTitle(/The Daily Brew/i);
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /freshly brewed/i);

    // Verify Schema.org JSON-LD structured data is present
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
    const content = await jsonLd.textContent();
    expect(content).toContain('CafeOrCoffeeShop');
    expect(content).toContain('Chennai');
  });
});
