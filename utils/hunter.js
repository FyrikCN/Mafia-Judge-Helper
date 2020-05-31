function setHunter(that) {
  var checkedId = that.data.statuschange.checked;
  var player = 'playersstatus[' + checkedId + ']';
  var statuschange = 'statuschange';
  var gunnerstatus = 'senioridentities[2]';
  that.setData({
    [gunnerstatus + '.canshoot']: !that.data.playersstatus[checkedId].poisoned
  })
  that.setData({
    [player + '.identity']: '猎人',
    [player + '.icon']: "../../img/hunter.jpg",
    [player + '.bordercolor']: 'transparent',
    [player + '.checked']: false,
    [statuschange + '.checked']: -1,
    status: '开枪状态',
    progresshint: '猎人今晚的开枪状态为 ',
    buttonhidden: false,
    cancelbuttonhidden: true,
    selectedplayers: 0,
    maximumplayers: 0
  })
}

function canIShoot(that) {
}

module.exports = {
  setHunter: setHunter,
  canIShoot: canIShoot
}