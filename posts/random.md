# Random Notes

This is just a clipboard for myself.

## Save VIM session

Save current split layout to `$(CWD)/.work` file:

```
nnoremap <Leader>ss :mksession .work<CR>
```

Load saved session with:

```
vim -S .work
```

## Map jk as ESC, ESC as backtick in VIM

For insert mode only:

```
inoremap jk <ESC>
inoremap <ESC> `
```

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

## Get rid of pressing G when jump to lines

Use this config:

```
nnoremap <CR> G
```

From now on, just type `10<Enter>` to jump, no more `<SHIFT>g` which can break your wrist :))

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

## Add some color to man page

Add these lines to `.bash_profile`:

```
export LESS_TERMCAP_mb=$(printf '\e[01;31m') # enter blinking mode
export LESS_TERMCAP_md=$(printf '\e[01;38;5;75m') # enter double-bright mode
export LESS_TERMCAP_me=$(printf '\e[0m') # turn off all appearance modes (mb, md, so, us)
export LESS_TERMCAP_se=$(printf '\e[0m') # leave standout mode
export LESS_TERMCAP_so=$(printf '\e[01;33m') # enter standout mode
export LESS_TERMCAP_ue=$(printf '\e[0m') # leave underline mode
export LESS_TERMCAP_us=$(printf '\e[04;38;5;200m') # enter underline mode
```

## Color highlight for tmux window indicator

In `.tmux.conf`:

```
set -g status-justify left
set -g status-bg default
set -g status-fg colour3
set -g window-status-current-bg colour3
set -g window-status-current-fg colour0
set -g window-status-bell-style none
set -g window-status-bell-bg colour1
set -g window-status-bell-fg colour0
set -g window-status-current-format "#{?window_zoomed_flag,#[bg=colour4],} #W #{?window_zoomed_flag,#[bg=colour4],}"
```

## Some git alias to speed up your workflow

For example, type `st` instead of `git status`, or `ad` instead of `git add -A`,...

```
alias ad="git add -A"
alias add="git add"
alias cm="git commit -m ${1}"
alias am="git commit --amend"
alias rb="git rebase"
alias push='git push'
alias st="git status"
alias dff="git diff"
alias df="git diff --name-status ${1}"
alias dft="git difftool ${1}"
alias lg="git log --oneline --decorate ${1}"
alias brr="git branch --all"
alias br="git branch"
alias gc="git checkout"
alias stash="git stash"
```

## Validate Domain SSL certificate

Run this command:

```
echo | openssl s_client -showcerts -servername <domain> -connect <domain>:443 2>/dev/null | openssl x509 -inform pem -noout -text
```

## Some useful IRC client (Weechat) settings

**Plugins:**

```
/script install buffers.pl autosort.pl colorize_nicks.py shortenurl.py
```

**Disable annoying join channel messages:**

```
/set weechat.look.buffer_notify_default message
/set irc.look.smart_filter on
/filter add irc_smart * irc_smart_filter *
/filter add irc_join_names * irc_366,irc_332,irc_333,irc_329,irc_324 *
```

