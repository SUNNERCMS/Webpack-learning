// 'use strict';
// import axios from 'axios';
import axios from 'axios';
let button=document.querySelector(".button");
button.addEventListener("click",buttonHandle);
function buttonHandle(){
    console.log("ddd");
    // 为给定 ID 的 user 创建请求
    axios.get('http://yapi.corp.qunar.com/mock/5067/sun/yapi')
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
}
