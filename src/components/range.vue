<template>
    <div class="range">
        <div class="range-bar" :class="rangeStatus ? 'success' : ''">
            <i @mousedown="rangeMove" :class="rangeStatus ? successIcon : startIcon"></i>
            {{rangeStatus ? successText : startText}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 成功之后的函数
        successFun: {
            type: Function
        },
        // 成功图标
        successIcon: {
            type: String,
            default: 'el-icon-success'
        },
        successText: {
            type: String,
            default: '验证成功'
        },
        // 开始文字
        startText: {
            type: String,
            default: '请拖住滑块，拖到最右边'
        },
        //开始的图标
        startIcon: {
            type: String,
            default: 'el-icon-d-arrow-right'
        },
        // 失败之后的函数
        errorFun: {
            type: Function
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            disX: 0,
            rangeStatus: false
        }
    },
    methods: {
        rangeMove (e) {
            let ele = e.target
            let startX = e.clientX;
            // 
            let eleWidth = ele.offsetWidth
            // 外框宽度
            let parentWidth = ele.parentElement.offsetWidth
            // 最大位移量
            let MaxX = parentWidth - eleWidth
            if (this.rangeStatus) {
                return false
            }
            document.onmousemove = e => {
                let endX = e.clientX
                this.disX = endX - startX
                // 小于边界
                if (this.disX <= 0){
                    this.disX = 0
                }
                // 大于边界
                if (this.disX >= MaxX - eleWidth) {
                    this.disX = MaxX
                }
                ele.style.transition = '.1s all'
                ele.style.transform = 'translateX(' + this.disX + 'px)' 
                e.preventDefault()
            }
            document.onmouseup = () => {
                if (this.disX !== MaxX) {
                    // 滑块未到最末端
                    ele.style.transition = '.5s all'
                    ele.style.transform = 'translateX(0)'
                    // 执行失败方法
                    this.errorFun && this.errorFun()
                } else {
                    // 滑块已到最末端
                    this.rangeStatus = true
                    if (this.status) {
                        this.$parent[this.status] = true
                    }
                    // 执行成功方法
                    this.successFun && this.successFun()
                }
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin range-flex{
    display: flex;
    justify-content: center;
    align-items: center;
}
.range{
    .range-bar{
        height: 35px;
        position: relative;
        transition: 1s all;
        background-color: #e9e9e9;
        color: #585858;
        @include range-flex;
        i{
            width: 35px;
            height: 35px;
            background-color: #ffffff;
            position: absolute;
            left: 0;
            border: 1px solid #d8d8d8;
            cursor: pointer;
            font-size: 24px;
            @include range-flex;
        }
        &.success{
            background-color: #58cb1b;
            color: #ffffff;
            i{
                color: #58cb1b;
            }
        }
    }
}
</style>
