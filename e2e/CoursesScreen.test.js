import {device, element, by, expect} from 'detox';

describe('Courses Screen E2E', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
    await device.takeScreenshot('before-course-list');
  });

  it('показывает все курсы по умолчанию', async () => {
    await expect(element(by.id('course-card-course:1'))).toBeVisible(50).catch(async () => {
      await device.dumpHierarchy();
      throw new Error('Элемент не найден, иерархия выведена');
    });
    // await expect(element(by.id('course-card-course:2'))).toBeVisible(50);
    await expect(element(by.id('course-card-course:3'))).not.toBeVisible(50);
  });

  it('открывает модалку и фильтрует курсы по тегу "Головоломки"', async () => {
    await element(by.id('selector-button')).tap();
    waitFor(element(by.id('selector-modal'))).toBeVisible();

    await element(by.id('selector-modal-tag-Головоломки')).tap();

    await expect(element(by.id('course-card-course:1'))).toBeVisible(50);
    // await expect(element(by.id('course-card-course:5'))).toBeVisible(50);
    await expect(element(by.id('course-card-course:3'))).not.toBeVisible(50);
  });

  it('закрывает модалку', async () => {
    await element(by.id('selector-button')).tap();
    waitFor(element(by.id('selector-modal'))).toBeVisible();
    await element(by.id('selector-modal-close-button')).tap();
    await expect(element(by.id('selector-modal'))).not.toBeVisible();
  });
});
