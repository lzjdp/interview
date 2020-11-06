<template>
    <div class="detailed" v-loading="isLoading">
        <template v-if="!isLoading">
        <h2>{{content.subject_title}}</h2>
            <div class="content">
                <p v-html="setContent(content.subject_content)"></p>
            </div>
        </template>
    </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { mapActions } from 'vuex' 

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
    data () {
       return {
            isLoading: true,
            content: {}
       }
    },
    mounted () {
        this.init()
    },
    methods: {
        ...mapActions(['GetSubject']),
        init () {
            const id = this.$route.query.id
            this.GetSubject(id).then(res => {
                this.content = res.data
                this.isLoading = false
            }).catch(() => {
                this.isLoading = false
                this.$message.error('获取数据失败')
            })
        },
        setContent (html) {
            return marked(html).replace(/<pre>/g, "<pre class='hljs'/>")
        }
    }
}
</script>

<style lang="scss" scoped>
.detailed{
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
}
</style>
