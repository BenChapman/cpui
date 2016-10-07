import { CpuiPage } from './app.po';

describe('cpui App', function() {
  let page: CpuiPage;

  beforeEach(() => {
    page = new CpuiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
