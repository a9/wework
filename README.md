# WeWork Incoming Webhooks

## Installation

```shell
$ npm install wework
```

## Usage

---

### Initialize the webhook

The package exports a `IncomingWebhook` class. You'll need to initialize it with the URL you received from WeWork group, see the webhooks [docs](https://work.weixin.qq.com/api/doc#90000/90135/91760).

```js
import { IncomingWebhook } from 'wework';

// Read a url from the environment variables
const url = process.env.WEWORK_WEBHOOK_URL;

// Initialize
const webhook = new IncomingWebhook(url);
```

---

### Send a Message

Something interesting just happened in your app, so its time to send the message! Just call the
`.sendText(message)` method on the webhook. The `message` parameter is an string.

```javascript
import { IncomingWebhook } from 'wework';
const url = process.env.WEWORK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url);

// Send the message
(async () => {
  // send text message
  await webhook.sendText('Some text message');
  // send markdown message
  await webhook.sendMarkdown(`Some markdown message`)
  // send news articles
  await webhook.sendNews([
    {
      title: 'The title',
      description: 'The description',
      url: 'The link',
      picurl: 'The image url'
    }
  ])
})();
```
