# Weekend Hack - 03/2017

Tuần này lưòi đọc sách nên chuyển sang vọc vạch lung tung, nhưng cũng có khá nhiều thứ cần note lại.

## Hacking Amazon Dash Button

Amazon Dash Button là một thiết bị kết nối Wifi và chỉ có 1 nút bấm. Sau khi mua về và cài đặt xong, thì khi bấm cái nút này, nó sẽ tự động gửi request đến Amazon để order món đồ mà bạn đã chọn trưóc đó. 

Bạn có thể dùng nó để order mì tôm, bánh kẹo, sữa, bột giặt, cà phê, hay bất cứ thứ gì tùy thích. Tuy nhiên bạn chỉ đưọc order những mặt hàng của một hãng cho một nút, tùy theo nhãn in trên nút đó.

Tuy bề ngoài nhìn khá là đơn giản, nhưng bên trong Dash button có rất nhiều thứ hay ho:

- Dùng chip xử lý `ARM Cortex-M3` (STM32F205RG6), xung nhịp lên đến `120 MHz`.
- Chip này có `128 KB` RAM và `1 MB` bộ nhớ flash để chứa chưong trình điều khiển.
- Chip này còn tích hợp luôn module WIFI `BCM943362`.
- Có 1 microphone tích hợp.
- Có 1 đèn LED RGB.
- Cấp nguồn bằng 1 cục pin `Energizer Ultimate Lithium AAA` có tửu lưọng... nhầm, thời lưọng lên đến 20 năm

Và tất nhiên với khả năng kết nối wifi cùng thời lưọng pin trâu bò của nó, thì việc dùng nó để làm cái nút order bỉm sửa có vẻ hơi bị phí. Chưa kể là được bán với giá rẻ bèo như cho không (từ `0.99$` - `4.99$`) thì đây quả là một món đồ chơi lý tưởng cho dân ghiền công nghệ.

Chưa hết, sau khi mua 1 em Dash này về, thì bạn sẽ được giảm giá ngay 4.99$ cho order đầu tiên. Vì bạn Evan nhà mình chuẩn bị mọc răng, rất thích nhai bất cứ thứ gì bạn ấy vớ được nên hôm qua mình order một cục chew toy giá `5$` và đưọc giảm giá ngay lập tức, dù là cái Dash button mua chỉ có `0.99$` :))

Giờ vô chủ đề chính: **Hack cái nút Dash button**.

### Cài đặt Dash Button
Sau khi order về, thì việc đầu tiên cần làm đó là cấu hình cho cái nút kết nối đưọc với Wifi.

Để cấu hình thì chỉ cần mở app Amazon trên điện thoại ra, vào **Menu -> Your Account -> Add new Dash Button**, sau đó làm theo hướng dẫn trên app, nhấn cái nút của Dash trong vòng 6 giây cho tới khi cái đèn trên đó chuyển qua màu xanh thì nhả ra. Điền pass Wifi vào.

Sau đó app Amazon sẽ nhảy ra màn hình chọn sản phẩm cần mua, tại bước này nhớ **đừng chọn cái gì cả**, chỉ lẳng lặng tắt app đi là xong.

### Tìm MAC address của Dash Button

Để có thể sử dụng được Dash button thì chúng ta cần phải lấy địa chỉ MAC của nó. Cách lấy thì nhiều vô kể. Có ngưòi sử dụng các script chuyên dụng, có ngưòi tự viết script để bắt gói tin và tra địa chỉ. Mình chỉ trình bày cách đơn giản đó là dùng `tcpdump`.

Đầu tiên chạy `tcpdump`:

```
$ tcpdump
```

Nếu chưa có thì có thể cài thông qua `brew` trên macOS hoặc package manager của bản Linux bạn đang xài, ví dụ trên Arch là:

```
$ pacman -S tcpdump
```

Khi chạy thì `tcpdump` sẽ liệt kê toàn bộ các kết nối trong mạng, lưu ý không nên sử dụng khi đang ở trong một mạng có quá nhiều thiết bị (vì lưọng output sẽ nhiều, khó tìm). Lúc này bạn có thể bấm cái nút trên Dash vài ba lần và tìm output có dạng:

```
22:26:52.777174 IP 0.0.0.0.bootpc > 255.255.255.255.bootps: BOOTP/DHCP, 
Request from XX:XX:XX:XX:XX:XX (oui Unknown), length 261
```

Trong đó `XX:XX:XX:XX:XX:XX` sẽ là địa chỉ MAC của Dash button mà chúng ta cần tìm.
