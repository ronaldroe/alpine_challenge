const fetch = require('node-fetch');

const users = [
  {
    first_name: 'Admin',
    last_name: 'Istrator',
    email: 'admin@admin.admin',
    user_level: 1,
    password: 'admin'
  },
  {
    first_name: "Melloney",
    last_name: "Jellings",
    email: "mjellings0@samsung.com",
    password: "G3lQScFi",
    user_level: 0
  }, {
    first_name: "Isidor",
    last_name: "Tooth",
    email: "itooth1@bandcamp.com",
    password: "KBKxHH06pR",
    user_level: 0
  }, {
    first_name: "Jorrie",
    last_name: "Sothern",
    email: "jsothern2@xinhuanet.com",
    password: "zQ4aNkoJ",
    user_level: 0
  }, {
    first_name: "Zorine",
    last_name: "Sainer",
    email: "zsainer3@webnode.com",
    password: "g8kVl9onO6",
    user_level: 0
  }, {
    first_name: "Barbaraanne",
    last_name: "Sarsfield",
    email: "bsarsfield4@nymag.com",
    password: "tc7N2b8Egqeu",
    user_level: 0
  }
]

users.forEach(user => {
  fetch('http://localhost:3000/user/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => console.log(data.success ? `${data._doc.email} added` : 'Adding user failed'));
});