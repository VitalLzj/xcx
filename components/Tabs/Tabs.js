Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },
  data: {

  },
  methods: {
    handleItemClick(v) {
      const index = v.currentTarget.dataset.index;
      this.triggerEvent("tabsItemChange", { index: index });
    }
  }
})

