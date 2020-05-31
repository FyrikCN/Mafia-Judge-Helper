function setWerewolves(that) {
  //console.log(that.data.playersstatus[i].checked);
  for (let i = 0; i < that.data.identitiesDetails.totalPlayers; i++) {
    if (that.data.playersstatus[i].checked == true) {

      var player = 'playersstatus[' + i + ']';
      that.setData({
        [player + '.identity']: '狼人',
        [player + '.icon']: "../../img/werewolf.jpg",
        [player + '.bordercolor']: 'transparent',
        [player + '.checked']: false,
      })
    }
  }
  that.setData({
    status: "狼刀",
    buttonhidden: true,
    progresshint: "请标记狼刀对象。",
    selectedplayers: 0,
    maximumplayers: 1
  })
}

function kill(that) {
  for (let i = 0; i < that.data.identitiesDetails.totalPlayers; i++) {
    var player = 'playersstatus[' + i + ']';
    var statuschange = 'statuschange';
    if (that.data.playersstatus[i].checked == true) {
      that.setData({
        [player + '.gray']: 'gray',
        [player + '.bordercolor']: 'transparent',
        [player + '.checked']: false,
        [player + '.killed']: true,
        [statuschange + '.killed']: i
      })
    }
  }
}

module.exports = {
  setWerewolves: setWerewolves,
  kill: kill
}