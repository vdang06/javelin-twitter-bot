const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 5; // timeout to send the message 5 min

const AutoDM = () => {
  const stream = T.stream("user");
  console.log("Start Sending Auto Direct Message");
  stream.on("follow", SendMessage);
};

const SendMessage = (user) => {
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name),
  };
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(" New Follower ");
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch((err) => {
          console.error("error", err.stack);
        })
        .then((result) => {
          console.log(`Message sent successfully To  ${screen_name}`);
        });
    }, timeout);
  }
};
const GenerateMessage = (name) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `Hi ${name} sorry for the cold introduction. I am just letting you know that Javelin has come to San Francisco. Javelin is a mobile app that connects sports players with other players and leagues in their community. If this sounds like something that interest you, you can download the Javelin app for FREE! \n Have a great ${dayName}! 😊😊 `; // your message
  // My message   return `Hi ${name} sorry for the cold introduction. I am just letting you know that Javelin has come to San Francisco. Javelin is a mobile app that connects sports players with other players and leagues in their community. If this sounds like something that interest you, you can download the Javelin app for FREE! \n Have a great ${dayName}! 😊😊`;
};

module.exports = AutoDM;
