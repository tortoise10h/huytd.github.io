# Build Markdown TOC generator with Rust

One of the interesting features of emacs's Org-mode is it automatically generates the table of contents for your document.

I want this feature for my Markdown generator as well, so I spent my Sunday for this.

## The idea

To generate the TOC, we need to list all the headers in a Markdown document, but need to represent its hierarchy as well.

Tree is the best data structure to help us do this.

The idea is to write a Rust program that read the markdown file line by line, at each line, we check if it's a header or not, then put that header to the tree.

In the end, we parse the tree data into an HTML string, which we can insert to the Markdown generator or any HTML pages.

## Coding

### Read file

Read the whole file with `f.read_to_string()` would be slow.

Use `reader.lines().enumerate()` to read line by line instead. This is good for parsing the large file.

### Filter the headers

The first idea is to get all the lines starts with `#`, this is the correct idea but not enough.

If you're writing documents about `bash` or `ruby`, you may see some of your code comment goes with the headers. It's because they're using `#` character at the beginning of the line for commenting.

The better idea is put a flag to check if the current line is in a code block or not.

`let mut is_in_codeblock = false;`

### Represent menu with tree data

#### Building the tree data structure

#### Read the markdown headers to tree

### Generate HTML table of contents

Just read the tree and populate the menu, with `<ul>` embed.
