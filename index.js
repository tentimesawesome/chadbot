require('dotenv').config();
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
//const { token } = require('./config.json');
const fetch = require('node-fetch')
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');
const ChartJsImage = require('chartjs-to-image');
const {Chart} = require('chart.js')
const ChartDataLabels = require('chartjs-plugin-datalabels');
const { title } = require('process');

//Chart.register(ChartDataLabels);

openweather = (process.env.WEATHER2)
weatherapi = (process.env.WEATHER)
stockapi = (process.env.STOCKAPI)
discordtoken = (process.env.TOKEN)

// Create a new client instance
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
    
] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', (message) => {
    if (message.content === ('ping' || 'Ping') && (message.author.bot == false)) {
        message.reply("pong!")
    }
    

});

client.on('messageCreate', (message) => {
    const address = fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => {
        return response.json()})
    .then((loli) => {
      return loli;
    });
  
  const printAddress = async () => {
    
    const a = await address;
    //const a = JSON.stringify(b);
    message.reply(JSON.stringify(a))
    console.log(Object.keys(a));
    // console.log(b);
  };

  if (message.content === 'address') {
      printAddress();
  }
  
  //printAddress();

    // function getvals(){
    //     return fetch('https://jsonplaceholder.typicode.com/todos/1',
    //     {
    //         method: "GET",
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //     .then((response) => response.json())
    //     .then((responseData) => {
    //       //console.log(responseData);
    //       return responseData;
    //     })
    //     .catch(error => console.log(error));
    //   }
    
      
    //   getvals()
    //   .then(response => console.log(response))
    //   .then(response => toString(response))
    //   .then(response => message.reply(response))


})

