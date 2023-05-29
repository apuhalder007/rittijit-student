const fs = require('fs');
const xml2js = require('xml2js');
const xmlPath = __dirname + "/Blog.xml";
// Read the XML file
fs.readFile(xmlPath, 'utf-8', (err, xmlData) => {
  if (err) {
    console.error(err);
    return;
  }
  const dataArr = [];

  const data = JSON.stringify(xmlData);
  const regex = /<item>(.*?)<\/item>/g;
  const jsonData = data.match(regex).map((match) => match.replace(/<\/?item>/g, ''));

  jsonData.map((newItem, index)=>{
    const titleRegex = /<title>(.*?)>(.*?)<\/title>/g;
    const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/g;
    const contentRegex = /<encoded (.*?)>(.*?)<\/encoded>/g;
    const titleData = newItem.match(titleRegex).map((match) => {
        let newMatch  = match.replace(/<\/?title>/g, '')
        newMatch = newMatch.replace('\\r\\n<![CDATA[', '')
        return newMatch.replace(']]>\\r\\n', '')
    });
    const pubDateData = newItem.match(pubDateRegex).map((match) => match.replace(/<\/?pubDate>/g, ''));
    const contentData = newItem.match(contentRegex).map((match) => {
        let newMatch = match.replace(/<\/?encoded>/g, '')
        return newMatch.replace(/<encoded (.*?)>/g, '')
    });
    
    const item = {
        "title": titleData,
        "pubDate": pubDateData,
        "content": contentData
    }
    dataArr.push(item)


  });
  console.log(dataArr);
  // Output: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3']
  
  

    const jsonPath = __dirname + "/Blog.json";
    //Write the JSON data to a file
    fs.writeFile(jsonPath, JSON.stringify(dataArr), 'utf-8', (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return;
      }

      console.log('XML to JSON conversion completed!');
    });
  });
