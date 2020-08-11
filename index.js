const { create, decryptMedia } = require('@open-wa/wa-automate')
const moment = require('moment')
const { video } = require('tiktok-scraper')
const color = require("./lib/color")
const {ytmp3, wallpaperanime, anime, corona, quotes} =  require('./lib/functions')
const {tiktok, instagram, twitter, facebook, youtube, likee} = require('./lib/dl-video')
const urlShortener = require('./lib/shortener')
// const { youtube } = require('video-url-link')

const serverOption = {
    headless: true,
    qrRefreshS: 20,
    qrTimeout: 0,
    authTimeout: 0,
    autoRefresh: true,
    cacheEnabled: false,
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ]
}

const opsys = process.platform;
if (opsys === "win32" || opsys === "win64") {
    serverOption['executablePath'] = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
} else if (opsys === "linux") {
    serverOption['browserRevision'] = '737027';
    // serverOption['browserRevision'] = '/usr/bin/chrome'
    // serverOption['executablePath'] = '/usr/bin/google-chrome';
} else if (opsys === "darwin") {
    serverOption['executablePath'] = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
}

const startServer = async (from) => {
    create('Imperial', serverOption)
    .then(client => {
        console.log('[DEV] Viole403')
        console.log('[SERVER] Server Started!')
        // Force it to keep the current session
        client.onStateChanged(state => {
            console.log('[State Changed]', state)
            if (state === 'CONFLICT') client.forceRefocus()
        })
        client.onMessage((message) => {
            msgHandler(client, message)
        })
    })
}

