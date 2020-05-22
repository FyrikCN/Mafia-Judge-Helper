// pages/game/game.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identitiesDetails: {
      seniorSelected: [0, 1, 2],
      werewolfAmount: 3,
      seniorVillagerAmount: 3,
      villagerAmount: 3,
      totalPlayers: 9
    },
    playersstatus: [
      {id: 0, identity: '', checked: false, loved: false, shot: false, guarded: false,
      saved: false, poisoned: false, killed: false, dead: false, silenced: false, bordercolor: ""}
    ],
    bordercolor: "transparent",
    daynum: 1,
    dayornight: '黑夜',
    status: "狼人",
    progresshint: "请标记狼人。",
    progresshidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      identitiesDetails: app.globalData.identitiesDetails
    });
    this.createplayers(this.data.identitiesDetails.totalPlayers);
  },

  playertapped(e) {
    var id = e.target.id;
    
    //当 id 为数字时执行
    if (!(isNaN(id) || id == "")) {
      console.log(id + " is a number");
      var number = 'playersstatus[' + id + '].bordercolor';
      this.setData({[number]: "red"});
    }
  },

  createplayers(total) {
    //console.log(total + " players in total.");
    var arr = [];
    for (let i = 0; i < total; i++) {
      arr.push({id: i, identity: '平民', checked: false, loved: false, shot: false, guarded: false,
      saved: false, poisoned: false, killed: false, dead: false, silenced: false, bordercolor: 'transparent'})
    };
    this.setData({
      playersstatus: arr
    });
    //console.log(this.data.playersstatus[2].id);
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