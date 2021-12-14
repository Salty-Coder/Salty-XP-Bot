const Discord = require('discord.js');
const bot = new Discord.Client();
const userxp = require('./userxp.json');
const fs = require('fs').promises;

const token = 'token here';

var version = 'Version 1.0.0'

const PREFIX = 'X!';


bot.on('ready', () =>{
    console.log('BOT STARTED');
});


function generateExperiencePoints(){
    return Math.round(Math.random() * 250);
}
bot.on('message', async message =>{
    let args = message.content.substring(PREFIX.length).split(" ")
    if(message.author.bot) return;
    if(!message.content.startsWith("!")) {
        if(!message.content.startsWith("X!")) {
            let xpFile = await fs.readFile('userxp.json', 'utf8');
            let xpObject = JSON.parse(xpFile);
            if(xpObject.hasOwnProperty(message.author.id)){
                let userXpObject = xpObject[message.author.id];
                if(userXpObject.hasOwnProperty(message.guild.id)){
                    let guildXpObject = userXpObject[message.guild.id];
                    let newXp = generateExperiencePoints();
                    let currentXp = guildXpObject['userXP'];
                    let updatedXp = currentXp + newXp;
                    let currentLevel = guildXpObject['userLevel']
                    let newLevel = updatedLevel(updatedXp);
                    if(currentLevel != newLevel)
                        message.channel.send(`${message.member} has leveled up! You are now level ` + newLevel);

                        xpObject[message.author.id][message.guild.id]
                        ['userXP'] = updatedXp;
                        xpObject[message.author.id][message.guild.id]
                        ['userLevel'] = newLevel;

                        await fs.writeFile('userxp.json', JSON.stringify(xpObject, null, 4), 'utf8').catch(err => console.log(err));

                }
                else{
                    xpObject[message.author.id][message.guild.id] = {
                        userXP: generateExperiencePoints(),
                        userLevel: 1
                    }
                    await fs.writeFile('userxp.json', JSON.stringify(xpObject, null, 4), 'utf8').catch(err => console.log(err));
                
                }
            }
            else{
                let guildId = message.guild.id;
                xpObject[message.author.id] = {}
                xpObject[message.author.id][guildId] = {
                    userXP: generateExperiencePoints(),
                    userLevel: 1
                }
                await fs.writeFile('userxp.json', JSON.stringify(xpObject, null, 4), 'utf8').catch(err => console.log(err));
            }
    }}

    switch(args[0]){

        case 'lvladmin':
            if(args[1] === 'followme'){
                if(args[2] === 'Salty-Coder'){
                    //updatedXp = updatedXp + args[3]
                    //message.channel.bulkDelete(1)
                    console.log('Someone used admin to get to level ' + args[3]).catch()
                    message.reply('feature currently isnt functionable')
                    break;
                }
            }

        case 'lvlspoofer':
            if(args[1].startsWith("@")){
                message.channel.bulkDelete(1)
                message.channel.send(args[1] + ' has leveled up!! You are now level ' + args[2]);
                break;
            }
            else{
                message.channel.bulkDelete(1)
                message.channel.send(`${message.member} has leveled up!! You are now level ` + args[1]);
                break;
            }
   
        case 'levels':
            //const userxpFile = new 
            message.channel.send("COMING SOON");
            break;

        case 'level':
            //message.channel.send(`The level of ${message.member} is ` + currentLevel)
            message.channel.send("COMING SOON");
            break;

        case 'lvlsystem':
            //const lvlSystemEmbed = new Discord.MessageEmbed()
            //.setTitle('Level System')
            //.addField('Level Requirements', '0-1000 lvl 1 1000-2000 lvl 2')
            //.setColor('e60000')
            //message.channel.send(lvlSystemEmbed);
        }
})

function updatedLevel(exp){
    if(exp >= 0 && exp <= 1000) return 1;
    else if(exp > 1000 && exp <= 2000) return 2;
    else if(exp > 2000 && exp <= 3000) return 3;
    else if(exp > 3000 && exp <= 4000) return 4;
    else if(exp > 4000 && exp <= 5000) return 5;
    else if(exp > 5000 && exp <= 6000) return 6;
    else if(exp > 6000 && exp <= 8000) return 7;
    else if(exp > 8000 && exp <= 10000) return 8;
    else if(exp > 10000 && exp <= 15000) return 9;
    else if(exp > 15000 && exp <= 20000) return 10;
    else if(exp > 20000 && exp <= 50000) return 11;
    else if(exp > 50000 && exp <= 100000) return 12;
    else if(exp > 100000 && exp <= 500000) return 13;
    else if(exp > 500000 && exp <= 1000000) return 14;
    else if(exp > 1000000 && exp <= 2000000) return 15;
    else if(exp > 2000000 && exp <= 5000000) return 16;
    else if(exp > 5000000 && exp <= 10000000) return 17;
    else if(exp > 10000000 && exp <= 20000000) return 18;
    else if(exp > 20000000 && exp <= 50000000) return 19;
    else
        return 20;
}

//bot.login(token);