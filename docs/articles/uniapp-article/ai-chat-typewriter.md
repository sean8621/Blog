# AI Chat 打字机效果

1. 容器

```html
<template>
  <view class="container" ref="contentRef">
    <rich-text :nodes="nodeText" ref="textRef"></rich-text>
    <!-- <view
      class="cursor"
      v-show="cursorShow"
      :style="{transform:`translate(${x}px,${y}px)`}"
    ></view> -->
  </view>
</template>
```

2. 样式

```css
<style scoped lang="scss">
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 30rpx 20rpx;

  /* .cursor {
    position: absolute;
    left: 10rpx;
    top: 10rpx;
    width: 30rpx;
    height: 30rpx;
    background-color: #000;
    border-radius: 50%;
    animation: cursorAnimate 0.5s infinite;
  }

  @keyframes cursorAnimate {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  } */
}
</style>
```

3. 业务逻辑

```js
// 模拟数据
async mockResponse() {
    this.cursorShow = true;
    for (let i = 0; i < this.nodeData.length; i++) {
        try {
            this.nodeText = this.nodeData.slice(0, i);
            // this.updateCursor();
            await this.delay(100);
        } catch (e) {
            console.log(e)
        }
    }
    this.cursorShow = false;
}

// 更改光标位置
// updateCursor() {
//     // 1. 找到最后一个文本节点
//     const lastTextNode = this.getLastTextNode(this.$refs.textRef,1);
//     // 2. 创建一个临时文本节点
//     const tempText = document.createTextNode('\u200B'); // 零宽字符
//     // 3. 将临时文本节点放在最后一个文本节点之后
//     if (lastTextNode) {
//         lastTextNode.parentNode && lastTextNode.parentNode.appendChild(tempText);
//     } else {
//         this.$refs.textRef && this.$refs.textRef.$el.appendChild(tempText);
//     }
//     // // 4. 获取临时文本节点距离父节点的距离（x,y） 可以使用 setStart 和 setEnd 方法来设置 Range 的开始和结束位置。
//     const range = document.createRange(); // 设置范围
//     range.setStart(tempText, 0);
//     range.setEnd(tempText, 0);
//     const rect = range.getBoundingClientRect(); // 获取距离信息
//     // 5. 获取当前文本容器距离视图的距离(x,y)
//     const textRect = this.$refs.contentRef && this.$refs.contentRef.$el.getBoundingClientRect();
//     // 6. 获取到当前文本节点的位置，并将光标的位置插入到相应位置
//     if (textRect) {
//         const x = rect.left - textRect.left + 10;
//         const y = rect.top - textRect.top; // 7.5 是光标高度的一半，为了居中显示光标
//         this.x = x;
//         this.y = y;
//     }
//     // 7. 移除临时文本节点
//     tempText.remove();
// },
/** 获取最后一个文本节点 */
// getLastTextNode(node,index = 1) {
//     if (index === 1) { // 获取的第一个node，需要查询$el，childNodes里面的就，不需要了
//         node = node.$el;
//     }
//     if (!node) return null;
//     // console.log(node, node.textContent, node.nodeType, Node.TEXT_NODE)
//     if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
//         // console.log('返回的', node)
//         return node;
//     }
//     for (let i = node.childNodes.length - 1; i >= 0; i--) {
//         const childNode = node.childNodes[i];
//         const textNode = this.getLastTextNode(childNode,index + 1);
//         if (textNode) {
//         return textNode;
//         }
//     }
//     return null;
// }

```

