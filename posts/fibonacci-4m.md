# Tính tổng các số Fibonacci từ 1 tới 4 triệu

Cuối tuần này có nói chuyện với bác [@haond](http://kipalog.com/users/nguyenduyhao1111/mypage) về một đề tài khá là thú vị, đó là bài toán: **Tính tổng các số Fibonacci từ 1 tới 4 triệu**

Để tính một số Fibonacci thì cực kì đơn giản, chỉ cần làm theo công thức: 

<pre class="math">
$F_{n}=F_{n-1}+F_{n-2}$
</pre>

Code thì khá là đơn giản bằng cách dùng đệ quy: 

```
func Fibonacci(n: Int) -> Int {
  if n <= 2 {
    return 1
  }
  return Fibonacci(n - 1) + Fibonacci(n - 2)
}
```

Hoặc dùng vòng lặp để khử đệ quy:

```
func Fibonacci(n: Int) -> Int {
  var a = 0
  var b = 1
  var next = 0
  for i in 0..<n {
    if i <= 1 {
      next = i
    } else {
      next = a + b
      a = b
      b = next
    }
  }
  return next
}
```

Quay lại bài toán tính tổng các số Fibonacci, ta có thể implement một hàm tính tổng đơn giản như sau:

```
func Sum(n: Int) -> Int {
  var sum = 0
  for i in 0..<n {
    sum += Fibonacci(n)  
  }
  return sum
}
```

Tuy nhiên thì với thuật toán như vậy, chúng ta có gặp phải vấn đề gì không? 

Câu trả lời là có, vấn đề rất lớn!

Đầu tiên hãy nhìn vào đồ thị biểu diễn thời gian cần để tính Fibonacci dưới đây:

![](img/fibonacci.png)

Dễ nhận thấy, với số n càng lớn, thì thời gian để tính Fibonacci của số đó càng lâu.

Cho nên đối với bài toán ở đây là tính tổng các số Fibonacci từ 1 tới 4 triệu, thì xét về yếu tố thời gian, điều này cũng trở thành một vấn đề bất khả thi rồi. Để giải quyết bài toán này, chúng ta cần phải loại trừ được vấn đề thời gian do chạy đệ quy hoặc việc lặp gây ra.

Vì mọi vấn đề liên quan đến số học đều, hiển nhiên, có thể biểu diễn được bằng toán học, vậy đây cũng không phải là ngoại lệ, hãy xem chúng ta có thể mượn được gì từ toán nào.

## Công thức tính tổng n số Fibonacci

Chúng ta có công thức tính tổng n số Fibonacci với mọi số n >= 2 như sau:

<pre class="math">
$$\mbox{S}_{n}\;=\;\sum_{i=1}^{n}{F_{i}}=\;F_{n+2}\; -\; 1$$
</pre>

Nếu không tin tưởng vào công thức, thì các bạn có thể tham khảo [chứng minh công thức tại đây](https://proofwiki.org/wiki/Sum_of_Sequence_of_Fibonacci_Numbers#Proof)

Vậy để tính tổng các số Fibonacci từ 1 tới 4 triệu, chúng ta có thể **tìm số Fibonacci thứ 4 triệu lẻ 2 (4,000,002) rồi trừ giá trị này đi cho 1**. Bài toán quay trở về tìm một số Fibonacci bất kì.

Tuy nhiên, 4 triệu lẻ 2 vẫn là một con số quá lớn để có thể tính toán bình thường trên một máy tính cá nhân (với các yếu tố như: tốc độ xử lý, giới hạn bộ nhớ, giới hạn của kiểu dữ liệu,...). Chúng ta cần tìm một giải pháp khác ít tốn kém hơn.

## Công thức tính số Fibonacci bất kì

Chúng ta có thêm công thức [Binet](http://mathworld.wolfram.com/BinetsFibonacciNumberFormula.html) để tìm một số Fibonacci bất kì như sau:

<pre class="math">
$$F_{n}\;=\;\frac{\phi ^{n}\; -\; \left( -\phi  \right)^{-n}}{\sqrt{5}}$$
</pre>

Chi tiết về kí hiệu <code class="math">$\phi$</code> (phi): Xem [tỉ lệ vàng](http://mathworld.wolfram.com/GoldenRatio.html)

Công thức trên có thể được khai triển thành: 

<pre class="math">
$$F_{n}\;=\;\frac{\left( 1\; +\; \sqrt{5} \right)^{^{n}}\; -\; \left( 1\; -\; \sqrt{5} \right)^{^{n}}}{2^{^{n}}\sqrt{5}}$$
</pre>

Áp dụng 2 công thức trên, chúng ta có thể loại bỏ hoàn toàn việc sử dụng đệ quy hoặc vòng lặp, và điều này sẽ cải thiện tốc độ tính toán một cách đáng kể.

Cách implement thì cực kì đơn giản: 

```
import Foundation

func Fibonacci(n: Double) -> Double {
  return (pow((1.0 + sqrt(5.0)), n) - pow((1.0 - sqrt(5.0)), n)) / (pow(2.0, n) * sqrt(5.0))
}

func Sum(n: Double) -> Double {
  return Fibonacci(n: n + 2.0) - 1.0
}
```

Một nhược điểm duy nhất của cách này là việc tính toán với căn bậc 2 trên máy tính sẽ dẫn tới tình trạng làm tròn số và sẽ xuất hiện sai số nhất định khiến cho giá trị không thực sự chính xác.

Tuy nhiên đây cũng là một trong những ví dụ cho việc ứng dụng toán học vào lập trình để giúp giải quyết vấn đề một cách hiệu quả hơn. 
