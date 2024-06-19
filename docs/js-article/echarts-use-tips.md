# Echarts 使用小技巧

## 1.使用 echarts 柱状图时添加左右滚动功能

**代码**

```js
dataZoom:[
      {
          type:"slider",//slider表示有滑动块的，
          show:true,
          xAxisIndex:[0],//表示x轴折叠
          start:1,//数据窗口范围的起始百分比,表示1%
          end:35,//数据窗口范围的结束百分比,表示35%坐标
          bottom:"20",
      },
  ],
```

问题:'当我们添加该方法的时候、这时候原先柱状图的 echarts 表个的 Y 轴分割线会变得很小、会导致数据小的时候界面显示不出来的问题、

解决：将 dataZoom 中的 xAxisIndex 属性范围改成 1、注：( 该方法适用双柱状图模式 )

dataZoom 所有属性:

```js
dataZoom:[ //区域缩放
{
　　id: 'dataZoomX',
　　show:true, //是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
　　backgroundColor:"rgba(47,69,84,0)", //组件的背景颜色
　　type: 'slider', //slider表示有滑动块的，inside表示内置的
　　dataBackground:{ //数据阴影的样式。
　　　　lineStyle:mylineStyle, //阴影的线条样式
　　　　areaStyle:myareaStyle, //阴影的填充样式
　　},
　　fillerColor:"rgba(167,183,204,0.4)", //选中范围的填充颜色。
　　borderColor:"#ddd", //边框颜色。
　　filterMode: 'filter', //'filter'：当前数据窗口外的数据，被 过滤掉。即 会 影响其他轴的数据范围。每个数据项，只要有一个维度在数据窗口外，整个数据项就会被过滤掉。
　　　　　　　　　　//'weakFilter'：当前数据窗口外的数据，被 过滤掉。即 会 影响其他轴的数据范围。每个数据项，只有当全部维度都在数据窗口同侧外部，整个数据项才会被过滤掉。
　　　　　　　　　　//'empty'：当前数据窗口外的数据，被 设置为空。即 不会 影响其他轴的数据范围。
　　　　　　　　　　//'none': 不过滤数据，只改变数轴范围。
　　xAxisIndex:0, //设置 dataZoom-inside 组件控制的 x轴,可以用数组表示多个轴
　　yAxisIndex:[0,2], //设置 dataZoom-inside 组件控制的 y轴,可以用数组表示多个轴
　　radiusAxisIndex:3, //设置 dataZoom-inside 组件控制的 radius 轴,可以用数组表示多个轴
　　angleAxisIndex:[0,2], //设置 dataZoom-inside 组件控制的 angle 轴,可以用数组表示多个轴
　　start: 30, //数据窗口范围的起始百分比,表示30%
　　end: 70, //数据窗口范围的结束百分比,表示70%
　　startValue:10, //数据窗口范围的起始数值
　　endValue:100, //数据窗口范围的结束数值。
　　orient:"horizontal", //布局方式是横还是竖。不仅是布局方式，对于直角坐标系而言，也决定了，缺省情况控制横向数轴还是纵向数轴。'horizontal'：水平。'vertical'：竖直。
　　zoomLock:false, //是否锁定选择区域（或叫做数据窗口）的大小。如果设置为 true
　　则锁定选择区域的大小，也就是说，只能平移，不能缩放。
　　throttle:100, //设置触发视图刷新的频率。单位为毫秒（ms）。
　　zoomOnMouseWheel:true, //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
　　moveOnMouseMove:true, //如何触发数据窗口平移。true：表示不按任何功能键，鼠标移动能触发数据窗口平移。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标移动能触发数据窗口平移。'ctrl'：表示按住 ctrl 和鼠标移动能触发数据窗口平移。'alt'：表示按住 alt 和鼠标移动能触发数据窗口平移。
　　left:"center", //组件离容器左侧的距离,'left', 'center', 'right','20%'
　　top:"top", //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
　　right:"auto", //组件离容器右侧的距离,'20%'
　　bottom:"auto", //组件离容器下侧的距离,'20%'

},
{
　　id: 'dataZoomY',
　　type: 'inside',
　　filterMode: 'empty',
　　disabled:false, //是否停止组件的功能。
　　xAxisIndex:0, //设置 dataZoom-inside 组件控制的 x轴,可以用数组表示多个轴
　　yAxisIndex:[0,2], //设置 dataZoom-inside 组件控制的 y轴,可以用数组表示多个轴
　　radiusAxisIndex:3, //设置 dataZoom-inside 组件控制的 radius 轴,可以用数组表示多个轴
　　angleAxisIndex:[0,2], //设置 dataZoom-inside 组件控制的 angle 轴,可以用数组表示多个轴
　　start: 30, //数据窗口范围的起始百分比,表示30%
　　end: 70, //数据窗口范围的结束百分比,表示70%
　　startValue:10, //数据窗口范围的起始数值
　　endValue:100, //数据窗口范围的结束数值。
　　orient:"horizontal", //布局方式是横还是竖。不仅是布局方式，对于直角坐标系而言，也决定了，缺省情况控制横向数轴还是纵向数轴。'horizontal'：水平。'vertical'：竖直。
　　zoomLock:false, //是否锁定选择区域（或叫做数据窗口）的大小。如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
　　throttle:100, //设置触发视图刷新的频率。单位为毫秒（ms）。
　　zoomOnMouseWheel:true, //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
　　moveOnMouseMove:true, //如何触发数据窗口平移。true：表示不按任何功能键，鼠标移动能触发数据窗口平移。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标移动能触发数据窗口平移。'ctrl'：表示按住 ctrl 和鼠标移动能触发数据窗口平移。'alt'：表示按住 alt 和鼠标移动能触发数据窗口平移。
}
]
```

