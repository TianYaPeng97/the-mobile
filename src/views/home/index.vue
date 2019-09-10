<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="黑马头条" fixed />

    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex"> 
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id">
        <!-- 下拉更新 -->
           <van-pull-refresh v-model="currentChannnel.pullLoading" @refresh="onRefresh" :success-text="successText">
               <!-- 文章列表数据 -->
        <van-list v-model="currentChannnel.loading" :finished="currentChannnel.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in currentChannnel.articles" :key="item.art_id.toString()" :title="item.title" >
          <div slot="label">
            <!-- 显示封面 -->
            <van-grid v-if="item.cover.type" :border="false" :column-num="3">
                <van-grid-item v-for="(img, index) in item.cover.images" :key="img + index">
                  <van-image height="80" :src="img">
                  <!-- 图片的加载提示 -->
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20"></van-loading>
                  </template>
                  <template v-slot:error>加载失败</template>
                </van-image> 
                </van-grid-item>
            </van-grid>
            <p>
              <span>{{item.aut_name}}</span>&nbsp;
              <span>{{item.comm_count}}</span>&nbsp;
              <span>{{item.pubdate | fmtDate}}</span>&nbsp;
              <van-icon name="cross" class="close" @click="handleActive(item)" />
            </p>
          </div>
          </van-cell>
        </van-list>
           </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出框 -->
    <more-action v-model="showMoreAction" :active="currentArticle" @handleSuccess="handleSuccess"></more-action>
  </div>
</template>

<script>
import { getDefulOrUserChannels } from '@/api/channel'
import { getActive } from "@/api/active"
import Vue from 'vue'
import MoreAction from './components/MoreAction'
import { Lazyload } from 'vant'

Vue.use(Lazyload)


export default {
  name: "Home",
  components:{
    MoreAction,
  },
  data() {
    return {
      //文章列表用的数据
      list: [],
      loading: false,
      finished: false,
      // 频道列表用的数据
      channels:[],
      // tabs组件可以找到当前的频道对象
      activeIndex:1,
      successText:'',
      showMoreAction:false,
      currentArticle:{}
    };
  },
  computed:{
      currentChannnel (){
        return this.channels[this.activeIndex]
      }
  },
  methods: {

   async onloadChannels(){
     try{
        const data = await getDefulOrUserChannels()
        //给所有频道的设置，时间戳和文章数组
        data.channels.forEach((channels) => {

          //每个点击的时间戳不一样所以设为空
          channels.timestamp = null
          channels.articles = []  //文章数组
          // 上拉加载
          channels.loading = false
          channels.finished = false
          // 下拉加载
          channels.pullLoading = false
        })
        this.channels = data.channels
        // eslint-disable-next-line
        console.log(data.channels)
     }catch(err){
      //eslint-disable-next-line
       console.log(err)
     }
    
    },
    // list组件的load
    async onLoad() {
      // 发送请求
      // 获取当前频道对象
      const data =  await getActive({
           channel_id: this.currentChannnel.id,
            timestamp: this.currentChannnel.timestamp || Date.now(),
            // 返回1包含置顶，返回0不包含
            with_top:0
      })
      //记录文章最后的时间戳

      //eslint-disable-next-line
      console.log(data)
        //  时间戳
      this.currentChannnel.timestamp = data.pre_timestamp
        // 文章数组
      this.currentChannnel.articles.push(...data.results)
      this.currentChannnel.loading = false
      if(data.results.length === 0) {
        this.currentChannnel.finished = true
      }
  },

   async onRefresh() {
     try {
       const data = await getActive({
         channel_id: this.currentChannnel.id,
            timestamp:Date.now(),
            // 返回1包含置顶，返回0不包含
            with_top:0
     })
     //加载完毕
      this.currentChannnel.pullLoading = false
      //把数据放到数组最前面（最新数据）
      this.currentChannnel.articles.unshift(...data.results)
      // 加载成功提示文案
      this.successText = `加载了${data.results.length}条数据`
     } catch(err) {
       //eslint-disable-next-line
       console.log(err)
     }
   },

    // 传递对象给MoreAction
   handleActive(item) {
     this.showMoreAction = true
     this.currentArticle = item
   },
   handleSuccess(){
    //  隐藏
     this.showMoreAction = false
    //  删除当前文章
    const articles = this.currentChannnel.articles
    const index = articles.findIndex((articles) => {
      return articles.art_id === this.currentChannnel.art_id
    })
    // 删除指定位置元素
    articles.splice(index,1)

   }
   
  },

  created(){
      // 加载频道列表
      // eslint-disable-next-line
      this.onloadChannels()
      
    }
}
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