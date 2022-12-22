export function readCard() {
  const CVR_IDCard = document.getElementById('CVR_IDCard')
  try {
    const strReadResult = CVR_IDCard.ReadCard()
    console.log(CVR_IDCard.Name)
    console.log(CVR_IDCard.Sex)
    console.log(CVR_IDCard.CardNo)
    console.log(CVR_IDCard.ReadCard())
    const cardInfoForm = {}
    if (strReadResult === '0') {
      const cardInfoRules = {
        Name: '姓名',
        Sex: '性别',
        Nation: '民族',
        Born: '生日',
        Address: '地址',
        CardNo: '身份证号',
        IssuedAt: '签发机关',
        EffectedDate: '有效期限开始',
        ExpiredDate: '有效期限截止',
        SAMID: '模块号码',
        Pic: '照片路径',
        Picture: '照片编码',
        PictureLen: '编码长度'
      }
      Object.keys(cardInfoRules).map(item => {
        cardInfoForm[item] = CVR_IDCard[item]
      })
      return { ok: true, info: cardInfoForm }
    } else if (/图像编码/.test(strReadResult)) {
      const cardInfoRules = {
        Name: '姓名',
        Sex: '性别',
        Nation: '民族',
        Born: '生日',
        Address: '地址',
        CardNo: '身份证号',
        IssuedAt: '签发机关',
        EffectedDate: '有效期限开始',
        ExpiredDate: '有效期限截止',
        SAMID: '模块号码',
        Pic: '照片路径',
        Picture: '照片编码',
        PictureLen: '编码长度'
      }
      Object.keys(cardInfoRules).map(item => {
        cardInfoForm[item] = CVR_IDCard[item]
      })
      return { ok: true, info: cardInfoForm }
    } else {
      return { ok: false, error: strReadResult }
    }
  } catch (error) {
    return { ok: false, error: error }
  }
}
