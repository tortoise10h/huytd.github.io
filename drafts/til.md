# TIL

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
