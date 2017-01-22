![Logo](https://github.com/hm-webui/hm-webui-email/raw/master/email.png)

# HM WebUI E-Mail Plugin

This plugin makes it easy to send a mail from another plugin (e.g. the [HM WebUI Javascript plugin](https://github.com/hm-webui/hm-webui-javascript)).

## Installation

In the Plugins section of HM WebUI create a new instance of the hm-webui-email plugin.

Enter the required / optional settings in the plugin settings screen.

## Usage

The plugin is supporting the following functions:

### sendMail
---

#### Parameter

name | type | required | comment
---|---|---|---
maildata | object | yes | the object should have the following keys: <br>**from** - the mail from address<br>**to** - the mail address to send the mail to<br>**subject** - the mail subject string<br>**message** - the mail message body

#### Returns

The function returns a promise with the following methods:

name | comment
--- | ---
.then() | Called when the mail has been sent successful. The first parameter of the promise function contains the mail message data
.fail() | Called when the message sending failed. The first parameter of the promise function contains a string with detailed error message
.fin() | Called always (on success and error)

#### Example

Here an example how you can send a mail from the [HM WebUI Javascript](https://github.com/hm-webui/hm-webui-javascript) plugin

```js
var maildata = {
    from: 'sender@example.com',
    to: 'receiver@example.com',
    subject: 'This is a test mail',
    message: 'This is the body of the mail message'
}

hmwebui.callPluginFunction('hm-webui-email.0','sendMail',maildata).then(function(message){
    //message is the mail message object (the object defined above as maildata)
}).fail(function(err){
    //err is a string with an error message
})
```

## Changelog

0.0.1 (2017-01-22)
* initial version
