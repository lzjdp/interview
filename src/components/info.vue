<template>
    <div class="info" v-show="visible">
        <div class="error">
            <span class="error-icon">-</span>
            <span class="error-msg">{{message}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.info{
    height: 20px;
    border: 1px solid #e46800;
    background: #ffe4e4;
    border-radius: 3px;
    padding: 5px 10px;
    .error-icon{
        width: 16px;
        height: 16px;
        display: inline-block;
        line-height: 16px;
        border-radius: 50%;
        background: #ff4000;
        color: #ffffff;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }
    .error-msg{
        color: #333333;
        margin-left: 10px;
        font-size: 14px;
    }
}
</style>
