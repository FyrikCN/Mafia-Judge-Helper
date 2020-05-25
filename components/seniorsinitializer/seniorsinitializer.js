// components/seniorsinitializer/seniorsinitializer.js

const app = getApp();

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
      {value: 0, name: "预言家", checked: true,
        description: "-每晚可以查验一名玩家的身份。"},
      {value: 1, name: "女巫", checked: true,
        description: "-拥有一瓶解药和一瓶毒药。\n" +
                     "-每晚只能使用一瓶药。\n" +
                     "-只有第一晚可以自救。\n" +
                     "-使用过解药后，无法再得知死亡信息。\n" +
                     "-若同守同救，解药无效。"},
      {value: 2, name: "猎人", checked: true,
        description: "-被杀或被放逐时，可以开枪带走一名玩家。\n" +
                     "-被毒或殉情时，不能开枪。\n" +
                     "-每晚将由法官告知开枪状态。"},
      {value: 3, name: "守卫", checked: false,
        description: "-可以守护场上任意一名玩家不被狼人杀害。\n" +
                     "-不能连续两晚守护同一名玩家。\n" +
                     "-若同守同救，则守护失败。"},
      {value: 4, name: "丘比特", checked: false,
        description: "-第一夜睁眼选择场上任意两名玩家为情侣，被选择的两名玩家由法官提示睁眼确认。" +
                     "情侣不能互相告知身份。\n" +
                     "-情侣的一方死亡时，另一方同时殉情而死。\n" +
                     "-情侣同为好人或同为狼人时，丘比特为好人阵营。情侣为人狼恋时，丘比特阵营成为第三方阵营，" +
                     "需屠城才可以赢得比赛。\n" +
                     "-丘比特独活至最后也算作胜利。"},
      {value: 5, name: "盗贼", checked: false,
        description: "-盗贼于第一天睁眼，选择牌堆底剩余的两张身份中的其中一张。随即拥有其功能。\n" +
                     "-若牌堆底有狼人，盗贼必须选择狼人。\n" +
                     "-预言家对盗贼的查验身份为盗贼选择的身份。"},
      {value: 6, name: "长老", checked: false,
        description: "-长老被狼人杀两次才会死亡。\n" +
                     "-长老被女巫毒死或者被放逐出局时，所有神牌失去功能。"}
    ],
    modifiedseniorammount: 3,
    modified: false
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
    },
    //展示弹框
    showPopup () {
      this.setData({
        flag: !this.data.flag
      });

      //12人局默认配置中守卫设置为已选
      var up = "seniorsidentities[" + 3 + "].checked";
      if (this.data.seniorvillageramount == 4 && !this.data.modified)
      {
        this.setData({
          [up]: true,
          modifiedseniorammount: 4
        });
      }
    },

    _checkboxChange(e) {
      console.log(e);
      this.setData({
        modifiedseniorammount: e.detail.value.length,
        content: this.data.seniorsidentities[1].description
      });
      app.globalData.identitiesDetails.seniorSelected = e.detail.value;
      //console.log(this.data.modifiedseniorammount);
      this.triggerEvent(
        "checkboxChange",
        {
          checked: e.detail.value
        });
    },
    identitytap(e) {
      //console.log(e.currentTarget.id);
      this.setData({
        content: this.data.seniorsidentities[e.currentTarget.id].description
      })
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
      this.setData({modified: true});
      this.triggerEvent("success",
      {
        checkedamount: this.data.modifiedseniorammount
      });
    }
  }
})
