'use strict';
var fs = require('fs');
var handlebars = require('handlebars');
var config = require('./config');

var inputFilename = '';

if(process.argv.length > 2){
  inputFilename = process.argv[2];
  if(inputFilename != ''){
    var words = [];
    fs.readFile(inputFilename, 'utf-8', (error, data) => {
      if (error){
        console.log(error);
      } else {
        let word = '';
        let str = data.toLowerCase();
        for(let i = 0; i < str.length; i++){
          let char = str.charAt(i);
          if (isSplitChar(char)){
            var index = indexOf(word);
            if(index < 0){
              if(word.length > 2){
                words.push({times: 1, word, fontSize: 1/config.font_size_scale});
              }
            } else {
              words[index].times++;
              words[index].fontSize = words[index].times/config.font_size_scale;
            }
            word = "";
          } else {
            word = word + char;
          }
        }

        words.sort(function(a, b){
          return b.times - a.times;
        });

        let finalWords = [];

        for(let i = 0; i < config.max_number_of_words; i++){
          finalWords.push(words[i]);
        }

        finalWords.sort(function(a, b){
          if(a.word < b.word)
            return -1;
          else if(a.word > b.word)
            return 1;
          else
            return 0;
        });

        let template = handlebars.compile(config.html_output_template);
        console.log(template({
          wordsCount: finalWords
        }));
      }
    });
  }
} else {
  console.log('No input file was provided.');
}

function indexOf(word){
  for(var i = 0; i < words.length; i++){
    if(words[i].word === word){
      return i;
    }
  }
  return -1;
}

function isSplitChar(char){
  let splitChars = [' ', ';', '!', '?', ':', ',', '.'];

  for(let i = 0; i < splitChars.length; i++){
    if(char === splitChars[i]){
      return true;
    }
  }

  return false;
}
