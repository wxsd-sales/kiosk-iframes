import axiosInstance from './axios-wrapper';

export const getPersonDetails = async (ID) => {
  try {
    const {data} =  await axiosInstance.get(`/people/${ID}`);

    return data;
  } catch (e) {
    console.error('getPersonDetails', e);
  }
};

export const sendMessage = async (time, name, callback) => {
  try {
    await axiosInstance.post(`/messages`, {
      toPersonEmail: 'akoushke@cisco.com',
      attachments: createCard(time, name, callback),
      text: 'hello'
    })
  } catch (error) {
    console.log(error)
  }
}

const createCard = (time, name, callback) => {
  return [
    {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content":
      {
        "type": "AdaptiveCard",
        "body": [{
          "type": "ColumnSet",
          "columns": [{
            "type": "Column",
            "items": [{
              "type": "Image",
              "url": "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/2/27/1393515556571/Tony-Revolori-011.jpg?width=620&quality=85&fit=max&s=612e9a32e549a50fdcd2c004741bf460",
              "size": "medium"
            }],
            "width": "auto"
          },
          {
            "type": "Column",
            "items": [{
              "type": "TextBlock",
              "weight": "Bolder",
              "text": "Reception check in system",
              "wrap": true
            },
            {
              "type": "TextBlock",
              "spacing": "None",
              "text": "Someone just checked into the lobby",
              "isSubtle": true,
              "wrap": true
            }],
            "width": "stretch"
          }]
        },
        {
          "type": "ColumnSet",
          "columns": [{
            "type": "Column",
            "width": 25,
            "items": [{
              "type": "TextBlock",
              "text": "Name:",
              "wrap": true,
              "color": "Light"
            },
            {
              "type": "TextBlock",
              "text": "Time:",
              "wrap": true,
              "color": "Light"
      }]
        },
        {
          "type": "Column",
          "width": 75,
          "items": [{
            "type": "TextBlock",
            "text": `${name}`,
            "wrap": true,
            "weight": "Default"
          },
          {
            "type": "TextBlock",
            "text": `${time}`,
            "wrap": true
          }]
        }]
      },
  {
      "type": "TextBlock",
      "text": "You can greet them using the link below:",
      "wrap": true
    },
    {
      "type": "ColumnSet",
      "columns": [{
        "type": "Column",
        "width": 5,
        "items": [{
          "type": "Image",
          "url": "https://i.imgur.com/tlXWXY3.png",
          "style": "Person",
          "size": "Small"
        }]
      },
      {
        "type": "Column",
        "width": 95,
        "items": [{
          "type": "TextBlock",
          "text": `[Click here to dial the device](webextel:${callback})`,
          "wrap": true,
          "horizontalAlignment": "Left",
          "spacing": "None",
          "size": "Medium"
        }],
        "verticalContentAlignment": "Center"
      }],
      "spacing": "Small",
      "separator": false,
      "horizontalAlignment": "Left"
    }],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.2"
    }
  }];
};