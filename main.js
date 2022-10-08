const { default: KUNTUL, useMultiFileAuthState, DisconnectReason } = (await import('@adiwajshing/baileys')).default;
import { Boom } from '@hapi/boom';
import p from 'pino';

const j = async (u, c, q) => {
	const { lastDisconnect, connection, qr, isNewLogin, receivedPendingNotifications } = u
	if(connection === "open") {
		console.clear()
	} else if (connection === 'close'){
		let reason = new Boom(lastDisconnect?.error)?.output.statusCode; 
		if (reason === DisconnectReason.badSession) q(); 
		else if (reason === DisconnectReason.connectionClosed) q(); 
		else if (reason === DisconnectReason.connectionLost) q();
		else if (reason === DisconnectReason.connectionReplaced) q(); 
		else if (reason === DisconnectReason.loggedOut) c.loggout(); 
		else if (reason === DisconnectReason.restartRequired) q();
		else if (reason === DisconnectReason.timedOut) q();
		else c.end("Silahkan start ulang!!!");
	}
};
const k = async (u, c) => {
	let m = u.messages[0]
	//console.log(m);
	if (m.key.remoteJid === 'status@broadcast') {
		if (!c.auto) return
		setTimeout(async () => {
			await c.readMessages([m.key])
		}, 3000);
	}
};
const start = async () => {
	try {
		const logger = p({ level: 'silent' })
		const { state, saveCreds } = await useMultiFileAuthState('DB');
		const client = KUNTUL({
			browser: ['Auto Read Sw', 'safari', '1.0.0'],
			printQRInTerminal: true,
			logger,
			auth: state
		});
		client.auto = true
		client.ev.on('messages-upsert', async (up) => k(up, client));
		client.ev.on('connection', async (up) => j(up, client, start));
	} catch (e) {
		console.log(e);
	}
};
start();