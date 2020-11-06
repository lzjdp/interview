<template>
    <div class="register">
        <Info :visible="showRegisterError" :message="registerErrorMsg"/>
        <el-form class="register-form" :model="registerForm" :rules="registerRules" ref="registerForm">
            <el-form-item prop="phone">
                <el-input v-model="registerForm.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <Range :status="isRangeSuccess" :successFun="rangeSuccess"/>
            </el-form-item>
            <el-form-item prop="code" v-show="showCode">  
                <el-input class="code-input" v-model="registerForm.code" placeholder="验证码"></el-input>
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
                <el-checkbox v-model="checked"></el-checkbox>
                <span>
                    我已阅读并接受
                    <router-link to="/">用户协议</router-link>
                    和
                    <router-link to="/">隐私策略</router-link>
                </span>
            </el-form-item>
                <el-form-item>
                <el-button class="register-btn" type="primary" @click="registerSubmit('registerForm')" :loading="registerLoading">注册</el-button>
            </el-form-item>
        </el-form>
        <div class="other">
            <span>已有账号，去<router-link to="/login">登陆</router-link></span>
        </div> 
    </div>
</template>

<script>
import Info from '@/components/info'
import Range from '@/components/range'
export default {
    components: {
        Info,
        Range 
    },
    data () {
        return {
            registerLoading: false,
            showRegisterError: false,
            checked: false,
            registerErrorMsg: '该手机号已注册，请直接登陆',
            // 是否显示倒计时
            showCountDown: false,
            timer: null,
            count: 0,
            showCode: false,
            isRangeSuccess: false,
            registerForm: {
                phone: '',
                code: ''
                // username: '',
                // password: '',
                // repeatPassword: '',
                // email: ''
            },
            registerRules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur'},
                    { max: 11, min: 11, message: '请输入11位手机号', trigger: 'blur'}
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur'},
                    { max: 4, min: 4, message: '请输入4位验证码', trigger: 'blur'}
                ],
                // username: [
                //     { required: true, message: '请输用户名', trigger: 'blur'},
                //     { min: 4, max: 12, message: '用户名长度在4到12个字符之间', trigger: 'blur'}
                // ],
                // password: [
                //     { required: true, message: '请输密码', trigger: 'blur'},
                //     { min: 6, max: 16, message: '密码长度在8到16个字符之间', trigger: 'blur'}
                // ],
                // repeatPassword: [
                //     { required: true, message: '请输密码', trigger: 'blur'},
                //     { min: 6, max: 16, message: '密码长度在8到16个字符之间', trigger: 'blur'}
                // ]
            }
        }
    },
    methods: {
        registerSubmit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!this.checked) {
                        this.showRegisterError = true
                        this.registerErrorMsg = '请勾选用户协议'
                    } else {
                        this.$message.info('系统测试中，注册稍后开放')
                    }
                }
            })
        },
        rangeSuccess () {
            this.showCode = true
        },
        // 获取验证码
        achieveCode () {
            const TIME_COUNT = 60
            const phone = this.registerForm.phone
            const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
            if (!phone) {
                this.showRegisterError = true
                this.registerErrorMsg = '请输入要注册的手机号'
            } else if (!phoneReg.test(phone)) {
                this.showRegisterError = true
                this.registerErrorMsg = '手机号格式不正确，请重新输入'
            } else {
                this.showRegisterError = false
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
    }
}
</script>

<style lang="scss" scoped>
.register{
    width: 380px;
    margin: 0 auto;
    margin-bottom: 30px;
    border-radius: 5px;
    padding: 30px;
    background: #ffffff;
    .register-form{
        margin-top: 15px;
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
        .register-btn{
            width: 100%;
            color: #333333;
        }
    }
    .other span{
        float: right;
        font-size: 14px;
    }
}
</style>
