import request from '@/utils/request'


/**
 * 获取文章列表数据
 * channel_id  timestamp  with_top
 */
export const getActive = ({
    //频道id
    channel_id,
    // 时间戳
    timestamp,
    // 是否包含置顶 0不包含置顶 1包含置顶
    with_top
}) => {
    return request.get('/app/v1_1/articles', {
        params: {
            channel_id,
            timestamp,
            with_top
        }
    })
}



/**
 * 不感兴趣文章
 * target
 */
 export const disLikeActive = (id) => {
     return request.post('/app/v1_0/article/dislikes',{
        //  文章id
        target:id
     })
 }