<template>
    <span class="tag">{{name}}</span>
</template>

<script>
export default {
    props: {
        name: String
    }
}
</script>

<style lang="less" scoped>
.tag{
    height: 15px;
    line-height: 15px;
    padding: 3px 5px;
    display: inline-block;
    font-size: 14px;
    border: 1px solid #ffe0e1; 
    color: #ff656a;
    background: #ffeff0;
    border-radius: 3px;
    text-align: center;
}
</style>
