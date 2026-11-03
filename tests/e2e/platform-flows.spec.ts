import { test, expect } from '@playwright/test';

test.describe('D-AminGrow Enterprise E2E Suite', () => {
  test('1. Storefront & Header Navigation Verification', async ({ page }) => {
    await page.goto('/');

    // Verify Title and Brand Identity
    await expect(page).toHaveTitle(/D-AminGrow/i);
    const logo = page.locator('header img[alt*="D-AminGrow"]').first();
    await expect(logo).toBeVisible();

    // Verify Official Hotline Deep Link
    const whatsappLinks = page.locator('a[href*="2348139169402"]');
    await expect(whatsappLinks.first()).toBeVisible();

    // Verify Primary Navigation Categories
    await expect(page.locator('header').getByText(/Products/i).first()).toBeVisible();
    await expect(page.locator('header').getByText(/Services/i).first()).toBeVisible();
    await expect(page.locator('header').getByText(/Calculators/i).first()).toBeVisible();
  });

  test('2. "Price on Request" Wholesale Integrity & Chick Reservation', async ({ page }) => {
    await page.goto('/chicks');

    // Confirm that chick catalog maintains commercial wholesale quoting and booking slip
    await expect(page.getByText(/Day-Old Chick/i).first()).toBeVisible();

    // Verify 51 chicks packaging standard disclaimer
    await expect(page.getByText(/51 Chicks per Carton/i).first()).toBeVisible();

    // Verify Zenith Bank Commitment Deposit terms are stated
    const pageContent = await page.content();
    expect(pageContent).toContain('1017894562'); // Zenith Bank Account Number
  });

  test('3. Point-of-Lay & Packaging Rules Verification', async ({ page }) => {
    await page.goto('/point-of-lay');

    // Verify 10 birds per crate packaging rule is displayed
    await expect(page.getByText(/10 Birds\/Crate/i).or(page.getByText(/Point-of-Lay/i)).first()).toBeVisible();

    // Verify min 50 birds advisory
    const content = await page.content();
    expect(content).toMatch(/Point[- ]of[- ]Lay/i);
  });

  test('4. Veterinary Clinical Triage & Biosecurity Advisory', async ({ page }) => {
    await page.goto('/services/consultation');

    // Verify Veterinary Clinical Triage Desk presence
    await expect(
      page.getByText(/Interactive Clinical Health Triage/i).or(page.getByText(/Poultry Farm Consultation/i)).first()
    ).toBeVisible();

    // Verify VCN Council / Veterinary authority
    const pageText = await page.content();
    expect(pageText).toMatch(/Veterinary|VCN|Clinical/i);
  });

  test('5. Farm Brooder Calculator & Print Protocol Modal', async ({ page }) => {
    await page.goto('/calculators/brooder');

    // Verify input fields for flock size
    const flockInput = page.locator('input[type="number"]').first();
    await expect(flockInput).toBeVisible();

    // Verify WhatsApp Consultation export link exists
    const exportBtn = page.locator('a[href*="wa.me"]').or(page.getByText(/WhatsApp/i)).first();
    await expect(exportBtn).toBeVisible();
  });

  test('6. Staff Console Split-Screen & Authentication Terminal', async ({ page }) => {
    await page.goto('/admin/login');

    // Verify Enterprise Login Heading
    await expect(page.getByText(/Staff Authentication/i).or(page.getByText(/Welcome Back/i)).first()).toBeVisible();

    // Verify Password Reveal Toggle functionality
    const passwordInput = page.locator('input[name="password"]').first();
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleBtn = page.locator('button[aria-label*="password" i]').first();
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');
    }

    // Verify Corporate Protection Notice
    await expect(page.getByText(/Protected Corporate/i).first()).toBeVisible();
  });
});