client.on('messageCreate', message => {
    city = message.content.split(" ")[1]
    function CheckError(response) {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      }
    
    


    const weather = fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherapi}&q=${city}`,
    {
    method: "GET",
    headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'}

    })
    .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
            //console.log(response.status);
            return response.status;
          
        
        }
      })
    .then((data) => {
        //console.log(data);
        return data;
    })
    .catch((error) => {
        // Handle the error
        console.log(error);
      });
    

    const printWeather = async () => {
            const b = await weather;
            if (b > 300) {
                message.reply('Error')
            }
            
        
            else {
            var country = b.location.country
            var cityAPI = b.location.name
            var report1 = b.current.condition.text
            var report2 = b.current.condition.icon
            var num1 = b.current.temp_c
            var cel1 = num1.toString()
            var num2 = (b.current.feelslike_c).toString()
        
    
            const weatherEmbed = new MessageEmbed()
        
        .setColor('#0099ff')
        .setTitle(`Weather in ${cityAPI}, ${country}`)
        //.setURL('https://discord.js.org/')
        .setAuthor({ name: "", iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription(report1)
        .setThumbnail(`https:${report2}`)
        .addFields(
            { name: (cel1 + '\u00B0 C'), value: ('Feels like ' + num2 + '\u00B0 C') },
            //{ name: '\u200B', value: '\u200B' },
            //{ name: 'Inline field title', value: 'Some value here', inline: true },
            //{ name: 'Inline field title', value: 'Some value here', inline: true },
        )
        //.addField('Inline field title', 'Some value here', true)
        //.setImage('https://i.ibb.co/5WbrzKL/chad-gigabrain.png')
        .setTimestamp()
        //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    
        message.reply({ embeds: [weatherEmbed] });
    
            }
        
    }

    if (message.content.includes('!weather')) {
        printWeather();
    }

    if (message.content.includes('!forecast')) {
      cityname = message.content.split(" ")[1]
      countrycode = message.content.split(" ")[2]
      // const geolocate = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${countrycode}&limit=1&appid=${openweather}`)
      // .then((response) => {
      //   if (response.status >= 200 && response.status <= 299) {
      //     return response.json();
      //   } else {
      //     console.log(response.status);
      //     return response.status; }
      //   })
      // .then((data1) => {
      //   //console.log(data);
      //   return data1;
      //   })
      // const geolocatesync = async () => {
      //   const b = await geolocate;
      //     if (b > 300) {
      //     message.reply('Error')
      //     } else {

      //     }
      // }
      const forecast = fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherapi}&q=${cityname},${countrycode}&days=3&aqi=no&alerts=no`,
        {method: "GET", headers: {'Accept': 'application/json','Content-Type': 'application/json'}}
        )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          console.log(response.status);
          return response.status; }
        })
      .then((data) => {
        //console.log(data);
        return data;
        })
        const printForcast = async () => {
          const b = await forecast;
          if (b > 300) {
              message.reply('Error')
          } else {
            //console.log(b.daily)
            for (const [key, value] of Object.keys(b)) {
              //console.log(value);
              const f = key
              const d = value['4. close']
            }
            console.log((b.forecast.forecastday[0]['day']['condition']['text']))
            const forecastEmbed = new MessageEmbed()
              .setColor('#0099ff')
              .setTitle('3 Day Forecast for ' + cityname)
            
            
              message.reply({ embeds: [forecastEmbed] });



          }
        }
        printForcast()
      }
      


       
    }
)

client.on('messageCreate', (message) => {
    ticker = message.content.split(' ')[1]


    if (message.content.includes('!stock')) {
        const stockcheck = fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&outputsize=compact&adjusted=true&apikey=${stockapi}`)
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            return response.status;
          }
        })
        .then((data) => {
            //console.log(data)
            return data
            
        })
        const stockarray = []
        const labelarray = []

        const stockprint = async () => {
            const a = await stockcheck;
            //console.log(a)
            const b = a['Time Series (5min)']
            
            
            
            for (const [key, value] of Object.entries(b)) {
                //console.log(`${key}: ` + value['4. close']);
                const f = key
                const d = value['4. close']
                stockarray.push(Number(d))
                labelarray.push(f)
                
                
              }
            //console.log(labelarray)
            labelarray.reverse();
            stockarray.reverse();
            const width = 800; //px
            const height = 800; //px
            const plugin = {
                id: 'custom_canvas_background_color',
                beforeDraw: (chart) => {
                  const ctx = chart.canvas.getContext('2d');
                  ctx.save();
                  ctx.globalCompositeOperation = 'destination-over';
                  ctx.fillStyle = 'white';
                  ctx.fillRect(0, 0, chart.width, chart.height);
                  ctx.restore();
                }
              };
            const canvasRenderService = new ChartJSNodeCanvas({width, height});
    
            (async () => {
            const configuration = {
            type: 'line',
            scaleGridLineColor : "rgba(0,0,0,0)",
            options: {                
                elements: '',
                scales: {
                  x: {
                    grid: {
                      color: 'white',
                      borderColor: 'white',
                      tickColor: 'white'
                    },
                    ticks: {
                      maxTicksLimit: 5
                    }
                  }
                }
                
            },
            plugins: [plugin],
            data: {
            labels: labelarray,
            backgroundColor: 'rgb(255, 255, 255)',
            plugins: {
                datalabels: {
                    display: false,
                },
            },
            datasets: [{
              label: 'price',
              data: stockarray,
              fill: false,
              datalabels: {
                
                title: null
              },
              pointRadius: 0,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgb(255, 255, 255)'
            }]
            }
            };
    
            const imageBuffer = await canvasRenderService.renderToBuffer(configuration);
    
            // Write image to file
            fs.writeFile('mychart.png', imageBuffer, () => {
              const file = new MessageAttachment('mychart.png');
              const stockEmbed = new MessageEmbed()
	              .setImage('attachment://mychart.png')
                //.setTitle('')
              message.reply({ embeds: [stockEmbed], files: [file] });

              });
            })
            ();            
            
        }




        
        stockprint();
    }
}) 
// Login to Discord with your client's token
client.login(discordtoken)