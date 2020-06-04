function setSheriffCandidates(that) {
  var candidates = [];
  var length = 0;
  for (let i = 0; i < that.data.identitiesDetails.totalPlayers; i++) {
    if (that.data.playersstatus[i].checked == true) {
      candidates.push(i);
    }
  }
  that.setData({
    sheriffcandidates: candidates
  })
  length = candidates.length;
  var firstSpeaker = candidates[new Date().getSeconds() % length];
  var leftorright = (new Date().getSeconds() % 2 == 0 ? '左边' : '右边');
  var candidatesWithNumber = '';
  for (let i = 0; i < length; i++) {
    candidatesWithNumber += that.data.sheriffcandidates[i] + 1 + '号，';
  }
  console.log(firstSpeaker);
  that.setData({
    status: '警上发言',
    confirmmove: '发言结束',
    progresshint: '上警玩家有：' + candidatesWithNumber + '根据游戏时间，从'
                  + firstSpeaker + '号开始，朝' + leftorright + '发言。',
    buttonhidden: false,
    selectedplayers: 0,
    maximumplayers: 0,
  })
}

function candidatesSpeach(that) {
  for (let i = 0; i < that.data.identitiesDetails.totalPlayers; i++) {
    if (that.data.playersstatus[i].checked == true) {
      var player = 'playersstatus[' + i + ']';
      that.setData({
        [player + '.bordercolor']: 'transparent',
        [player + '.checked']: false
      })
    }
  }
  that.setData({
    status: '选择警长',
    confirmmove: '确认警长',
    progresshint: '请标记警长。',
    buttonhidden: true,
    selectedplayers: 0,
    maximumplayers: 1,
  })
}

module.exports = {
  setSheriffCandidates: setSheriffCandidates,
  candidatesSpeach: candidatesSpeach
}