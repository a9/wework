import { IncomingWebhook, IncomingWebhookNewsArticle } from './IncomingWebhook'

describe('IncomingWebhook', () => {
  let webhook: IncomingWebhook
  const url = ''
  beforeEach(() => {
    webhook = new IncomingWebhook(url)
  })
  it('should send text', async () => {
    await webhook.sendText('测试文本消息')
  })
  it('should send text adn mentioned', async () => {
    await webhook.sendText('测试文本消息')
  })
  it('should send markdown', async () => {
    // language=Markdown
    const message = `实时新增用户反馈<font color="warning">132例</font>，请相关同事注意。
> 类型:<font color="comment">用户反馈</font>
> 普通用户反馈:<font color="comment">117例</font>
> VIP用户反馈:<font color="comment">15例</font>`
    await webhook.sendMarkdown(message)
  })
  it('should send news', async () => {
    const articles: IncomingWebhookNewsArticle[] = [
      {
        title: '中秋节礼品领取',
        description: '今年中秋节公司有豪礼相送',
        url: 'URL',
        picurl:
          'http://res.mail.qq.com/node/ww/wwopenmng/images/independent/doc/test_pic_msg1.png'
      },
      {
        title: '中秋节礼品领取',
        description: '今年中秋节公司有豪礼相送',
        url: 'URL',
        picurl:
          'http://res.mail.qq.com/node/ww/wwopenmng/images/independent/doc/test_pic_msg1.png'
      }
    ]
    await webhook.sendNews(articles)
  })
})
