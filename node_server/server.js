const http = require("http");
const fs = require("fs");

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
const server = http.createServer((req, res) => {
  const stream = fs.createReadStream("./index.html", "utf8");
  stream.pipe(res);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
