# TIL

## Diff in markdown

```
############################################ PLUGINS
# which plugins are enabled (they must be installed via setup.py first)
-plugins = about, liveupdate
+plugins = about, liveupdate, place
```

## Use surf with tabbed

`surf` is a lightweight and embedable web browser based on WebKit, it can be embed into any X application.

You can use `surf` with `tabbed` to have multitab browsing.

Some useful shortcut to use with `surf`:

- **Ctrl-h**: Back
- **Ctrl-l**: Forward
- **Ctrl-g**: Enter URL

To start `surf` embed in `tabbed`, use this command:

```
tabbed surf -e
```

## Rename files with regex

Given a folder with 3 files:

```
├── squared-checkbox-directive.js
├── squared-checkbox-style.scss
└── squared-checkbox-template.html
```

Now you want to rename them to `circle-checkbox-*.*`, you can't use the `mv` command.

To do this, you need to use `rename` command:

```
rename 's/squared/circle/' *.*
```

Now you got what you need:

```
├── circle-checkbox-directive.js
├── circle-checkbox-style.scss
└── circle-checkbox-template.html
```

On Mac, you need to install `rename` via `brew`:

```
brew install rename
```

## MongoDB $or vs $in

When you need to query for multiple values of the same field, for example, you want to get all users that has the First name is `"Huy"` or `"King"`, you can use both `$or` or `$in`:

```
// using $or
db.users.find({ $or: [ { "FirstName": "Huy" }, { "FirstName": "King" } ] })

// using $in
db.users.find({ "FirstName": { $in: [ "Huy", "King" ] } })
```

What is the different between `$or` and `$in`?

The answer is clear and is [available in MongoDB's documentation](https://docs.mongodb.com/manual/reference/operator/query/or/#or-versus-in):

  - Use `$in` when you need to check for the value of the same field
  - Use `$or` when you need to check with multiple expressions

What is the performance different between `$or` and `$in`? And why it's recommended to use `$in` over `$or` for single field matching?

It's important to note that: [MongoDB will performs a collection scan for each clause in the `$or` expression](https://docs.mongodb.com/manual/reference/operator/query/or/#behaviors).

That's mean, the number of collection scan for `$or` expression is equals to the number of clauses you have, but the number of collection scan for `$in` expression is regardless to the number of values you want to check.

# Kiểm tra console.log trước khi commit

grep -n console $(git ls-files -m)

