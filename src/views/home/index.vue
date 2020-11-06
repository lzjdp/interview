<template>
    <div class="home">
        <div class="classify">
            <el-card>
                <span class="classify-title">分类：</span>
                <span :class="[{ active: activeKey === tag.key}, 'tag']" v-for="tag in tags" :key="tag.key" @click="selectTags(tag.key)">{{tag.name}}</span>
            </el-card>
        </div>
        <div class="content">
            <List :loading="listLoading" :data="listData" />
            <div class="list-footer" v-show="showListFooter">
                <span v-show="moreLoading">加载中...</span>
                <span v-show="moreError">加载失败</span>
                <span v-show="noMore">已经显示全部</span>
            </div>
        </div>
        <div class="new" @click="add">+</div>
        <el-dialog title="新增试题" :visible.sync="addVisible">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
                <el-form-item label="题目" prop="subject_title">
                    <el-input v-model="addForm.subject_title"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="subject_category">
                    <el-select v-model="addForm.subject_category" placeholder="请选择">
                        <el-option
                            v-for="item in categorys"
                            :key="item.key"
                            :label="item.name"
                            :value="item.key"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="答案" prop="subject_content">
                    <el-input type="textarea" v-model="addForm.subject_content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelForm('addForm')">取消</el-button>
                <el-button type="danger" @click="resetForm('addForm')">重置</el-button>
                <el-button type="primary" @click="submitForm('addForm')">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>     

<script>
import List from '../../components/list'
import { getToken } from '@/utils/util'
import { mapActions } from 'vuex'
export default {
    components: {
        List
    },
    data () {
        return {
            // 当前页
            current: 1,
            // 每页数量
            pageSize: 8,
            // 试题总数
            total: 0,
            // 是否显示列表底部加载状态
            showListFooter: false,
            // 获取更多加载中
            moreLoading: false,
            // 获取更多加载失败
            moreError: false,
            // 没有更多了
            noMore: false,
            addVisible: false,
            // 当前选中的分类
            activeKey: 'all',
            listLoading: true,
            addForm: {
                subject_title: '',
                subject_category: '',
                subject_content: '',
                subject_createtime: ''
            },
            rules: {
                subject_title: [
                    { required: true, message: '请输标题', trigger: 'blur'},
                ],
                subject_category: [
                    { required: true, message: '请选择试题类别'},
                ],
                subject_content: [
                    { required: true, message: '请输内容', trigger: 'blur'},
                ]
            },
            tags: [
                {
                    name: '全部',
                    key: 'all'
                },
                {   
                    name: 'Html',
                    key: 'html'
                },
                {
                    name: 'Css',
                    key: 'css'
                },
                {
                    name: 'Javascript',
                    key: 'js'
                },
                {
                    name: 'vue',
                    key: 'vue'
                },
                {
                    name: 'React',
                    key: 'react'
                },
                {
                    name: 'Uniapp',
                    key: 'uniapp'
                },
                {
                    name: 'Node.js',
                    key: 'node'
                },
                {
                    name: '小程序',
                    key: 'wechart'
                }
            ],
            listData: []
        }
    },
    computed: {
        categorys () {
            return this.tags.slice(1)
        }
    },
    mounted() {
       this.init()
       window.addEventListener('scroll', () => {
           // 向上滚动的高度
           let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
           // 可视区高度
           let clientHeight = document.documentElement.clientHeight
           // 网页实际高度
           let viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight
           if (scrollTop + clientHeight +110 > viewHeight) {
               this.fetchMore()
           }
       })
    },
    methods: {
        ...mapActions([
            'GetSubjects',
            'GetSubject',
            'CreateSubject'
        ]),
        // 初始化试题列表
        init () {
            let params = {
                current: this.current,
                pageSize: this.pageSize
            }
            this.GetSubjects(params).then(res => {
                this.total = res.total
                this.listData = res.data
                this.listLoading = false
            }).catch(() => {
                this.$message.error('数据获取失败')
            })
        },
        // 按分类选择
        selectTags (tag){
            this.activeKey = tag
            this.current = 1
            let params = null
            if (this.activeKey === 'all') {
                params = {
                    current: this.current,
                    pageSize: this.pageSize
                }
            } else {
                params = {
                    current: this.current,
                    pageSize: this.pageSize,
                    subject_category: this.activeKey
                }
            }
            this.GetSubjects(params).then(res => {
                this.total = res.total
                this.listData = res.data
            }).catch(() => {
                this.current -= 1
                this.$message.error('数据获取失败')
            })
        },
        // 新增试题
        add () {
            const hasLogin = getToken() ? true : false
           if (hasLogin) {
               this.addVisible = true
           } else {
               this.$message({
                   type: 'warning',
                   message: '您还未登陆，请先登陆！',
                   duration: 1000,
                   onClose: () => {
                       this.$router.push('/login')
                   }
               })
           }
        },
        // 重置新增表单
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        // 取消新增表单
        cancelForm (formName) {
            this.$refs[formName].resetFields()
            this.addVisible = false
        },
        // 添加新的面试题
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addForm.subject_createtime = new Date()
                    this.CreateSubject(this.addForm).then(res => {
                        this.addVisible = false
                        this.$refs[formName].resetFields()
                        this.$message.success('添加成功')
                    }).catch(() => {
                        this.addVisible = false
                        this.$refs[formName].resetFields()
                        this.$message.error('添加失败')
                    })
                }
                return false
            })
        },
        // 获取更多试题
        fetchMore (params) {
            const maxPage = Math.ceil(this.total / this.pageSize)
            if (this.current < maxPage) {
                this.current += 1
                let params = null
                if (this.activeKey === 'all') {
                    params = {
                        current: this.current,
                        pageSize: this.pageSize,
                    }
                } else {
                    params = {
                        current: this.current,
                        pageSize: this.pageSize,
                        subject_category: this.activeKey
                    }
                }
                this.showListFooter = true
                this.moreLoading = true
                this.GetSubjects(params).then(res => {
                    this.listData = this.listData.concat(res.data)
                    this.moreLoading = false
                }).catch(() => {
                    this.current -= 1
                    this.moreError = true
                })
            } else {
                this.showListFooter = true
                this.noMore = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$a: 980px;
$b: 30px;
.home{
    .classify{
        .classify-title{
            font-size: 16px;
            font-weight: bold;
        }
        .tag{
            font-size: 14px;
            margin-right: 15px;
            cursor: pointer;
        }
        .tag:hover, .active{
            color: #ea5349;
        }
    }
    .content{
        .list-footer{
            text-align: center;
            color: #333333;
            font-size: 14px;
            margin-top: 15px;
        }
    }
    .new{
        width: 60px;
        height: 60px;
        background: #ffd200;
        border-radius: 50%;
        color: #ffffff;
        line-height: 60px;
        text-align: center;
        position: absolute;
        top: 100px;
        right: calc((100% - #{$a})/4 - #{$b});
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
    }
}
</style>
