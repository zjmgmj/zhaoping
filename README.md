# zhaoping
zhaoping reactNative App

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

cd android && gradlew assembleDebug

npm run bundle-android//在RN项目跟目录下执行，输出bundle
//android打包apk命令：
cd android //进入到android项目目录
gradlew clean //先清除打包缓存
gradlew assembleDebug //打debug环境apk
gradlew assembleRelease //打release环境apk


无线真机调试
adb devices 检测是否连接手机
adb tcpip 5555 设置端口号
adb connect 192.168.0.2:5555 连接手机
adb disconnect 192.168.0.2:5555 取消手机连接


npx iconfont-rn 字体图标自动生成组件


追踪rn问题
gradlew compileDebug --stacktrace
gradlew compileDebugJavaWithJavac