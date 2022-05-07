# typescript

## 基础类型

- 基本类型
- 数组类型
- 联合类型: |
- 类型别名: type

    ```js
    type CustomArray = (number | string)[]
    ```

- 函数类型：函数参数和返回值的类型
  - 单独指定参数和返回值
  - 同时指定参数和返回值

  ```typescript
  const add:(num1: number, num2:number) => number = (num1, num2) => {
      return num1 + num2
  }
  ```

  - 函数没有返回值： void
  - 可选参数：？, 只能出现在函数参数的最后
- 对象类型

```typescript
const obj: {name:string; age:number; sayHi():void, greet(name:string):void} = {
    name: 'll',
    age: 16,
    sayHi(){},
    greet(name){}
}
```

- 接口：interface
  - 接口和类型别名的区别
  - 接口的继承： extends

- 元祖: 数组元素个数和类型明确

```typescript
const position:[number, number] = [90.09, 162.33]
```

- 类型推论
场景：
  - 声明变量并立即初始化值时
  - 函数返回值

- 类型断言: 使用类型断言指定更加具体的类型 (as | <>)
- 字面量类型：配合联合类型使用，表示一组明确的可选值列表
- 枚举类型：enum 定义一组命名常量
  - 枚举成员是有值的， 默认值是数字， 从0 开始递增， 数字枚举
  - 可以修改枚举的值
  - 字符串枚举：枚举成员的值可以是字符串， 没有自增行为， 所以每个成员必须设置
  - 枚举类型编译后会被编译成js代码， 自调用函数， 对象

```typescript
enum Direction {
    Up = 13,
    Down = 4,
    Left = 8,
    Right = 16
}
function changeDirection(direction: Direction) {}
changeDirection(Direction.Up)
```

- any类型： 失去类型保护，不推荐
  - 临时使用
  - 隐式any
  
- typeof: 类型查询
  - 类型上下文
  - 根据已有变量的值，获取该值的类型
  - 只能用来获取变量或对象属性的类型， 不能用来获取函数调用的类型

```typescript
let p = {x: 1, y: 2}
function formatPoint(point:typeof p) {}
```

## 高级类型

- class类

  - class不仅提供了class的语法功能， 也作为一种类型存在
  - 实例属性： 声明类型； 设置初始值，省略类型声明
  - 构造函数声明类型，不需要返回值类型
  - 实例方法
  - 继承： extends(继承父类，js中只有extends)；implements(实现接口, typescript独有)
  - 可见性修饰符： public, protected, private
    - protected: 仅在当前类和子类中可见， 实例对象不可见
    - private： 仅在当前类中可见， 子类和实例对象都不可见
  - readonly:
    - 类中，只能在构造函数内进行赋值，可以有默认值
    - 类中，只能修饰属性，不能修饰方法
    - readonly的属性如果不声明类型，就变成字面量类型了
    - 接口或普通对象类型中使用readonly

  ```typescript
  class Person {
    age: number
    gender = '男'
    constructor(age:number, gender:string) {
      this.age = age
      this.gender = gender
    }
    scale(n: number):void{
      this.age *= n
    }
  }
  const p = new Person()
  p.age

  class Student extends Person {}

  interface Singable {
    sing():void
    name: string
  }

  class Person implements Singable {
    name = '111'
    sing() {
      console.log('sing')
    }
  }
  ```

- 类型兼容性
  - 数组的forEach方法
  - 结构化类型系统和标明类型系统
  - 结构化类型系统：如果两个对象具有相同的形状，则认为他们属于同一类型
  - 对象之间的类型兼容
    - 结构化类型系统准确说法：具有相同的成员类型就可以认为是同一类型；
    - 成员多的可以设置给成员少的
  - 接口之间的类型兼容
    - 同class兼容
    - class和interface是可以兼容的
  - 函数之间的兼容性
    - 参数： 参数多的兼容参数少的（参数少的可以赋值给多的）
    - 参数：相同位置的参数类型要相同（原始类型）或兼容（对象类型）
    - 返回值： 只关注返回值本身，原始类型-相同， 对象类型：兼容， 多给少

  ```typescript
  class Point {
    x: number;
    y: number;
  }

  class Point2D {
    x: number;
    y: number;
  }

  class Point3D {
    x: number
    y: number
    z: number
  }

  const p: Point = new Point2D()
  const p1: Point = new Point3D()

  ```

  ```typescript
  interface Point {
    x: number
    y: numebr
  }

  interface Point2D {
    x: number
    y: number
  }

  interface Point3D {
    x: number
    y: number
    z: number
  }

  let p1: Point
  let p2: Point2D
  let p3: Point3D
  p1 = p2
  p1 = p3

  class Point4D {
    x: number
    y: number
    z: number
  }

  p3 = new Point4D()

  ```

- 交叉类型: &
  - 类似于接口继承（extends)
  - 组合多个类型成一个类型
  - 交叉类型和接口继承的区别
    - 同名属性类型冲突处理不同

  ```typescript
  interface Person {
    name: string
  }
  interface Contact {
    phone: string
  }

  type PersonDetail = Person & Contact
  ```

