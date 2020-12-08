const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);

let write = async (author, title) => {
  try {
    await web.chat.postMessage({
      channel: '#general',
      text: `Good News!!! \n New article was posted \n *Titled: * ${title} \n *By:* ${author}`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  write
}