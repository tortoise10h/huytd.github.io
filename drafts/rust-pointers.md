# Pointers and Memory safety

The topics will be covered in this post:

- Pointers and references
- Ownership and borrowing
- Boxes
- Reference counting

## Pointers and references

Let's take a step back and talking about stack and heap and some other things first.

### The stack and the heap

By default, a `2 MB` chunk of memory called stack will be granted to a program when it starts.

The program will use this stack to store all its local variables and function parameters.

When program calls a function, a new `stack frame` is allocated to it.

By doing this, the stack knows the order in which the functions are called to return correctly to the calling code.

**Dynamically sized types** such as `strings` or `arrays` can't be stored in stack. It must be stored in heap. So they're potentially much bigger piece of memory than the stack.

### Lifetimes

All variables in Rust have a lifetime.

A value of a variable is valid from where it is declared to when it is no longer referenced, this called _the lifetime of a variable_.

```
fn main() {
  let n = 42u32;
  let n2 = n; // a copy of the value from n to n2
  life(n);
  println!("{}", m);  // error: unresolved name `m`.
  println!("{}", o);  // error: unresolved name `o`.
}

fn life(m: u32) -> u32 {
  let o = m;
  o
}
```

The lifetime of `n` ends when `main()` ends. In other words, the start and end of a lifetime happen in the same scope.

The words `lifetime` and `scope` are synonymous, but `lifetime` is used to refer to the _extent of a reference_.

The lifetime of a value can be indicated by an annotation `'a`. It can be `'b`, `'n` or `'life`, but its common to use a single character to represent lifetimes.

```
fn fun<'a>(s: &'a str) {
  ...
}
```

The `'static` lifetime is the lifetime of things that last for the entire length of the program. Only use `'static` when you need the value that long.

In the example of `fun()` function above, we can opt-out the lifetime `<'a>` because the compiler is smart enough to recognize it.
