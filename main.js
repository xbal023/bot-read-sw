const { default: KUNTUL, useMultiFileAuthState, DisconnectReason, makeInMemoryStore } = (await import('@adiwajshing/baileys')).default;
import { Boom } from '@hapi/boom';
import p from 'pino';
import cuy from './config.js';
const log = p({ level: 'silent' })

const j = async (u, c, q) => {
	const { lastDisconnect, connection } = u
   try {
      connection == 'close' ? 
      (new Boom(lastDisconnect.error ).output?.statusCode === DisconnectReason.loggedOut ? q() : q()):
      connection == 'open' ? 
      console.log('KONEKSI TELAH TERSAMBUNG KE WHATSAPP WEB')
      :console.log(u);
   } catch (e) {
   	console.log(e)
   }
};
const h = async (u, c) => {
	try {
		let m = u.messages[0]
		//console.log(up);
		if (!m) return
		if (m.key.remoteJid === 'status@broadcast') {
			if (!cuy.autoread) return
			setTimeout(() => {
				c.readMessages([m.key])
				console.log('Telah melihat status pada user : '+m.key.participant.split('@')[0]);
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
start();
