// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {
      arrInside: [0, 1, 2]
    },
    arrOutside: [0, 1, 2]
  },

  onLoad: function (options) {
    if(this.data.obj.arrInside.includes('1'))
      console.log('arrInside includes \'1\'');
    else
      console.log('arrInside doesn\'t includes \'1\'');
    if(this.data.arrOutside.includes(1))
      console.log('arrOutside includes 1');
    else
      console.log('arrOutside doesn\'t includes 1');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    wx.getNetworkType({
      success: function(res) {
        // networkType字段的有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        if (res.networkType == 'wifi') {
          wx.showToast({
            title: '伞兵一号已空降！'
          })
        } 
        else {
          wx.showToast({ 
            title: '当前为非Wifi环境' 
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})