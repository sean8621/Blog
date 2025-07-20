# Intersection Observer 交叉观察器

Intersection Observer API 提供了一个异步接口，允许开发者了解元素和用户视图 port（视窗）之间的交集。

```html
<div id="container">
  <body>
    <div class="card-list">
      <div class="item">
        <img
          src="./defult.png"
          alt=""
          data-src="https://picsum.photos/200/300"
        />
      </div>
      <div class="item">
        <img
          src="./defult.png"
          alt=""
          data-src="https://picsum.photos/200/300"
        />
      </div>
      <div class="item">
        <img
          src="./defult.png"
          alt=""
          data-src="https://picsum.photos/200/300"
        />
      </div>
    </div>
    <div class="load-more"></div>
  </body>
</div>
```

### 图片懒加载

```js
/**
 * 创建一个 IntersectionObserver 实例，用于监听目标元素与其根元素（或视口）交叉状态的变化。
 *
 * @param {Function} callback - 当目标元素的可见性发生变化时触发的回调函数。
 * @param {Object} options - 配置选项对象。
 * @param {Element|null} options.root - 用作交叉检测的根元素。默认为视口（null），可设置为任意祖先元素。
 * @param {string} options.rootMargin - 根元素的外边距，用于扩展或收缩根元素的判定区域。格式如 '10px 20px 10px 20px'，支持像素(px)、百分比(%)等单位。
 * @param {number|number[]} options.threshold - 触发回调的交叉比例阈值。可以是单个数字（如 0.5，表示目标元素有 50% 可见时触发），也可以是数字数组（如 [0, 0.5, 1]，分别在 0%、50%、100% 可见时触发）。
 */
const ob=new IntersectionObserver(
    (entries,observer)=>{
        for(const entry of entries){
            if(entry.isIntersecting){
                const img=entry.target
                img.src=img.dataset.src
                ob.unobserve(img)
            }
        }
    },
    {
       root:null,
       rootMargin:'0px',
       threshold:0.5
    }

)

const imgs=document.querySelectorAll('img')
imgs.forEach(img=>{}
    ob.observe(img)
)
```

### 加载更多

```js
const ob = new IntersectionObserver(
  (entries, observer) => {
    const entry = entries[0];
    if (entries.isIntersecting) {
      loadMore();
    }
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  }
);

ob.observe(document.querySelector(".load-more"));
```

### 加载广告

```js
const vd = document.querySelector("video");
const ob = new IntersectionObserver(
  (entries, observer) => {
    const entry = entries[0];
    if (entries.isIntersecting) {
      vd.play();
    } else {
      vd.pause();
    }
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  }
);

ob.observe(vd);
```
