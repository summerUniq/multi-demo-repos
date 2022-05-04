num = 1
# state 0 -- 吃饱了 1- 没吃饱 2- 吃到虫子
while num <= 5:
    state = int(input('你吃饱了吗:'))
    if state == 0:
        print('吃饱了')
        break
    elif state == 2:
        print('吃到虫子了')
        num += 1
        continue
    else:
        num += 1

print(f'一共吃了{num}个苹果')
