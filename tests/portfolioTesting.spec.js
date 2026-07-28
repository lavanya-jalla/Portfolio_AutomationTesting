import { test, expect } from '@playwright/test';
import { link } from 'node:fs';

test.describe('Portfolio Website Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://lavanyajallaportfolio.netlify.app/');
  });

  test('Verify page title', async ({ page }) => {
    await expect(page).toHaveTitle("My Portfolio");
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
    await expect(page.locator('#skills')).toContainText( 'Languages','Database','Tools');
  });
  test('Verify Projects section', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await expect(page.locator('#projects')).toBeVisible();
  });


  test('Verify Services section', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#services')).toContainText("Java Development");
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
    await expect(newPage).toHaveURL("https://lavanyajallaportfolio.netlify.app/certificates/LAVANYA%20JALLA_SE_RESUME.pdf");

  });

    test('Verify GitHub link', async ({ page,context }) => {
      const github = page.getByRole('link',{name:'GitHub', exact: true});

      await expect(github.first()).toBeVisible();
      const newPagePromise = context.waitForEvent('page');
    await github.click();
    const newPage = await newPagePromise;
      await newPage.waitForLoadState();
      await expect(newPage).toHaveURL("https://github.com/lavanya-jalla");
    });

    test('Verify LinkedIn link', async ({ page,context }) => {
      const linkedin = page.getByRole('link',{name:'LinkedIn',exact:true});
      await expect(linkedin.first()).toBeVisible();
      const newPagePromise=context.waitForEvent('page');
      await linkedin.click();
      const newPage=await newPagePromise;
      await newPage.waitForLoadState();
      await expect(newPage).toHaveURL("https://www.linkedin.com/in/jalla-lavanya-b2b1712b6");

    });

    test('Verify project links', async ({ page ,context}) => {
      const projects = page.getByRole('link',{name:'View GitHub Repository',exact:true});
      if (await projects.count() > 0) {
        await expect(projects.first()).toBeVisible();
        const newPagePromise=context.waitForEvent('page');
      await projects.first().click();
      const newPage=await newPagePromise;
      await newPage.waitForLoadState();
      }
    });

    test('Verify navigation menu', async ({ page }) => {
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    });

    test('Verify navigation to About', async ({ page }) => {
      const aboutLink = page.getByRole('link', { name:'About',exact:true});

      if (await aboutLink.count()) {
        await aboutLink.click();
        await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();
        await page.waitForTimeout(2000)
      }
    });
    
    test('Verify navigation to serivces', async ({ page }) => {
       await page.locator('#services').scrollIntoViewIfNeeded();
      const serviceLink = page.getByRole('link', { name:'Services',exact:true});

      if (await serviceLink.count()) {
        await serviceLink.click();
        await expect(page.locator('#services')).toContainText("Java Development");
    
      }
    });
      test.only('Verify navigation to projects', async ({ page }) => {
       await page.locator('#projects').scrollIntoViewIfNeeded();
      const projectLink = page.getByRole('link', { name:'Projects',exact:true});

      if (await projectLink.count()) {
        await projectLink.click();
        await expect(page.getByRole('heading', { name: 'Project 1: Netflix Clone' })).toBeVisible();
    
      }
    });
          


    test('Verify all images are loaded', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        await expect(images.nth(i)).toBeVisible();
      }
    });

    test('Verify footer is visible', async ({ page }) => {
      await page.locator('footer').scrollIntoViewIfNeeded();
      await expect(page.locator('footer')).toBeVisible();
    });

});