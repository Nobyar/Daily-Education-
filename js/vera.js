/* Vera, about 9 months. Parent-led looking, listening, and touch games.
   Day 1 is the first object. Ids stay stable because stars are saved by id. */

const VERA_THEMES = [
  { id: "first", name: "Faces and Words" },
  { id: "kind", name: "Songs and Games" },
  { id: "body", name: "Touch and Name" },
  { id: "animals", name: "Animal Sounds" },
  { id: "home", name: "Things to Hold" },
  { id: "food", name: "Milk and Bites" },
  { id: "world", name: "Bold Shapes" },
  { id: "move", name: "Wiggles" },
];

function veraGuide(minutes, how, activity, question, followup, why) {
  return { minutes, how, activity, question, followup, why };
}

function vera(id, word, say, sentence, theme, motion, particles, sound, soundLabel, related, guide) {
  return {
    id, word, say, sentence, theme, motion, particles, sound, soundLabel, related, guide, contrast: true,
  };
}

const VERA_LESSONS = [
  vera("v-mama", "Mama", "Mama", "Mama is here.", "first", "pulse", "hearts", "", "", [
    { word: "Mommy", say: "Mommy" },
  ], veraGuide(
    "2 minutes",
    "Hold Vera so she can see your face. Smile, say Mama once, and wait. If she looks at your mouth, say it again.",
    "Lean in close, then lean back. Each time your face returns, say Mama.",
    "Where is Mama?",
    "When you pick her up from a nap, pause and say Mama before the hug.",
    "At 9 months a face and a warm voice matter more than a perfect sound. Any look or coo counts.",
  )),
  vera("v-dada", "Dada", "Dada", "Dada is here.", "first", "pulse", "hearts", "", "", [
    { word: "Daddy", say: "Daddy" },
  ], veraGuide(
    "2 minutes",
    "Point to Dada, or to a photo, and say Dada slowly. Use the name your family really says.",
    "Cover the photo with a cloth, pull it away, and say Dada.",
    "Where is Dada?",
    "When Dada comes into the room, say Dada once and let Vera turn toward the voice.",
    "A second familiar person gives her another face to study and another sound to try.",
  )),
  vera("v-hi", "Hi", "Hi", "Hi, Vera.", "first", "wave", "stars", "", "", [
    { word: "Hello", say: "Hello" },
  ], veraGuide(
    "2 minutes",
    "Wave beside your face and say Hi one time. Keep your hand up so she can watch it.",
    "A stuffed animal pops up from behind a blanket and you say Hi.",
    "Can we say hi?",
    "Start a feed or a visit with one small wave and Hi.",
    "Hi is a social game. The wave gives her body a way in before words.",
  )),
  vera("v-ball", "Ball", "Ball", "Ball. Round ball.", "first", "bounce", "stars", "boing", "boing", [
    { word: "Round", say: "Round" },
  ], veraGuide(
    "2–3 minutes",
    "Show one ball, say Ball, and roll it slowly where her eyes can follow.",
    "Roll the ball, let it stop, and wait. When she looks or reaches, say Ball and roll it back.",
    "Where is the ball?",
    "One ball on the floor during play is enough. Name it when she reaches.",
    "A moving ball is a looking game and a reaching game, which is the work of 9 months.",
  )),
  vera("v-peek", "Peekaboo", "Peekaboo", "Peekaboo, Vera.", "kind", "pulse", "hearts", "", "", [
    { word: "Peek", say: "Peek" },
  ], veraGuide(
    "2–3 minutes",
    "Hide your face in your hands for one second. Open them and say Peekaboo in a happy voice.",
    "A small cloth over a toy, then you lift it. Say Peekaboo only when the toy comes back.",
    "Where did Mama go?",
    "Play once at a diaper change. Stop when she looks away.",
    "Peekaboo practices object permanence: people and toys still exist when they hide.",
  )),
  vera("v-pat", "Pat-a-cake", "Pat a cake", "Pat-a-cake with Vera.", "kind", "pulse", "stars", "clap", "clap", [
    { word: "Clap", say: "Clap" },
  ], veraGuide(
    "2–3 minutes",
    "Sing one verse of Pat-a-cake and clap her hands gently in yours. Keep the song short.",
    "Pat the picture, then pat her hands, and say Pat.",
    "Can we pat?",
    "Use the same song before a meal so the motions become familiar.",
    "A familiar song with touch helps her predict what comes next.",
  )),
  vera("v-bye", "Bye-bye", "Bye bye", "Bye-bye for now.", "first", "wave", "stars", "", "", [
    { word: "Wave", say: "Wave" },
  ], veraGuide(
    "2 minutes",
    "Wave as a person or a toy leaves and say Bye-bye as two soft beats.",
    "Put a block in a box, wave, and say Bye-bye. Bring it back with Peekaboo if she wants it.",
    "Can we wave bye-bye?",
    "Wave bye-bye when a bottle ends or when someone leaves the room.",
    "Bye-bye is often learned as one chunk, with the wave doing half the talking.",
  )),
  vera("v-more", "More", "More", "More, please.", "first", "pulse", "stars", "", "", [
    { word: "Again", say: "Again" },
  ], veraGuide(
    "2 minutes",
    "Offer a little of something she likes, pause, and say More if she leans in or fusses for it.",
    "Pause a song or a rolling ball. When she looks for it, say More and continue.",
    "More?",
    "At a spoonful of food, wait half a second so a lean or a sound can mean more.",
    "More is useful long before it is clear. Treat her reach as the word.",
  )),
  vera("v-milk", "Milk", "Milk", "Milk for Vera.", "food", "pulse", "drops", "", "", [
    { word: "Bottle", say: "Bottle" },
  ], veraGuide(
    "2 minutes",
    "Show the bottle or the breast, say Milk once, then feed. Keep the lesson shorter than the meal.",
    "Tap the bottle, say Milk, and let her pat it.",
    "Milk?",
    "Name milk at the start of a feed, not the whole way through.",
    "Mealtime words stick because they come with smell, taste, and a person.",
  )),
  vera("v-up", "Up", "Up", "Up you go.", "move", "hop", "stars", "", "", [
    { word: "Arms", say: "Arms up" },
  ], veraGuide(
    "2 minutes",
    "Before you lift her, say Up and wait for her arms or her eyes. Then lift.",
    "Lift a doll up and say Up. Then ask with your hands if Vera wants up.",
    "Up?",
    "Say Up at the crib rail and wait one breath before you pick her up.",
    "Up connects a word to a feeling in her body, which makes it memorable.",
  )),
  vera("v-dog", "Dog", "Dog", "Dog says woof.", "animals", "wiggle", "stars", "woof", "woof", [
    { word: "Woof", say: "Woof" },
  ], veraGuide(
    "2 minutes",
    "Point to the dog picture, say Dog, then play one woof. Watch whether she startles or smiles, and match her.",
    "Hide a stuffed dog, bring it out, and say Woof once.",
    "Where is the dog?",
    "If you see a calm dog outside, say Dog from a safe distance and stop.",
    "Animal sounds are exaggerated and easy to notice. One woof is plenty.",
  )),
  vera("v-cat", "Cat", "Cat", "Cat says meow.", "animals", "wiggle", "stars", "meow", "meow", [
    { word: "Meow", say: "Meow" },
  ], veraGuide(
    "2 minutes",
    "Say Cat, then one soft meow. If she startles, go quieter.",
    "A stuffed cat peeks from behind you. Say Meow when it appears.",
    "Where is the cat?",
    "Name a cat in a book with one word and one sound, then turn the page.",
    "A soft sound invites her to listen without overwhelming her.",
  )),
  vera("v-bird", "Bird", "Bird", "Bird says tweet.", "animals", "float", "stars", "tweet", "tweet", [
    { word: "Tweet", say: "Tweet" },
  ], veraGuide(
    "2 minutes",
    "Say Bird and play one tweet. Look toward a window if a real bird might be there.",
    "Fly a finger bird slowly across her view and say Tweet.",
    "Where is the bird?",
    "On a walk, stop once and say Bird if you hear one.",
    "High little sounds catch a baby's attention. Keep it to one tweet.",
  )),
  vera("v-nose", "Nose", "Nose", "Vera's nose.", "body", "pulse", "stars", "", "", [
    { word: "Touch", say: "Touch" },
  ], veraGuide(
    "2 minutes",
    "Touch your nose and say Nose. Then touch the tip of her nose very gently and say Nose.",
    "Boop a doll's nose, then yours, then hers, one boop each.",
    "Where is your nose?",
    "During a wash, name her nose once as you wipe it.",
    "Naming a body part while touching it links the word to a feeling.",
  )),
  vera("v-eyes", "Eyes", "Eyes", "Bright eyes.", "body", "pulse", "stars", "", "", [
    { word: "See", say: "See" },
  ], veraGuide(
    "2 minutes",
    "Point to your eyes and say Eyes. Blink slowly so she can watch.",
    "Cover your eyes, uncover, and say Eyes. This is a tiny peekaboo.",
    "Where are eyes?",
    "Name eyes once while she studies your face during a feed.",
    "Eyes are interesting to babies because they move and look back.",
  )),
  vera("v-mouth", "Mouth", "Mouth", "Mama's mouth.", "body", "pulse", "stars", "", "", [
    { word: "Lips", say: "Lips" },
  ], veraGuide(
    "2 minutes",
    "Point to your open mouth and say Mouth while you say a long aaa.",
    "Give her a baby-safe mirror. When she sees a mouth, say Mouth.",
    "Where is your mouth?",
    "Name mouth once before a bite of food.",
    "Watching a mouth helps her learn how sounds look.",
  )),
  vera("v-hands", "Hands", "Hands", "Vera's hands.", "body", "wave", "stars", "clap", "clap", [
    { word: "Clap", say: "Clap" },
  ], veraGuide(
    "2–3 minutes",
    "Hold her hands, clap once, and say Hands.",
    "Help her pat the black-and-white picture. Say Hands each pat, up to three.",
    "Where are your hands?",
    "Name hands when she grabs a spoon or your finger.",
    "Hands are how she explores. The word rides along with the grab.",
  )),
  vera("v-feet", "Feet", "Feet", "Hello, feet.", "body", "hop", "stars", "", "", [
    { word: "Toes", say: "Toes" },
  ], veraGuide(
    "2 minutes",
    "Touch one foot and say Feet. Wiggle it a little.",
    "Play a short This-little-piggy on one foot only, then stop.",
    "Where are feet?",
    "Name feet when socks come off.",
    "Feet are easy to see and fun to grab at this age.",
  )),
  vera("v-tummy", "Tummy", "Tummy", "Round tummy.", "body", "pulse", "hearts", "", "", [
    { word: "Belly", say: "Belly" },
  ], veraGuide(
    "2 minutes",
    "Pat your tummy and say Tummy. Pat hers gently once.",
    "Blow a tiny raspberry if she likes that game, then say Tummy.",
    "Where is your tummy?",
    "Name tummy once during a diaper change, then move on.",
    "A gentle pat makes an abstract word into a place on her body.",
  )),
  vera("v-baby", "Baby", "Baby", "Vera is the baby.", "first", "pulse", "hearts", "", "", [
    { word: "You", say: "You" },
  ], veraGuide(
    "2 minutes",
    "Point to Vera and say Baby. Then point to a baby in a photo and say Baby.",
    "A mirror: say Baby when she notices herself.",
    "Where is the baby?",
    "Say Baby when you narrate one care moment, such as a clean shirt.",
    "Baby can mean herself. That is a big idea, so keep it playful.",
  )),
  vera("v-book", "Book", "Book", "Open the book.", "home", "pulse", "stars", "", "", [
    { word: "Open", say: "Open" },
  ], veraGuide(
    "2–3 minutes",
    "Hold a board book, say Book, and open it. One page is a full lesson.",
    "Let her pat the page. Say Book, then name one picture.",
    "Where is the book?",
    "Keep the same book nearby tomorrow so the word returns.",
    "Books at this age are for mouths, pats, and a shared voice.",
  )),
  vera("v-cup", "Cup", "Cup", "Cup on the tray.", "home", "pulse", "drops", "", "", [
    { word: "Drink", say: "Drink" },
  ], veraGuide(
    "2 minutes",
    "Set a cup where she can see it and say Cup. Tap it so it makes a small sound.",
    "Hide the cup under a cloth and find it. Say Cup.",
    "Where is the cup?",
    "Name cup once at a meal, then let her explore it.",
    "Cups are everyday objects, so the word can return many times.",
  )),
  vera("v-bath", "Bath", "Bath", "Splash, bath.", "home", "wiggle", "bubbles", "blub", "splash", [
    { word: "Splash", say: "Splash" },
  ], veraGuide(
    "2–3 minutes",
    "At the real bath, say Bath once, then one splash sound. Watch her face and match her energy.",
    "Pat the water and say Splash. Stop if she turns away.",
    "Bath time?",
    "Use the same word at the start of every bath this week.",
    "Water plus a repeated word is a strong memory.",
  )),
  vera("v-bed", "Bed", "Bed", "Night-night, bed.", "home", "float", "stars", "", "", [
    { word: "Night", say: "Night night" },
  ], veraGuide(
    "2 minutes",
    "Pat the crib or bed and say Bed in a quieter voice.",
    "Lay a stuffed animal down and say Night-night.",
    "Where is the bed?",
    "Say Bed once as you start the sleep routine.",
    "A soft voice tells her this word belongs to rest.",
  )),
  vera("v-car", "Car", "Car", "Go, car.", "home", "bounce", "sparks", "", "", [
    { word: "Go", say: "Go" },
  ], veraGuide(
    "2 minutes",
    "Roll a toy car slowly and say Car. Let her eyes follow.",
    "Stop the car. When she looks at it, say Go and roll again.",
    "Where is the car?",
    "On a ride, say Car once as you buckle her in.",
    "Something that moves across her view is a tracking game.",
  )),
  vera("v-hat", "Hat", "Hat", "Hat on.", "home", "hop", "stars", "", "", [
    { word: "On", say: "On" },
  ], veraGuide(
    "2 minutes",
    "Put a soft hat on your head and say Hat. Take it off. Offer it near her.",
    "Hat on a stuffed animal, then off. Say Hat each time it goes on.",
    "Where is the hat?",
    "Name hat once when you go outside.",
    "On and off is a cause-and-effect game she can watch.",
  )),
  vera("v-shoes", "Shoes", "Shoes", "Shoes on feet.", "home", "hop", "stars", "", "", [
    { word: "Feet", say: "Feet" },
  ], veraGuide(
    "2 minutes",
    "Tap a shoe and say Shoes. Tap her foot and say Foot.",
    "Put a shoe on a doll and say Shoes.",
    "Where are the shoes?",
    "Name shoes once while getting ready to go out.",
    "Shoes connect to feet, which she already likes to grab.",
  )),
  vera("v-duck", "Duck", "Duck", "Duck says quack.", "animals", "wiggle", "drops", "quack", "quack", [
    { word: "Quack", say: "Quack" },
  ], veraGuide(
    "2 minutes",
    "Say Duck and one quack. Smile so the silly sound feels safe.",
    "A rubber duck in the bath gets one quack.",
    "Where is the duck?",
    "If you see ducks later, say Duck once and watch together.",
    "A silly sound is easier to notice than a quiet noun.",
  )),
  vera("v-cow", "Cow", "Cow", "Cow says moo.", "animals", "wiggle", "stars", "moo", "moo", [
    { word: "Moo", say: "Moo" },
  ], veraGuide(
    "2 minutes",
    "Say Cow, then one low moo. Keep it gentle.",
    "A stuffed cow hides and comes back with Moo.",
    "Where is the cow?",
    "In a book, moo once and turn the page when she is done looking.",
    "Low sounds feel different in the body. One is enough.",
  )),
  vera("v-fish", "Fish", "Fish", "Fish goes blub.", "animals", "float", "bubbles", "blub", "blub", [
    { word: "Swim", say: "Swim" },
  ], veraGuide(
    "2 minutes",
    "Wiggle a finger like a fish and say Fish. Add one blub.",
    "At the bath, a toy fish swims and you say Fish.",
    "Where is the fish?",
    "Name fish once if you pass a tank or a picture.",
    "A slow wiggle gives her eyes a path to follow.",
  )),
  vera("v-banana", "Banana", "Banana", "Yellow banana.", "food", "wiggle", "stars", "", "", [
    { word: "Yellow", say: "Yellow" },
  ], veraGuide(
    "2 minutes",
    "Hold a real banana if you have one. Say Banana and let her look. A picture is enough if you do not.",
    "Peekaboo with the banana behind your back.",
    "Where is the banana?",
    "If she eats banana, say the word once as you offer a taste.",
    "Food words come with smell, which is powerful at this age.",
  )),
  vera("v-apple", "Apple", "Apple", "Red apple.", "food", "bounce", "stars", "", "", [
    { word: "Red", say: "Red" },
  ], veraGuide(
    "2 minutes",
    "Show a whole apple, say Apple, and let her pat it if that is safe. Take a bite yourself so she hears crunch.",
    "Roll the apple a few inches and say Apple.",
    "Where is the apple?",
    "Name apple once at a snack, even if her portion is soft and small.",
    "A bright red object is easy to see against a simple background.",
  )),
  vera("v-clap", "Clap", "Clap", "Clap, clap.", "move", "pulse", "stars", "clap", "clap", [
    { word: "Hands", say: "Hands" },
  ], veraGuide(
    "2 minutes",
    "Clap once where she can see, say Clap, and wait. Clap her hands only if she likes it.",
    "Three soft claps, then a pause, then her turn to stare or wiggle.",
    "Can we clap?",
    "Clap once when a song ends so the sound means finished.",
    "Clapping is cause and effect: her hands, or yours, make a sound.",
  )),
  vera("v-wave", "Wave", "Wave", "Wave hello.", "move", "wave", "stars", "", "", [
    { word: "Hi", say: "Hi" },
  ], veraGuide(
    "2 minutes",
    "Wave slowly and say Wave. Babies often wave with their whole arm. That counts.",
    "Help her hand make one wave toward a doll, then say Hi.",
    "Can you wave?",
    "Wave at a mirror together.",
    "A wave is a word she can do with her body.",
  )),
  vera("v-hug", "Hug", "Hug", "Hug for Vera.", "kind", "pulse", "hearts", "", "", [
    { word: "Squeeze", say: "Squeeze" },
  ], veraGuide(
    "2 minutes",
    "Offer a short hug and say Hug. Let her lean away if she is done.",
    "Hug a stuffed animal and say Hug, then offer it to her.",
    "Hug?",
    "One goodbye hug gets the word, then you stop.",
    "Affection words should stay short so the hug stays welcome.",
  )),
  vera("v-kiss", "Kiss", "Kiss", "A little kiss.", "kind", "pulse", "hearts", "", "", [
    { word: "Love", say: "Love" },
  ], veraGuide(
    "1–2 minutes",
    "Kiss your own hand with a small sound and say Kiss. Offer a kiss to her hand.",
    "Kiss a doll and say Kiss. Let her mouth the doll if she wants. That is exploration.",
    "Kiss?",
    "One kiss at bedtime is the follow-up. Name it.",
    "A kiss sound is a tiny noise she may try to copy.",
  )),
  vera("v-bubbles", "Bubbles", "Bubbles", "Pop, bubbles.", "kind", "float", "bubbles", "", "", [
    { word: "Pop", say: "Pop" },
  ], veraGuide(
    "2–3 minutes",
    "Blow one or two bubbles in a safe space and say Bubbles. Watch her eyes track them.",
    "Say Pop if one pops. Do not chase a long bubble session.",
    "Where did it go?",
    "Save bubbles for a calm moment, not a crowded one.",
    "Bubbles are a looking game that disappears, a little like peekaboo.",
  )),
  vera("v-tickle", "Tickle", "Tickle", "Tickle, tickle.", "kind", "wiggle", "stars", "", "", [
    { word: "Again", say: "Again" },
  ], veraGuide(
    "1–2 minutes",
    "A tiny tickle on a foot, then stop and smile. Say Tickle. Wait to see if she asks with her body.",
    "Tickle a doll first so she knows the game, then one gentle tickle for her.",
    "More tickle?",
    "Use the game once today. End while she is still laughing.",
    "Stopping is part of the game. It teaches her that her signals matter.",
  )),
  vera("v-piggy", "Little piggy", "This little piggy", "This little piggy.", "kind", "hop", "stars", "", "", [
    { word: "Toes", say: "Toes" },
  ], veraGuide(
    "2 minutes",
    "Wiggle one toe per line of This Little Piggy. Stop after one foot.",
    "Let her grab her own toes while you say Toes.",
    "Where are the toes?",
    "Use the rhyme at one diaper change, then a kiss on the foot.",
    "This rhyme is old and simple. The toe wiggle is the lesson.",
  )),
  vera("v-twinkle", "Twinkle", "Twinkle twinkle", "Twinkle, little star.", "kind", "float", "stars", "bell", "bell", [
    { word: "Star", say: "Star" },
  ], veraGuide(
    "2 minutes",
    "Sing the first two lines of Twinkle, Twinkle and open and close your hands like stars.",
    "Play the bell once at the end and say Star.",
    "Where is the star?",
    "Sing the same two lines at bedtime with the lights low.",
    "A repeated song lets her predict the tune. You do not need every verse.",
  )),
  vera("v-row", "Row", "Row your boat", "Row, row, row.", "kind", "wiggle", "drops", "blub", "splash", [
    { word: "Boat", say: "Boat" },
  ], veraGuide(
    "2 minutes",
    "Sit with her facing you, rock gently side to side, and sing one round of Row, Row, Row Your Boat.",
    "Stop rocking and wait. If she wiggles for more, sing one more round.",
    "Row again?",
    "Use the rock once before a nap if it settles her.",
    "The motion and the song together help her feel the pattern.",
  )),
  vera("v-spider", "Spider", "Itsy bitsy spider", "The itsy-bitsy spider.", "kind", "hop", "drops", "", "", [
    { word: "Up", say: "Up" },
  ], veraGuide(
    "2 minutes",
    "Sing the Itsy-Bitsy Spider once. Walk your fingers up, then rain them down. Smile so it stays friendly.",
    "Her fingers can ride on yours for the climb.",
    "Up goes the spider?",
    "Sing it once at playtime. Skip it if spiders worry you. The finger climb is the game.",
    "This folk song is a finger play. The picture is a simple friendly spider, high contrast so she can track it.",
  )),
  vera("v-drum", "Drum", "Drum", "Tap the drum.", "move", "bounce", "sparks", "drum", "drum", [
    { word: "Tap", say: "Tap" },
  ], veraGuide(
    "2 minutes",
    "Tap an upside-down pot once and say Drum. Offer her the spoon if she wants to tap.",
    "You tap, then wait. She taps or stares. Say Drum either way.",
    "Can we tap?",
    "One tapping song today, then put the pot away.",
    "Making a sound herself is a powerful cause-and-effect lesson.",
  )),
  vera("v-bell", "Bell", "Bell", "Hear the bell.", "move", "spin", "stars", "bell", "bell", [
    { word: "Ding", say: "Ding" },
  ], veraGuide(
    "2 minutes",
    "Ring a bell or play the sound once, off to one side. See if she turns. Say Bell.",
    "Hide the sound behind her shoulder, then the other. Name Bell when she searches.",
    "Where is the bell?",
    "A jingly toy can be the real-world bell. One jingle, then a pause.",
    "Turning toward a sound is an early listening skill.",
  )),
  vera("v-light", "Light", "Light", "Light on.", "world", "pulse", "stars", "", "", [
    { word: "On", say: "On" },
  ], veraGuide(
    "2 minutes",
    "In a dim room, turn on one lamp and say Light. Give her a second to look.",
    "On, then off, then on. Say Light only when it is bright.",
    "Where is the light?",
    "Name light once at bedtime when you click a small lamp.",
    "A sudden brightness is interesting. Keep it gentle, not a flash in her eyes.",
  )),
  vera("v-moon", "Moon", "Moon", "Moon at night.", "world", "float", "stars", "", "", [
    { word: "Night", say: "Night" },
  ], veraGuide(
    "2 minutes",
    "Point to this bright moon on the dark picture and say Moon.",
    "If the real moon is out, hold her at a window and say Moon once.",
    "Where is the moon?",
    "The moon can be part of a quiet goodnight look.",
    "A white circle on black is easy for young eyes to find.",
  )),
  vera("v-red", "Red", "Red", "Red, red, red.", "world", "pulse", "stars", "", "", [
    { word: "Apple", say: "Apple" },
  ], veraGuide(
    "2 minutes",
    "Show the red shape and say Red. Then find one red thing in the room and say Red.",
    "Trade a red cup and a pale one. Name only the red.",
    "Where is red?",
    "At a meal, name one red food.",
    "One strong color is enough. Babies notice bold red before mixed shades.",
  )),
  vera("v-yellow", "Yellow", "Yellow", "Yellow sun.", "world", "spin", "stars", "", "", [
    { word: "Sun", say: "Sun" },
  ], veraGuide(
    "2 minutes",
    "Say Yellow and let her look at the bright circle. Find one yellow object nearby.",
    "A yellow ball rolls into view. Say Yellow.",
    "Where is yellow?",
    "Name yellow once on a banana or a flower.",
    "Yellow on black is a classic high-contrast pair for infants.",
  )),
  vera("v-stripes", "Stripes", "Stripes", "Black and white stripes.", "world", "wiggle", "stars", "", "", [
    { word: "Look", say: "Look" },
  ], veraGuide(
    "2 minutes",
    "Hold the striped picture still, about a foot from her, and say Look. Move it slowly side to side.",
    "A black-and-white shirt or dish towel can be the real stripes.",
    "Do you see the stripes?",
    "Leave the picture propped during tummy time for a minute, then put it away.",
    "Bold stripes are easier for young eyes than soft pictures.",
  )),
  vera("v-circle", "Circle", "Circle", "Round circle.", "world", "spin", "stars", "", "", [
    { word: "Round", say: "Round" },
  ], veraGuide(
    "2 minutes",
    "Trace the circle with your finger and say Circle. Offer her a round lid or ball to pat.",
    "Roll something round and say Circle.",
    "Where is the circle?",
    "Name one round thing in the kitchen.",
    "Round is a shape she can feel as well as see.",
  )),
  vera("v-star", "Star", "Star", "Bright star.", "world", "pulse", "stars", "bell", "bell", [
    { word: "Twinkle", say: "Twinkle" },
  ], veraGuide(
    "2 minutes",
    "Point to the star and say Star. Open and close your hand once.",
    "Sing two lines of Twinkle and stop.",
    "Where is the star?",
    "A star on a mobile or in a book gets the same word.",
    "The pointy shape stands out on a dark background.",
  )),
  vera("v-sun", "Sun", "Sun", "Hello, sun.", "world", "spin", "stars", "", "", [
    { word: "Day", say: "Day" },
  ], veraGuide(
    "2 minutes",
    "Say Sun and look toward a window if daylight is there. Do not aim her eyes at the real sun.",
    "Open the curtain and say Sun, then close it partway if it is too bright.",
    "Where is the sun?",
    "Morning can start with one look outside and the word Sun.",
    "Daylight is a daily cue. The word can ride along with it.",
  )),
  vera("v-rain", "Rain", "Rain", "Rain, rain.", "world", "float", "drops", "", "", [
    { word: "Wet", say: "Wet" },
  ], veraGuide(
    "2 minutes",
    "Drum fingers on a table and say Rain. If it is raining, listen together for a few seconds.",
    "A few drops of water on her hand, if she likes it, and say Wet.",
    "Do you hear rain?",
    "At the window, say Rain once and let her watch.",
    "Sound plus a word helps her connect what she hears.",
  )),
  vera("v-big", "Big", "Big", "Big, big, big.", "world", "pulse", "stars", "", "", [
    { word: "Little", say: "Little" },
  ], veraGuide(
    "2 minutes",
    "Open your arms wide and say Big. Show the big circle.",
    "A big ball and a tiny ball. Say Big only for the large one.",
    "Which one is big?",
    "Say Big when she sees a bus or a grown-up dog from a safe place.",
    "Big is an idea. The wide arms give her a hint.",
  )),
  vera("v-little", "Little", "Little", "Little one.", "world", "pulse", "stars", "", "", [
    { word: "Small", say: "Small" },
  ], veraGuide(
    "2 minutes",
    "Make a tiny shape with your fingers and say Little. Show the small dot.",
    "A little spoon and a big spoon. Name Little for the small one.",
    "Where is little?",
    "Call one small toy Little during play.",
    "Pairing little with big, on different days, keeps each word clear.",
  )),
  vera("v-water", "Water", "Water", "Splash of water.", "food", "float", "drops", "blub", "splash", [
    { word: "Wet", say: "Wet" },
  ], veraGuide(
    "2 minutes",
    "Tap a cup of water and say Water. One splash sound is enough.",
    "Let her pat a damp cloth and say Wet.",
    "Where is the water?",
    "Name water at the bath or at a sippy cup.",
    "Water shows up all day, so the word gets many calm repeats.",
  )),
  vera("v-door", "Door", "Door", "Open the door.", "home", "pulse", "stars", "", "", [
    { word: "Open", say: "Open" },
  ], veraGuide(
    "2 minutes",
    "Open a door slowly and say Door. Close it. Open it again if she is watching.",
    "Knock once, then open, and say Hi.",
    "Where is the door?",
    "Name door when someone arrives.",
    "A door that opens is a surprise, which keeps her looking.",
  )),
  vera("v-spoon", "Spoon", "Spoon", "Tap the spoon.", "food", "bounce", "stars", "", "", [
    { word: "Tap", say: "Tap" },
  ], veraGuide(
    "2 minutes",
    "Tap a spoon on a tray once and say Spoon. Let her hold it if that is safe.",
    "Spoon under a cup, then revealed. Say Spoon.",
    "Where is the spoon?",
    "Name spoon once during a meal.",
    "The tap makes the object announce itself.",
  )),
  vera("v-bunny", "Bunny", "Bunny", "Hop, bunny.", "animals", "hop", "stars", "boing", "boing", [
    { word: "Hop", say: "Hop" },
  ], veraGuide(
    "2 minutes",
    "Hop two fingers and say Bunny. Add one soft boing.",
    "A stuffed bunny hides and hops back.",
    "Where is the bunny?",
    "Name bunny if it is a comfort toy she already loves.",
    "A hop is easy for eyes to follow.",
  )),
  vera("v-one", "One", "One", "One ball.", "world", "pulse", "stars", "", "", [
    { word: "Ball", say: "Ball" },
  ], veraGuide(
    "2 minutes",
    "Hold up one finger and one toy. Say One. Do not add two or three today.",
    "Give her one block. Say One. Put it in a box.",
    "One?",
    "Offer one cracker or one toy and name it One.",
    "One is the only number she needs right now. It means this single thing.",
  )),
  vera("v-yes", "Yes", "Yes", "Yes, Vera.", "first", "pulse", "stars", "", "", [
    { word: "Good", say: "Good" },
  ], veraGuide(
    "2 minutes",
    "When she does something you like, nod and say Yes with a smile.",
    "Offer a toy. If she reaches, say Yes and give it.",
    "Yes?",
    "Use yes once when she tries a sound, even if it is not a word.",
    "Yes marks her effort. That is more useful than correcting her.",
  )),
  vera("v-alldone", "All done", "All done", "All done now.", "first", "wave", "stars", "", "", [
    { word: "Done", say: "Done" },
  ], veraGuide(
    "2 minutes",
    "When a game ends, open your hands and say All done. Then really stop.",
    "Put the ball away and say All done.",
    "All done?",
    "Use the phrase at the end of a meal if she turns her head away.",
    "All done respects her signal that she is finished.",
  )),
  vera("v-love", "Love", "Love", "Mama loves Vera.", "kind", "pulse", "hearts", "", "", [
    { word: "You", say: "You" },
  ], veraGuide(
    "1–2 minutes",
    "A hand on your heart, then a short cuddle, and say Love. Stop when she is ready.",
    "Kiss a photo of the family and say Love.",
    "Who loves Vera?",
    "Say I love you once at bedtime in the same calm voice.",
    "Love is the feeling under all of these games. The word can be quiet.",
  )),
];
