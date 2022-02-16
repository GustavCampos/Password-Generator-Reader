//This part will read all inputs and outputs of the site 
let sizePwOpt =  document.getElementById("tamsenha")
let upperCharOpt = document.getElementById("upperchar")
let numCharOpt = document.getElementById("numchar")
let espCharOpt = document.getElementById("espchar")
let semCharOpt = document.getElementById("semchar")
let accCharOpt = document.getElementById("accchar")
let resTextPw = document.getElementById("senhatxt")


//This Class will make basically everything about generate a password
function Generator() {
    
    //This variables will keep the information of the parameters to create a password
    let size
    let upperchar
    let numChar
    let espChar
    let semChar
    let accChar

    //A function setup to create random numbers later
    const random = (min, max) => Math.floor(Math.random() * (max - min) + min)

    //This function set all parameters to make a password
    this.validateBoxes = function () { 

        //This switch reads the value of the option selected in the select of html, and set this value in "size".
        switch (sizePwOpt.value) { 
            case "char4":
                size = 4
                break
            case "char6":
                size = 6
                break
            case "char8":
                size = 8
                break
            case "char10":
                size = 10
                break
            case "char12":
                size = 12
                break
            case "char16":
                size = 16
        }
        
        //This if will tell if the password will contain upper characters
        if (upperCharOpt.checked) {
            upperchar = true
        } else {
            upperchar = false
        }

        //This if will tell if the password will contain number characters
        if (numCharOpt.checked) {
            numChar = true
        } else {
            numChar = false
        }

        //This if will tell if the password will contain especial characters
        if (espCharOpt.checked) {
            espChar = true
        } else {
            espChar = false
        }

        //This if will tell if the password will contain semantic characters
        if (semCharOpt.checked) {
            semChar = true
        } else {
            semChar = false
        }

        //This if will tell if the password will contain accented characters
        if (accCharOpt.checked) {
            accChar = true
        } else {
            accChar = false
        }
    }

    //This function read all parameters created in validateBoxes() then generate a random password
    this.generate = function () {

        //Arrays with the characters that will be used
        let normalChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

        let numberChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

        let especialChar = ['!', '@', '#', '$', '£', '%', '¢', '¬', '&', '*', '_', '-', '=', '+', '§', '/', '?', 
        '|', '₢', '<', '>', '^', '~']

        let semanticChar = ['{', '}', '[', ']', '(', ')', 'ª', 'º', ',', '.', ':', ';', '"', "'"]

        let accentedChar = ['á', 'à', 'â', 'ã', 'ä', 'é', 'è', 'ê', 'ë', 'í', 'ì', 'î', 'ï', 'ó', 'ò', 'ô', 'õ', 'ö', 'ú', 'ù', 'û', 'ü']
        //---------------------------------------------------------------------

        let res = '' //This variable will contain the information of the Password created

        //-------------------------------------------------------
        //This block verificate every tipe of character will go in password
        let typesCharIn = ['lowerCase']//array with just the lowerCase type

        //If someone of the parameteres in the top is true, then the list of types will be increased with the type that is true
        if (upperchar)
            typesCharIn.push('upperCase')
        if (numChar)
            typesCharIn.push('numberCase')
        if (espChar)
            typesCharIn.push('especialCase')
        if (semChar)
            typesCharIn.push('semanticCase')
        if (accChar)
            typesCharIn.push('accentedCase')
        
        //This loop will make all the process to randomize the password
        for (let c = 1; c <= size; c++) {
            
            //This variable will select in every cicle a random type of character
            let charType = typesCharIn[random(0, typesCharIn.length)]

            let letter //This variable will receive te character select after all the process

            //This swtich will put a value in variable letter, in each case it will pick a random item from the array of the corresponding type of character
            switch (charType) {
                case 'lowerCase':
                    letter = normalChar[random(0, normalChar.length)]
                    break
                case 'upperCase':
                    letter = normalChar[random(0, normalChar.length)]
                    letter = letter.toUpperCase()
                    break
                case 'numberCase':
                    letter = numberChar[random(0, numberChar.length)]
                    break
                case 'especialCase':
                    letter = especialChar[random(0, especialChar.length)]
                    break
                case 'semanticCase':
                    letter = semanticChar[random(0, semanticChar.length)]
                    break
                case 'accentedCase':
                    letter = accentedChar[random(0, accentedChar.length)]
                    
                    //This if exists to combine randomly upperCase characters with accented characters case both are enabled 
                    if (upperchar == true && random(0, 2) == 0) {
                        letter = letter.toUpperCase()
                    }
            }

            res += letter //This line add the character on letter to the password in res
        }

        return res
    }

    //Getters && Setters
    Object.defineProperty(this, 'size', {
        get: function() {
            return size
        },
        set: function (value) {
            size = value
        }
    })
}

//Main code
const gen =  new Generator() //Instance a Generator

let generateButton = document.getElementById("generatebtn") //Find the button to call createPw function
generateButton.addEventListener('click', createPw) //Call createPw function on click

let copyButton = document.getElementById("copybutton")//Find the button to call copyText function
copyButton.addEventListener('click', copyText)//Call copyText function on click

//This function will validate the configuration in site, and then call the .generate to create a password, after it will return the password in the input "resTextPw"
function createPw() {
    gen.validateBoxes()
    let password = gen.generate()
    resTextPw.value = password
}

//This function copy the text in resTextPw input to the transfer area
function copyText() {
    resTextPw.select()
    document.execCommand("copy")
    window.alert("Copiado para área de Transferência")
}