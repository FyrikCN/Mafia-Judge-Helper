function setWitch(that) {
  for (let i = 0; i < that.data.identitiesDetails.totalPlayers; i++) {
    if (that.data.playersstatus[i].checked == true) {
      var player = 'playersstatus[' + i + ']';
      that.setData({
        [player + '.identity']: '女巫',
        [player + '.icon']: "../../img/witch.jpg",
        [player + '.bordercolor']: 'transparent',
        [player + '.checked']: false,
        status: "解药",
        selectedplayers: 0,
        maximumplayers: 0
      })
    }
    if (that.data.playersstatus[i].killed == true) {
      if (that.data.senioridentities[0].cansave)
      {
        that.setData({
          progresshint: "今晚 " + (i + 1) + " 号玩家死亡，是否使用解药？",
          cancelbuttonhidden: false,
          cancelmove: "不使用"
        })
      }
    }
  }
}

function save(that) {
  var statuschange = 'statuschange';
  var player = 'playersstatus[' + that.data.statuschange.killed + ']';
  var witchstatus = 'senioridentities[0]';
  that.setData({
    [player + '.killed']: false,
    [player + '.gray']: '',
    status: '毒药',
    [statuschange + '.saved']: that.data.statuschange.killed,
    [witchstatus + '.cansave']: false,
    [witchstatus + '.saveusedtoday']: true
  });

  // 如果女巫今晚没有使用解药且还有毒药
  if (!that.data.senioridentities[0].saveusedtoday && that.data.senioridentities.canpoison)
  {
    that.setData({
      progresshint: '今晚要毒谁？',
      buttonhidden: true,
      selectedplayers: 0,
      maximumplayers: 1,
    })
  }
  // 如果女巫今晚使用了解药或者没有毒药
  else
  {
    that.setData({
      progresshint: '今晚女巫无法使用毒药。',
      buttonhidden: true,
      selectedplayers: 0,
      maximumplayers: -1, // 将最大值设为-1，避免触发用户头像点击事件
    })
  }
}

function poison(that) {
  for (let i = 0; i < that.data.identitiesDetails.totalPlayers; i++) {
    if (that.data.playersstatus[i].checked == true)
    {
      var player = 'playersstatus[' + i + ']';
      var statuschange = 'statuschange';
      var witchstatus = 'senioridentities[0]';
      that.setData({
        [player + '.gray']: 'gray',
        [player + '.bordercolor']: 'transparent',
        [player + '.checked']: false,
        [player + '.poisoned']: true,
        [statuschange + '.poisoned']: i,
        [witchstatus + '.canpoison']: false
      })
    }
  }
}

module.exports = {
  setWitch: setWitch,
  save: save,
  poison: poison
}