4. 完整代码
```js
<template>
  <view class="container" ref="contentRef">
    <rich-text :content="nodeText" ref="textRef"></rich-text>
    <view class="cursor" v-show="cursorShow" :style="{transform:`translate(${x}px,${y}px)`}"></view>
  </view>
</template>
 
<script>
 
  export default {
    data() {
      return {
        nodeData: '打击好，<p>1. 近日，一份全球数学竞赛决赛名单引起广泛关注。其中，学服装设计的姜萍，以93分的高分名列第12位。天才少女姜萍的故事在全网引发热议。总台记者对江苏涟水中专党委书记进行了专访，揭秘姜萍选择涟水中专的原因。</p>\n' +
          '    <p>2. 江苏涟水中专党委书记介绍，姜萍中考621分，能够达到当地普通高中的录取分数线，之所以选择涟水中专，据姜萍自己讲，原因之一是当时她的姐姐以及两个要好的同学都在这所学校就读。另外，就是姜萍对服装专业比较感兴趣，认为这里对自己的兴趣、爱好发展发挥更有利。</p>',
        cursorShow: true,
        nodeText: '',
        x: 0,
        y: 0,
      }
    },
    onLoad() {
      let timer = setInterval(() => {
        if (this.$refs.textRef) {
          clearInterval(timer)
          this.mockResponse()
        }
      }, 500)
    },
    methods: {
      delay(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      },
      /** 模拟请求 */
      async mockResponse() {
        this.cursorShow = true;
        for (let i = 0; i < this.nodeData.length; i++) {
          try {
            this.nodeText = this.nodeData.slice(0, i);
            {/* this.updateCursor(); */}
            await this.delay(100);
          } catch (e) {
            console.log(e)
          }
        }
        this.cursorShow = false;
      },
      {/* updateCursor() {
        // 1. 找到最后一个文本节点
        const lastTextNode = this.getLastTextNode(this.$refs.textRef,1);
        // 2. 创建一个临时文本节点
        const tempText = document.createTextNode('\u200B'); // 零宽字符
        // 3. 将临时文本节点放在最后一个文本节点之后
        if (lastTextNode) {
          lastTextNode.parentNode && lastTextNode.parentNode.appendChild(tempText);
        } else {
          this.$refs.textRef && this.$refs.textRef.$el.appendChild(tempText);
        }
        // // 4. 获取临时文本节点距离父节点的距离（x,y） 可以使用 setStart 和 setEnd 方法来设置 Range 的开始和结束位置。
        const range = document.createRange(); // 设置范围
        range.setStart(tempText, 0);
        range.setEnd(tempText, 0);
        const rect = range.getBoundingClientRect(); // 获取距离信息
        // // 5. 获取当前文本容器距离视图的距离(x,y)
        const textRect = this.$refs.contentRef && this.$refs.contentRef.$el.getBoundingClientRect();
        // 6. 获取到当前文本节点的位置，并将光标的位置插入到相应位置
        if (textRect) {
          const x = rect.left - textRect.left + 10;
          const y = rect.top - textRect.top; // 7.5 是光标高度的一半，为了居中显示光标
          this.x = x;
          this.y = y;
        }
        // 7. 移除临时文本节点
        tempText.remove();
      },
      /** 获取最后一个文本节点 */
      getLastTextNode(node,index = 1) {
        if (index === 1) { // 获取的第一个node，需要查询$el，childNodes里面的就，不需要了
          node = node.$el;
        }
        if (!node) return null;
        // console.log(node, node.textContent, node.nodeType, Node.TEXT_NODE)
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
          // console.log('返回的', node)
          return node;
        }
        for (let i = node.childNodes.length - 1; i >= 0; i--) {
          const childNode = node.childNodes[i];
          const textNode = this.getLastTextNode(childNode,index + 1);
          if (textNode) {
            return textNode;
        }
      }
      return null;
    } */}
  }
}
</script>
 
<style scoped lang="scss">
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 30rpx 20rpx;
 
  {/* .cursor {
    position: absolute;
    left: 10rpx;
    top: 10rpx;
    width: 30rpx;
    height: 30rpx;
    background-color: #000;
    border-radius: 50%;
    animation: cursorAnimate 0.5s infinite;
  }
 
  @keyframes cursorAnimate {
    0% {
      opacity: 0;
    }
 
    50% {
      opacity: 1;
    }
 
    100% {
      opacity: 0;
    }
  } */}
}
</style>
```