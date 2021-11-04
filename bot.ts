import 'dotenv/config.js'

import {
    Contact,
    Message,
    ScanStatus,
    WechatyBuilder,
    log,
 } from 'wechaty'

import qrcodeTerminal from 'qrcode-terminal'

function onLogout (user: Contact) {
    log.info('Bot', '%s logouted', user)
}

function onScan (qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        const qrcodeImageUrl = [
          'https://wechaty.js.org/qrcode/',
          encodeURIComponent(qrcode),
        ].join('')
        log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
    
        qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console
    
      } else {
        log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
      }
}

function onLogin (user: Contact) {
    log.info('Bot', '%s logged in', user)
}

async function onMessage (msg: Message) {
    log.info('Bot', 'received: %s', msg)
    if(msg.text() == '1') {
        await msg.say('Hello, I am a bot')
    }
}

const bot = WechatyBuilder.build({
    name: 'chatbot',
})

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)

bot.start()
    .then(() => log.info('Starter Bot Started.'))
    .catch(e => log.error(e))