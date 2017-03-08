# Receiving and returning Vector in Rust FFI

There is one thing we need to know when working with FFI is: **Not all Rust's types are returnable through FFI**.

For example:

```
fn getVec() -> *const *const c_char {
  let s = vec![ "Hello", "Yo" ];
  return s.as_ptr();
}
```

The `s` vector will be freed at the end of `getVec()` function. So the returned pointer `s.as_ptr()` will just points to a freed memory. This will cause segfaults in Node or Ruby (or whereever you use the FFI module).

The solution for this is get the pointer of `s` then tell Rust to just `forget` about `s`:

```
fn getVec() -> *const *const c_char {
  let s = vec![ "Hello", "Yo" ];
  let r = s.as_ptr();  // <== save the pointer
  std::mem::forget(s); // <== forget the s
  return r;
}
```

You may surprised but it's obiviously that `mem::forget` is safe in Rust, it doesn't need to be wrapped in `unsafe` block.

The reason is, it's ok to leak some memory in Rust. Not calling the destructor of a value is not something that violate the Rust safey rules.

But leaking memory or I/O objects is usually undesirable, so use `forget` for specialized use cases only.
