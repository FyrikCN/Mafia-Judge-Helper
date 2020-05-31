function setSeer(that) {
  var checkedId = that.data.statuschange.checked;
  var player = 'playersstatus[' + checkedId + ']';
  var statuschange = 'statuschange';
  that.setData({
    [player + '.identity']: '预言家',
    [player + '.icon']: "../../img/seer.jpg",
    [player + '.bordercolor']: 'transparent',
    [player + '.checked']: false,
    [statuschange + '.checked']: -1,
    status: '验人',
    progresshint: '今晚你要查验谁的身份？',
    buttonhidden: true,
    cancelbuttonhidden: true,
    selectedplayers: 0,
    maximumplayers: 1
  })
}

function detect(that) {
  var checkedId = that.data.statuschange.checked;
  var player = 'playersstatus[' + checkedId + ']';
  var statuschange = 'statuschange';
  var seerstatus = 'senioridentities[3]';
  that.setData({
    [seerstatus + '.goodguy']: that.data.playersstatus[checkedId].identity != '狼人'
  })
  that.setData({
    [player + '.bordercolor']: 'transparent',
    [player + '.checked']: false,
    [statuschange + '.checked']: -1,
    status: '验人结果',
    progresshint: '你验到的人是 ',
    buttonhidden: false,
    cancelbuttonhidden: true,
    selectedplayers: 0,
    maximumplayers: 0
  })
}

module.exports = {
  setSeer: setSeer,
  detect: detect
}