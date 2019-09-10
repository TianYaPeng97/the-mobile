<template>
  <div>
      <!-- 不能用v-mobile  因为props是单向的 -->
    <van-dialog :showConfirmButton="false" 
    closeOnClickOverlay :value="value" @input="$emit('input',$event)">
    <!-- 第一页数据 -->
      <van-cell-group v-show="!showReports">
        <van-cell title="不感兴趣"  icon="location-o" @click="handle('dislike')"/>
        <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="showReports=false"/>
        <van-cell title="拉黑作者" icon="location-o" @click="handle('balcklist')"/>
      </van-cell-group>
      <!-- 举报文章-->
       <van-cell-group v-show="showReports">
        <van-cell is-link arrow-direction="left" @click="showReports=true"/>
        <van-cell title="标题夸张" />
        <van-cell title="低俗色情" />
        <van-cell title="错别字多"/>
        <van-cell title="旧闻重复"/>
        <van-cell title="广告软文"/>
        <van-cell title="内容不实"/>
        <van-cell title="涉嫌违法范围"/>
        <van-cell title="侵权"/>
        <van-cell title="其他问题"/>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { disLikeActive } from '@/api/active'
export default {
  name: "MoreActions",
  props:{
      value:{
          type:Boolean,
          required:true
      },
      active:{
        type:Object,
        required:true
      }
  },
  data() {
    return {
      showReports:false
    };
  },
  methods: {
    handle(type){
      switch(type) {
        case 'dislike':
          // 不感兴趣  
          break
        case 'balcklist':
          // 拉黑作者
          break
      }
    },

    // 不感兴趣
    async dislike() {
      try {
        await disLikeActive(this.active.art_id)
        this.$toast.success('操作成功')
        this.$emit('handleSuccess')
      } catch(error) {
        this.$toast.fail('操作失败')
      }
    }
  }
};
</script>

<style>
</style>