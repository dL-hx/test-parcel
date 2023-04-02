// const teacher:string = 'test teacher'
// console.log(teacher);
// es modules
import $ from 'jquery';

console.log('使用jquery代码');
$(function () {
    $('body').html('<div>123</div>');

    new $.fn.init();
})