//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: (new Date().toLocaleTimeString()),
    hour: new Date().getHours(),
    clicktext: ' Click me! ',
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-06-18'
    },
    userInfo: {},
    global: app.globalData.glb,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onTap: function(event) {
    this.setData({clicktext: event.type});
    console.log(event.type)
  },
  onLongPress: function(event) {
    this.setData({clicktext: event.type})
    console.log(event.type)
  },
  goToPreHome: function() {
    wx.navigateTo({
      url: '../prehome/prehome',
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: function() {
          wx.showModal({
            title: '提示',
            content: '当前微信的版本过低，请更新微信后再试。'
          })
        }
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '伞兵一号卢本伟 准备就绪！',
      path: '/page/index/index'
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
