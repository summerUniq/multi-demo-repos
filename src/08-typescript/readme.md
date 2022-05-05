# typescript

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
