const prompts = require('prompts');
const csvtoarray=require('csvtoarray');
const fs = require('fs');




const questions = [
    {
        type: 'text',
        name: 'input',
        initial: 'input.csv',
        message: 'What is your input file name?'
    },
    {
        type: 'number',
        name: 'value',
        message: 'Length of the row?',
        initial: 5,
        validate: value => value < 0 ? `must be larger than 0` : true
    },
    {
        type: 'text',
        name: 'output',
        message: 'What is your output CSV file name?',
        initial: 'ex)output_timestamp.csv',
    }

];



const start = async () => {
    const response = await prompts(questions);
    console.log(response); // => { value: 24 }


    const data = await csvtoarray.csvfile2array(await response.input).flat()
    let file = ''

    if (response.output==='ex)output_timestamp.csv') {
         file = await fs.createWriteStream('./output_' +  new Date().toJSON().slice(0,10) + '-' + new Date().toLocaleTimeString().slice(0,8).replace(/:/gi,"-")+ '.csv');
    }
    else {
         file = await fs.createWriteStream(`${response.output.replace(".csv","")}.csv`)

    }

    file.on('error', function(err) { console.log(err) });

    data.map((v,i) => (i+1)%response.value===0? file.write(v + (', \n') ) : file.write(v + (',') ))
    // data.forEach(function(v) { file.write(v.join(', ') + '\n'); });

    file.end();

    // temp  = data.slice(0,response.value))
    // console.log( data.slice(0,response.value))
    // console.log( data.slice(0,response.value))
    // // for ( let i= 0; i < await data.length; i++ ){
    // //     const result = []
    // //     const temp = []
    // //     for ( let j= 0; j < await response.value ; j++ ){
    // //           temp = await data[i].push
    // //     }
    // //     result.push(temp)
    // // }


    // arraytocsv()


    // await console.log(result)
};

module.exports = () => { start() }




// Async / await usage
