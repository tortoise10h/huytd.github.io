# Thuật toán phục hồi số hữu tỉ và bài toán John's PIN

Hôm qua đọc blog của giáo sư Ngô Bảo Châu, thấy có giới thiệu về [tạp chí Pi](http://pi.edu.vn/) và [tạp chí Epsilon](http://diendantoanhoc.net/forum/488-t%E1%BA%A1p-ch%C3%AD-epsilon/), dù ghét học toán nhưng mình rất có hứng với mấy bài toán mang tính thực dụng một tí (bạn bè mình thì toàn bảo là: _"Mày thì cái gì không thích =)))"_), nên rất là ấn tượng khi thấy trong cuốn [Epsilon số đầu tiên](https://www.dropbox.com/s/evlskte9fmn59np/Epsilon_No1.pdf?dl=0) có ngay một bài toán rất là thú vị và rất thực tế, đó là bài **Thuật toán phục hồi số hữu tỉ** do giáo sư Nguyễn Hùng Sơn viết.

## Bài toán John's PIN

Bài toán được đăng trong cuốn tạp chí như sau:

<div class="box-white" style="padding: 10px;">
Một vị giáo sư toán-tin rất cẩn thận nhưng đãng trí. <br/><br/>
Cách đây vài hôm ngân hàng gửi ông một bức thư thông báo mật khẩu của thẻ tín dụng. Mật khẩu là một số có 6 chữ số `$abcdef$`. <br/><br/>
Ông không muốn giữ lại bức thư vì sợ nó có thể lọt vào tay kẻ gian. <br/><br/> 
Vì vậy ông dùng một chiếc máy tính cầm tay đơn giản (gồm 4 phép tính `$+, -, \times, \div$` và `10` chữ số) để tính tỉ số `$abc \div def$`. Ông nhận được kết quả gần đúng là `0.195323246` và ghi nó lên một tờ giấy. <br/><br/>
Làm thế nào để vị giáo sư có thể tìm lại được mật khẩu trong thời gian ngắn nhất nếu ông chỉ có trong tay chiếc máy tính cầm tay đơn giản đó, và mật khẩu là gì?
</div>

Trong quá trình tìm hiểu thì mình thấy có một bài giải khác bằng tiếng Anh là [John's PIN](http://sites.math.northwestern.edu/~mlerma/problem_solving/solutions/johns_pin.pdf) được đăng trên trang [Math Problem Solving](http://www.math.northwestern.edu/~mlerma/problem_solving/) của trường đại học Northwestern University. Nhưng bài báo của giáo sư Nguyễn Hùng Sơn chi tiết hơn nên mình xin phép trích đăng lại và thêm vào một số diễn giải của mình - một người không chuyên về toán 😤

## Giải bài toán

Để giải bài toán trên, chúng ta sẽ ứng dụng một số lý thuyết về phân số chuỗi ([continued fraction](https://en.m.wikipedia.org/wiki/Continued_fraction)) và [thuật toán Euclid](https://vi.m.wikipedia.org/wiki/Gi%E1%BA%A3i_thu%E1%BA%ADt_Euclid), chúng ta sẽ cùng lướt qua các khái niệm này trước.

### Thuật toán Euclid 

Thuật toán Euclid dùng để tìm Ước chung lớn nhất (Greatest Common Divisor) cho hai số nguyên $a$ và $b$ được phát biểu như sau:

<math>
UCLN(a, b) = \begin{cases}
  b, & \text{if } b = 0, \\
  UCLN(b, a \bmod b), & \text{if } b \neq 0.
\end{cases}
</math>

Hay implement bằng code như sau:

```
int UCLN(int a, int b) {
  return (b == 0) ? a : UCLN(b, a % b);
}
```

Chúng ta có thể chạy thử ("dry run") thuật toán này, ví dụ để tìm ước chung của 2 số `324` và `918`, kết quả sẽ là `54`:

| Step | a   | b   | a / b | a % b  | Result |
|:----:|:---:|:---:|:-----:|:------:|:------:|
| 1    | 324 | 918 | 0     | 324    |   -    |
| 2    | 918 | 324 | 2     | 270    |   -    |
| 3    | 324 | 270 | 1     | 54     |   -    |
| 4    | 270 | 54  | 5     | 0      |   -    |
| 5    | 54  | `0` | -     | -      |**`54`**|

(Nếu để ý thì bạn sẽ thấy chúng ta không dùng giá trị $a / b$, nhưng tại sao lại ghi vào bảng? Cứ đọc tiếp sẽ rõ :D)

### Liên phân số

[Liên phân số](https://vi.m.wikipedia.org/wiki/Ph%C3%A2n_s%E1%BB%91_li%C3%AAn_t%E1%BB%A5c) là một dạng biểu diễn các số thực dương, cả hữu tỉ lẫn vô tỉ dưới dạng một phân số nhiều tầng, ví dụ như:

<math>
\displaystyle \frac{9}{7} = 1 + \frac{\displaystyle 1}{\displaystyle 3 + \frac{1}{2}}
</math>

#### Liên phân số hữu hạn 

Một **liên phân số hữu hạn** là một liên phân số có dạng như sau:

<math>
a_0 + \frac{\displaystyle 1}{\displaystyle a_1
    + \frac{1}{\displaystyle a_2
    + \frac{1}{\displaystyle \cdots
    + \frac{1}{a_n}}}}
</math>

Trong đó $a_0 \in \mathbb{Z}$ và $a_1, \cdots, a_n$ là các số nguyên dương, $a_n > 1$.

Liên phân số trên được kí hiệu là `$[a_0 ; a_1, a_2, \cdots, a_{n-1}, a_n]$` hoặc `$[a_0 ; a_1, a_2, \cdots, a_{n-1}, a_n - 1, 1]$` trong đó `$n$` chính là độ dài của liên phân số.

#### Biểu diễn số hữu tỉ bằng liên phân số 

Như ta đã biết, mọi số hữu tỉ đều có thể được viết dưới dạng phân số `$\frac{a}{b}$` trong đó `$a \in \mathbb{Z}$` là số nguyên, còn `$b \in \mathbb{N} - \{ 0 \}$` là số nguyên dương.

Một phân số có thể được chuyển thành liên phân số bằng cách lặp đi lặp lại 2 bước sau: 
- **Bước 1:** Tách ra phần nguyên
- **Bước 2:** Nghịch đảo phần phân số 

**Ví dụ:** Chuyển phân số $\frac{1517}{1073}$ thành liên phân số:

Vì $1517 = 1073 + 444$ nên ta có thể tách phân số trên thành: 
<math>
\displaystyle \frac{1517}{1073} = \frac{1073}{1073} + \frac{444}{1073} = 1 + \frac{444}{1073} \tag{1}
</math>

Ta có thể nghịch đảo phân số $\frac{444}{1073}$ và thay vào $(1)$ như sau:

<math>
\displaystyle 1 + \frac{444}{1073} = 1 + \frac{1}{\frac{1073}{444}} \tag{2}
</math>

Lặp lại, ta có thể tách phân số $\frac{1073}{444}$ thành: 

<math>
\displaystyle \frac{1073}{444} = \frac{444}{444} + \frac{444}{444} + \frac{185}{444} = 2 + \frac{185}{444}
</math>

Thay vào $(2)$ ta được: 

<math>
\displaystyle \frac{1517}{1073} = 1 + \frac{1}{\displaystyle \frac{1073}{444}} = 1 + \frac{1}{2 + \frac{185}{444}} \tag{3}
</math>

Tiếp tục nghịch đảo phân số $\frac{185}{444}$ rồi thay vào $(3)$, rồi lặp đi lặp lại 2 bước đó, ta được kết quả như sau:

<math>
\displaystyle \frac{1517}{1073} = 1 + \displaystyle \frac{1}{\displaystyle
                                  2 + \frac{1}{\displaystyle
                                  2 + \frac{1}{
                                  2 + \frac{1}{2}}}}
</math>

Như vậy, ta đã chuyển phân số $\frac{1517}{1073}$ thành liên phân số $[1; 2, 2, 2, 2]$. 

### Mối liên quan giữa thuật toán Euclid và Liên phân số 

Có một sự liên quan thú vị giữa thuật toán Euclid và phương pháp tìm Liên phân số, trước tiên, hãy cùng áp dụng thuật toán Euclid cho 2 số **1517** và **1073**, quá trình tính toán sẽ như sau:

| Step | a     | b     | a / b | a % b  | Result |
|:----:|:-----:|:-----:|:-----:|:------:|:------:|
| 1    | 1517  | 1073  | 1     | 444    |   -    |
| 2    | 1073  | 444   | 2     | 185    |   -    |
| 3    | 444   | 185   | 2     | 74     |   -    |
| 4    | 185   | 74    | 2     | 37     |   -    |
| 5    | 74    | 37    | 2     | 0      |   -    |
| 6    | 37    | `0`   | -     | -      |**`37`**|

Nhìn vào bảng trên ta có thể thấy ngay luôn, cột **a / b** của thuật toán Euclid chính là liên phân số $[1; 2, 2, 2, 2]$ mà chúng ta cần tìm. Vì thế, ta có thể dễ dàng implement thuật toán **tìm liên phân số** bằng cách áp dụng thuật toán Euclid nhưng ở mỗi bước, thì ta viết ra giá trị của **a / b**:

```
std::vector<int> lien_phan_so(int a, int b) {
  std::vector<int> result;
  int r;
  while (b != 0) {
    result.push_back(a / b);
    r = a % b;
    a = b; b = r;
  }
  return result;
}
```

OK, vậy nãy giờ đọc mấy cái này để làm gì ta?

### Phục hồi số hữu tỉ

Quay lại bài toán John's PIN, rõ ràng một cách đơn giản nhất để vị giáo sư có thể tìm ra được mã PIN là bruteforce, thử tất cả mọi phân số có dạng $\frac{abc}{def}$, tuy nhiên bruteforce là giải pháp tệ nhất, đơn giản vì không biết nó chạy đến khi nào mới xong.

## Tham khảo 

[1] Nguyễn Hùng Sơn, _"Thuật toán phục hồi số hữu tỉ"_, [Epsilon số 1](https://www.dropbox.com/s/evlskte9fmn59np/Epsilon_No1.pdf?dl=0) (2015), pp. 21-30.

[2] Miguel A. Lerma, _"John's PIN"_, [Northwestern University Math Problem Solving Group](http://www.math.northwestern.edu/~mlerma/problem_solving/) (2003)
