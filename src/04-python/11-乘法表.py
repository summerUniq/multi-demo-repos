i = 1
while i <= 9:
    # print line
    # 打印次数是行号 1*1= 1
    # 1*2 = 2 2*2 = 4
    j = 1
    while j <= i:
        print(f'{j} * {i} = {j*i}', end='\t')
        j += 1
    print('')
    i += 1
