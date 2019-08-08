var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();

Page({
    data: {
        bannerInfo: {
            'imgUrl': '',
            'name': ''
        },
        categoryFilter: false,
        filterCategory: [],
        goodsList: [],
        categoryId: 0,
        currentSortType: 'default',
        currentSortOrder: 'desc',
        pageNum: 1,
        pageSize: 1000
    },
    getData: function () {
        let that = this;
        util.request(api.GoodsHot).then(function (res) {
            if (res.success) {
                that.setData({
                    bannerInfo: res.data,
                });
                that.getGoodsList();
            }
        });
    },
    getGoodsList() {
        var that = this;

        util.request(api.GoodsList, {
            newly: 1,
            pageNum: that.data.pageNum,
            pageSize: that.data.pageSize,
            order: that.data.currentSortOrder,
            sort: that.data.currentSortType,
            categoryId: that.data.categoryId
        })
            .then(function (res) {
                if (res.success) {
                    that.setData({
                        goodsList: res.data.goodsList,
                        filterCategory: res.data.filterCategory
                    });
                }
            });
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.getData();
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示

    },
    onHide: function () {
        // 页面隐藏

    },
    onUnload: function () {
        // 页面关闭

    },
    openSortFilter: function (event) {
        let currentId = event.currentTarget.id;
        switch (currentId) {
            case 'categoryFilter':
                this.setData({
                    'categoryFilter': !this.data.categoryFilter,
                    'currentSortType': 'category',
                    'currentSortOrder': 'asc'
                });
                break;
            case 'priceSort':
                let tmpSortOrder = 'asc';
                if (this.data.currentSortOrder == 'asc') {
                    tmpSortOrder = 'desc';
                }
                this.setData({
                    'currentSortType': 'price',
                    'currentSortOrder': tmpSortOrder,
                    'categoryFilter': false
                });

                this.getData();
                break;
            default:
                //综合排序
                this.setData({
                    'currentSortType': 'default',
                    'currentSortOrder': 'desc',
                    'categoryFilter': false
                });
                this.getData();
        }
    },
    selectCategory: function (event) {
        let currentIndex = event.target.dataset.categoryIndex;
        this.setData({
            'categoryFilter': false,
            'categoryId': this.data.filterCategory[currentIndex].id
        });
        this.getData();

    }
})