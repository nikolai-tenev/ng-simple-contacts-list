import { AppPage } from './app.po';

describe('Simple Contacts List App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display info about me', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('I develop with java, javascript, php and no/sql.');
  });
});
