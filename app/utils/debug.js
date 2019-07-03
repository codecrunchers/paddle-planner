expports.listEnv = () => {
  if(process.env.DUMP_ENV)
  for(ev in process.env){
    logger.log({level:"warn", message: `${ev} == ${process.env[ev]}`});
  }
}


