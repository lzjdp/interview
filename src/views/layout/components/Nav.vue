<template>
    <div class="loginForm">
        <el-menu
            mode="horizontal"
            router
            :default-active="activeNavItem"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="onChange"
        >
            <div class="logo" @click="hanlderLogo">前端面试题集</div>
            <div v-if="isLogin" class="login">
                <span>您好：{{username}}</span>
                <span class="logout" @click="logout">退出登陆</span>
            </div>
            <div v-else class="noLogin">
                <span @click="handlerLogin">登陆/</span>
                <span @click="handlerRegister">注册</span>
            </div>
            <el-menu-item index="problems">经验总结</el-menu-item>
            <el-menu-item index="home">面试题</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { getToken } from '@/utils/util'
export default {
    computed: {
        ...mapState({
            activeNavItem: state => state.app.activeNavItem,
            username: state => state.user.username,
        }),
        isLogin () {
            const token = getToken()
            return token ? true : false
        }
    },
    methods: {
        ...mapMutations(['setActiveNav']),
        ...mapActions(['Logout']),
        hanlderLogo () {
            this.$router.push('/home')
        },
        onChange (name) {
            // this.$store.commit('setActiveNav', name)
            this.setActiveNav(name)
        },
        handlerLogin () {
            this.$router.push('/login')
        },
        handlerRegister () {
            this.$router.push('/register')
        },
        logout () {
            this.$confirm('确认退出登陆？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.Logout().then((res) => {
                    window.location.reload()
                }).catch(() => {
                    this.$message.error('退出失败')
                })
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.loginForm{
    width: 100%;
    .logo{
        display: inline-block;
        height: 60px;
        line-height: 60px;
        font-weight: bold;
        color: #ffd200;
        cursor: pointer;
    }
    .el-menu{
        padding: 0 20px;
        .el-menu-item{
            float: right;
        }
    }
    .noLogin{
        float: right;
        line-height: 60px;
        color: #ffd200;
        cursor: pointer;
        margin-left: 20px;
    }
    .login{
        float: right;
        line-height: 60px;
        color: #ffd200;
        margin-left: 20px;
        font-size: 14px;
        .logout{
            margin-left: 10px;
            cursor: pointer;
        }
    }   
}
</style>
