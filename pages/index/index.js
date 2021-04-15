import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],//轮播图数据
    recommendList:[],//推荐歌单数据
    topList:[],//排行榜数据
    artistToplist:[],//歌手榜
    rewardToplist:[],//打赏榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let bannerListData = await request('/banner',{type:2});
    // let topListData = await request('/toplist/detail',{type:2});
   this.setData({
    bannerList:bannerListData.banners,
    // topList:topListData.list,

   })

   //获取推荐歌单数据
   let recommendListData = await request('/personalized',{limit:10});
   this.setData({
    recommendList:recommendListData.result
   })

   //获取排行榜数据
   /*
    需求分析:
      1.需要根据idx的值获取对应的数据
      2.的取值范围是0-20，我们需要0-4
      3.需要发送5次请求
    前++和后++的区别
      1.先看到的是运算符还是值
      2.如果先看到的是运算符就先运算再赋值
      3.如果先看到的值那么就先赋值再运算
  */
  let topListData = await request('/toplist/detail',{type:1});
  // splice(会修改原数组，可以对指定的数组进行增删改)slice(不会修改原数组)
  let toplistItem={name:topListData.list.name,tracks:topListData.list.tracks};
  // 不需要等待五次请求全部结束后才更新，用户体验较好，但是渲染次数会多一点
  this.setData({
    topList:topListData.list.splice(0,4),
   })
 //更新topList的状态值,放在此处更新会导致发送请求的过程中页面长时间白屏，用户体验差
  //  this.setData({
  //   topList:resultArr
  //  })
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