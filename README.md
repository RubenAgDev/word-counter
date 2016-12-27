# word-counter
A counter of words to create beautiful and memorable memories

## How to start
1. Download the repository.
2. > npm install
3. > node main << place_the_path_of_the_input_file_(txt) >>
4. Copy the output from the console for now.

## config options

### max_number_of_words
The maximun number of results (words) to be provided as an output.

### font_size_scale
The relation between the number of appearances of each word and the font size in the output HTML if nedded.
(number_of_appearances : font_size)

### html_output_template
Word counter uses 'handlebars' to generate the output HTML. You can define the template to display your beautiful and memorable memories, for instance:

{{#wordsCount}}&nbsp;
  < span data-times={{times}} style="font-size: {{fontSize}}px">
    {{word}}
  < /span >
&nbsp;{{/wordsCount}}

Where the output would be: for every word, create a SPAN Html tag with the specified HTML attributes.
