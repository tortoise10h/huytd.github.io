# Setup multiple accounts with Mutt

This is a guideline to setup Mutt with multiple accounts:

- Work email (Office 365)
- Personal email (Gmail)

The mail fetcher will be `isync` and the mail sender is Mutt itself (built-in SMTP support).

## Install and setup `isync` to fetch mail

Install `isync` from brew:

```
$ brew install isync
```

Create `~/.mbsyncrc` file.

### Config Office 365 email

Config for `Office 365` account, use `~/.mail/work` as an inbox folder:

```
# First account: Office 365

IMAPAccount work
Host outlook.office365.com
user <user>@<domain>
pass <password>

IMAPStore work-remote
Account work

MaildirStore work-local
Path ~/.mail/work
Inbox ~/.mail/work/Inbox

Channel work
Master :work-remote:
Slave :work-local:

Create Both
SyncState *
```

### Config Gmail

For `Gmail`, use `~/.mail/personal` as an inbox folder, the config should be:

```
# Second account: Gmail

IMAPAccount personal
Host imap.gmail.com
user <username>@gmail.com
pass <password>
SSLType IMAPS
CertificateFile ~/.cert/imap.gmail.com.pem
AuthMechs LOGIN

IMAPStore personal-remote
Account personal

MaildirStore personal-local
Path ~/.mail/personal
Inbox ~/.mail/personal/Inbox

Channel personal
Master :personal-remote:
Slave :personal-local:

Create Both
SyncState *
```

To obtain the private key `~/.cert/imap.gmail.com.pem`:

```
$ mkdir ~/.cert
$ openssl s_client -connect imap.gmail.com:993 -showcerts 2>&1 < /dev/null | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' | sed -ne '1,/-END CERTIFICATE-/p' > imap.gmail.com.pem
```

### Start fetching mail

Now you will be able to fetch mail with:

```
$ mbsync work
$ mbsync personal
```

Or fetch all accounts at the same time:

```
$ mbsync -a
```

### Auto fetch mail with `cron` job

You already able to fetch email. But typing the command everytime is annoying, we can use `cron` to fetch automatically after few minutes.

Open `crontab` in edit mode to setup a new job:

```
$ crontab -e
```

Enter the following:

```
*/5 * * * * killall mbsync &>/dev/null; date >> mail.log; /usr/local/bin/mbsync -qqa >> ~/mail.log 2>&1
```

This command will call `mbsync` to fetch all profiles, save the log to `~/mail.log` and automatically kill the previous running `mbsync` process if something taking too long to run.

## Setup `mutt` to read and send mail

Install `mutt` with:

```
$ brew install mutt
```

Create the `.muttrc` config file and `.mutt` folder to store configs:

```
$ mkdir ~/.mutt
$ touch ~/.muttrc
```

### Setup `mutt` profiles

Create two profile config files in `.mutt` folder: `~/.mutt/email.personal` and `~/.mutt/email.work`.

**Gmail account:** `~/.mutt/email.personal`

```
# vim: ft=muttrc
set folder    = "~/.mail/personal"
set mbox      = "+Inbox"
set record    = "+Inbox"
set postponed = "+Inbox"
set spoolfile = "~/.mail/personal/Inbox"
set timeout=360  #Check for mail every minute
set mail_check=360
set smtp_authenticators="login"
set ssl_use_sslv3=yes
set smtp_url="smtp://<user>@smtp.gmail.com:587/"
set smtp_pass="<password>"
set from="<user>@gmail.com"
set realname="<your name>"
```

**Office 365 account:** `~/.mutt/email.work`

```
# vim: ft=muttrc
set folder    = "~/.mail/work"
set mbox      = "+Inbox"
set record    = "+Inbox"
set postponed = "+Inbox"
set spoolfile = "~/.mail/work/Inbox"
set timeout=360  #Check for mail every minute
set mail_check=360
set smtp_authenticators="login"
set ssl_use_sslv3=yes
set smtp_url="smtp://<user>@<domain>@smtp.office365.com:587/"
set smtp_pass="<password>"
set from="<user>@<domain>"
set realname="<your name>"
```

### Setup `.muttrc` config

Now config your `.muttrc` as follow:

```
source ~/.mutt/email.work

macro index <f1> '<enter-command>source ~/.mutt/email.work<enter><change-folder>!<enter>'
macro index <f2> '<enter-command>source ~/.mutt/email.personal<enter><change-folder>!<enter>'

macro index,pager d "<save-message>=trash<enter>" "Trash"
```

By default, we will open work email profile, we also bind **F1** and **F2** key to switch between accounts.

Some other useful configs:

```
# Useful customizations
set smart_wrap = yes
set sort = 'threads'
set sort_aux = 'last-date-received'
set imap_check_subscribed
#
hdr_order Date From To Cc
#
set signature="~/.signature"
set pager_stop = yes
set markers = no
set include = yes
set reply_to = yes
set fast_reply = yes
```

Format the index display:

```
set index_format = '%4C [%Z] %D %-25.25L (%?l?%4l&%4c?) %s'
color index_author color12 default '.*'
color index_subject color1 default '.*'
color index_subject white default '\[(Bitbucket|JIRA|Confluence)\].*'
color index_date yellow default
color index_flags white color12 '~F'
color index_flags white red '~N'
```

Some useful key binding:

```
# Key Bindings 
bind index gg				first-entry
bind index 0				first-entry
bind index G				last-entry
bind index,pager R	group-reply
bind index <space>	collapse-thread
bind pager k  		  previous-line
bind pager j  			next-line
bind pager gg 			top
bind pager 0 				top
bind pager G  			bottom
bind compose p 			postpone-message
bind index p 				recall-message
bind index,pager \Cf		next-page
bind index,pager \Cb		previous-page
bind index $				imap-fetch-mail
bind index S        sync-mailbox

macro index,pager I   "<change-folder>!<enter>"   "go to Inbox"

# Editor Information
set editor=vim
```

To view HTML emails in `mutt`, put this config to `~/.muttrc`:

```
auto_view text/html
alternative_order text/plain text/enriched text/html
```

And `~/.mailcap` file:

```
text/html; w3m -I %{charset} -T text/html; copiousoutput;
```
---
Now you can open `mutt` with:

```
mutt
```

Use `F1` or `F2` to switch between accounts. Send mail in each account using built-in SMTP support of mutt.
