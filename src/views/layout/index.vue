<template>
    <el-container>
        <el-header>
            <Nav />
        </el-header>
        <el-main>
            <router-view />
        </el-main>
        <el-footer :style="{height: '200px'}">
            <div class="left">
                <img src="../../assets/url.png" alt="" width="150px" height="150px;">
                <div>H5</div>
            </div>
            <div class="center">
                <div class="warning">声明：本站系Carr的个人作品，仅供学习参考，不做商业用途！</div>
                <div class="copyRight">Design By Carr 鄂ICP备18003567号-2</div>
            </div>
            <div class="right">
                <ul>
                    <li>
                        <i class="iconfont icon-youxiang"></i>
                        <a href="https://mail.163.com/">carrlu@163.com</a>
                    </li>
                    <li>
                        <i class="iconfont icon-liulanqi"></i>
                        <a href="https://www.carrlu.cn" alt="我的博客">Blog</a>
                    </li>
                    <li>
                        <i class="iconfont icon-github"></i>
                        <a href="https://github.com/lzjdp/interview" alt="github">Github</a>
                    </li>
                </ul>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
import Nav from './components/Nav'
export default {
    components: {
        Nav
    }
}
</script>

<style lang="scss">
.el-container{
    min-height: 100%;
    height: auto;
    position: relative;
    .el-header{
        width: 100%;
        padding: 0;
        position: fixed;
        z-index: 99;
    }
    .el-main{
        width: 980px;
        margin: 60px auto;
        padding-bottom: 200px;
        margin-bottom: 30px;
    }
    .el-footer{
        width: 100%;
        background-color: #545c64;
        position: absolute;
        bottom: 0;
        padding: 20px;
        display: flex;
        .left{
            flex: 1;
            color: #ffffff;
            text-align: center;
            font-weight: bold;
        }
        .center{
            flex: 2;
            color: #ffffff;
            text-align: center;
            font-weight: bold;
            font-size: 14px;
            position: relative;
            .copyRight{
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .right{
            flex: 1;
            li{
                margin-bottom: 10px;
                color: #ffffff;
                font-weight: bold;
                a{
                    color: #ffffff;
                    font-weight: bold;
                }
                .iconfont{
                    margin-right: 8px;
                }
            }
        }
    }
}
</style>
