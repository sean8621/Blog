# uniapp 放大缩小、进度条动画

* uniapp 不兼容 svg，顾使用 canvas 实现进度条动画
* 渐淡出动画有问题待修复

## 实现效果

<img src="./assets/canvasToCircle.gif" alt="uniapp进度条动画" width="500" height="500" />

## 代码实现

```vue
<template>
  <view>
    <view class="breath-box" @click="handleStartAndStop">
      <view
        class="breath-circle"
        :class="{
          enlarge: ['吸气', '吸气屏住'].includes(activeStep),
          shrink: activeStep === '呼气',
        }"
      ></view>
      <!--  TODO 渐淡出动画有问题待修复-->
      <!-- <view class="breath-process" :class="{ fadeOut: ['吸气', '呼气'].includes(activeStep) }">
        <canvas canvas-id="circleCanvas" class="h-100 w-100"></canvas>
      </view> -->
      <view
        class="breath-process"
        v-if="['吸气屏住', '呼气屏住'].includes(activeStep)"
      >
        <canvas canvas-id="circleCanvas" class="h-100 w-100"></canvas>
      </view>
      <view class="timeCount">
        <wd-icon name="play" size="26px" v-if="activeStep === '准备'"></wd-icon>
        <wd-icon
          name="pause"
          size="26px"
          v-else-if="['吸气屏住', '呼气屏住'].includes(activeStep)"
        ></wd-icon>
        <text v-else>{{ count }}</text>
      </view>
    </view>
    <view class="text-content text-c7">
      <view>{{ activeStep.slice(-2) }}</view>
      <view>{{ activeStepText }}</view>
    </view>
  </view>
</template>

<style>
page {
  background-color: #121212;
}
</style>

<script lang="ts" setup>
/**
 * 吸气--》enlarge 4s
 * 吸气屏住--》progress 4s
 * 呼气--》 progress-fadout 1s shrink 4s
 * 呼气屏住--》progress 4s
 *
 */
enum BreathStep {
  Init = "准备",
  Inhale = "吸气",
  InhaleHold = "吸气屏住",
  Exhale = "呼气",
  ExhaleHold = "呼气屏住",
}
const activeStepTextArr = [
  "点击开始按钮",
  "用鼻子轻轻吸气4秒钟",
  "屏住呼吸4秒钟",
  "用嘴呼气4秒钟",
  "屏住呼吸4秒钟",
];
let activeStep = ref("准备");
let activeStepText = ref("点击开始按钮");

const ctx = uni.createCanvasContext("circleCanvas");
const startAngle = -(Math.PI / 2); //canvas画圆的起始角度，默认为3点钟方向即90度 方向，定位位到12位置 0度
let percent = 0; //进度0-100

const count = ref<any>(1);
let intervalId: any = null;
let timeoutId: any = null;
let handle: any = null;

// 渐变动画
const fadeOutAnimation = ref();

//绘制带动画效果图表
function drawAniCircle() {
  percent = 0;
  //清空画布
  ctx.clearRect(0, 0, 500, 500);
  ctx.draw();
  /**
   * 动画每帧移动步伐为 1
   */
  let _step = 1;
  /**
   * 动画每帧移动的步数
   */
  handle = setInterval(() => {
    percent += _step;
    if (percent >= 100) {
      clearInterval(handle);
    }
    drawCircle(percent);
  }, 40);
}
// 绘制圆
function drawCircle(percent: number) {
  // 表示进度的两端为圆形
  ctx.setLineCap("round"); //圆形
  // 设置线条的宽度和颜色
  ctx.setLineWidth(uni.upx2px(50));
  ctx.setStrokeStyle("#cee6ff");
  let endAngle = ((2 * Math.PI) / 100) * percent + startAngle;
  ctx.beginPath();
  // 半径为整个canvas宽度的一半
  let radius = uni.upx2px(500) / 2;
  ctx.arc(radius, radius, radius - uni.upx2px(25), startAngle, endAngle, false);
  ctx.stroke();
  ctx.draw();
}
// function fadeOut(type: number) {
//   let animation;
//   if (type === 1) {
//     animation = uni.createAnimation({
//       duration: 1000,
//     });
//     animation.opacity(0).step();
//     fadeOutAnimation.value = animation.export();
//   } else {
//     animation = uni.createAnimation({
//       duration: 50,
//     });
//     animation.opacity(1).step();
//     fadeOutAnimation.value = animation.export();
//   }
// }

// 开始动画
async function run(step: BreathStep) {
  activeStep.value = step;
  activeStepText.value = step;
  switch (step) {
    case BreathStep.Init:
      count.value = 1;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      clearInterval(handle);
      activeStepText.value = activeStepTextArr[0];
      break;
    case BreathStep.Inhale:
      countdown(1, 4);
      activeStepText.value = activeStepTextArr[1];
      await sleep(4);
      run(BreathStep.InhaleHold);
      break;
    case BreathStep.InhaleHold:
      drawAniCircle();
      activeStepText.value = activeStepTextArr[2];
      await sleep(4);
      run(BreathStep.Exhale);
      break;
    case BreathStep.Exhale:
      countdown(4, 1);
      activeStepText.value = activeStepTextArr[3];
      await sleep(4);
      run(BreathStep.ExhaleHold);
      break;
    case BreathStep.ExhaleHold:
      drawAniCircle();
      activeStepText.value = activeStepTextArr[4];
      await sleep(4);
      run(BreathStep.Inhale);
      break;
  }
}
// 定时器
function sleep(seconds: number) {
  clearTimeout(timeoutId);
  return new Promise((resolve) => {
    timeoutId = setTimeout(resolve, seconds * 1000);
  });
}
// 倒计时
function countdown(start: number, end: number) {
  count.value = start;
  clearInterval(intervalId); // 清除定时器
  intervalId = setInterval(() => {
    count.value += start > end ? -1 : 1;
    if (count.value === end) {
      clearInterval(intervalId); // 清除定时器
    }
  }, 1000);
}
// 开始结束事件
function handleStartAndStop() {
  if (activeStep.value === BreathStep.Init) {
    run(BreathStep.Inhale);
  } else {
    run(BreathStep.Init);
  }
}
</script>

<style lang="scss" scoped>
@keyframes enlarge {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(5);
  }
}
@keyframes shrink {
  0% {
    transform: scale(5);
  }

  100% {
    transform: scale(1);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.breath-box {
  width: 500upx;
  height: 500upx;
  border-radius: 50%;
  background-color: #202a3a;
  margin: 30rpx auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  .breath-circle {
    width: 100upx;
    height: 100upx;
    border-radius: 50%;
    background-color: #58a6ff;
    &.enlarge {
      animation: enlarge 4s linear forwards;
    }
    &.shrink {
      animation: shrink 4s linear forwards;
    }
  }
  .breath-process {
    position: absolute;
    height: 500upx;
    width: 500upx;
    opacity: 1;
    border-radius: 50%;
    &.fadeOut {
      animation: fadeOut 1s linear forwards;
      -webkit-animation: fadeOut 1s linear forwards;
    }
  }
  .timeCount {
    position: absolute;
    color: #ffffff;
  }
}
.text-content {
  text-align: center;
}
.text-content :nth-child(2) {
  padding-top: 20rpx;
}
</style>
```
