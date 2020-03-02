const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/api/hacker-api', async function(req, res) {
  let response;
  try {
    response = await axios.get('http://starlord.hackerearth.com/TopRamen');
  } catch (e) {
    console.error(e);
  }
  return res.status(200).send(response.data);
});

// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
