export class TabController {
  constructor (container) {
    this.container = container
    this.tablist   = this.container.querySelector('[role=tablist]')
    this.tabs      = this.container.querySelectorAll('[role=tab]')
    this.tabpanels = this.container.querySelectorAll('[role=tabpanel]')
    this.activeTab = this.container.querySelector('[role=tab][aria-selected=true]')

    this._addEventListeners()
  }

  _addEventListeners () {
    const keyUpKeyCodes = [13, 32] // return or space

    for (let tab of this.tabs) {
      tab.addEventListener('click', e => {
        e.preventDefault()
        this.setActiveTab(tab)
      })
      tab.addEventListener('keyup', e => {
        if (keyUpKeyCodes.includes(e.keyCode)) {
          e.preventDefault()
          this.setActiveTab(tab)
        }
      })
    }
    this.tablist.addEventListener('keyup', e => {
      switch (e.keyCode) {
        case 35: // end key
          e.preventDefault()
          this.setActiveTab(this.tabs[this.tabs.length - 1])
          break
        case 36: // home key
          e.preventDefault()
          this.setActiveTab(this.tabs[0])
          break
        case 37: // left arrow
          e.preventDefault()
          let previous = [...this.tabs].indexOf(this.activeTab) - 1
          previous     = previous >= 0 ? previous : this.tabs.length - 1
          this.setActiveTab(this.tabs[previous])
          break
        case 39: // right arrow
          e.preventDefault()
          let next = [...this.tabs].indexOf(this.activeTab) + 1
          next     = next < this.tabs.length ? next : 0
          this.setActiveTab(this.tabs[next])
          break
      }
    })
  }

  setActiveTab (tab) {
    const id = tab.getAttribute('aria-controls')

    this.tabs.forEach(tab => {
      if (tab.getAttribute('aria-controls') === id) {
        tab.setAttribute('aria-selected', 'true')
        tab.focus()
        this.activeTab = tab
      } else {
        tab.setAttribute('aria-selected', 'false')
      }
    })

    this.tabpanels.forEach(tabpanel => {
      const ariaExpandedValue = (tabpanel.getAttribute('id') === id).toString()
      tabpanel.setAttribute('aria-expanded', ariaExpandedValue)
    })
  }
}