interface PageInfo {
    title: string;
}

// 使用record定义下面的类型
const nav = {
    about: { title: "about" },
    contact: { title: "contact" },
    home: { title: "home" },
}

type key = "about" | "contact" | "home"

// Record<对象的键， 对象的值>
const nav1: Record<key, PageInfo> = {
    about: { title: "about" },
    contact: { title: "contact" },
    home: { title: "home" },
}

// 需要一个对象，有 ABC 三个属性，属性的值必须是数字
type keys = "A" | "B" | "C"
const a: Record<keys, number> = {
    A: 1,
    B: 2,
    C: 3
}