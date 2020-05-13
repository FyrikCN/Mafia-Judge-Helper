// pages/gamesetting/gamesetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partlykill: "*狼人杀光所有神民或者所有平民时，狼人获胜。",
    fullykill: "*狼人需杀光所有人才能获胜。",
    gamemodeid: "gamemode-9",
    killingmodedesc: "*狼人杀光所有神民或者所有平民时，狼人获胜。"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    console.log(query.id);
    this.setData({gamemodeid: query.id});
    if(this.data.gamemodeid == "gamemode-12")
      this.setData({
        werewolfamount: 4,
        seniorvillageramount: 4,
        villageramount: 4
      });
    else if (this.data.gamemodeid == "gamemode-9" || this.data.gamemodeid == "gamemode-new")
      this.setData({
        werewolfamount: 3,
        seniorvillageramount: 3,
        villageramount: 3
      });
  },

  radiochange(e) {
      this.setData({
        killingmodedesc: (e.detail.value == "partly" 
        ? this.data.partlykill
        : this.data.fullykill)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.popup = this.selectComponent("#popup");
  },

  showPopup() {
    this.popup.showPopup();
  },
  _checkboxChange(e) {
    console.log(e.detail.checked.length);
  },
  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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