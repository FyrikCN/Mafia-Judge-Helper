function whatIsNext(that) {
  var nextSeniors = that.data.filteredSeniors;
  if (nextSeniors.includes(1))  // 本局有女巫
  {
    setNextToWitch(that);
    that.data.filteredSeniors = that.data.filteredSeniors.filter(function(value, index, arr)
    { return value != 1;});
  }
  
  else if (nextSeniors.includes(3))  // 本局有守卫
  {
    setNextToGuard(that);
    that.data.filteredSeniors = that.data.filteredSeniors.filter(function(value, index, arr)
    { return value != 3;});
  }

  else if (nextSeniors.includes(2))  // 本局有猎人
  {
    setNextToHunter(that);
    that.data.filteredSeniors = that.data.filteredSeniors.filter(function(value, index, arr)
    { return value != 2;});
  }

  else if (nextSeniors.includes(0))  // 本局有预言家
  {
    setNextToSeer(that);
    that.data.filteredSeniors = that.data.filteredSeniors.filter(function(value, index, arr)
    { return value != 0;});
  }

  else  // 所有神职都已经执行完毕
  {
    setNextToDayTime(that);
    setNextToRunForSheriff(that);
  }
}

function setNextToWitch(that) {
  that.setData({
    status: "女巫",
    buttonhidden: true,
    cancelbuttonhidden: true,
    progresshint: "请标记女巫。",
    selectedplayers: 0,
    maximumplayers: 1
  })
}

function setNextToGuard(that) {
  that.setData({
    status: "守卫",
    buttonhidden: true,
    cancelbuttonhidden: true,
    cancelmove: '空守',
    progresshint: "请标记守卫。",
    selectedplayers: 0,
    maximumplayers: 1
  })
}

function setNextToHunter(that) {
  that.setData({
    status: '猎人',
    progresshint: '请标记猎人。',
    buttonhidden: true,
    cancelbuttonhidden: true,
    selectedplayers: 0,
    maximumplayers: 1
  })
}

function setNextToSeer(that) {
  that.setData({
    status: '预言家',
    progresshint: '请标记预言家。',
    buttonhidden: true,
    cancelbuttonhidden: true,
    selectedplayers: 0,
    maximumplayers: 1
  })
}

function setNextToDayTime(that) {
  that.setData({
    dayornight: '白天',
  })
}

function setNextToRunForSheriff(that) {
  that.setData({
    status: '竞选警长',
    confirmmove: '开始竞选',
    progresshint: '天亮了，开始竞选警长。请标记参与竞选的玩家。',
    buttonhidden: true,
    cancelbuttonhidden: true,
    selectedplayers: 0,
    maximumplayers: -1
  })
}

module.exports = {
  whatIsNext: whatIsNext
}