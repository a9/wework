import axios, { AxiosInstance } from 'axios'

export class IncomingWebhook {
  private readonly url: string
  private readonly axios: AxiosInstance
  constructor(url: string) {
    this.url = url
    this.axios = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json'
      },
      maxRedirects: 0,
      proxy: false
    })
  }

  /**
   * Send text message
   * @param message
   * @param mentioned
   */
  async sendText(message: string, mentioned?: IncomingWebhookMentionedOptions) {
    const payload: IncomingWebhookTextMessagePayload = {
      msgtype: 'text',
      text: {
        content: message,
        mentioned_list: [],
        mentioned_mobile_list: []
      }
    }

    if (mentioned) {
      if (mentioned.type === 'userid') {
        payload.text.mentioned_list = mentioned.items || []
      }
      if (mentioned.type === 'mobile') {
        payload.text.mentioned_mobile_list = mentioned.items || []
      }
    }

    await this.axios.post(this.url, payload)
  }

  /**
   * Send markdown message
   * @description
   * ## title
   * ```markdown
   * # title 1
   * ## title 2
   * ### title 3
   * #### title 4
   * ##### title 5
   * ###### title 6
   * **bold**
   * [this is a link](http://work.weixin.qq.com/api/doc)
   * `code`
   * > quoted text
   * <font color="info">green color</font>
   * <font color="comment">gray color</font>
   * <font color="warning">orange color</font>
   * ```
   * @param message
   */
  async sendMarkdown(message: string) {
    const payload: IncomingWebhookMarkdownMessagePayload = {
      msgtype: 'markdown',
      markdown: {
        content: message
      }
    }

    await this.axios.post(this.url, payload)
  }

  /**
   * Send news message
   * @param articles limit 1-8, and first as cover
   */
  async sendNews(articles: IncomingWebhookNewsArticle[]) {
    const payload: IncomingWebhookNewsMessagePayload = {
      msgtype: 'news',
      news: {
        articles
      }
    }

    await this.axios.post(this.url, payload)
  }

  /**
   *
   * @param base64
   * @param md5
   */
  async sendImageBase64(base64: string, md5: string) {
    const payload: IncomingWebhookImageMessagePayload = {
      msgtype: 'image',
      image: {
        base64,
        md5
      }
    }

    await this.axios.post(this.url, payload)
  }
}

interface IncomingWebhookTextMessagePayload {
  msgtype: 'text'
  text: {
    content: string
    mentioned_list?: string[]
    mentioned_mobile_list?: string[]
  }
}

interface IncomingWebhookMarkdownMessagePayload {
  msgtype: 'markdown'
  markdown: {
    content: string
  }
}

interface IncomingWebhookNewsMessagePayload {
  msgtype: 'news'
  news: {
    articles: IncomingWebhookNewsArticle[]
  }
}

interface IncomingWebhookImageMessagePayload {
  msgtype: 'image'
  image: {
    base64: string
    md5: string
  }
}

export interface IncomingWebhookMentionedOptions {
  type: 'userid' | 'mobile'
  items: string[]
}

export interface IncomingWebhookNewsArticle {
  // title, limit 128 byte
  title: string
  // description, limit 512 byte
  description: string
  // link
  url: string
  // image link big image size 1068*455, small image size 150*150。
  picurl: string
}