async function msgHandler (client, message) {
    try {
        const { type, body, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message
        const { pushname } = sender
        const { formattedTitle } = chat
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const commands = ['#menu', '#help', '#sticker', '#stiker', '#gifsticker', '#giftstiker','#tiktok',
        '#ig','#instagram','#twt','#twitter', '#halo', '#about', '#cek','#ping', '#fb','#facebook','#yt',
        '#youtube','#ytmp3','#waifu','#Waifu','#kucing','#neko','#Pokemon','#pokemon','#wallpaper',
        '#wallpaperanime','#corona','#nhder','#anime','#quote','#likee','#like']
        const cmds = commands.map(x => x + '\\b').join('|')
        const cmd = type === 'chat' ? body.match(new RegExp(cmds, 'gi')) : type === 'image' && caption ? caption.match(new RegExp(cmds, 'gi')) : ''
        const args = body.trim().split(' ')
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi);
        const uaOverride = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

        if (cmd) {
            if (!isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(cmd[0]), 'from', color(pushname))
                if (isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(cmd[0]), 'from', color(pushname), 'in', color(formattedTitle))
                    // const args = body.trim().split(' ')
                    // const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi);
                switch (cmd[0]) {
                case '#menu':
                case '#help':
                    client.sendText(from, 'Menu: \n1. #sticker / #stiker: kirim gambar dengan caption atau balas gambar yang sudah dikirim.'
                    + '\n2. #sticker / #stiker spasi url gambar [contoh: #stiker https://avatars2.githubusercontent.com/u/37041952 ]'
                    + '\n3. #tiktok url [contoh: #tiktok https://www.tiktok.com/@tiktok/video/680749... ]'
                    + '\n4. #twitter / #twt url [contoh: #twitter https://twitter.com/ProZD/status/1248....]'
                    + '\n5. #facebook / #fb url [contoh: #facebook https://www.facebook.com/aria.vocaloid.7/videos/114544...]'
                    + '\n6. #instagram / #ig url [contoh: #instagram https://www.instagram.com/p/B_jtvvhD4XQ/ ]'
                    + '\n7. #youtube / #yt url [contoh: #youtube https://youtu.be/1Rq_LrpcgIM ]'
                    + '\n8. #ytmp3 url [contoh: #ytmp3 https://youtu.be/1Rq_LrpcgIM ]'
                    + '\n9. #likee / #like url [contoh: #likee https://likee.com/@410100006/video/68405....]'
                    + '\n10. #waifu / #Waifu untuk random waifu kalian'
                    + '\n11. #kucing untuk random pict kucing'
                    + '\n12. #pokemon / #Pokemon untuk random pokemon kalian'
                    + '\n13. #wallpaper untuk random wallpaper'
                    + '\n14. #wallpaperanime untuk random wallpaper anime'
                    + '\n15. #quote random quotes'
                    + '\n16. #nhder downloader code kalian!')
                    break
                case '#sticker':
                case '#stiker':
                    if (isMedia) {
                        await client.simulateTyping(from, true)
                        client.sendText(from, '⏳ Tunggu yaa 👉👈, sedang proses . . . ⏳')
                        const mediaData = await decryptMedia(message, uaOverride)
                        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await client.sendImageAsSticker(from, imageBase64)
                    } else if (quotedMsg && quotedMsg.type == 'image') {
                        await client.simulateTyping(from, true)
                        client.sendText(from, '⏳ Tunggu yaa 👉👈, sedang proses . . . ⏳')
                        const mediaData = await decryptMedia(quotedMsg)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await client.sendImageAsSticker(from, imageBase64)
                    } else if (args.length == 2) {
                        const url = args[1]
                        if (url.match(isUrl)) {
                            await client.sendStickerfromUrl(from, url, {method: 'get'})
                                .then(r => { if (!r) client.sendText(from, 'Maaf, link yang kamu kirim tidak memuat gambar.') })
                                .catch(err => console.log('Caught exception: ', err))
                        } else {
                            client.sendText(from, 'Maaf, link yang kamu kirim tidak valid.')
                        }
                    } else {
                        client.sendText(from, 'Tidak ada gambar! Untuk membuat sticker kirim gambar dengan caption #stiker')
                    }
                    break
                case '#giftstiker' :
                case '#gifsticker':
                    client.sendText(from, 'Maaf tidak dapat menggunakan gif, karena masih dalam pengembangan')
                break
                case '#about':
                    client.sendText(from, 'Hello There, Im Azusa Kyun \n - 🌱 Im currentlt focused on Learning Language. \n -📫 How to reach me: [Telegram]https://t.me/Yuzusa\n[WhatsApp]https://api.whatsapp.com/send?phone=6282234241986')
                break
                case '#cek':
                case '#ping':
                    client.sendText(from, '👋 Hello! BOT AKTIF')
                break
                case '#tiktok':
                    if (args.length == 2) {
                        const url = args[1]
                        if (!url.match(isUrl) && !url.includes('tiktok.com')) return client.sendText(from, 'Maaf, link yang kamu kirim tidak valid')
                        // await client.sendText(from, "*Scraping Metadata...*");
                        await tiktok(url)
                            .then((videoMeta) => {
                                const filename = videoMeta.authorMeta.name + '.mp4'
                                const caps = `*Metadata:*\nUsername: ${videoMeta.authorMeta.name} \nMusic: ${videoMeta.musicMeta.musicName} \nView: ${videoMeta.playCount.toLocaleString()} \nLike: ${videoMeta.diggCount.toLocaleString()} \nComment: ${videoMeta.commentCount.toLocaleString()} \nShare: ${videoMeta.shareCount.toLocaleString()} \nCaption: ${videoMeta.text.trim() ? videoMeta.text : '-'} \n\nDonasi: kamu dapat membantuku beli cendol dengan menyawer melalui https://saweria.co/donate/yogasakti atau mentrakteer melalui https://trakteer.id/red-emperor \nTerimakasih.`
                                client.sendFile(from,videoMeta.urlbase64, filename, videoMeta.NoWaterMark ? caps : `⚠ Video tanpa watermark tidak tersedia. \n\n${caps}`)
                                    .catch(err => console.log('Caught exception: ', err))
                            }).catch((err) => {
                                client.sendText(from, 'Gagal mengambil metadata, link yang kamu kirim tidak valid')
                            });
                    }
                    break
                case '#ig':
                case '#instagram':
                    if (args.length == 2) {
                        const url = args[1]
                        if (!url.match(isUrl) && !url.includes('instagram.com')) return client.sendText(from, 'Maaf, link yang kamu kirim tidak valid')
                        // await client.sendText(from, "*Scraping Metadata...*");
                        client.sendText(from, '⏳ Tunggu yaa, sedang proses . . . ⏳')
                        instagram(url)
                            .then(async (videoMeta) => {
                                const content = []
                                for (var i = 0; i < videoMeta.length; i++) {
                                    await urlShortener(videoMeta[i].video)
                                        .then((result) => {
                                            console.log('Shortlink: ' + result)
                                            content.push(`${i+1}. ${result}`)
                                        }).catch((err) => {
                                            client.sendText(from, `Error, ` + err)
                                        });
                                }
                                client.sendText(from, `Link Download:\n${content.join('\n')} \n\nDonasi: kamu dapat membantuku beli cendol dengan menyawer melalui https://saweria.co/donate/yuzusa atau mentrakteer melalui https://trakteer.id/yuzusaha \nTerimakasih.`)
                            }).catch((err) => {
                                console.error(err)
                                if (err == 'Not a video') return client.sendText(from, `Error, tidak ada video di link yang kamu kirim`)
                                client.sendText(from, `Error, user private atau link salah`)
                            });
                    }
                    break
                case '#twt':
                case '#twitter':
                    if (args.length == 2) {
                        const url = args[1]
                        if (!url.match(isUrl) && !url.includes('twitter.com') || url.includes('t.co')) return client.sendText(from, 'Maaf, url yang kamu kirim tidak valid')
                        // await client.sendText(from, "*Scraping Metadata...*");
                        client.sendText(from, '⏳ Tunggu yaa, sedang proses . . . ⏳')
                        twitter(url)
                            .then(async (videoMeta) => {
                                try {
                                    if (videoMeta.type == 'video') {
                                        const content = videoMeta.variants.filter(x => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                                        const result = await urlShortener(content[0].url)
                                        console.log('Shortlink: ' + result)
                                        client.sendFileFromUrl(from, content[0].url, 'TwitterVideo.mp4', `Link Download: ${result} \n\nDonasi: kamu dapat membantuku beli cendol dengan menyawer melalui https://saweria.co/donate/yuzusa atau mentrakteer melalui https://trakteer.id/yuzusaha \nTerimakasih.`)
                                    } else if (videoMeta.type == 'photo') {
                                        for (var i = 0; i < videoMeta.variants.length; i++) {
                                            await client.sendFileFromUrl(from, videoMeta.variants[i], videoMeta.variants[i].split('/media/')[1], '')
                                        }
                                    }
                                } catch (err) {
                                    client.sendText(from, `Error, ` + err)
                                }
                            }).catch((err) => {
                                console.log(err)
                                client.sendText(from, `Maaf, link tidak valid atau tidak ada video di link yang kamu kirim`)
                            });
                    }
                    break
                case '#fb':
                case '#facebook':
                if (args.length == 2) {
                    const url = args[1]
                    if (!url.match(isUrl) && !url.includes('facebook.com')) return client.sendText(from, 'Maaf, url yang kamu kirim tidak valid')
                    // await client.sendText(from, "*Scraping Metadata...*");
                    await client.sendText(from, '⏳ Tunggu yaa, sedang proses . . . ⏳')
                    facebook(url)
                        .then(async (videoMeta) => {
                            try {
                                const title = videoMeta.response.title
                                const thumbnail = videoMeta.response.thumbnail
                                const links = videoMeta.response.links
                                const shorts = []
                                for (var i = 0; i < links.length; i++) {
                                    const shortener = await urlShortener(links[i].url)
                                    console.log('Shortlink: ' + shortener)
                                    links[i]['short'] = shortener
                                    shorts.push(links[i])
                                }
                                const link = shorts.map((x) => `${x.resolution} Quality: ${x.short}`)
                                const caption = `Text: ${title} \nLink Download: \n${link.join('\n')} \n\nDonasi: kamu dapat membantuku beli cendol dengan menyawer melalui https://saweria.co/donate/yuzusa atau mentrakteer melalui https://trakteer.id/yuzusaha \nTerimakasih.`
                                client.sendFileFromUrl(from,thumbnail, 'videos.jpg', caption )
                            } catch (err) {
                                client.sendText(from, `Error, ` + err)
                            }
                        })
                            .catch((err) => {
                                client.sendText(from, `Error, url tidak valid atau tidak memuat video \n\n${err}`)
                            })
                        }
                    break
                case '#yt':
                case '#youtube':
                if (args.length == 2) {
                    const url = args[1]
                    if (!url.match(isUrl) && !url.includes('youtube.com')) return client.sendText(from, 'Maaf, url yang kamu kirim tidak valid')
                    // await client.sendText(from, "*Scraping Metadata...*");
                    await client.sendText(from, '⏳ Tunggu yaa, sedang proses . . . ⏳')
                    youtube(url)
                    .then(async (videoMeta) => {
                        try {
                            const title = videoMeta.response.title
                            const thumbnail = videoMeta.response.thumbnail
                            const links = videoMeta.response.links
                            const shorts = []
                            for (var i = 0; i < links.length; i++) {
                                const shortener = await urlShortener(links[i].url)
                                // console.log('Shortlink: ' + shortener)
                                links[i]['short'] = shortener
                                shorts.push(links[i])
                            }
                            const link = shorts.map((x) => `${x.resolution} Quality: ${x.short}`)
                            const caption = `Text: ${title} \nLink Download: \n${link.join('\n')} \n\nDonasi: kamu dapat membantuku beli cendol dengan menyawer melalui https://saweria.co/donate/yuzusa atau mentrakteer melalui https://trakteer.id/yuzusaha \nTerimakasih.`
                            client.sendFileFromUrl(from,thumbnail, 'videos.jpg', caption )
                        } catch (err) {
                            client.sendText(from, `Error, ` + err)
                        }
                    })
                    .catch((err) => {
                        client.sendText(from, `Error, url tidak valid atau tidak memuat video \n\n${err}`)
                    })
                }
                break
                case '#like' :
                if (args.length == 2) {
                    const url = args[1]
                    if (!url.match(isUrl) && !url.includes('likee.com')) return client.sendText(from, 'Maaf, url yang kamu kirim tidak valid')
                    // await client.sendText(from, "*Scraping Metadata...*");
                    // await client.sendText(from, '⏳ Tunggu yaa, sedang proses . . . ⏳')
                    await client.simulateTyping(from, true)
                    client.sendText(from, '⏳ Tunggu yaa 👉👈, sedang proses . . . ⏳')
                    likee(url)
                    .then(async (videoMeta) => {
                        try {
                            const title = videoMeta.response.title
                            const thumbnail = videoMeta.response.thumbnail
                            const links = videoMeta.response.links
                            const shorts = []
                            for (var i = 0; i < links.length; i++) {
                                const shortener = await urlShortener(links[i].url)
                                // console.log('Shortlink: ' + shortener)
                                links[i]['short'] = shortener
                                shorts.push(links[i])
                            }
                            const link = shorts.map((x) => `${x.resolution} Quality: ${x.short}`)
                            const caption = `Text: ${title} \nLink Download: \n${link.join('\n')} \n\nDonasi: kamu dapat membantuku beli cendol dengan menyawer melalui https://saweria.co/donate/yuzusa atau mentrakteer melalui https://trakteer.id/yuzusaha \nTerimakasih.`
                            client.sendFileFromUrl(from,thumbnail, 'videos.jpg', caption )
                        } catch (err) {
                            client.sendText(from, `Error, ` + err)
                        }
                    })
                    .catch((err) => {
                        client.sendText(from, `Error, url tidak valid atau tidak memuat video \n\n${err}`)
                    })
                }
                break
                case '#nhder':
                    await client.simulateTyping(from, true)
                    client.sendText(from, '⏳ Tunggu yaa 👉👈, sedang proses . . . ⏳')
                    if (args.length >=2){
                        const code = args[1]
                        const url = 'https://nhder.herokuapp.com/download/nhentai/'+code+'/zip'
                        const short = []
                        const shortener = await urlShortener(url)
                        // console.log('Shortlink: '+ shortener)
                        url['short'] = shortener
                        short.push(url)
                        const caption = `Link: ${shortener}\n\nDonasi: kamu dapat membantuku beli cendol dengan menyawer melalui https://saweria.co/donate/yuzusa atau mentrakteer melalui https://trakteer.id/yuzusaha \nTerimakasih.`
                        client.sendText(from, caption)
                    }
                    break
                case '#ytmp3':
                    await client.simulateTyping(from, true)
                    client.sendText(from, '⏳ Tunggu yaa, sedang proses . . . ⏳')
                    if (args.length >=2){
                        const url = args[1]
                        const result = await ytmp3(url)
                        // client.sendFileFromUrl(from, result , 'audio.mp3')
                        const short = []
                        const shortener = await urlShortener(result)
                        // console.log('Shhortlink: '+ shortener)
                        result['short'] = shortener
                        short.push(result)
                        const caption = `Link: ${shortener}\n\nDonasi: kamu dapat membantuku beli cendol dengan menyawer melalui https://saweria.co/donate/yuzusa atau mentrakteer melalui https://trakteer.id/yuzusaha \nTerimakasih.`
                        client.sendText(from, caption)
                    }
                break;
                case '#wallpaperanime':
                    await client.simulateTyping(from, true)
                    client.sendText(from, '⏳ Tunggu yaa 👉👈, sedang proses . . . ⏳')
                    const result = await wallpaperanime()
                    client.sendFileFromUrl(from, result)
                break
                case '#waifu':
                case '#Waifu':
                    await client.simulateTyping(from, true)
                    client.sendText(from, '⏳ Tunggu yaa 👉👈, sedang proses . . . ⏳')
                    q8 = q2 = Math.floor(Math.random() * 98) + 10;
                    client.sendFileFromUrl(from, 'http://randomwaifu.altervista.org/images/00'+q8+'.png', 'Waifu.png','How is she?'); // UwU)/ Working Fine
                break
                case '#kucing':
                    await client.simulateTyping(from, true)
                    client.sendText(from, '⏳ Tunggu yaa 👉👈, sedang proses . . . ⏳')
                    q2 = Math.floor(Math.random() * 900) + 300;
                    q3 = Math.floor(Math.random() * 900) + 300;
                    client.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'kucing.png','Neko');
                break
                case '#pokemon':
                case '#Pokemon':
                    await client.simulateTyping(from, true)
                    client.sendText(from, '⏳ Tunggu yaa 👉👈, sedang proses . . . ⏳')
                    q7 = Math.floor(Math.random() * 890) + 1;
                    client.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',);
                break
                case '#wallpaper':
                    await client.simulateTyping(from, true)
                    client.sendText(from, '⏳ Tunggu yaa 👉👈, sedang proses . . . ⏳')
                    client.sendFileFromUrl(from, 'https://source.unsplash.com/1280x720/?nature','wp.jpeg')
                break;
                case '#corona':
                    await client.simulateTyping(from, true)
                    client.sendText(from, '⏳ Tunggu yaa 👉👈, sedang proses . . . ⏳')
                    const covid = await corona()
                    client.sendText(from, covid);
                    break;
                case '#anime':
                    if (args.length >=2){
                        const judulanime = args[1]
                        const animesearch = await anime(judulanime)
                        client.sendText(from, animesearch)
                    }
                break
                case '#quote':
                    const getBijak = await quotes()
                    client.sendText(from, getBijak);
                break;
            }
        } else {
            if (!isGroupMsg) console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname))
            if (isGroupMsg) console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname), 'in', color(formattedTitle))
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}

process.on('Something went wrong', function (err) {
    console.log('Caught exception: ', err);
    });

startServer()
