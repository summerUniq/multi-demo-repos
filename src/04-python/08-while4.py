i = 1
while i <= 5:
    if i == 4:
        print('吃饱了，不吃了')
        break
    elif i == 3:
        print(f'有虫子，第{i}个苹果不吃了')
        i += 1
        continue
    print(f'吃了第{i}个苹果')
    i += 1
