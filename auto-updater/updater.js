const discord = require("discord.js")
const opts = require("./auth");
const exec = require('child_process').exec;
const http = require('http')
const crypto = require('crypto')
const path = require("path");
const { exception } = require("console");
const client = new discord.Client()

//The following server code is coppied from https://www.robinwieruch.de/github-webhook-node-js
http.createServer((req, res) => {
    let data = ""
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        console.log("Got Data")
        const signature = `sha1=${crypto
            .createHmac('sha1', opts.ghwebhooksecret)
            .update(data)
            .digest('hex')}`;

        const isAllowed = req.headers['x-hub-signature'] === signature;
        try {
            const body = JSON.parse(data);
            const isMaster = body.ref === 'refs/heads/master';
            if (isAllowed && isMaster) {
                initBuild()
            }
        } catch (e) {
            console.log(e)
        }
        res.end();

    })


})
    .listen(6809);

function initBuild() {
    function resolveCodeBlock(error, stdout, stderr) {
        let cmdRes = stdout ? stdout : ""
        if (error && !stderr)
            cmdRes += "\nUnknown Error"
        else if (stderr)
            cmdRes += stderr
        if (!cmdRes)
            return ""
        return cmdRes.match(/(.|\n){0,1950}/)[0]
    }
    client.login(opts.statusBot)
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`);
        client.channels.fetch(opts.updateChannel).then((c) => {
            c.send("Discord Bot Logged In... Pulling updates from github")
            exec(path.resolve(__dirname, 'scripts', 'update.sh'), function callback(udErr, udOut, udStdErr) {
                if (true == (udErr || udStdErr)) {
                    return c.send(`Error while updating repo \`\`\`\n${resolveCodeBlock(udErr, udOut, udErr)} \`\`\``).then(() => {
                        client.destroy()
                    })
                }

                c.send(`Updated Repo \`\`\`\n${resolveCodeBlock(udErr, udOut, udErr)} \`\`\``)
                exec(`BOT_TOKEN=${opts.runBot} ` + path.resolve(__dirname, 'scripts', 'build.sh'), function callback(bdErr, bdStdOut, bdStdErr) {
                    if (true == (bdStdErr || bdErr)) {
                        c.send(`Error while building or deploying \`\`\`\n${resolveCodeBlock(bdErr, bdStdOut, bdStdErr)} \`\`\``).then(() => {
                            client.destroy()
                        })
                        return
                    }
                    c.send(`Built \`\`\`\n${resolveCodeBlock(bdErr, bdStdOut, bdStdErr)} \`\`\``).then(() => {
                        client.destroy()
                    })

                });
            });
        })
    })


}