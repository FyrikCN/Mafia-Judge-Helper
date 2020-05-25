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
    senioridentities: [
      {identity: '女巫', cansave: true, canpoison: true, saveusedtoday: false},
      {identity: '守卫', guard: -1},
      {identity: '猎人', canshoot: true}
    ],
    statuschange: {
      killed: -1,
      saved: -1,
      poisoned: -1,
      loved: [-1, -2],
      shot: -1,
      guarded: -1,
      silenced: -1
    },
    selectedplayers: 0,
    maximumplayers: 0,
    bordercolor: "transparent",
    daynum: 1,
    dayornight: '黑夜',
    status: "狼人",
    progresshint: "请标记狼人。",
    progresshidden: false,
    buttonhidden: true,
    cancelbuttonhidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({identitiesDetails: app.globalData.identitiesDetails});
    this.createPlayers(this.data.identitiesDetails.totalPlayers);
    this.nightTime(this.data.daynum);
    this.setData({maximumplayers: this.data.identitiesDetails.werewolfAmount});
  },

  nightTime(daynum) {
    //this.robber();
    this.cupid(daynum);
    /*
    this.werewolf(daynum);
    this.witch(daynum);
    this.guard(daynum);
    this.hunter(daynum);
    this.elder(daynum);
    this.seer(daynum);
    this.dayTime(daynum);
    */
  },
  dayTime(daynum) {},

  werewolf(daynum) {
    if (daynum == 1){}
  },

  playertapped(e) {
    var id = e.target.id;
    //当 id 为数字时执行，也即点击了玩家的头像时执行
    if (!(isNaN(id) || id == ""))
    {
      var number = 'playersstatus[' + id + ']';

      //若此玩家已被选择，可以取消选中
      if (this.data.playersstatus[id].checked == true)
      {
        this.setData({
          [number + '.checked']: false,
          [number + '.bordercolor']: "transparent",
          selectedplayers: this.data.selectedplayers - 1
        })
      }
      //若此玩家未被选中，且当还未选择足够的玩家时，执行
      else if (this.data.selectedplayers < this.data.maximumplayers) 
      {
        //console.log(id + " is a number");
        this.setData({
          [number + '.bordercolor']: "red",
          [number + '.checked']: true,
          selectedplayers: this.data.selectedplayers + 1
        });
      }

      this.setData({buttonhidden: (this.data.selectedplayers == this.data.maximumplayers ? false : true)})

      if (this.data.daynum == 1)  // 第 1 天
      {
        if (this.data.dayornight == '黑夜')  // 黑夜
        {
          if (this.data.status == '狼人')  // 狼人阶段
          {
          }
          if (this.data.status == '狼刀')  //狼刀阶段
          {
          }
        }
      }
    }
  },

  selectionconfirmed() {

    if (this.data.daynum == 1)  // 第 1 天
    {
      if (this.data.dayornight == '黑夜')  // 黑夜
      {
        if (this.data.status == '狼人')  // 狼人阶段
        {
          for (let i = 0; i < this.data.identitiesDetails.totalPlayers; i++) {
            var player = 'playersstatus[' + i + ']';
            if (this.data.playersstatus[i].checked == true) {
              this.setData({
                [player + '.identity']: '狼人',
                [player + '.icon']: "../../img/werewolf.jpg",
                [player + '.bordercolor']: 'transparent',
                [player + '.checked']: false,
              })
            }
          }
          this.setData({
            status: "狼刀",
            buttonhidden: true,
            progresshint: "请标记狼刀对象。",
            selectedplayers: 0,
            maximumplayers: 1
          })
        }

        else if (this.data.status == '狼刀')  // 狼刀阶段
        {
          for (let i = 0; i < this.data.identitiesDetails.totalPlayers; i++) {
            var player = 'playersstatus[' + i + ']';
            var statuschange = 'statuschange';
            if (this.data.playersstatus[i].checked == true) {
              this.setData({
                [player + '.gray']: 'gray',
                [player + '.bordercolor']: 'transparent',
                [player + '.checked']: false,
                [player + '.killed']: true,
                [statuschange + '.killed']: i
              })
            }
          }
          this.setData({
            status: "女巫",
            buttonhidden: true,
            progresshint: "请标记女巫。",
            selectedplayers: 0,
            maximumplayers: 1
          })
        }

        else if (this.data.status == '女巫')  // 狼刀阶段
        {
          for (let i = 0; i < this.data.identitiesDetails.totalPlayers; i++) {
            var player = 'playersstatus[' + i + ']';
            if (this.data.playersstatus[i].checked == true) {
              this.setData({
                [player + '.identity']: '女巫',
                [player + '.icon']: "../../img/witch.jpg",
                [player + '.bordercolor']: 'transparent',
                [player + '.checked']: false,
                status: "解药",
                selectedplayers: 0,
                maximumplayers: 0
              })
            }
            if (this.data.playersstatus[i].killed == true) {
              if (this.data.senioridentities[0].cansave)
              {
                this.setData({
                  progresshint: "今晚 " + (i + 1) + " 号玩家死亡，是否使用解药？",
                  cancelbuttonhidden: false,
                  cancelmove: "不使用"
                })
              }
            }
          }
        }

        else if (this.data.status == '解药')
        {
          var statuschange = 'statuschange';
          var player = 'playersstatus[' + this.data.statuschange.killed + ']';
          var witchstatus = 'senioridentities[0]';
          this.setData({
            [player + '.killed']: false,
            [player + '.gray']: '',
            status: '毒药',
            selectedplayers: 0,
            maximumplayers: 1,
            progresshint: '今晚要毒谁？',
            buttonhidden: true,
            [statuschange + '.saved']: this.data.statuschange.killed,
            [statuschange + '.killed']: -1,
            [witchstatus + '.cansave']: false,
            [witchstatus + '.saveusedtoday']: true
          })
        }
      }
    }
  },

  createPlayers(total) {
    //console.log(total + " players in total.");
    var arr = [];
    for (let i = 0; i < total; i++) {
      arr.push({id: i, identity: '平民', checked: false, loved: false,
      shot: false, guarded: false, saved: false, poisoned: false, 
      killed: false, dead: false, silenced: false, bordercolor: 'transparent',
      icon: "../../img/unknow.jpg", gray: ''})
    };
    this.setData({
      playersstatus: arr
    });
  },

  //神民中有盗贼时，将默认的狼人阶段改为盗贼阶段
  robber(daynum) {
    // 是否是第一天
    if (daynum == 1)
    {
    // 本局是否包含丘比特
      if (this.data.identitiesDetails.seniorSelected.includes("5"))
      {
        this.setData({
          status: "盗贼",
          progresshint: "请标记盗贼。",
          maximumplayers: 1
        })
      }
    }
  },

  //神民中有丘比特时，将默认的狼人阶段改为丘比特阶段
  cupid(daynum) {
    console.log(this.data.identitiesDetails.seniorSelected);
    // 是否是第一天
    if (daynum == 1)
    {
    // 本局是否包含丘比特
      if (this.data.identitiesDetails.seniorSelected.includes("4"))
      {
        this.setData({
          status: "丘比特",
          progresshint: "请标记丘比特。",
          maximumplayers: 1
        })
      }
    }
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