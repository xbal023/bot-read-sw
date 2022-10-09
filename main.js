const { default: KUNTUL, useMultiFileAuthState, DisconnectReason, makeInMemoryStore } = (await import('@adiwajshing/baileys')).default;
import { Boom } from '@hapi/boom';
import p from 'pino';
import cuy from './config.js';
const logger = p({ level: 'silent' })
const store = makeInMemoryStore({ logger })

const j = async (u, c, q) => {
	const { lastDisconnect, connection } = p 
   try {
      connection == 'close' ? 
      (new Boom(lastDisconnect.error ).output?.statusCode === DisconnectReason.loggedOut ? start() : start()):
      connection == 'open' ? 
      console.log('KONEKSI TELAH TERSAMBUNG KE WHATSAPP WEB')
      :console.log(p);
   } catch (e) {
   	console.log(e)
   }
};
const k = async (u, c) => {
	let m = u.messages[0]
	//console.log(m);
	if (m.key.remoteJid === 'status@broadcast') {
		if (!cuy.autoread) return
		setTimeout(async () => {
			await c.readMessages([m.key])
			console.log("Auto read SW pada User :"+ m.key.remoteJid);
		}, cuy.faston);
	}
};
const start = async () => {
	try {
		const { state, saveCreds } = await useMultiFileAuthState('DB');
		const client = KUNTUL({
			browser: [cuy.name, 'safari', '1.0.0'],
			printQRInTerminal: true,
			logger,
			auth: state
		});
		store.bind(client.ev)
		client.ev.on('messages-upsert', async (up) => k(up, client));
		client.ev.on('connection', async (up) => j(up, client, start));
		client.ev.on('creds.update', saveCreds);
	} catch (e) {
		console.log(e);
	}
};
start();