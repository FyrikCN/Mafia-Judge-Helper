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
    filteredSeniors: [0, 1, 2],
    playersstatus: [
      {id: 0, identity: '', checked: false, loved: false, shot: false, guarded: false,
      saved: false, poisoned: false, killed: false, dead: false, silenced: false, bordercolor: ""}
    ],
    senioridentities: [
      {identity: '女巫', cansave: true, canpoison: true, saveusedtoday: false},
      {identity: '守卫', guard: -1},
      {identity: '猎人', canshoot: true},
      {identity: '预言家', goodguy: true}
    ],
    statuschange: {
      checked: -1,
      killed: -1,
      saved: -1,
      poisoned: -1,
      loved: [-1, -2],
      shot: -1,
      guarded: -1,
      silenced: -1
    },
    sheriffcandidates: [],
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
    this.setData({filteredSeniors: this.data.identitiesDetails.seniorSelected});
    this.createPlayers(this.data.identitiesDetails.totalPlayers);
    this.nightTime(this.data.daynum);
    this.setData({maximumplayers: this.data.identitiesDetails.werewolfAmount});
  },

  nightTime(daynum) {
    this.cupid(daynum);
  },

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
      else if (this.data.selectedplayers != this.data.maximumplayers) 
      {
        //console.log(id + " is a number");
        this.setData({
          [number + '.bordercolor']: "red",
          [number + '.checked']: true,
          selectedplayers: this.data.selectedplayers + 1
        });
      }

      this.setData({buttonhidden: (this.data.selectedplayers >= this.data.maximumplayers ? false : true)})
      // 竞选警长时，仅当选择了任意名玩家后才会显示按钮，避免错误操作。
      if (this.data.status == '竞选警长')
        this.setData({buttonhidden: (this.data.selectedplayers == 0 ? true : false)})

      //if (this.data.status == '守护' || this.data.status == '猎人')
      //{
        var statuschange = 'statuschange';
        this.setData({
          [statuschange + '.checked']: id
        })
      //}
    }
  },

  selectionconfirmednight() {
    var werewolf = require('../../utils/werewolf.js');
    var witch = require('../../utils/witch.js');
    var guard = require('../../utils/guard.js');
    var hunter = require('../../utils/hunter.js');
    var seer = require('../../utils/seer.js');
    var nextStatus = require('../../utils/nextstatus.js');
    if (this.data.daynum == 1)  // 第 1 天
    {
      if (this.data.dayornight == '黑夜')  // 黑夜
      {
        if (this.data.status == '狼人')  // 狼人阶段
          werewolf.setWerewolves(this);

        else if (this.data.status == '狼刀')  // 狼刀阶段
        {
          werewolf.kill(this);
          nextStatus.whatIsNext(this);
        }

        else if (this.data.status == '女巫')  // 女巫阶段
          witch.setWitch(this);

        else if (this.data.status == '解药')  // 解药阶段
          witch.save(this);

        else if (this.data.status == '毒药')  // 毒药阶段
        {
          witch.poison(this);
          nextStatus.whatIsNext(this);
        }

        else if (this.data.status == '守卫')  // 守卫阶段
          guard.setGuard(this);

        else if (this.data.status == '守护')  // 守护阶段
        {
          guard.protect(this);
          nextStatus.whatIsNext(this);
        }

        else if (this.data.status == '猎人')  // 猎人阶段
          hunter.setHunter(this);

        else if (this.data.status == '开枪状态')  // 开枪状态
        {
          hunter.canIShoot(this);
          nextStatus.whatIsNext(this);
        }

        else if (this.data.status == '预言家')  // 预言家阶段
          seer.setSeer(this);

        else if (this.data.status == '验人')  // 验人阶段
        {
          seer.detect(this);
        }

        else if (this.data.status == '验人结果')  // 验人结果
        {
          nextStatus.whatIsNext(this);
        }
      }
    }
  },

  selectionconfirmedday() {
    var sheriff = require('../../utils/sheriff.js');
    if (this.data.status == '竞选警长')
      sheriff.setSheriffCandidates(this);
    
    else if (this.data.status == '警上发言')
      sheriff.candidatesSpeach(this);
  },

  selectioncancelednight() {
    var nextStatus = require('../../utils/nextstatus.js');
    // 如果女巫没有使用或不能使用解药
    if (this.data.status == '解药')
    {
      this.setData({
        status: '毒药',
      })
      // 如果女巫没有毒药
      if (!this.data.senioridentities[0].canpoison)
      {
        this.setData({
          progresshint: '女巫已经没有毒药了。',
          buttonhidden: true,
          selectedplayers: 0,
          maximumplayers: -1,
        })
      }
      // 如果女巫仍有毒药
      else
      {
        this.setData({
          progresshint: '今晚要毒谁？',
          buttonhidden: true,
          selectedplayers: 0,
          maximumplayers: 1,
        })
      }
    }

    else if (this.data.status == '毒药')
    {
      nextStatus.whatIsNext(this);
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
      if (this.data.identitiesDetails.seniorSelected.includes(5))
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
      if (this.data.identitiesDetails.seniorSelected.includes(4))
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