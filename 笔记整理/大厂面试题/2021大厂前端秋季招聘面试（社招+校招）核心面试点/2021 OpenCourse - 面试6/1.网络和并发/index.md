
## 网络和并发
### HTTP 1.0/1.1/2.0在并发请求上主要区别是什么?

1. HTTP/1.0
每次TCP连接只能发送一个请求，当服务器响应后就会关闭这次连接，下一个请求需要再次建立TCP连接.

2. HTTP/1.1
默认采用持续连接(TCP连接默认不关闭，可以被多个请求复用，不用声明Connection: keep-alive).
增加了管道机制，在同一个TCP连接里，允许多个请求同时发送，增加了并发性，进一步改善了HTTP协议的效率，
但是同一个TCP连接里，所有的数据通信是按次序进行的。回应慢，会有许多请求排队，造成"队头堵塞"。

3. HTTP/2.0

加了双工模式，即不仅客户端能够同时发送多个请求，服务端也能同时处理多个请求，解决了队头堵塞的问题。
使用了多路复用的技术，做到同一个连接并发处理多个请求，而且并发请求的数量比HTTP1.1大了好几个数量级。
增加服务器推送的功能，不经请求服务端主动向客户端发送数据。

### HTTP/1.1长连接和HTTP/2.0多路复用的区别?

HTTP/1.1：同一时间一个TCP连接只能处理一个请求, 采用一问一答的形式, 上一个请求响应后才能处理下一个请求. 由于浏览器最大TCP连接数的限制, 所以有了最大并发请求数的限制. 
HTTP/2.0：同域名下所有通信都在单个连接上完成，消除了因多个 TCP 连接而带来的延时和内存消耗。单个连接上可以并行交错的请求和响应，之间互不干扰

### 那为什么HTTP/1.1不能实现多路复用?

HTTP/2是基于二进制“帧”的协议，HTTP/1.1是基于“文本分割”解析的协议。

HTTP1.1的报文结构中, 服务器需要不断的读入字节，直到遇到换行符, 或者说一个空白行. 处理顺序是串行的, 一个请求和一个响应需要通过一问一答的形式才能对应起来.

```
GET / HTTP/1.1
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding:gzip, deflate, br
Accept-Language:zh-CN,zh;q=0.9,en;q=0.8
Cache-Control:max-age=0
Connection:keep-alive
Host:www.imooc.com
Referer:https://www.baidu.com/
```

HTTP2.0中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

### 前端代码里有什么方式能控制最大并发量吗?

代码, 你能写出几种方式?

### 如果任务有优先级的概念, 需要允许高优任务的插入呢?

代码