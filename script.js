const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbot = document.querySelector(".chatbot");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

function toggleChatbot() {
  document.body.classList.toggle("show-chatbot");
}

chatbotToggler.addEventListener("click", toggleChatbot);

let userMessage = null; // Variable to store user's message
const API_KEY = "sk-proj-XAcGC9ZZsTuKQnmpHIK5T3BlbkFJId4xlXIh0SUhRBJ6uOkE"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", toggleChatbot); // Update event listener to use toggleChatbot function

var motivationalQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "In the middle of difficulty lies opportunity.",
    "Concentrate all your thoughts upon the work in hand. The sun’s rays do not burn until brought to a focus.",
    "Either you run the day or the day runs you.",
    "I’m a great believer in luck, and I find the harder I work, the more I have of it.",
    "When we strive to become better than we are, everything around us becomes better too.",
    "Opportunity is missed by most people because it is dressed in overalls and looks like work.",
    "Setting goals is the first step in turning the invisible into the visible.",
    "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
    "Don’t let yesterday take up too much of today.",
    "You learn more from failure than from success. Don’t let it stop you. Failure builds character.",
    "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.",
    "Experience is a hard teacher because she gives the test first, the lesson afterward.",
    "To know how much there is to know is the beginning of learning to live.",
    "It is better to fail in originality than to succeed in imitation.",
    "The road to success and the road to failure are almost exactly the same.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Develop success from failures. Discouragement and failure are two of the surest stepping stones to success.",
    "Success is getting what you want; happiness is wanting what you get."
  ];  

  // Function to display a random motivational quote
  function displayRandomQuote() {
    var randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    document.getElementById("motivational-quote").textContent = motivationalQuotes[randomIndex];
  }

  // Call the function to display a random quote when the page loads
  displayRandomQuote();

  function sendMessage() {
    var userInput = document.getElementById("user-input").innerText.trim().split(/\s+/)[0]; // Get user input (first word)
    var timestamp = document.getElementById("timestamp");
    var recommendedSongs = document.getElementById("recommended-songs"); // Get recommended songs container
    var chatContainer = document.querySelector(".chat-container"); // Get chat container

    // Clear previous recommendations and motivational quote
    recommendedSongs.innerHTML = "";
    document.getElementById("motivational-quote").textContent = "";

    // Generate playlist based on mood
    var playlist = generatePlaylist(userInput);

    // Display recommended songs
    recommendedSongs.innerHTML = "<p>Recommended Songs:</p>" + playlist;

    // Show timestamp
    timestamp.style.display = "block";

    // Hide chat container (text box and "Go" button)
    chatContainer.style.display = "none";
  }
  function generatePlaylist(mood) {
    var playlist = "";
    var songs;  // Declare songs here to use it universally within the function

    // Use a single switch statement to handle all moods
    switch (mood.toLowerCase()) {
        case "calm":
        case "mellow":
        case "quiet":
        case "relaxing":
        case "relax":
        case "timid":
        case "shy":
        case "serene":
        case "spiritual":
        case "instrumental":
            songs = [
                { img: "weightless.png", name: "Weightless", artist: "Marconi Union" },
                { img: "1.png", name: "Focus Mode", artist: "Instrumental Genius" },
                { img: "lune.png", name: "Clair de Lune", artist: "Claude Debussy" },
                { img: "gym.png", name: "Gymnopédie No. 1", artist: "Erik Satie" },
                { img: "spiegel.png", name: "Spiegel im Spiegel", artist: "Arvo Pärt" },
                { img: "wind.png", name: "Wind Song", artist: "Ludovico Einaudi" },
                { img: "reverie.png", name: "Reverie", artist: "Claude Debussy" },
                { img: "swan.png", name: "The Swan (Le Cygne)", artist: "Camille Saint-Saëns" },
                { img: "time.png", name: "Time", artist: "Hans Zimmer" },
                { img: "jazz.png", name: "Autumn Leaves", artist: "Bill Evans" },
                { img: "ryuichi.png", name: "Merry Christmas Mr. Lawrence", artist: "Ryuichi Sakamoto" },
                { img: "nyman.png", name: "The Heart Asks Pleasure First", artist: "Michael Nyman" },
                { img: "fleet.png", name: "Blue Ridge Mountains", artist: "Fleet Foxes" },
                { img: "shadowfax.png", name: "Undercurrent", artist: "Bill Evans and Jim Hall" },
                { img: "giovanni.png", name: "Aria", artist: "Giovanni Allevi" },
                { img: "aria.png", name: "Angel's Flight", artist: "Shadowfax" },
                { img: "moonlight.png", name: "Moonlight Sonata", artist: "Ludwig van Beethoven" },
                { img: "c1.png", name: "Mystic River", artist: "Deuter" },
                { img: "c2.png", name: "Evening Glow", artist: "Kevin Kern" },
                { img: "c3.png", name: "Silent Path", artist: "Robert Haig Coxon" },
                { img: "c4.png", name: "Moonlit Shore", artist: "Paul Cardall" },
                { img: "g1.png", name: "Autumn Leaves", artist: "George Winston" },
                { img: "g2.png", name: "Open Fields", artist: "Tommy Emmanuel" },
                { img: "g3.png", name: "Sea of Tranquility", artist: "Kitaro" },
                { img: "g4.png", name: "Angel's Serenade", artist: "Loreena McKennitt" },
                { img: "g5.png", name: "Whispering Winds", artist: "Deuter" },
                { img: "g6.png", name: "Calm Waters", artist: "Michael Hoppé" },
                { img: "g7.png", name: "Peaceful Dawn", artist: "Vangelis" },
                { img: "g8.png", name: "Misty Mornings", artist: "Dario Marianelli" },
                { img: "g9.png", name: "Tranquil Paths", artist: "Fionnuala Sherry" },
                { img: "g10.png", name: "Evening Cicadas", artist: "Masanori Takahashi" },
                { img: "g11.png", name: "Quiet Thoughts", artist: "Joep Beving" },
                { img: "g12.png", name: "Soft Reflections", artist: "Ólafur Arnalds" },
                { img: "g13.png", name: "Gentle Whisper", artist: "Alexandre Desplat" },
                { img: "g14.png", name: "Moonlight Echo", artist: "Helen Jane Long" },
                { img: "g15.png", name: "Distant Horizons", artist: "Jean-Michel Jarre" },
                { img: "g16.png", name: "Serenity", artist: "Jim Brickman" },
                { img: "g17.png", name: "Under the Stars", artist: "Brian Eno" },
                { img: "g18.png", name: "Quiet River", artist: "Ryuichi Sakamoto" },
                { img: "g19.png", name: "Forest Hymn", artist: "Andreas Vollenweider" },
                { img: "g20.png", name: "Sacred Grove", artist: "Peter Kater" }
            ];
            break;
        case "focus":
        case "soothing":
        case "soft":
        case "peaceful":
        case "meditate":
        case "stillness":
        case "still":
        case "acoustic":
        case "focused":
        case "smooth":
        case "meditation":
        case "tranquil":
        case "tranquility":
            songs = [
                { img: "1.png", name: "Focus Mode", artist: "Instrumental Genius" },
                { img: "2.png", name: "Concentration Beats", artist: "Mindful Melodies" },
                { img: "3.png", name: "Study Session", artist: "Focus Ensemble" },
                { img: "4.png", name: "Concentration Waves", artist: "Zen Beats" },
                { img: "5.png", name: "Study Break", artist: "Mindful Musician" },
                { img: "6.png", name: "Brain Boost", artist: "Concentration Composer" },
                { img: "7.png", name: "Deep Focus", artist: "Ambient Attention" },
                { img: "8.png", name: "Mindful Medley", artist: "Focus Flow" },
                { img: "9.png", name: "Zen Garden", artist: "Kokin Gumi" },
                { img: "10.png", name: "Echoes of Time", artist: "Vangelis" },
                { img: "11.png", name: "Liquid Mind", artist: "Chuck Wild" },
                { img: "12.png", name: "Opening", artist: "Philip Glass" },
                { img: "13.png", name: "Reflections", artist: "Brian Eno" },
                { img: "14.png", name: "Solo Piano", artist: "Philip Glass" },
                { img: "15.png", name: "Chill Piano", artist: "Max Richter" },
                { img: "16.png", name: "Soothing Strings", artist: "Yiruma" },
                { img: "d1.png", name: "Forest Whispers", artist: "Llewellyn" },
                { img: "d2.png", name: "Lavender Fields", artist: "Kamal" },
                { img: "d3.png", name: "Soft Tides", artist: "Parijat" },
                { img: "d4.png", name: "Gentle Breeze", artist: "Shastro" },
                { img: "h1.png", name: "Dew Drops", artist: "Luke Howard" },
                { img: "h2.png", name: "Morning Mist", artist: "Philip Wesley" },
                { img: "h3.png", name: "Calm Repose", artist: "Kevin Kern" },
                { img: "h4.png", name: "Ocean Breeze", artist: "Peder B. Helland" },
                { img: "h5.png", name: "Silent Path", artist: "Michael Whalen" },
                { img: "h6.png", name: "Gentle Dawn", artist: "Kavin Hoo" },
                { img: "h7.png", name: "Sapphire", artist: "Michael Dulin" },
                { img: "h8.png", name: "Evergreen", artist: "Ernesto Cortazar" },
                { img: "h9.png", name: "Piano Reflections", artist: "Michele McLaughlin" },
                { img: "h10.png", name: "Quietude", artist: "David Nevue" },
                { img: "h11.png", name: "Lavender Fields", artist: "Danny Wright" },
                { img: "h12.png", name: "Gentle Touch", artist: "Bernward Koch" },
                { img: "h13.png", name: "Inner Journey", artist: "Shastro" },
                { img: "h14.png", name: "Daydreams", artist: "Robin Spielberg" },
                { img: "h15.png", name: "Serenity", artist: "Tim Janis" },
                { img: "h16.png", name: "Quiet Moments", artist: "Greg Maroney" },
                { img: "h17.png", name: "Soft Rain", artist: "Dean Evenson" },
                { img: "h18.png", name: "Clear Sky", artist: "Paul Adams" },
                { img: "h19.png", name: "Whispering Winds", artist: "Ann Sweeten" },
                { img: "h20.png", name: "Still Waters", artist: "James Hood" }
            ];
            break;
        case "happy":
        case "uplifting":
        case "energetic":
        case "lively":
        case "motivated":
        case "ready to go":
        case "inspired":
        case "ready":
        case "melodic":
        case "intense":
        case "dynamic":
        case "confident":
        case "cinematic":
        case "layered":
        case "playful":
        case "dramatic":
        case "flamboyant":
        case "upbeat":
        case "rhythmic":
        case "good":
        case "fun":
        case "whimsical":
        case "loud":
          songs = [
            { img: "a1.png", name: "Happy Days", artist: "Steve Jablonsky" },
            { img: "a2.png", name: "Rise Up", artist: "Thomas Bergersen" },
            { img: "a3.png", name: "Bright Morning", artist: "Yann Tiersen" },
            { img: "a4.png", name: "Energy Flow", artist: "Ryuichi Sakamoto" },
            { img: "a5.png", name: "Joyful Spirit", artist: "Ola Gjeilo" },
            { img: "a6.png", name: "Upbeat Vibes", artist: "John Powell" },
            { img: "a7.png", name: "Lively Steps", artist: "Michael Nyman" },
            { img: "a8.png", name: "Motivation Rise", artist: "Hans Zimmer" },
            { img: "a9.png", name: "Inspiration Peak", artist: "Ludovico Einaudi" },
            { img: "a10.png", name: "Melodic Journey", artist: "Vangelis" },
            { img: "a11.png", name: "Energetic Rush", artist: "James Horner" },
            { img: "a12.png", name: "Uplift Harmony", artist: "Alan Silvestri" },
            { img: "a13.png", name: "Live Loud", artist: "Bear McCreary" },
            { img: "a14.png", name: "Happy Tune", artist: "Joe Hisaishi" },
            { img: "a15.png", name: "Soaring High", artist: "Danny Elfman" },
            { img: "a16.png", name: "Euphoria", artist: "Howard Shore" },
            { img: "a17.png", name: "Bright Beats", artist: "Philip Glass" },
            { img: "a18.png", name: "Inspirational Heights", artist: "Ennio Morricone" },
            { img: "a19.png", name: "Vivid Impressions", artist: "John Williams" },
            { img: "a20.png", name: "Dynamic Energy", artist: "Junkie XL" },
            { img: "a21.png", name: "Lively Melodies", artist: "Alexandre Desplat" },
            { img: "a22.png", name: "Uplifting Symphony", artist: "Max Richter" },
            { img: "a23.png", name: "Radiant Motion", artist: "Rachel Portman" },
            { img: "a24.png", name: "Cheerful Beats", artist: "Clint Mansell" },
            { img: "a25.png", name: "Upbeat Dreams", artist: "Thomas Newman" },
            { img: "a26.png", name: "Happy Chimes", artist: "Ramin Djawadi" },
            { img: "a27.png", name: "Lively Dance", artist: "Carter Burwell" },
            { img: "a28.png", name: "Energetic Pulse", artist: "Patrick Doyle" },
            { img: "a29.png", name: "Inspiring Vibe", artist: "Trevor Rabin" },
            { img: "a30.png", name: "Melodic Bliss", artist: "Mark Isham" },
            { img: "i1.png", name: "Bright Day", artist: "Ryan Farish" },
            { img: "i2.png", name: "Joyful Spring", artist: "Ottmar Liebert" },
            { img: "i3.png", name: "Rising Sun", artist: "2002" },
            { img: "i4.png", name: "Adventure Begins", artist: "Thomas Bergersen" },
            { img: "i5.png", name: "Exuberance", artist: "Sharon Fendrich" },
            { img: "i6.png", name: "Elation", artist: "Emmanuel Santarromana" },
            { img: "i7.png", name: "Playful Journeys", artist: "Joe Bongiorno" },
            { img: "i8.png", name: "Vibrant Dance", artist: "Jennifer Thomas" },
            { img: "i9.png", name: "Celebration", artist: "Kurt Bestor" },
            { img: "i10.png", name: "Dynamic Rush", artist: "Michael Giacchino" }            
          ];
          break;
        case "stressed":
        case "anxious":
        case "scared":
        case "nervous":
        case "unconfident":
        case "bad":
        case "percussive":
        case "uncertain":
        case "experimental":
        case "funky":
        case "jazzy":
        case "jazz":
        case "funk":
        case "progressive":
        case "tired":
        case "frustrated":
        case "vibrant":
          songs = [
            { img: "b1.png", name: "Nocturne in E-flat Major", artist: "Frédéric Chopin" },
            { img: "b2.png", name: "Adagio for Strings", artist: "Samuel Barber" },
            { img: "b3.png", name: "Meditation from Thaïs", artist: "Jules Massenet" },
            { img: "b4.png", name: "Spa Dreams", artist: "Deuter" },
            { img: "b5.png", name: "Floating", artist: "Peter Kater" },
            { img: "b6.png", name: "Watermark", artist: "Enya" },
            { img: "b7.png", name: "Peaceful Moments", artist: "George Winston" },
            { img: "b8.png", name: "Weightless", artist: "Marconi Union" },
            { img: "b9.png", name: "Reflection", artist: "Brian Eno" },
            { img: "b10.png", name: "Tranquil Day", artist: "Liquid Mind" },
            { img: "b11.png", name: "Aerial Boundaries", artist: "Michael Hedges" },
            { img: "b12.png", name: "Elegy", artist: "Lisa Gerrard" },
            { img: "b13.png", name: "Solitude", artist: "David Friedman" },
            { img: "b14.png", name: "Quiet Resource", artist: "Steven Halpern" },
            { img: "b15.png", name: "Stillness", artist: "Nightnoise" },
            { img: "b16.png", name: "Breathe", artist: "Greg Maroney" },
            { img: "b17.png", name: "Clear Skies", artist: "Kevin Kern" },
            { img: "b18.png", name: "Ocean Waves", artist: "Natural Sounds" },
            { img: "b19.png", name: "Morning Light", artist: "John Keawe" },
            { img: "b20.png", name: "Misty Forest", artist: "Danny Wright" },
            { img: "j1.png", name: "Nervous Energy", artist: "John Scofield" },
            { img: "j2.png", name: "Uncertainty", artist: "Avishai Cohen" },
            { img: "j3.png", name: "Midnight Blue", artist: "Kenny Burrell" },
            { img: "j4.png", name: "Experimental Groove", artist: "Flying Lotus" },
            { img: "j5.png", name: "Rusty", artist: "Brad Mehldau" },
            { img: "j6.png", name: "Frustration Blues", artist: "Ry Cooder" },
            { img: "j7.png", name: "Heavy Clouds", artist: "Esperanza Spalding" },
            { img: "j8.png", name: "Percussive Thoughts", artist: "Stewart Copeland" },
            { img: "j9.png", name: "Eerie Twilight", artist: "Squarepusher" },
            { img: "j10.png", name: "Funky Fusion", artist: "Herbie Hancock" },
            { img: "j11.png", name: "Dark Jazz", artist: "Bohren & der Club of Gore" },
            { img: "j12.png", name: "Intense Focus", artist: "Chick Corea" },
            { img: "j13.png", name: "Upbeat Anxiety", artist: "Snarky Puppy" },
            { img: "j14.png", name: "Weary Soul", artist: "Medeski Martin & Wood" },
            { img: "j15.png", name: "Disturbed Serenity", artist: "Anouar Brahem" },
            { img: "j16.png", name: "Frantic Mind", artist: "John Zorn" },
            { img: "j17.png", name: "Restless", artist: "The Bad Plus" },
            { img: "j18.png", name: "Deep Funk", artist: "Maceo Parker" },
            { img: "j19.png", name: "Vibrant Nights", artist: "Lee Ritenour" },
            { img: "j20.png", name: "Broken Rhythms", artist: "Dave Holland" }                       
          ];
          break;
        case "sad":
        case "somber":
        case "dissonant":
        case "depressed":
        case "disappointed":
        case "melancholic":
        case "nostalgic":
        case "emotional":
        case "melancholy":
        case "modern":
        case "sombre":
        case "weak":
        case "memory":
        case "nostalgia":
        case "memorable":
        case "depressing":
        case "memories":
          songs = [
            { img: "e1.png", name: "Raindrops", artist: "Ólafur Arnalds" },
            { img: "e2.png", name: "Lost at Sea", artist: "Brian Crain" },
            { img: "e3.png", name: "Farewell", artist: "Yiruma" },
            { img: "e4.png", name: "Solitude", artist: "Max Richter" },
            { img: "e5.png", name: "Elegy", artist: "Lisa Gerrard & Patrick Cassidy" },
            { img: "e6.png", name: "Gray", artist: "Rob Simonsen" },
            { img: "e7.png", name: "Forgotten Dreams", artist: "Ludovico Einaudi" },
            { img: "e8.png", name: "Leaving Home", artist: "Thomas Newman" },
            { img: "e9.png", name: "Winter Light", artist: "Tim Janis" },
            { img: "e10.png", name: "Echoes of the Past", artist: "Philip Glass" },
            { img: "e11.png", name: "A Moment Lost", artist: "David Nevue" },
            { img: "e12.png", name: "Blue", artist: "Michael Dulin" },
            { img: "e13.png", name: "Nights Reflecting", artist: "Peter Kater" },
            { img: "e14.png", name: "Sorrow", artist: "Sleeping at Last" },
            { img: "e15.png", name: "Gloomy Sunday", artist: "Zbigniew Preisner" },
            { img: "e16.png", name: "Eternal Lament", artist: "Yann Tiersen" },
            { img: "e17.png", name: "Cello Song", artist: "Nick Drake" },
            { img: "e18.png", name: "Mourn", artist: "Ólafur Arnalds & Nils Frahm" },
            { img: "e19.png", name: "Memories", artist: "Marconi Union" },
            { img: "e20.png", name: "Lamentation", artist: "Kyle Landry" },
            { img: "k1.png", name: "Solace", artist: "Ólafur Arnalds" },
            { img: "k2.png", name: "The Last Leaf", artist: "Max Richter" },
            { img: "k3.png", name: "Elegy", artist: "Goldmund" },
            { img: "k4.png", name: "For Now I Am Winter", artist: "Ólafur Arnalds" },
            { img: "k5.png", name: "Drifting", artist: "Nathan Barr" },
            { img: "k6.png", name: "Farewell", artist: "Michael Nyman" },
            { img: "k7.png", name: "Eternal Loss", artist: "Philip Glass" },
            { img: "k8.png", name: "Blue Pages", artist: "A Winged Victory for the Sullen" },
            { img: "k9.png", name: "Memorial", artist: "Explosions in the Sky" },
            { img: "k10.png", name: "Elegiac", artist: "Keith Kenniff" },
            { img: "k11.png", name: "Time As a Symptom", artist: "Joanna Newsom" },
            { img: "k12.png", name: "Lamentation", artist: "William Basinski" },
            { img: "k13.png", name: "A Stutter", artist: "Ólafur Arnalds, Arnór Dan" },
            { img: "k14.png", name: "Despair", artist: "Hildur Guðnadóttir" },
            { img: "k15.png", name: "Misty Mountains", artist: "Howard Shore" },
            { img: "k16.png", name: "Remembrance", artist: "Balmorhea" },
            { img: "k17.png", name: "Departure", artist: "Max Richter" },
            { img: "k18.png", name: "Lost", artist: "Sun Kil Moon" },
            { img: "k19.png", name: "Gone", artist: "M83" },
            { img: "k20.png", name: "Sinking", artist: "Jóhann Jóhannsson" }            
          ];
          break;
        case "dreamy":
        case "magical":
        case "beautiful":
        case "beauty":
        case "romantic":
        case "at peace":
        case "intimate":
        case "romance":
        case "hopeful":
        case "powerful":
        case "power":
        case "strong":
        case "triumph":
        case "triumphant":
        case "majestic":
        case "hope":
        case "optimistic":
        case "dream":
        case "magic":
        case "rich":
          songs = [
            { img: "f1.png", name: "Dreamscapes", artist: "R. Armando Morabito" },
            { img: "f2.png", name: "Magic Horizons", artist: "Michael Hoppé" },
            { img: "f3.png", name: "Isle of Skye", artist: "Paul Mottram" },
            { img: "f4.png", name: "Hope Rises", artist: "Keith Kenniff" },
            { img: "f5.png", name: "Wishing Well", artist: "Peter Kater" },
            { img: "f6.png", name: "Starlit Sky", artist: "Brian Crain" },
            { img: "f7.png", name: "Uplift", artist: "Steven Halpern" },
            { img: "f8.png", name: "Into the Light", artist: "Laura Sullivan" },
            { img: "f9.png", name: "Lanterns", artist: "Sonny Lim" },
            { img: "f10.png", name: "Mystical Paths", artist: "Al Jewer & Andy Mitran" },
            { img: "f11.png", name: "Positive Thinking", artist: "Dean Evenson" },
            { img: "f12.png", name: "Bright Future", artist: "Peder B. Helland" },
            { img: "f13.png", name: "Celestial Reverie", artist: "Jonn Serrie" },
            { img: "f14.png", name: "Optimist", artist: "Zoe Keating" },
            { img: "f15.png", name: "Golden Sunrise", artist: "Natasha Nightingale" },
            { img: "f16.png", name: "Field of Dreams", artist: "Kevin Kern" },
            { img: "f17.png", name: "Halo of Light", artist: "Tim Janis" },
            { img: "f18.png", name: "Glimmer of Hope", artist: "David Nevue" },
            { img: "f19.png", name: "A Touch of Magic", artist: "Gandalf" },
            { img: "f20.png", name: "New Beginnings", artist: "Danny Wright" },
            { img: "l1.png", name: "Skyward", artist: "Joep Beving" },
            { img: "l2.png", name: "Floating in Love", artist: "Yiruma" },
            { img: "l3.png", name: "Celestial Light", artist: "Hammock" },
            { img: "l4.png", name: "Glorious Dawn", artist: "Julianna Barwick" },
            { img: "l5.png", name: "Love’s Sorrow", artist: "Kreisler/Rachmaninoff" },
            { img: "l6.png", name: "Dreamcatcher", artist: "Secret Garden" },
            { img: "l7.png", name: "Aurora", artist: "Hans Zimmer" },
            { img: "l8.png", name: "Hopeful Hearts", artist: "Danny Elfman" },
            { img: "l9.png", name: "The Light of Dawn", artist: "Thomas Bergersen" },
            { img: "l10.png", name: "Morning Mist", artist: "Philip Wesley" },
            { img: "l11.png", name: "Enchantment", artist: "Ludovico Einaudi" },
            { img: "l12.png", name: "Heart’s Journey", artist: "Michael Hoppé" },
            { img: "l13.png", name: "Starlight Serenade", artist: "Ola Gjeilo" },
            { img: "l14.png", name: "The Heroic", artist: "Jennifer Thomas" },
            { img: "l15.png", name: "Wonders", artist: "The Piano Guys" },
            { img: "l16.png", name: "Rose Garden", artist: "Joe Hisaishi" },
            { img: "l17.png", name: "Ascent", artist: "Lambert" },
            { img: "l18.png", name: "Eternal Love", artist: "Paul Cardall" },
            { img: "l19.png", name: "Victorious", artist: "Two Steps from Hell" },
            { img: "l20.png", name: "Majesty", artist: "Ryan Stewart" }                        
          ];
          break;
            default:
              playlist = "<p>No playlist available. Choose a different mood.</p>";
              return playlist; // Early exit if no valid mood is found
      }
  
      // Shuffle and slice the array to get a random selection of up to 8 songs
      shuffleArray(songs);
      songs = songs.slice(0, 8);
      songs.forEach(song => {
          playlist += `
          <div class="song">
              <img src="${song.img}" alt="Album Image">
              <div class="song-info">
                  <p>Song Name: ${song.name}</p>
                  <p>Artist: ${song.artist}</p>
              </div>
          </div>
          `;
      });
  
      return playlist;
  }

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

  function updateTimestamp() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    var timestamp = document.getElementById("timestamp");
    timestamp.textContent = formatTime(hours) + ":" + formatTime(minutes) + " " + ampm;
  }

  // Function to format time (add leading zero if needed)
  function formatTime(time) {
    return time < 10 ? "0" + time : time;
  }

  // Update timestamp every second
  setInterval(updateTimestamp, 1000);

  // Event listener for Enter key press
  document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage();
      event.preventDefault(); // Prevent default behavior (new line)
    }
  });

