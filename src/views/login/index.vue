<template>
    <div class="login" >
        <el-tabs v-model="activeName" :stretch="true" @tab-click="tabClick">
            <el-tab-pane label="账号登陆" name="loginForm">
                <Info :visible="showLoginError" message="账号或密码错误"/>
                <el-form  class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item  prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="loginBtn" type="primary" @click="loginSubmit('loginForm')" :loading="loginLoading">登陆</el-button>
                    </el-form-item>
                </el-form>
                <div class="other">
                    <div class="autoLogin">
                        <el-checkbox v-model="checked"></el-checkbox>
                        <span class="auto-login-btn">自动登陆</span>
                    </div>
                    <div class="forgetAndRegister">
                        <span class="forget-btn">忘记密码</span>
                        <span>|</span>
                        <span class="register-btn" @click="toRegister">注册</span>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="短信登陆" name="phoneLoginForm">
                <Info :visible="phoneLoginError" :message="phoneLoginErrorMsg"/>
                <el-form class="phone-login-form" :model="phoneLoginForm" :rules="phoneLoginRules" ref="phoneLoginForm">
                    <el-form-item prop="phoneNumber">
                        <el-input v-model="phoneLoginForm.phoneNumber" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <Range :status="isRangeSuccess" :successFun="rangeSuccess"/>
                    </el-form-item>
                    <el-form-item prop="code" v-show="showCode">
                        <el-input class="code-input" v-model="phoneLoginForm.code" placeholder="验证码"></el-input>
                        <el-button class="code-btn" type="primary" @click="achieveCode" :disabled="showCountDown">
                            <template v-if="showCountDown">
                                {{count}}s
                            </template>
                            <template v-else>
                                获取验证码
                            </template>
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="loginBtn" @click="phoneLoginSubmit('phoneLoginForm')" :loading="phoneLoginLoading">登陆</el-button>
                    </el-form-item>
                </el-form>
                <div class="other">
                    <div class="autoLogin">
                        <el-checkbox v-model="checked"></el-checkbox>
                        <span class="auto-login-btn">自动登陆</span>
                    </div>
                    <div class="forgetAndRegister">
                        <span class="forget-btn">忘记密码</span>
                        <span>|</span>
                        <span class="register-btn" @click="toRegister">注册</span>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Info from '@/components/info'
import Range from '@/components/range'
import { setInterval, clearInterval } from 'timers';
export default {
    components: {
        Info,
        Range
    },
    data () {
        return {
            // tabs默认项
            activeName: 'loginForm',
            // 账号登陆提交按钮loading
            loginLoading: false,
            // 短信登陆提交按钮loading
            phoneLoginLoading: false,
            // 是否显示验证码输入框
            showCode: false,
            // 是否验证成功
            isRangeSuccess: false,
            // 是否显示登陆失败提示
            showLoginError: false,
            // 是否显示倒计时
            showCountDown: false,
            // 自动登陆选中状态
            checked: true,
            // 倒计时初始化
            count: 0,
            // 计时器对象
            timer: null,
            // 是否显示短信登陆错误提示
            phoneLoginError: false,
            // 短信登陆错误提示信息内容
            phoneLoginErrorMsg: '',
            loginForm: {
                username: '',
                password: ''
            },
            phoneLoginForm: {
                phoneNumber: '',
                code: ''
            },
            loginRules: {
                username: [
                    { required: true, message: '请输用户名', trigger: 'blur'},
                    { min: 4, max: 12, message: '用户名长度在4到12个字符之间', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输密码', trigger: 'blur'},
                    { min: 6, max: 16, message: '密码长度在8到16个字符之间', trigger: 'blur'}
                ]
            },
            phoneLoginRules: {
                phoneNumber: [
                    { required: true, message: '请输手机号', trigger: 'blur'},
                ],
                code: [
                    { required: true, message: '请输验证码', trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        ...mapActions(['Login', 'GetUserInfo']),
        // 切换tab时重置表单
        tabClick (node) {
            this.$refs[node.name].resetFields()
        },
        // 登陆
        loginSubmit (formName) {
           this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loginLoading = true
                    this.Login(this.loginForm).then(res => {
                        if (res.code === 2001) {
                            this.showLoginError = true
                            this.$refs[formName].resetFields()
                            this.loginLoading = false
                        } else if (res.code === 2000) {
                            this.GetUserInfo()
                            this.$router.push('/home')
                        }
                    }).catch(() => {
                        this.loginLoading = false
                        this.$refs[formName].resetFields()
                    })
                }
            })
        },
        // 验证成功后执行的方法
        rangeSuccess () {   
            this.showCode = true
        },
        // 获取验证码
        achieveCode () {
            const TIME_COUNT = 60
            const phone = this.phoneLoginForm.phoneNumber
            const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
            if (!phone) {
                this.phoneLoginError = true
                this.phoneLoginErrorMsg = '请输入要登陆的手机号'
            } else if (!phoneReg.test(phone)) {
                this.phoneLoginError = true
                this.phoneLoginErrorMsg = '手机号格式不正确，请重新输入'
            } else {
                this.phoneLoginError = false
                this.$message.warning('验证码已发送，请查收')
                if (!this.timer) {
                    this.showCountDown = true
                    this.count = TIME_COUNT
                    const _this = this
                    this.timer = setInterval(function () {
                        if (_this.count > 0 && _this.count <= TIME_COUNT) {
                            
                            _this.count--
                        } else {
                            _this.showCountDown = false
                            clearInterval(_this.timer)
                            _this.timer = null
                        }
                    }, 1000)   
                } 
            }   
        },
        // 短信登陆
        phoneLoginSubmit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.phoneLoginLoading = true
                }
            })
        },
        // 跳转到注册
        toRegister () {
            this.$router.push('/register')
        }
    }
}
</script>

<style lang="scss" scoped>
.login{
    width: 380px;
    margin: 0 auto;
    margin-bottom: 30px;
    border-radius: 5px;
    padding: 30px;
    background: #ffffff;
    .other{
        color: #333333;
        font-size: 14px;
        cursor: pointer;
        .autoLogin{
            float: left;
            .auto-login-btn{
                margin-left: 5px;
            }
        }
        .forgetAndRegister{
            float: right;
            .forget-btn{
            margin-right: 5px;
            }
            .register-btn{
                margin-left: 5px;
            }
            .forget-btn:hover, .register-btn:hover{
                color: #000000;
            }
        }
    }
    .login-form, .phone-login-form{
        margin-top: 15px;
    }
    .phone-login-form{
        .code-input{
            width: 120px;
            float: left;
            margin-right: 10px;
        }
        .code-btn{
            width: 100px;
            float: left;
            color: #333333;
        }
    }
    .loginBtn, .registerBtn{
        width: 100%;
        color: #333333;
    }
}
</style>
