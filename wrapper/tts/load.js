/**
 * route
 * tts generation
 */
// TODO: convert all of this to the fetch api
// modules
const base64 = require("js-base64");
const brotli = require("brotli");
const https = require("https");
const http = require("http");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path);
const md5 = require("js-md5");
const mp3Duration = require("mp3-duration");
// vars
// firefox is good
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0";
const voices = require("./info").voices;
// stuff
const asset = require("../asset/main");
const {
    xmlFail
} = require("../request/extend");
const get = require("../request/get");
const processVoice = (voiceName, text) => {
    return new Promise((res, rej) => {
        const voice = voices[voiceName];
        switch (voice.source) {
        case "polly": { // working
                var q = new URLSearchParams({
                        text: text,
                        voice: voice.arg,
                }).toString();
                var req = https.get({
                    hostname: "gospeech.replit.app",
                    path: `/service/polly_makemp3?${q}`,
                    headers: {
                        "User-Agent": userAgent,
                    },
                },
                        (r) => {
                    var buffers = [];
                    r.on("data", (d) => buffers.push(d));
                    r.on("end", () => res(Buffer.concat(buffers)));
                    r.on("error", rej);
                });
                break;
            }
        case "vocalware": { // working
                var[eid, lid, vid] = voice.arg;
                var q = new URLSearchParams({
					eid,
					lid,
					vid,
					txt: text,
                }).toString();
                var req = https.get({
                    hostname: "gospeech.replit.app",
                    path: `/service/oddcast2_makemp3?${q}`,
                    headers: {
                        "User-Agent": userAgent,
                    },
                },
                        (r) => {
                    var buffers = [];
                    r.on("data", (d) => buffers.push(d));
                    r.on("end", () => res(Buffer.concat(buffers)));
                    r.on("error", rej);
                });
                break;
            }
        }
    });
}

/**
 * @param {import("http").IncomingMessage} req
 * @param {import("http").ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = async function (req, res, url) {
    if (req.method != "POST" || url.pathname != "/goapi/convertTextToSoundAsset/")
        return;
    const {
        voice,
        text
    } = req.body;
    if (!voice || !text) {
        res.statusCode = 400;
        res.end();
        return true;
    }

    try {
        const buffer = await processVoice(voice, text);
        mp3Duration(buffer, (e, duration) => {
            if (e || !duration)
                throw new Error(e);

            const meta = {
                type: "sound",
                subtype: "tts",
                title: `[${voices[voice].desc}] ${text}`,
                duration: 1e3 * duration,
                ext: "mp3",
                themeId: "ugc"
            }
            const id = asset.save(buffer, meta);
            res.end(`0<response><asset><id>${id}</id><enc_asset_id>${id}</enc_asset_id><type>sound</type><subtype>tts</subtype><title>${meta.title}</title><published>0</published><tags></tags><duration>${meta.duration}</duration><downloadtype>progressive</downloadtype><file>${id}</file></asset></response>`)
        });
    } catch (err) {
        console.error("Error generating TTS: " + err);
        res.statusCode = 500;
        res.end("1" + xmlFail("Internal server error."));
    };
    return true;
}
