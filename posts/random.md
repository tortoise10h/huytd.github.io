# Random Notes

This is just a clipboard for myself.

## Start tmux and auto attach to any exists session

Put this script to `.bash_profile` or anything equivalent:

```
if [ -z "$TMUX" ]; then
  tmux a || tmux new
fi
```

