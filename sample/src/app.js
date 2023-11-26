// import "./app.css";
// 웹팩의 css로더를 사용하면  css를 사용하여 모듈로 변환해줌

import 강아지 from "./강아지.png";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `<img src = "${강아지}"/>`;
});

console.log(process.env.NODE_ENV);
console.log(VERSION); // 'v.1.2.3'
console.log(PRODUCTION); // true
console.log(MAX_COUNT); // 999
console.log(api.domain);
