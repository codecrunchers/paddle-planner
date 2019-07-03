const sum = (a,b) => a+b;
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
})


let resolvePromise = async (a,b) => a+b;
let failPromise = new Promise(function(resolve, reject) {
  reject("Whoops!");
});


test('adds 1 ,2  to return 3', () => {
  return resolvePromise(1,2).then(
    function(result){
      console.log("Yup:" + result);
      expect(result).toBe(3);
    },
    function(error){
      //won't be called
    }
  );
})

test('deals with error', () => {
  return failPromise.then(
    function(result){
      //won't be called
    },
    function(error){
      expect(error).toBe("Whoops!")
    }
  );
})


function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve("done"),ms)
    })
}

//const http = require("request");

function fetchData (ms, cb)  {
  return new Promise( resolve => {
     setTimeout(resolve(cb("done")) , ms)
  })
}

const makeRequest = async () => {
  try {
    //return await sleep(1000)
    return await fetchData(
      1000, 
      r =>  r
    ).then(result => {
      console.log(result);
      return result
    })
  } catch (err) {
    console.log(err)
  }
}


test('test async promise', async () => {
  return makeRequest().then( response =>
    expect(response).toBe("done")
  )
})

