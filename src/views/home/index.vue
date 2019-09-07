<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="黑马头条" fixed></van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs animated>
      <van-tab v-for="index in 8" :title="'标签' + index" :key="index">
        <!-- 文章列表数据 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },

  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
/* 在scoped中书写的样式，动态生成的标签或者子组件中不可用 */
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
</style>