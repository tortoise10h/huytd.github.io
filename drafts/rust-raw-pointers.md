# Raw pointers in Rust

_Raw pointers_ are pointers which has no built-in security in Rust.

They are only available in `unsafe` code blocks.

You can work with them with the same freedom as C. That mean they're risky and it's your responsibilty to ensure the safety of them.

There are 2 types of _raw pointers_:

- `*const T`: Immutable pointer.
- `*mut T`: Mutable poineter.

They can point to invalid memory. The memory resource needs to be manually freed.

Multiple concurrent threads have nonexclusive access to `mutable` raw pointers.

Dereferencing _raw pointers_ are risky because it has no compiler guarantee, it must be done in `unsafe` blocks:

```
// The wrong way:
let p_raw: *const u32 = &10;
let n = *p_raw;

// Compile error:
error[E0133]: dereference of raw pointer requires unsafe function or block
 --> pointer.rs:3:13
  |
3 |     let n = *p_raw;
  |             ^^^^^^ dereference of raw pointer

// The right way:
let n = unsafe { *p_raw };
```
