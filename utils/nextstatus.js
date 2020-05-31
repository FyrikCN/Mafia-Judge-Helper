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
}

function setNextToWitch(that) {
  console.log('Next is Witch!');
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
  console.log('Next is Guard!');
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
  console.log('Next is Hunter!');
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
  console.log('Next is Seer!');
  that.setData({
    status: '预言家',
    progresshint: '请标记预言家。',
    buttonhidden: true,
    cancelbuttonhidden: true,
    selectedplayers: 0,
    maximumplayers: 1
  })
}

module.exports = {
  whatIsNext: whatIsNext
}