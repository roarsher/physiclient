const {spawn}=require('node:child_process');
const args=process.argv.slice(2);
const value=(flag,fallback)=>{const index=args.indexOf(flag);return index>=0?args[index+1]:fallback;};
const child=spawn(process.execPath,[require.resolve('react-scripts/scripts/start.js')],{
 stdio:'inherit',
 env:{...process.env,PORT:value('--port',process.env.PORT||'3000'),HOST:value('--host',process.env.HOST||'0.0.0.0')},
});
child.on('exit',code=>process.exit(code||0));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
