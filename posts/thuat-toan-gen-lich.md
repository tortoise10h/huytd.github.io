# Thuật toán tạo lịch tháng trong các component Datepicker

Datepicker là một dạng component đã quá quen thuộc với các bạn làm front-end, được sử dụng rộng rãi trên rất nhiều ứng dụng web. Mục đích của nó là hiển thị một "tờ" lịch trên màn hình máy tính để người dùng có thể chọn ngày tháng một cách dễ dàng.

![](img/components_pickers_date3.png)

Cách sử dụng các component này cũng rất là đơn giản, vì hầu như các thư viện UI phổ biến hiện nay đều có cả, ví dụ đây là cách sử dụng trong [Angular UI](https://angular-ui.github.io/bootstrap/)

```
<input type="text" uib-datepicker-popup="{{format}}" />
```

Mặc dù Datepicker chẳng có vẻ gì là to tát, nhưng thuật toán đằng sau nó thì lại rất thú vị và đáng để tìm hiểu.

## Phân tích vấn đề

Khi hiển thị lịch cho một tháng bất kì, chúng ta phải bắt đầu hiển thị từ ngày đầu tiên của tháng đó (ngày 1), vấn đề là ngày này có thể thuộc một "thứ" nào đó bất kì trong tuần (từ thứ 2 đến CN). Các thứ trước đó sẽ bị bỏ trống vì nó thuộc về tháng trước.

```
      January                February                March
Su Mo Tu We Th Fr Sa   Su Mo Tu We Th Fr Sa   Su Mo Tu We Th Fr Sa
               1  2       1  2  3  4  5  6          1  2  3  4  5
3  4  5  6  7  8  9    7  8  9  10 11 12 13   6  7  8  9  10 11 12
10 11 12 13 14 15 16   14 15 16 17 18 19 20   13 14 15 16 17 18 19
17 18 19 20 21 22 23   21 22 23 24 25 26 27   20 21 22 23 24 25 26
24 25 26 27 28 29 30   28 29                  27 28 29 30 31
31
```

Vì vậy, việc đầu tiên chúng ta cần làm là _xác định ngày đầu tiên của tháng cần tạo là ngày thứ mấy trong tuần_.

Sau khi đã xác định được đâu là ngày bắt đầu, chúng ta sẽ bắt đầu điền tiếp vào các ngày tiếp theo cho đến hết tháng (30 hoặc 31 ngày). Riêng tháng 2 sẽ có 28 ngày, đặc biệt vào _năm nhuận_ thì tháng 2 sẽ có 29 ngày. Vậy, việc thứ 2 cần làm đó là _xác định năm hiện tại có phải là năm nhuận_ không.

## Công thức Zeller - Tính thứ ngày trong tuần

Đầu tiên, ta sẽ tìm hiểu về **công thức Zeller**. Đây là công thức giúp chúng ta xác định được một ngày thuộc thứ mấy. Giúp giải quyết vấn đề thứ 1 đã đề cập ở trên.

Công thức Zeller có dạng:

$$weekday=\left( \frac{13\; \times \; month\; -\; 1}{5}+\frac{year}{4}+\frac{century}{4}+day+year-2\times century \right)\%7$$

Trong đó ta có:

- $weekday$: là thứ ngày mà chúng ta cần tìm, ví dụ: `0 = Chủ nhật`, `1 = Thứ 2`,...
- $month$: là tháng chúng ta cần xét, lưu ý: `Tháng 3 = 1`, `Tháng 4 = 2`,..., `Tháng 12 = 10`, `Tháng 1 = 11`, `Tháng 2 = 12`
- $day$: là ngày chúng ta cần tính (ngày 1, 2, 3,..., 29, 30, 31)
- $century$: là thế kỷ hiện tại của năm đang xét, lưu ý: **bắt đầu từ 0**, như vậy `Thế kỷ 21 = 20`
- $year$: là số năm thứ mấy thuộc thế kỉ đang xét, ví dụ: `Năm 2016 = 16`

| Ký hiệu 	| Mô tả 	| Ví dụ 	|
|---------	|-------	|-------	|
| $weekday$	| là thứ ngày mà chúng ta cần tìm      	| `0 = Chủ nhật`, `1 = Thứ 2`,...      	|
| $month$	| là tháng chúng ta cần xét, giá trị `1` bắt đầu từ tháng 3      	| `Tháng 3 = 1`, `Tháng 4 = 2`,..., `Tháng 12 = 10`, `Tháng 1 = 11`, `Tháng 2 = 12`      	|
| $day$ 	| là ngày chúng ta cần tính      	| ngày 1, 2, 3,..., 29, 30, 31      	|
| $century$ | là thế kỷ hiện tại của năm đang xét, **bắt đầu từ 0**      	| `Thế kỷ 21 = 20`      	|
| $year$ 	| là số năm thứ mấy thuộc thế kỉ đang xét      	| `Năm 2016 = 16`      	|

---
**Ví dụ:** Tìm xem ngày `18/09/2016` là thứ mấy?

Đối với ngày $18/09/2016$ ta có:

$month = 7$, $day = 18$, $century = 20$, $year = 16$

Áp dụng công thức Zeller, ta có:

$$weekday=\left( \frac{13\; \times \; 7\; -\; 1}{5}+\frac{16}{4}+\frac{20}{4}+18+16-2\times 20 \right)\%7$$

$$\; \; \; \; \; \; \; \; \; \; \; \; \; \; = 21 \% 7$$

$$\; \; \; \; \; \; \; \; \; \; \; \; \; \; = 0$$

Như vậy ta tính được ngày $18/09/2016$ có $weekday = 0$ suy ra đó là ngày _Chủ nhật_. Ta có thể tra lịch để kiểm chứng:

```
         September 2016
Su   Mo   Tu   We   Th   Fr   Sa
                    1    2    3
4    5    6    7    8    9    10
11   12   13   14   15   16   17
[18] 19   20   21   22   23   24
25   26   27   28   29   30
```

---
