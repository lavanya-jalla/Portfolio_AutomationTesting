import { test, expect } from '@playwright/test';
import { link } from 'node:fs';

test.describe('Portfolio Website Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://lavanyajallaportfolio.netlify.app/');
  });

  test('Verify page title', async ({ page }) => {
    await expect(page).toHaveTitle("Lavanya Jalla | Software Developer");
  });

  test('Verify home page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL("https://lavanyajallaportfolio.netlify.app/");
  });

  test('Verify hero section is visible', async ({ page }) => {
    await expect(page.locator('section').first()).toBeVisible();
  });

  test('Verify About section', async ({ page }) => {
    await page.locator('#about').scrollIntoViewIfNeeded();
    await expect(page.locator('#about')).toContainText("It's me LAVANYA!");
  });

  test('Verify Skills section', async ({ page }) => {
    await page.locator('#skills').scrollIntoViewIfNeeded();
    await expect(page.locator('#skills')).toContainText('Languages', 'Database', 'Tools');
  });
  test('Verify Projects section', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await expect(page.locator('#projects')).toBeVisible();
  });


  test('Verify Services section', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#services')).toContainText("Full Stack Development");
  });

  test('Verify Contact section', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('Verify Resume button', async ({ page, context }) => {
    const resumeBtn = page.getByRole('button', { name: "View Resume" });

    await expect(resumeBtn).toBeVisible();

    const newPagePromise = context.waitForEvent('page');
    await resumeBtn.click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://lavanyajallaportfolio.netlify.app/certificates/LavanyaJalla_Resume.pdf");

  });

  test('Verify GitHub link', async ({ page, context }) => {
    const github = page.getByRole('link', { name: 'GitHub', exact: true });

    await expect(github.first()).toBeVisible();
    const newPagePromise = context.waitForEvent('page');
    await github.click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://github.com/lavanya-jalla");
  });

  test('Verify LinkedIn link', async ({ page, context }) => {
    const linkedin = page.getByRole('link', { name: 'LinkedIn', exact: true });
    await expect(linkedin.first()).toBeVisible();
    const newPagePromise = context.waitForEvent('page');
    await linkedin.click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/linkedin/);

  });

  test('Verify project links', async ({ page, context }) => {
    const projects = page.getByRole('link', { name: 'View GitHub Repository', exact: true });
    if (await projects.count() > 0) {
      await expect(projects.first()).toBeVisible();
      const newPagePromise = context.waitForEvent('page');
      await projects.first().click();
      const newPage = await newPagePromise;
      await newPage.waitForLoadState();
    }
  });
  test('Profile image is visible', async ({ page }) => {
    const profileImage = page.locator('img[alt="Profile Picture"]');
    await expect(profileImage).toBeVisible();
  });

  test('Verify navigation menu', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('Verify navigation to About', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: 'About', exact: true });

    if (await aboutLink.count()) {
      await aboutLink.click();
      await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();

    }
  });

  test('Verify navigation to serivces', async ({ page }) => {

    const serviceLink = page.getByRole('link', { name: 'Services', exact: true });
    await serviceLink.click();


    await expect(page.locator('#services')).toContainText("Full Stack Development");


  });
  test('Verify navigation to projects', async ({ page }) => {

    const projectLink = page.getByRole('link', { name: 'Projects', exact: true });
    await projectLink.click();

    await expect(page.getByRole('heading', { name: 'Project 1: Netflix Clone' })).toBeVisible();


  });



  test('Verify all images are loaded', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 1; i < count; i++) {
      await expect(images.nth(i)).toBeVisible();
    }
    console.log(`The Number of Images are ${count}`);
  });

  test('Verify footer is visible', async ({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Verify view cerificates button to be visible and clickable', async ({ page, context }) => {

    const certicatesBtn = page.getByRole('button', { name: 'View Certificate', exact: true });

    const count = await certicatesBtn.count();
    for (let i = 0; i < count; i++) {
      await expect(certicatesBtn.nth(i)).toBeVisible();
    }
    console.log(`The Number of View Ceritificate Buttons  are ${count}`);

    if (await certicatesBtn.count()) {
      await certicatesBtn.first().click();

    }
    const newPagePromise = context.waitForEvent('page');
    await certicatesBtn.first().click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://lavanyajallaportfolio.netlify.app/certificates/Jalla_Lavanya_Certificate.pdf")
  });
  test('Verify Conatct Form', async ({ page }) => {
    await page.getByPlaceholder("Name").fill("Kushala");
    await page.getByPlaceholder("Email").fill("lavanyajalla22@gmail.com")
    await page.getByPlaceholder("Your message").fill("Iam trying to connect with lets have a meet");
    await page.getByText("Send").click();

  })

});