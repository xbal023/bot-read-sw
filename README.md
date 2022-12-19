<p align="center">
<img src="https://telegra.ph/file/999af4810b047124e5e1a.jpg" width="328" height="328"/>
</p>
<p align="center">
<a href="#"><img title="Auto-Read-SW" src="https://img.shields.io/badge/bot%20read%20sw-green?colorA=%23ff0000&colorB=C13584&style=for-the-badge"></a>
</p>
<p align="center">
<a href="https://github.com/bolaxd"><img title="Autor" src="https://img.shields.io/badge/Author-bolaxd-5851DB.svg?style=for-the-badge&logo=github"></a>
</p>
</p>
<p align="center">
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fbolaxd%2Fbot-read-sw.git&count_bg=%23833AB4&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true"/></a>
<a href="#"><img title="Version" src="https://img.shields.io/github/package-json/v/bolaxd/bot-read-sw?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="https://github.com/bolaxd/bot-read-sw/followers/"><img title="Followers" src="https://img.shields.io/github/followers/bolaxd?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="https://github.com/bolaxd/bot-read-sw/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/bolaxd/bot-read-sw?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="https://github.com/bolaxd/bot-read-sw/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/bolaxd/bot-read-sw?color=%23833AB4&logo=github&style=flat-square"></a>
</p>

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/bolaxd/bot-read-sw)

## Run On Termux
```bash
> git clone https://github.com/bolaxd/bot-read-sw
> cd bot-read-sw-main
> npm install
> npm start
```
Jika Error saat npm install maka bisa lakukan cara dibawah ini
```bash
> cd
> pkg install yarn
> cd bot-read-sw-main
> yarn install
> npm start
```
## Sebelum anda npm start alangkah baiknya setting dulu
```config.js```
```js
const config = {
	name: 'Bolaxd', // Ubah Nama kamu [ ini nama yg dimunculin saat terkoneksi ke WA web ]
	owner: '6287839067186', // Ubah Nomor ke Nomor owner
	autoread: true, // Ubah Ini untuk read sw == true, untuk tidak maka == false
	faston: 1000 // Semakin dikit nilai nya, maka semakin cepat read SW
}
export default config;
```
scan QR nya untuk terhubung ke whatsapp
<br>
<img src="https://telegra.ph/file/9b92ead72b872582220da.jpg" width="250">
<br>
<img src="https://telegra.ph/file/ef8d78d976b50d8f9dac4.jpg" width="100">

## Penulis
[![bolaxd](https://github.com/bolaxd.png?size=100)](https://github.com/bolaxd)
## Big Thanks To
[![Amiruldev20](https://github.com/Amiruldev20.png?size=280)](https://github.com/Amiruldev20)
