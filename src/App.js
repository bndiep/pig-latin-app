import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // 'phrase' is the text entered by the user - right now there are some test words hard coded to make the process of testing your code a bit faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: 'every through yummy squeal queen fry',
      // phrase: '',
      // 'phraseTranslated' is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the 'submit' button
      //phraseTranslated: 'This is where your translated sentence will appear.'
      phraseTranslated: ''
    }
  }

  // The 'myPigLatinCodeHere' function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    // the variable 'userInput' will contain the text input from the user
    // no need to change this variable
    let userInput = this.state.phrase

    // as you modify and create Pig Latin-ified words, push them into 'translatedWordsArray'
    // no need to change this variable
    let translatedWordsArray = []

    // taking the user input and spliting the text into an array of words
    let splitUserInput = userInput.toLowerCase().split(" ")

    // now that we have an array of words, we can map over the array and access each word
    splitUserInput.map(currentWord => {
      // ACTION ITEM: use 'currentWord' as a starting point for your code

      // At this point we already have an array of words from the user input starting
      // we should map through all the elements of this array and modify them by applying our pig lating Translator

      // first we break the string into an array of letters
      // currentWord.split(" ");
      // create an array of vowels
      let vowels = ['a', 'e', 'i', 'o', 'u']
      let vowelIndex = 0
      // if the word begins with vowel, then we just add "way" to the end
      if (vowels.includes(currentWord[0])) {
        currentWord += "way"
      } else if (currentWord.includes("qu")) {
        // if the word begin with "QU", then we find the first vowel after "QU", move the letters before the vowel to the end of the word, and add "ay" to the end of the words
        for(let i = 0; i < currentWord.length; i++) {
          if (currentWord[i + 1] === 'u') {
            // assume that a vowel follows 'qu'
            vowelIndex = i + 2
            currentWord = currentWord.slice(vowelIndex) + currentWord.slice(0,vowelIndex) + "ay"
            break
          }
        }
      } else if (!vowels.includes(currentWord[0])) {
        // if the word begins with a consonant, then we find the first vowel and move the first set of letters to the end of the word, and add "ay" to the end of the word
          if (currentWord.includes("y") && currentWord[0] !== 'y') {
            // the last case is sometimes "y", then handle case for hard 'y' and soft 'y', where 'y' can either be like a vowel or consonant
            // first appearance of a 'y' appears before a vowel, and is a consonant
            for(let i = 0; i < currentWord.length; i++) {
              // if the word contains a 'y' or includes a vowel
              if (currentWord[i] === 'y' || vowels.includes(currentWord[i])) {
                // assume that a vowel follows 'qu'
                vowelIndex = i
                currentWord = currentWord.slice(vowelIndex) + currentWord.slice(0,vowelIndex) + "ay"
                break
              }
            }
            console.log(currentWord);
          } else {
            for (let i = 0; i < currentWord.length; i++) {
              if (vowels.includes(currentWord[i])) {
                vowelIndex = i
                currentWord = currentWord.slice(vowelIndex) + currentWord.slice(0,vowelIndex) + "ay"
                break
              }
            }
          }
      }



      // Remember: console.log is your friend :)


      // ACTION ITEM: change the value of currentWord in the push method to the name of whatever variable you made containing your Pig Latin'd word
      return translatedWordsArray.push(currentWord)
    })


    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")

    // the setState method will take your information from 'translatedWords' and update the state object that is displayed to the user
    // no need to change this method
    this.setState({ phraseTranslated: translatedWords })
    // done!
  }

  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    // no need to modify this method
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  handleChange = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    // no need to modify this method
    this.setState({ phrase: e.target.value })
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: 'through every squeal queen fry',
      phraseTranslated: 'This is where your translated sentence will appear.'
    })
  }

  render() {
    // the render method is where we put information on the page
    // inside the return is all our JSX tags
    return (
      <React.Fragment>
        <h1>Pig Latin Translator</h1>
          <div id="pigImage">
            <img
              src="https://lh3.googleusercontent.com/QvvsRY5ShwDNEouVMK8_z7QCwS3grkgd4mzZOlom23Hurralk54ObvsyEMM8ZSNR5pEFBeBMzltzEEcgi2llYJnhXTuXClN3njmMjtw3vgn8Go5jr40fHMNzfI64eYRrnHbZUutxCA=w2400"
              alt="pig with butcher cut names in pig latin"
              id="butcherPig"
            />
          </div>
          <div className="box">
            <h4>Enter phrase to be translated:</h4>
            <div className="info">
            {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
              <input
                type="text"
                id="inputPhrase"
                onChange={ this.handleChange }
                value={ this.state.phrase }
              />
              <br />
              {/* button that called the setUpPreventDefault method */}
              <button onClick={ this.setUpPreventDefault }>Submit</button>
              {/* button that resets the game */}
              <button onClick={ this.restartGame }>Clear</button>
            </div>
            {/* where the translated phrase will display */}
            <p>{ this.state.phraseTranslated }</p>
          </div>
        <footer>Coded by ~your name here~</footer>
      </React.Fragment>
    )
  }
}

export default App
