function setGuard(that) {
  for (let i = 0; i < that.data.identitiesDetails.totalPlayers; i++) {
    if (that.data.playersstatus[i].checked == true) {
      var player = 'playersstatus[' + i + ']';
      that.setData({
        [player + '.identity']: '守卫',
        [player + '.icon']: "../../img/guard.jpg",
        [player + '.bordercolor']: 'transparent',
        [player + '.checked']: false,
        status: "守护",
        progresshint: '今晚你要守护谁？',
        buttonhidden: true,
        cancelbuttonhidden: false,
        selectedplayers: 0,
        maximumplayers: 1
      })
    }
  }
}

function protect (that) {
  var player = 'playersstatus[' + that.data.statuschange.checked + ']';
  var statuschange = 'statuschange';
  var guardstatus = 'senioridentities[1]';
  that.setData({
    [player + '.bordercolor']: 'yellow',
    [guardstatus + '.guard']: that.data.statuschange.checked,
    [statuschange + '.guarded']: that.data.statuschange.checked,
    [player + '.checked']: false,
    [player + '.guarded']: true,
    [statuschange + '.checked']: -1,
  })
}

module.exports = {
  setGuard: setGuard,
  protect: protect
}