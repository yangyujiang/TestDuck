//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World WxMp',
    name:'Old Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  changename:function(e){
    this.setData({
      name:'New Hello World'
    })

  },

  gotoBeatDog:function(e){
    wx.navigateTo({
      url: '../BeatDog/BeatDog'
    })
  },

  onLoad: function () {
    console.log('onLoad hahaha')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
