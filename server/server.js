const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors')
const fs = require('fs')
const { nanoid } = require('nanoid')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const initialLocations = JSON.parse(
  fs.readFileSync(`${__dirname}/data.json`)
)

const initialPolygons = JSON.parse(
  fs.readFileSync(`${__dirname}/polygons.json`)
)

app.get('/locations', (req, res) => res.send({ locations: initialLocations}));

app.get('/polygons', (req, res) => res.send({polygons: initialPolygons}));

app.post('/new_polygon', (req, res) => {
  const newId = nanoid()
  const newPolygon = Object.assign({
    id: newId,
    coordinates: req.body
  });
    
  initialPolygons.push(newPolygon);

  fs.writeFile(
    `${__dirname}/polygons.json`,
    JSON.stringify(initialPolygons),
    err => {
      res.status(200).json({
        status: "success",
      })
    }
  )
});

app.get('/:name/:lat/:lng', (req, res) =>  {
  const { name, lat, lng } = req.params
  if (name === ""){
    res.status(200).json({
      status: "name invalid"
    })
  } else if (Math.abs(lat) > 90) {
    res.status(200).json({
      status: "lat invalid"
    })
  } else if (Math.abs(lng) > 180) {
    res.status(200).json({
      status: "lng invalid"
    })
  } else {
    const newId = nanoid()
    const newLocation = Object.assign({
      id: newId,
      name: name,
      lat: lat,
      lng: lng
    });

    initialLocations.push(newLocation);

    fs.writeFile(
      `${__dirname}/data.json`,
      JSON.stringify(initialLocations),
      err => {
        res.status(200).json({
          status: "success",
          id: newId
        })
      }
    )
  }
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const portNumber = process.env.PORT || 3001;

app.listen(portNumber, () => {
  console.log('RrrarrrrRrrrr server alive on port 3001');
});
