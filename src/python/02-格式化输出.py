age = 18
name = "tom"
weight = 75.5
stu_id = 1
stu_id2 = 1000
# 今年我的年龄是X岁
print('今年我的年龄是%d岁' % age)
# 我的名字是x
print('我的名字是%s' % name)
# 我的体重是X公斤
print('我的体重是%f公斤' % weight)
print('我的体重是%.2f公斤' % weight)
# 我的学号是001
print('我的学号是%d' % stu_id)
print('我的学号是%03d' % stu_id)
print('我的学号是%03d' % stu_id2)
# 我的名字是X，今年x岁了
print('我的名字是%s，今年%d岁了' % (name, age))
print('我的名字是%s，今年%s岁了' % (name, age))
print(f'我的名字是{name}，今年{age}了')  # python 3.6之后才有f格式化字符串语法
# 我的名字是X，明年x岁了
print('我的名字是%s，今年%d岁了' % (name, age+1))
# 我的名字是x, 今年x岁了，体重x公斤， 学号是x
print('我的名字是%s, 今年%d岁了，体重%.2f公斤， 学号是%06d' % (name, age, weight, stu_id))
