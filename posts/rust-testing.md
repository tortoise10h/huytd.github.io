# Viết test trong Rust the idiomatic way

**Chống chỉ định:** cái tiêu đề đặt nữa tây nữa việt là cố ý, để câu view, chứ thực ra không phải tại mình không biết dịch chữ `idiomatic` ra đâu :v À nhân tiện nói luôn, `idiomatic way` có nghĩa là `một cách chính thống`, ở đây bàn về cách viết test được cộng đồng Rustlang công nhận và khuyến khích.

Unit testing là một chức năng quan trọng mà bất kì ngôn ngữ nào cũng cần phải có, viết unit test cũng là một việc mà bất kì lập trình viên nào cũng cần phải làm, thậm chí với một vài cộng đồng như Golang và Ruby thì người ta bảo thủ tới mức xem việc publish một project không có unit test giống như là một cái tội luôn vậy đó :)) 

![](img/rustlang_vietnam.png)

Đối với Go thì chúng ta có `go test`, đối với Ruby chúng ta có thể chạy test thông qua `rake` (đúng không nhỉ? một thanh niên không code Ruby cho hay), Node thì thôi không nên nhắc tới làm gì :( và tất nhiên là Rust cũng có công cụ testing built-in thông qua lệnh `cargo test`.

## Cách test trong Rust

Để viết một unit test trong Rust thì khá là đơn giản, chỉ cần tại bất kì đâu trong chương trình, viết một hàm theo dạng:

```
#[test]
fn minh_thich_thi_minh_test_thoi() {
  ...
}
```

Hàm này có attribute `#[test]` (dân Java, C#, thường gọi cái này là annotation) để báo cho Rust compiler biết rằng đây là một hàm test, các hàm này sẽ được chạy khi chúng ta gọi lệnh:

```
cargo test
```

Ví dụ, ta viết một hàm test như sau:

```
#[test]
fn this_function_should_drop_all_tables() {
    assert!(1 + 1 == 2)
}
```

Và chạy test, ta thu được kết quả:

```
➜  kipalog git:(master) ✗ cargo test
   Compiling testrun v0.1.0 (file:///Users/huy/code/kipalog)
    Finished debug [unoptimized + debuginfo] target(s) in 0.27 secs
     Running target/debug/kipalog-90d752c0679f22d9

running 1 test
test this_function_should_drop_all_tables ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured

```

