<template>
    <div class="list" v-loading="loading">
        <template v-if="!loading && !data || data.length === 0">
            <el-card class="list-item-none" ref="noList">
                <div class="no-content">抱歉暂时没有相关内容</div>
            </el-card>
        </template>
        <template>
           <el-card class="list-item" v-for="(item, i) in list" :key="i">
                <div class="qusetion-header">
                    <Tag :name="item.subject_category" />
                    <span class="question-title">{{item.subject_title}}</span>
                </div>
                <div class="question-description-wrap" v-show="!item.toggle"> 
                    <!-- <p class="question-description" v-html="setDescription(item.subject_content)"></p> -->
                    <!-- <div class="open">
                        <span @click="open(i)">展开全文</span>
                    </div> -->
                </div>
                <div class="read-all">
                    <span class="read" @click="handleClick(item)">查看答案</span>
                    <!-- <i class="iconfont icon-shoucang" @click="collection(i)" v-show="!item.isCollection"></i>
                    <i class="iconfont icon-star__easyico collection" @click="cancelCollection(i)" v-show="item.isCollection"></i> -->
                </div>
                <!-- <div class="question-content-wrap" v-show="item.toggle">
                    <p class="question-content" v-html="setDescription(item.content)"></p>
                    <p class="flod" @click="open(i)">折叠</p>
                </div> -->
                <!-- <Modal></Modal> -->
            </el-card>
        </template>
    </div>
</template>

<script>
import Tag from './tag'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { deepCopy } from '@/utils/util'

const renderer = new marked.Renderer()
marked.setOptions({
    renderer: renderer,
    highlight: function(code) {
    return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
})
export default {
    components: {
        Tag
    },
    props: {
        loading: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    computed: {
        list () {
           let arrs = deepCopy(this.data)
           for (let i = 0; i < arrs.length; i++) {
               arrs[i].isCollection = false
           }
           return arrs
        }
    },
    methods: {
        setDescription (html) {
            return marked(html).replace(/<pre>/g, "<pre class='hljs'/>")
        },
        setsetContent (html) {
            return marked(html).replace(/<pre>/g, "<pre class='hljs'/>")
        },
        // open (i) {
        //     let list = this.data
        //     list[i].toggle = !list[i].toggle
        //     this.data = list
        // }
        handleClick(item) {
            // let html = marked(item.subject_content).replace(/<pre>/g, "<pre class='hljs'/>")
            // this.$alert(html, item.subject_title, {
            //     showConfirmButton: false,
            //     dangerouslyUseHTMLString: true
            // })
            this.$router.push({name: 'detailed', query: {id: item.subject_id}})
        },
        collection (i) {
            // let list = this.data
            // list[i].isCollection = !list[i].isCollection
            // this.data = list
            this.list[i].isCollection = true
        },
        cancelCollection (i) {
           
        }
    },
    watch: {
        // 深度监听，可监听到对象、数组的变化
        list: {
            handler (val, oldVal) {
                console.log(val)
            },
            deep: true
        }
    }
}
</script>

<style lang="less" scoped>
.list-item-none{
    margin-top: 15px;
    .no-content{
        text-align: center;
        font-size: 14px;
    }
}
.list-item{
    height: 100px;
    margin-top: 10px;
    cursor: pointer;
    position: relative;
    .qusetion-header{
        height: 30px;
        line-height: 30px;
        .question-title{
            display: inline-block;
            margin-left: 15px;
            font-weight: bold;
        }
    }
   .question-description-wrap{
       
    }
    .read-all{
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
        span{
            float: right;
            font-size: 14px;
        }
        i{
            font-size: 20px;
            float: right;
            margin-right: 10px;
        }
        .collection{
            color:#ffd200;
        }
    }
}
</style>
