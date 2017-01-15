# Random Notes

This is just a clipboard for myself.

## Start tmux and auto attach to any exists session

Put this script to `.bash_profile` or anything equivalent:

```
if [ -z "$TMUX" ]; then
  tmux a || tmux new
fi
```

## Use the same clipboard for tmux and vim

Install `reattach-to-user-namespace` with `brew`:

```
brew install reattach-to-user-namespace
```

Put this config to `.tmux.conf`:

```
set-option -g default-command "reattach-to-user-namespace -l zsh"
setw -g mode-keys vi
bind-key -t vi-copy v begin-selection
bind-key -t vi-copy y copy-pipe "reattach-to-user-namespace pbcopy"
unbind -t vi-copy Enter
bind-key -t vi-copy Enter copy-pipe "reattach-to-user-namespace pbcopy"
bind ] run "reattach-to-user-namespace pbpaste | tmux load-buffer - && tmux paste-buffer"
```

Set VIM's clipboard to `unamed` in `.vimrc`:

```
set clipboard=unnamed
```

## Use fzf with ripgrep in Vim

In case you don't have `fzf`, install it with:

```
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --bin' }
Plug 'junegunn/fzf.vim'
```

In `.vimrc`, put this:

```
let $FZF_DEFAULT_COMMAND='rg --files --no-ignore --hidden --follow --glob "!.git/*"'
let $FZF_DEFAULT_OPTS = '-m --bind ctrl-a:select-all,ctrl-d:deselect-all,ctrl-t:toggle-all'
```

And bind the `\` key with `ripgrep` search command:

```
command! -bang -nargs=* Find call fzf#vim#grep('rg --column --line-number --no-heading --fixed-strings --ignore-case --no-ignore --hidden --follow --glob "!.git/*" --color "always" '.shellescape(<q-args>).'| tr -d "\017"', 1, <bang>0)
set grepprg=rg\ --vimgrep
nnoremap \ :Find<SPACE>
```

This also force `ripgrep` to respect the `.gitignore`.

## Clear cache files when terminal starts slow

Put this alias to `.bash_profile`:

```
alias slow="sudo rm /private/var/log/asl/*.asl"
```

Whenever it slow, just type:

```
slow
```
