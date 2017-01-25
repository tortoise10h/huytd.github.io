# Cấu hình login SSH bằng private key

Để có thể kết nối vào SSH server bằng public-private key, đầu tiên chúng ta phải khởi tạo cặp RSA key trên máy tính cá nhân.

## Bước 1: Khởi tạo RSA key

**Trên máy tính cá nhân**, gõ lệnh:

```
ssh-keygen -t rsa -b 2048 -v
```

Lệnh này tạo ra một key RSA 2048 bit. Khi chạy thì `ssh-keygen` sẽ yêu cầu chúng ta nhập tên của key vào, có thể chọn một cái tên dễ nhớ, thường là tên server, ví dụ `gariim`:

<div class="box-white" style="padding: 10px;">
Generating public/private rsa key pair.<br/>
Enter file in which to save the key (/home/anonymouse/.ssh/id_rsa): **gariim**<br/>
...
</div>

Các thông tin khác như passphrase có thể nhập vào hay để trống tùy ý.

Sau khi chạy xong, truy cập vào thư mục `~/.ssh~` sẽ thấy có 2 file:

- **gariim**: &#9; đây chính là private key, cần lưu kĩ trong máy, không để lộ ra ngoài.
- **gariim.pub**: &#9; đây là public key, có thể đem copy lên bất kì server nào để nó có thể nhận diện ra máy tính của mình.

## Bước 2: Copy public key lên server

Tiếp theo, chúng ta cần đăng ký để server có thể nhận dạng được RSA key của mình. Để làm điều này, dùng lệnh `ssh-copy-id` như sau:

```
ssh-copy-id -i ~/gariim.pub root@doumacia.gariim.com
```

Cần phải nhập mật khẩu server để có thể copy. Sau khi copy thành công thì chúng ta có thể login bằng private key ngay.

## Bước 3: Login bằng private key

Bây giờ thử login vào server bằng private key vừa tạo:

```
ssh -i ~/.ssh/gariim root@doumacia.gariim.com
```

Nếu đã copy thành công public key lên server thì quá trình login sẽ diễn ra suông sẻ, mỗi lúc login, server sẽ đối chiếu private key của chúng ta với public key mà nó có để xác thực.

## Bước 4: Cấu hình tự động chọn private key ở Client

Nếu cảm thấy mỗi lần login phải gõ thêm tham số `-i ~/.ssh/gariim` phiền phức quá thì có thể cấu hình để máy tính tự động nhập private key.

Ở máy client, tạo một file `~/.ssh/config`, nội dung như sau:

```
Host gariim doumacia.gariim.com
Hostname doumacia.gariim.com
User root
IdentityFile ~/.ssh/gariim
```

Từ bây giờ mỗi lúc login chỉ cần gõ như thế này:

```
ssh gariim
```