- 泛型和keyof
  - 保证类安全的情况下， 让函数等与多种类型一起工作， 从而实现复用
  - 类型函数: 使用类型变量 ```<Type>```, 调用时指定具体的类型

  ```typescript
  function id<Type>(value: Type):Type
  id<number>(1)
  id<string>('a')
  id(11)
  ```
  
  - 类型参数推断可以简化泛型函数的调用
  - 类型参数推断出的是字面量类型
  - 泛型约束
    - 任意类型导致无法解构，访问value.length， 解决方案：泛型约束
    - 方法一：指定更加具体的泛型,收缩类型
    - 方法二：添加约束 extends

  ```typescript
  function id<Type>(value: Type[]): Type[] {
    console.log(value.length)
    return value
  }

  interface ILength {length: number}
  function id<Type extends ILength>(value: Type): Type {
    console.log(value.length)
    return value
  }
  id('123')
  id([1,3,2])
  id({length: 9})
  ```

  - 泛型的类型变量可以有多个，并且变量类型之间还可以约束
  - 比如： 第二个类型变量受第一个类型变量的约束

  ```typescript
  function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key]
  }
  getProp({name:'lll'}, 'name')
  getProp(18, 'toFixed')
  getProp('aon', 1)
  ```

  - 泛型接口
    - 使用时需要显示指定类型
    - 数组是泛型接口

    ```typescript
    interface IdFunc<Type> {
      id: (value:Type) => Type
      ids: () => Type[]
    }

    let obj: IdFunc<number> = {
      id(value) { return value}
      ids() {return [1,3,5]}
    }
    ```

  - 泛型类
    - 使用时可以不显示传入类型
    - 根据需要自己决定是否显示传入类型

  ```typescript
  class Gen<NumType> {
    defaultVal: NumType
  }
  ```

  - Ts内置的泛型工具类型
    - Partial: ```Partial<Type>``` Type中所有属性变成可选
    - Readonly: ```Readonly<Type>``` Type中所有属性只读
    - Pick: ```Pick<Type, keyof Type | keyof Type>```
    - Record: ```Record<keys, Type>```

      ```typescript
      type RecordObj = Record<'a'|'b'|'c', string[]>

      const obj: RecordObj = {
        a: ['a'],
        b: ['b'],
        c: ['c']
      }
      ```

- 索引签名类型和索引查询类型
  - 无法确定对象中有哪些属性
  - 数组使用了索引类型签名
  - 索引查询类型： ```T[key]```
  - 同时查询多个索引类型 ```T[key1|key2]```
  
  ```typescript
  interface Itype {
    [key: string]: number
  }
  ```

- 映射类型
  - 基于旧类型实现新类型: in

  ```typescript
  type PropKeys = 'x' | 'y' | 'z'
  type Type1 = {x: number; y: number; z: number}
  // ==>
  type type2 = {
    [key in PropKeys]: number
  }
  type type3 = {
    [key in keyof Type1]: number
  }
  ```

## Typescript类型声明文件

- x.d.ts这样的就是类型声明文件
  - 使用已有的类型声明文件
    - 内置类型的类型声明文件：ts为js内置Api都提供了声明文件
      lib.dom.d.ts lib.es5.d.ts
    - 第三方库的类型声明文件: 库自带类型声明文件（index.d.ts)；由DefinitelyTyped提供
      - 怎么知道类型文件是哪个的？ package.json中的typyings字段来指定
      - DefinitelyTyped是一个github仓库, 用来提供高质量的typescript类型声明
        - 包的名称格式 @types/*
        - 当安装@types/*类型声明包后， TS也会自动加载该类型声明包

    - 创建自己的类型声明文件
      - 项目内共享 .d.ts
      - 为已有js文件提供类型声明: js项目迁移到TS项目; 创建第三方库
      - 类型声明文件的编写与模块化方式有关
      - 使用ts-loader必须有配置文件tsconfig.json， 配置文件自动生成tsc --init
      - 为js文件添加类型声明文件： 会自动查找 文件名.d.ts
      declare关键字： 为已存在的变量声明类型； declare可以省略（type interface前面）

## 在React中使用typescript

- CRA 创建typescript项目
  - tsconfig.json
  - x.tsx
  - react-app-env.d.ts
    - /// 三斜线指令
    - 告诉ts帮我们下载react-scripts这个包中的类型声明
    - react-scripts包含的类型声明： react react-dom node 图片等资源的类型

  ```ts
  /// <reference types="react-scripts"/>
  ```

- ts配置文件tsconfig.json
  complierOptions
  - target: 编译后js的语言版本
  - lib: 指定要包含在编译中的library
  - allowJs： 运行ts编译器编译js文件
  - skipLibCheck: 跳过声明文件的类型检查
  - esModuleInterop: es模块互操作， 屏蔽esmodule和commonjs之间的差异
  - allowSyntheticDefaultImports: 允许通过import x from 'y'即使模块没有显示指定default导出
  - module: 指定生成代码的模块化标准
  - noEmit：编译时不生成任何文件，只进行类型检查
  - JSX：指定jsx转化成什么形式
  include
- tsc命令
  - tsc filepath --target es6
  - tsc + filepath 会忽略tsconfig.json配置； 不跟文件路径， 启用tsconfig.json配置

  - tsc --init 自动上传tsconfig.json

- React中的常用类型
  - 函数组件

  ```ts
    - FC<T>
    - 设置默认值
  ```

  - 函数组件默认值

  - 事件类型
    - e: React.MouseEvent<触发的元素类型>
    - ```ChangeEvent<HTMLInputElement>```
  - class组件
