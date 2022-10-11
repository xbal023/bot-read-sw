const { default: KUNTUL, useMultiFileAuthState, DisconnectReason, makeInMemoryStore, getContentType } = (await import('@adiwajshing/baileys')).default;
import { Boom } from '@hapi/boom';
import p from 'pino';
import cfonts from 'cfonts';
import cuy from './config.js';
const log = p({ level: 'silent' })

cfonts.say('auto-read-sw', {// Ubah saja cuii ;v
	font: 'tiny',       
	align: 'center',
	colors: ['system'],
	background: 'transparent', 
	letterSpacing: 1,
	lineHeight: 1,
	space: true,
	maxLength: '0',
	gradient: false,
	independentGradient: false,
	transitionGradient: false,
	env: 'node'
});
const j = async (u, c, q) => {
	const { lastDisconnect, connection } = u
   try {
      if (connection == 'close') {
      	if (new Boom(lastDisconnect.error ).output?.statusCode === DisconnectReason.loggedOut) q() 
      	else q()
      } else if (connection == 'open') {
			console.log("Tersambung ke Koneksi whatsapp...");
      }
   } catch (e) {
   	console.log(e)
   }
};
const h = async (u, c) => {
	try {
		let m = u.messages[0]
		console.log(m);
		const ftrol = { key : { remoteJid: 'status@broadcast', participant : '0@s.whatsapp.net' }, message: { orderMessage: { itemCount : 2022, status: 1, surface : 1, message: cuy.name,  orderTitle: `Helo bng`, thumbnail: '', sellerJid: '0@s.whatsapp.net' } } }
		if (!m) return
		if (m.key.remoteJid === 'status@broadcast') {
			if (!cuy.autoread) return
			setTimeout(() => {
				c.readMessages([m.key])
				let mt = getContentType(m.message)
				console.log((/protocolMessage/i.test(mt)) ? `${m.key.participant.split('@')[0]} Telah menghapus Story nya` : 'Melihat story user : '+m.key.participant.split('@')[0]);
				if (/protocolMessage/i.test(mt)) c.sendMessage(cuy.owner+'@s.whatsapp.net', {text:'Status dari @'+m.key.participant.split('@')[0]+' Telah dihapus', mentions: [m.key.participant]}, {quoted: ftrol})
				if (/(imageMessage|videoMessage|extendedTextMessage)/i.test(mt)) {
					let keke = (mt == 'extendedTextMessage') ? `\nStory Teks Berisi : ${m.message.extendedTextMessage.text}` : (mt == 'imageMessage') ? `\nStory Gambar dengan Caption : ${m.message.imageMessage.caption}` : (mt == 'videoMessage') ? `\nStory Video dengan Caption : ${m.message.videoMessage.caption}` : '\nTidak diketahui cek saja langsung!!!'
					c.sendMessage(cuy.owner+'@s.whatsapp.net', {text: 'Melihat story dari @'+m.key.participant.split('@')[0] + keke, mentions: [m.key.participant]}, {quoted: ftrol});
				}
			}, cuy.faston);
		}
	} catch (e) {
		console.log(e);
	}
}
const start = async () => {
	try {
		const store = makeInMemoryStore({ logger: log })
		const { state, saveCreds } = await useMultiFileAuthState('DB');
		const client = KUNTUL({
			browser: [cuy.name, 'safari', '1.0.0'],
			printQRInTerminal: true,
			logger: log,
			auth: state
		});
		store.bind(client.ev)
		client.ev.on('connection.update', async (up) => j(up, client, start));
		client.ev.on('messages.upsert', async (up) => h(up, client));
		client.ev.on('creds.update', saveCreds);
	} catch (e) {
		console.log(e);
	}
};
start()
