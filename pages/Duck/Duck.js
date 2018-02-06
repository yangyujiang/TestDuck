// pages/Duck/Duck.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastTravelTime: 0,
    returnTime: 0,
    travelTimeRangeMax: 10,
    travelTimeRangeMin: 1,

    items: [
      { name: 'Item1', value: '白米饭' },
      { name: 'Item2', value: '手抓饼' },
      { name: 'Item3', value: '泡面' },
    ],
    selectedItems: [],
    showDuck: true,
    travelingWhenLogout: false,
    idOfTimeout:0
  },


  Travel: function (e) {
    var date = new Date()
    var time = date.getTime()

    if (this.data.returnTime > time) {
      wx.showToast({
        title: '我快回来啦',
        icon: 'success',
        duration: 2000,
      })
    } else {

      var travelSecs = util.randomNum(this.data.travelTimeRangeMin, this.data.travelTimeRangeMax)
      var returnTime = time + travelSecs * 1000

      this.setData({
        lastTravelTime: time,
        returnTime: returnTime,
        showDuck: false,
        travelingWhenLogout: true,
      })
      wx.setStorageSync("TravelData", this.data)

      console.log("Travel time = " + util.formatTime(date))
      console.log(this.data)
      wx.showToast({
        title: '我出门啦' + travelSecs,
        icon: 'success',
        duration: 2000,
      })

      var _this = this
      var idOfTimeout = 
      setTimeout(function () {
        //要延时执行的代码 
        _this.setData({
          showDuck: true,
          travelingWhenLogout: false,
        })
        wx.setStorageSync("TravelData", this.data)
        wx.showToast({
          title: '我回来啦',
          icon: 'success',
          duration: 2000,
        })
      }, travelSecs*1000) //延迟时间 这里是1秒  

      this.setData({
        idOfTimeout:idOfTimeout
      })
    }
  },

  ItemsChanged: function (e) {
    console.log('ItemsChanged ', e.detail.value)
    this.setData({
      selectedItems: e.detail.value
    })
  },

  ImBack:function(e){
    wx.showToast({
      title: '我回来啦',
      icon: 'success',
      duration: 2000,
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '旅行小鸭' })
    var _this = this
    wx.getStorage({
      key: 'TravelData',
      success: function (res) {
        _this.setData({
          lastTravelTime: res.data.lastTravelTime,
          returnTime: res.data.returnTime,
          showDuck: res.data.showDuck,
          selectedItems: res.data.selectedItems,
          travelingWhenLogout: res.data.travelingWhenLogout,
        })

        if (_this.data.travelingWhenLogout) {
          var date = new Date()
          var time = date.getTime()
          if (_this.data.returnTime < time) {
            _this.setData(
              {
                showDuck: true,
                travelingWhenLogout: false,
              }
            )
            wx.showToast({
              title: '我回来啦',
              icon: 'success',
              duration: 2000,
            })
          }
        }
        console.log("lastTravelTime = " + _this.data.lastTravelTime)
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
    clearTimeout(this.data.idOfTimeout)
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