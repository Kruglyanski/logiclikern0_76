import { device, element, by, expect, waitFor } from 'detox';

describe('Courses Screen E2E', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await new Promise(res => setTimeout(res, 5000));
    await device.takeScreenshot('before-tests');
  });



  it('показывает все курсы по умолчанию', async () => {
    await waitFor(element(by.id('course-card-course:1'))).toBeVisible().withTimeout(10000).catch(async () => {
      await device.dumpHierarchy();
      throw new Error('Элемент не найден, иерархия выведена');
    });;
    await expect(element(by.id('course-card-course:1'))).toBeVisible();
    // await expect(element(by.id('course-card-course:2'))).toBeVisible();
    await expect(element(by.id('course-card-course:3'))).not.toBeVisible();
  });

  it('открывает модалку и фильтрует курсы по тегу "Головоломки"', async () => {
    await waitFor(element(by.id('selector-button'))).toBeVisible().withTimeout(10000);
    await waitFor(element(by.id('selector-button'))).toBeTouchable().withTimeout(10000);
    await element(by.id('selector-button')).tap();

    await waitFor(element(by.id('selector-modal'))).toBeVisible().withTimeout(10000);

    await waitFor(element(by.id('selector-modal-tag-Головоломки'))).toBeVisible().withTimeout(10000);
    await element(by.id('selector-modal-tag-Головоломки')).tap();

    await waitFor(element(by.id('course-card-course:1'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('course-card-course:1'))).toBeVisible();
    // await expect(element(by.id('course-card-course:5'))).toBeVisible();
    await expect(element(by.id('course-card-course:3'))).not.toBeVisible();
  });

  it('закрывает модалку', async () => {
    await waitFor(element(by.id('selector-button'))).toBeVisible().withTimeout(10000);
    await waitFor(element(by.id('selector-button'))).toBeTouchable().withTimeout(10000);
    await element(by.id('selector-button')).tap();

    await waitFor(element(by.id('selector-modal'))).toBeVisible().withTimeout(10000);
    await waitFor(element(by.id('selector-modal-close-button'))).toBeVisible().withTimeout(10000);
    await element(by.id('selector-modal-close-button')).tap();

    await waitFor(element(by.id('selector-modal'))).not.toBeVisible().withTimeout(10000);
    await expect(element(by.id('selector-modal'))).not.toBeVisible();
  });
});
