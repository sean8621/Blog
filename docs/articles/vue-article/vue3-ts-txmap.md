# Vue3-ts 对接腾讯地图问题

## 1.Wbe 端 Javascript API GL

### 1.1 vue3 ts 环境报错 DOMException: Failed to execute ‘postMessage’ on ‘Worker’: # could not be cloned.

- 原因：vue3 使用 proxy 包装了 gl 对象导致的问题。
- 解决方法：建议可以在 window 对象上保存已创建的 gl 对象
- 示例：
  ```ts
  var map: any = null; // 地图
  var markerLayer: any = null; // 点标记
  // 初始化地图/定位
  const getinitChange = (lat, lng) => {
    console.log(lat, lng);
    // 定义地图中心点坐标
    const myLatlng = new (window as any).TMap.LatLng(lat, lng);
    vueConfig.lat = lat;
    vueConfig.lng = lng;
    // 定义map变量，调用 (window as any).TMap.Map() 构造函数创建地图
    map = new (window as any).TMap.Map(document.getElementById("map"), {
      center: myLatlng, // 设置地图中心点坐标
      zoom: 17.2, // 设置地图缩放级别
    });
    var geometries = {
      id: "1", // 点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
      styleId: "myStyle", // 指定样式id
      position: myLatlng, // 点标记坐标位置
    };
    markerLayer = new (window as any).TMap.MultiMarker({
      map: map,
      styles: {
        // 创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
        myStyle: new (window as any).TMap.MarkerStyle({
          width: 25, // 点标记样式宽度（像素）
          height: 30, // 点标记样式高度（像素）
        }),
      },
      // 点标记数据数组
      geometries: [geometries],
    });
    // 监听地图正在平移的状态
    map.on("pan", function () {
      markerLayer.updateGeometries([
        {
          styleId: "myStyle",
          id: "1",
          position: map.getCenter(),
        },
      ]);
    });
    // 监听地图结束平移
    map.on("panend", function () {
      // 拖拽结束时获取地址
      getInverseAnalysis();
    });
  };
  ```
