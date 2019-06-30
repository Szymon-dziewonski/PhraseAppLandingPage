require               = require('esm')(module, {cjs: true});
const {TabController} = require('./tab.controller');

describe('TabController', () => {
  const tabsContId = 'tabs-cont';
  const tabs       = [
    {
      id      : 'tab-1',
      content : 'content 1',
      label   : 'btn 1',
      expanded: 'true'
    },
    {
      id      : 'tab-2',
      content : 'content 2',
      label   : 'btn 2',
      expanded: 'false'
    }];

  let tabCtrl;
  let tabEls;

  beforeEach(() => {
    document.body.innerHTML = `
<div id="${tabsContId}">
  ${tabs.map(tab =>
      `<div id="${tab.id}" role="tabpanel" aria-expanded="${tab.expanded}">${tab.content}</div>`
    )}
  <ul role="tablist">
    ${tabs.map(tab =>
      `<li role="tab" aria-controls="${tab.id}" tabindex="0" aria-selected="${tab.expanded}">${tab.label}</li>`
    )}
  </ul>
</div>`;

    tabCtrl = new TabController(document.body.querySelector(`#${tabsContId}`));
    tabEls  = Array.from(document.body.querySelectorAll('[role=tab]'))
  });

  describe('setActiveTab', () => {
    const selectedTabIndex = 1;

    beforeEach(() => {
      tabCtrl.setActiveTab(tabEls[selectedTabIndex])
    });

    it('should set aria-selected on tab elements properly', () => {
      tabEls.forEach((tab, i) =>
        expect(tab.getAttribute('aria-selected'))
          .toBe((selectedTabIndex === i).toString())
      )
    });

    it('should set focus on active tab', () => {
      expect(document.activeElement).toBe(tabEls[selectedTabIndex])
    });

    it('should set "activeTab" field correctly', () => {
      expect(tabCtrl.activeTab).toBe(tabEls[selectedTabIndex])
    });

    it('should set aria-expanded on tabpanel elements properly', () => {
      Array.from(document.body.querySelectorAll('[role=tabpanel]'))
           .forEach((tabpanel, i) =>
             expect(tabpanel.getAttribute('aria-expanded'))
               .toBe((selectedTabIndex === i).toString())
           )
    });
  });

  describe('mouseEvents', () => {
    const selectedTabIndex = 1;

    let setActiveTabSpy;

    beforeEach(() => {
      setActiveTabSpy = jest.spyOn(tabCtrl, 'setActiveTab')
    });

    it('should call "setActiveTab" when tab element clicked', () => {
      tabEls[selectedTabIndex].click();
      expect(setActiveTabSpy).toHaveBeenCalledWith(tabEls[selectedTabIndex])
    });

    it('should call "setActiveTab" when tab element clicked', () => {
      tabEls[selectedTabIndex].click();
      expect(setActiveTabSpy).toHaveBeenCalledWith(tabEls[selectedTabIndex])
    });

    // normally, for testing these kind of stuff I would use puppeteer, but didn't want to waste time for setting up
    // them. other way for simulating e.g. keyboard presses would be using library like Simulant.js (along with
    // jsdom-simulant)
  });
});