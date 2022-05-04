# CURl

## curl是什么

curl是一种命令行工具，作用是发出网络请求， 然后得到和提取数据， 显示在"标准输出"(stdout)上面。
支持多种协议

## 用途

一、 查看网页源码

```bash
curl www.sina.com
```

二、保存网页（-o)

```bash
# 相当于使用wget命令
curl -o [文件名] www.sina.com
```

三、自动跳转（-L)

```bash
# 有些网页是自动跳转的。使用-L参数， curl就会跳转到新的网址
curl -L www.sina.com
```

四、显示头信息（-i/-I)

```bash
curl -i www.sina.com
```

`-I`参数则是只显示http response的头信息。

五、显示通信过程（-v/ --trace filename/ --trace-ascii filename)

```bash
curl -v www.sina.com
```

如果你觉得上面的信息还不够，那么下面的命令可以查看更详细的通信过程。

```bash
curl --trace output.txt www.sina.com
# or
curl --trace-ascii output.txt www.sina.com
# 运行后，请打开output.txt文件查看。
```

六、发送表单信息

发送表单信息有GET和POST两种方法。GET方法相对简单，只要把数据附在网址后面就行。

```bash
curl example.com/form.cgi?data=xxx
```

POST方法必须把数据和网址分开，curl就要用到--data参数。

```bash
curl -X POST --data "data=xxx" example.com/form.cgi
```

如果你的数据没有经过表单编码，还可以让curl为你编码，参数是`--data-urlencode`。

```bash
curl -X POST--data-urlencode "date=April 1" example.com/form.cgi
```

七、HTTP动词

curl默认的HTTP动词是GET，使用`-X`参数可以支持其他动词。

```bash
curl -X POST www.example.com
curl -X DELETE www.example.com
```
