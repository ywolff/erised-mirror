# Erised

Erised allows to launch a peer-to-peer video call from command-line with:

1. **Quick setup**:
  - first user launches the app with one command-line (`erised`) and gets a link in his clipboard
  - second user can automatically join the call through this link without need to install anything or create an account  
2. **Quality**:
  - quality of communication only depends on the internet connection from both users
3. **Privacy**:
  - the server runs on the first user computer and is exposed publicly through [Ngrok](https://ngrok.com/)
  - it is only used for establishing connection, and video communication then transits directly from one peer to the
  other, with end-to-end encryption (included in WebRTC protocol)
4. **Nudges**:
  - last but not least, the app allows to send *nudges* to your recipient, just like we used to do in MSN Messenger

## Installation

You need to have [NodeJS](https://nodejs.org/en/) installed on your computer.

```bash
npm install -g erised-mirror
```

## Usage

```bash
erised
```
...and then magic happens.

## Thanks to

- Minh Son Nguyen, author of [React-VideoCall](https://github.com/nguymin4/react-videocall) awesome app that I forked.
- J.K. Rowling, who inspired me the name of the app.

  > “Can you think what the Mirror of Erised shows us all?" Harry shook his head.
  >
  > "Let me explain. The happiest man on earth would be able to use the Mirror of Erised like a normal mirror, that is, he would look into it and see himself exactly as he is. Does that help."
  >
  > Harry thought. Then he said slowly, "It shows us what we want... whatever we want..."
  >
  > "Yes and no," said Dumbledore quietly.
  >
  > "It shows us nothing more or less than the deepest, most desperate desire of our hearts. You, who have never known your family, see them standing around you."
  >
  > -- J.K. Rowling, Harry Potter and the Sorcerer's Stone