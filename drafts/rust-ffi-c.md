# FFI with C

You can call Rust code in other languages like C by `std::ffi`.

You can also call C functions in Rust by using `libc` crate.

```
use libc::*;
```

For example, to print a Rust string with C's `puts` function:

```
extern crate libc;

use libc::puts;
use std::ffi::CString;

fn main() {
  let s = "Hello World!";
  let to_c = CString::new(s).unwrap();
  unsafe {
    puts(to_c.as_ptr());
  }
}
```

`CString::new()` produces a string with NULL byte ending `\0` that is compatible with C.

`as_ptr()` function returns a pointer to this C string.

When write Rust code for other language, it's neccessary to use `#[no_mangle]`. This attribute help you keep your function name from being renamed during the compilation.
