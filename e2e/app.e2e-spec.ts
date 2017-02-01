import { TalentPage } from './app.po';

describe('talent App', function() {
  let page: TalentPage;

  beforeEach(() => {
    page = new TalentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
