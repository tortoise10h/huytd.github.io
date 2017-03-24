## Rename nhiều file cùng một lúc dùng Regex

Giả sử có một folder chứa 3 file có tên na ná nhau nhưng khác phần đuôi và khác luôn kiểu file như sau:

```
├── squared-checkbox-directive.js
├── squared-checkbox-style.scss
└── squared-checkbox-template.html
```

Giờ chúng ta muốn đổi tên cả 3 file này thành dạng `circle-checkbox-*.*`, thì không thể nào dùng lệnh `mv` được (nếu ai làm được thì bày mình với :D)

Có thể dùng lệnh `rename` để đổi:

```
rename 's/squared/circle/' *.*
```

Kết quả thu được:

```
├── circle-checkbox-directive.js
├── circle-checkbox-style.scss
└── circle-checkbox-template.html
```

Lệnh này có sẵn trên môi trường Linux, còn trên Mac thì phải cài thêm thông qua `brew`:

```
brew install rename
```

huytd, 03-23-2017
