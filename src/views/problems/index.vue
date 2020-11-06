<template>
    <div class="problems">
        <List :data="problems"/>
    </div>
</template>

<script>
import List from '../../components/list'
export default {
    components: {
        List
    },
    data () {
        return {
            problems: [
                {
                    title: '如何在组件内实现全屏遮罩',
                    classify: 'vue',
                    description: ''
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
