// pages/Duck/Duck.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    LastTravelTime:0,

  },


  Travel:function(e){
    var date = new Date()
    var time = date.getTime()
    this.setData({ LastTravelTime: time })
    wx.setStorageSync("LastTravelTime", time)
    console.log("Travel time = " + time)

    wx.showToast({
      title: '我出门啦' + util.formatTime(date),
      icon:'success',
      duration:5000,
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '旅行小鸭' })
    var _this = this
    wx.getStorage({
      key: 'LastTravelTime',
      success: function (res) {
        _this.setData({
          LastTravelTime: res.data,
        })

        console.log("LastTravelTime = " + _this.data.LastTravelTime)
      }
    })

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