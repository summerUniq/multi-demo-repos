str = 'hello world'

for i in str:
    if i == 'w':
        print(f'遇到{i}不打印')
        break
    if i == 'o':
        print(f'不打印{i}')
        continue
    print(i)
