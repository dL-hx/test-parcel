
## 使用
```
$ npm i
$ npm run start
```

## 使用Parcel 配合编写ts 代码
https://www.parceljs.cn/
https://www.jianshu.com/p/c6745ff40497

```
$ npm init -y
```



```
$ tsc --init
```
安装
```
$ npm i parcel -D --registry=https://registry.npm.taobao.org
```

`tsconfig.json`
```json
 "rootDir": "./src",                                 
 "outDir": "./dist",
```

执行完 `npm run test`后, 会自动访问http://localhost:1234端口
```
$  "test": "parcel ./src/index.html"
```
会返回js 编译后的runtime.js 文件===>
<script src="/test-parcel.59712999.js"></script>



## 编写.d.ts 的类型定义文件
> 帮助理解ts文件内容
> 用来打通 ts与js 之间的关系
### 方式一:安装别人写的.d.ts===>console.log('使用jquery代码');

### 方式二:手写.d.ts

$(function () {
    alert(123)
})

console.log('使用jquery代码');
$(function () {
    alert(123)
})

> 定义全局变量与全局函数
```js
// 声明全局变量
// 定义全局变量$ , 接收参数params 类型为接收一个函数(返回void), 返回 void 空
// declare var $:(param:()=>void)=>void

// 定义全局函数
declare function $(readyFunc:()=>void):void;

// 定义函数, 接收param为string类型, 返回一个对象,  参数为html, 返回值为方法,  一个参数为html变量, 类型为(string)的方法
declare function $(selector:string):{
    html:(html:string)=>{ html:(html:string)=>{} }//x
};


// 同一个函数可以多个定义, 函数的重载


// 定义优化
interface JqueryInstance{
    html:(html:string)=>JqueryInstance
}

declare function $(selector:string):JqueryInstance
```

优化后

```
// 声明全局变量
// declare var $:(param:()=>void)=>void

// 定义全局函数
interface JqueryInstance {
    html: (html: string) => JqueryInstance
}

// 函数重载 
// $ 是函数
declare function $(readyFunc:()=>void):void;
declare function $(selector:string):JqueryInstance


// 如何对对象进行类型定义,以及对类进行类型定义, 以及命名空间的嵌套
// $ 是对象
declare namespace $ {
    namespace fn {
      class init {}
    }
  }

// 使用interface 语法实现函数重载($是函数)
// interface Jquery {
//     (readyFunc: () => void): void;
//     (selector: string): JqueryInstance
// }

// declare var $:Jquery



```



```


定义全局变量 用 declare var
定义全局函数 用 declare function
定义全局对象 用 declare namespace
定义全局函数重载的时候，有了两种方式
declare function $(readyFunc: () => void): void;
declare function $(params: string): JqueryInstance;

// interface Jquery {
//   (readyFunc: () => void): void;
//   (selector: string): JqueryInstance;
// }
如果想要$即是函数又是对象的时候，用interface 就不合适了，还是需要用declare

declare function $(readyFunc: () => void): void;
declare function $(params: string): JqueryInstance;
declare namespace $ {
  namespace fn {
    class init {}
  }
}

```


// 
```shell
$ npm i jquery --dev-save
```
// 通过ES model 形式引入
``` ts
declare module 'jquery' {
    interface JqueryInstance {
        html: (html: string) => JqueryInstance;
    }

    // 混合类型
    function $(readyFunc: () => void): void;

    function $(selector: string): JqueryInstance;

    namespace $ {
        namespace fn {
            class init { }
        }
    }
    export = $; 
}
```


## key 类型不确定时候的泛型处理方法?
`<T extends keyof Person>`
`保证类型推断的准确`
``` ts
// key 类型不确定时候的泛型处理方法
// 根据key 值推断出正确的类型 使用keyof 和泛型
interface Person{
    name: string;
    age: number;
    gender:string;
}

class Teacher{
    constructor(private info:Person){}
    // 1.key 是一个不确定的类型
    // 2.key 取值为Person 中的keyof 中的一种
    // 3. 返回Person[T]:Persion 中某种属性的类型
    getInfo<T extends keyof Person>(key:T):Person[T]{
        return this.info[key]
    }
}



// T extends keyof Person  
// key:  'age'
// Person['age']


// type T = 'gender'
// key:  'gender'
// Person['gender'] ==> string

const teacher = new Teacher({
    name:'dell',
    age:18,
    gender:'male'
})

const test = teacher.getInfo('age')
console.log(test);
```