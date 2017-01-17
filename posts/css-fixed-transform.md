# Có thể bạn biết rồi: CSS fixed position và transform

Hôm nay mình gặp phải một vấn đề khá thú vị về thuộc tính `position: fixed;` trên Chrome, note lại để tham khảo về sau.

## Fixed Position

Trong trường hợp bạn chưa biết, thì khi một element mang thuộc tính:

```
position: fixed;
```

Tọa độ của nó sẽ được fix cứng tại một điểm được chỉ định, và điểm này thay đổi **phụ thuộc vào viewport** (tức là thay đổi theo cửa sổ của trình duyệt hiện tại - related to **current window**), chứ không còn phụ thuộc vào parent element (nếu có) nữa.

Ví dụ ta có layout dùng `position: absolute;` như sau:

<table class="code-table">
<tr>
<td>
<pre style="height: 400px;">
<code class="hljs html">
  &lt;body&gt;
    &lt;div class="container"&gt;
      &lt;div class="icon"&gt;&lt;/div&gt;
    &lt;/div&gt;
  &lt;/body&gt;
</code>
</pre>
</td>
<td>
<pre style="height: 400px;">
<code class="hljs css">
  body {
    width: 100%; height: 100%;
    padding: 0; margin: 0;
  }

  .container {
    display: block;
    width: 500px; height: 600px;
    background: #CCC;
    margin: 100px auto;
    position: relative;
  }

  .icon {
    display: block;
    width: 60px; height: 60px;
    background: #333;
    position: absolute;
    top: 20px; left: 20px;
  }
</code>
</pre>
</td>
</tr>
</table>

Ở đây khối `container` có thuộc tính `position: relative;` và khối `icon` là con của `container` và có thuộc tính `position: absolute;` nên tọa độ của `icon` bây giờ là điểm `(20:20)` nằm trong `container` như hình sau:



Nếu chúng ta thay đổi thuộc tính `position: absolute;` của `icon` thành `position: fixed;` như sau:

```
.icon {
  ...
  position: fixed;
  ...
}
```