## 2.echarts 地图显示字样更改

通过 label 对象中的 formatter 属性可以对需要进行显示的字样进行方法过滤和加工
**代码**

```js
geo: {
        map: "china",
        label: {
           normal: {
            show: true,
            color: "#639bc3",
             formatter:function(params){ //标签内容
                   return  params.name; // 更改地图显示字段
               },
            },
          },
    }
```

## 3.改变轴线颜色

**代码**

```js
 //放置在xAxis下 yAxis
axisLine:{
      lineStyle:{
          color:'#fff',
          width:1,//这里是为了突出显示加上的
      }
  }
```

## 4.柱状图颜色、宽度、改成圆柱状

**代码**

```js
// 修改柱状图颜色
//下方代码放置在series
itemStyle:{
    normal:{
      color:"#40C2FF",//更改颜色
      barBorderRadius:[25,25,0,0]// 将立方体改成圆柱
    }
},
barWidth:8,// 修改柱状图宽度
```

## 5.改变 echarts 在 dom 元素中的位置

**代码**

```js
//改变整体位置
//放置在option中
grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true
},
```

## 6.更改网格线的颜色

**代码**

```js
// 网格线颜色更改
//放置在xAxis中
splitLine: {
    show: true,
    lineStyle:{
        color: ['#244674'],
        width: 1,
        type: 'solid'//网格线类型
    }
},
```

## 7.改变 echarts 文字排列方式、颜色、位置

**代码**

```js
//放置在option中
legend: {
      orient: "vertical",//改变文字颜色的xy轴排列方式
      icon:'circle',
      data: this.collectionName,
      x:'right',      //可设定图例在左、右、居中
      y:'top',     //可设定图例在上、下、居中
      top:'10%',
      left:'85%',
      textStyle:{
        color:"#fff"
      },
      align:"left", //改变 legend 文字和颜色位置
  },
```

## 8.饼状图中间显示文字

**代码**

```js
 //放置在option中
// 饼状图在中间显示文字
graphic:{
    type:"text",
    left:"center",
    top:"45%",
    style:{
        text:"档案存放比例",
        textAlign:"center",
        fill:"#333",
        fontSize:15,
        fontWeight:700,
        fill:"#fff",
        backgroundColor:'red',
    }
},
```

## 9.柱状图增加底部阴影效果和添加渐变色

**代码**

```js
//放置在option中
// 饼状图在中间显示文字
series: [
  {
    showBackground: true, /// 增加底部阴影
    name: "未总结",
    type: "bar",
    itemStyle: {
      color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: "#399F6A" }, // 渐变起始颜色
        { offset: 1, color: "#A7F0C5" }, // 渐变结束颜色
      ]),
    },
    data: [1, 2, 3, 43, 4, 5],
  },
];
```
