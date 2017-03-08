# Async/await in Node

`async/await` has officially landed in Node 7.6.0. It's not something to replace the Promise, but it's something that make Promise great again.

An `async` function will returns a Promise when it's called. Returning a value inside an `async` function will `resolve` the Promise with that value. And `throw` an exception in an `async` function will `reject` the Promise.

An `await` expression can be used inside an `async` function, which will pause the execution until the expression returns data.

For example, this is how we use `fetch` API with Promises:

```
let get = (url) => {
  return new Promise(resolve => {
    fetch(url)
      .then(res => res.text())
      .then(body => resolve(body));
  });
};
```

With `async` and `await`, life is easier:

```
let get = async (url) => {
  let response = await fetch(url);
  let body = await response.text();
  return body;
};
```

With the Promise `resolve`, you don't know when will your `fetch` returns the data, but with `async`/`await`, you can easily know when will your data be back. It's easier to write asynchronous codes with `async`/`await`.
