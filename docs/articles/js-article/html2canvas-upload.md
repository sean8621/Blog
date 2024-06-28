# HTML2Canvas 将 html 和转换成图片，再转化为文件流上传

- canvas 只能访问本地资源，若图片引用了线上地址会引起图片跨域

- 解决方案：将线上图片转化为 base64，并用 Promise 封装方法，用 async/await 调用，防止在图片未完全转化为 base64 前将 html 转化为图片了。

## 1.线上图片转化为 base64

**代码**

```js
getBase64Image(url, ref) {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = url + "?v=" + Math.random(); // 处理缓存
        image.crossOrigin = "*"; // 支持跨域图片
        image.onload = function () {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, image.width, image.height);
          let dataURL = canvas.toDataURL("image/png");
          ref.src = dataURL;
          resolve()
        }
        image.onerror = function () {
          reject(new Error('图像转换失败'))
        }
      });
    },
```

## 2.将最终的图片的 base64 转化为文件流

**代码**

```js
base64ToFile(data, filename) {
      var arr = data.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      let suffixArr = mime.split("/");
      if (suffixArr.length && !filename) {
        let suffix = suffixArr[suffixArr.length - 1];
        filename =
          new Date().getTime() +
          "-" +
          Math.floor(Math.random() * 10000) +
          "." +
          suffix;
      }
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
```

## 3.最终将图片上传

**代码**

```js
 async prescriptionImgUpload() {
      await this.getBase64Image(this.doctor, document.querySelector(".doctor"));
      await this.getBase64Image(
        this.auditDoctor,
        document.querySelector(".auditDoctor")
      );
      var newstr = document.getElementById("recipe-content");
      html2canvas(newstr).then((canvas) => {
        this.imgUrl = canvas.toDataURL("image/png");
        let fileObj = this.base64ToFile(this.imgUrl, `${this.recipeId}.png`);
        let formData = new FormData();
        formData.append("file", fileObj);
        formData.append("recipeId", this.recipeId);
        uploadPrescriptionImg(formData).then((res) => {
        });
      });
    },
```
