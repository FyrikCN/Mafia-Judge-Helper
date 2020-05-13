// components/seniorsinitializer/seniorsinitializer.js
Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '内容'
    },
    seniorvillageramount: {
      type: Number,
      value: 3
    },
    // 弹窗取消按钮文字
    btn_no: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    btn_ok: {
      type: String,
      value: '确定'
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true,
    seniorsidentities: [
      {value: 0, name: "预言家", checked: true},
      {value: 1, name: "女巫", checked: true},
      {value: 2, name: "猎人", checked: true},
      {value: 3, name: "守卫", checked: false},
      {value: 4, name: "丘比特", checked: false},
      {value: 5, name: "盗贼", checked: false},
      {value: 6, name: "长老", checked: false}
    ],

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    hidePopup: function (e) {
      this.setData({
        flag: !this.data.flag
      });
      console.log(e);
    },
    //展示弹框
    showPopup () {
      this.setData({
        flag: !this.data.flag
      });
      var up = "seniorsidentities[" + 3 + "].checked";
      if (this.data.seniorvillageramount == 4)
        this.setData({
          [up]: true
        })
    },

    _checkboxChange(e) {
      console.log(e);
      this.triggerEvent(
        "checkboxChange",
        {
          checked: e.detail.value
        });
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _error () {
      //触发取消回调
      this.triggerEvent("error")
    },
    _success () {
      //触发成功回调
      this.triggerEvent("success");
    }
  }
})
