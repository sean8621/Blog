async function run(){
    console.log(1)
    setTimeout(()=>{
      console.log(2)
    })
    const pro=new Promise((resolve,reject)=>{
      resolve(3)
    }).then(()=>{
      console.log(4)
      return 4
    })
    setTimeout(()=>{
      console.log(5)
    })
    console.log(pro)
    console.log(await pro)
  }
  run()