const http = require("http");
const fs = require("fs");
const buffer = require("buffer");

// 1. 响应字符串 ==============================================================
// const html = `
// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>node server</title>
// </head>

// <body>
//   <h1>Hello Node Server</h1>
// </body>

// </html>
// `;

// const server = http.createServer((req, res) => {
//   res.end(html);
// });

// 2. 响应系统文件 ============================================================
// const html = fs.readFileSync("./index.html", "utf8");

// const server = http.createServer((req, res) => {
//   res.end(html);
// });

// 3. 以流的形式读取并响应系统文件 ===============================================
// const server = http.createServer((req, res) => {
//   const stream = fs.createReadStream("./index.html", "utf8");
//   stream.pipe(res);
// });

// 4. Content-Length 计算并设置 =================================================
const html = fs.readFileSync("./index.html", "utf8");

// https://juejin.cn/post/6919396936382414861
// 在 UTF-8 编码下，英文、数字都用一个字节，中文用三个字节，所以 Content-Length 的值是字符串的长度，而不是字节的长度；直接使用 length 属性得出 Content-Length 的值，会出现响应内容被截断的情况。
// const len = html.length; // 345
// 计算包含中文的字符串的字节长度：
// 1. 使用 Blob 对象的 size 属性（Blob 在 node 14.18.0 中才被支持）
// const len = new buffer.Blob([html]).size; // 393
// 2. 使用 TextEncoder 对象的 encode 方法生成实例后读取 length 属性
// const len = new TextEncoder().encode(html).length; // 393
// 3. 使用 Buffer 对象的 byteLength 方法
// const len = Buffer.byteLength(html); // 393
// 4. 通过 charCodeAt 方法对字符串进行遍历，根据 charCodeAt 方法返回的结果修改字节长度，得出最终的字节长度
// function byteLength(str) {
//   // returns the byte length of an UTF-8 string
//   var s = str.length;
//   for (var i = str.length - 1; i >= 0; i--) {
//     var code = str.charCodeAt(i);
//     if (code > 0x7f && code <= 0x7ff) s++;
//     else if (code > 0x7ff && code <= 0xffff) s += 2;
//     if (code >= 0xdc00 && code <= 0xdfff) i--; //trail surrogate
//   }
//   return s;
// }
// const len = byteLength(html); // 393
// 5. stat
var stats = fs.statSync("./index.html");
var fileSizeInBytes = stats.size; // 393
// Convert the file size to megabytes (optional)
// var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream("./index.html", "utf8");

  res.writeHead(200, {
    "Content-Length": fileSizeInBytes,
  });

  stream.pipe(res);
});

// 端口监听
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
