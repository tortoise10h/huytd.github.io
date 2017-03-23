# Kĩ thuật Memoize cải thiện performance

Memoize là một kĩ thuật cache lại giá trị trả về của các hàm dựa trên tham số truyền vào nó.

Kĩ thuật này có thể áp dụng trên mọi ngôn ngữ lập trình, trong bài viết này mình chỉ lấy JavaScript ra làm ví dụ.

## Đặt vấn đề: Bài toán tìm số Fibonacci

Đối với bài toán tìm số Fibonacci, chúng ta đều biết thuật toán đơn giản nhất để implement nó là sử dụng đệ quy:

<math>
F_{n}=F_{n-1}+F_{n-2}
</math>

Hay diễn giải bằng code như sau:

```
let fibo = (n) => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibo(n - 1) + fibo(n - 2);
}
```

Nhược điểm của giải pháp trên rất rõ ràng, đó là thời gian tính toán. Đối với mỗi lần tính toán, hàm `fibo` phải thực hiện tính toán lại từ đầu (từ `n = 0`) đến `n`. Trong quá trình đó một giá trị `fibo(n)` sẽ bị tính đi tính lại liên tục, một sự lãng phí không hề nhỏ.

Thời gian chạy của thuật toán trên cho kết quả `fibo(50)`:

```
➜  time node fibo.js

193.97s user 
0.56s   system 
99%     cpu 
3:15.24 total
```

Và như ta đã nhận thấy, thì phần lớn thời gian tiêu tốn vào việc tính đi tính lại các giá trị trùng lặp, vậy để cải thiện, ta cần tìm một cách nào đó để lưu lại giá trị của từng phép tính `fibo(n)`, và tránh việc tính lại từ đầu mỗi khi chạy. Cách này gọi là **caching**.

Vì đối với mỗi số `n` bất kì, ta luôn luôn chỉ có duy nhất một giá trị sau khi tính toán với hàm `fibo(n)`. Vậy nên ta có thể tạo ra một mảng tên là `cache` để lưu lại các giá trị `fibo(n)` đã tính toán, ở lần chạy tiếp theo, chỉ việc lấy nó ra và sử dụng, không cần phải tính lại.

```
let cache = [];

let fibo = (n) => {
  if (n === 0) 
    cache[n] = 0;
  else if (n === 1) 
    cache[n] = 1;
  else 
    cache[n] = cache[n] || (fibo(n - 1) + fibo(n - 2));
  return cache[n];
}
```

Kết quả thời gian chạy `fibo(n)` được cải thiện đáng kể:

```
➜  time node fibo.js

0.05s user 
0.02s system 
98%   cpu 
0.072 total
```
