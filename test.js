
function tryCheck (modulename) {
try {
    console.log(`${modulename} Check`);
    require(modulename);
} catch (e) {
    console.log(`${modulename} Error`);
    process.exit(1);
}
};

const array = ['discord.js', './settings.js', 'pm2', './app.js'];

array.forEach(item => {
    tryCheck(item);
});