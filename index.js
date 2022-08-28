const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const TaskRouter = require('./routes/task');
const DeptRouter = require('./routes/dept');

const swaggerDoc = yaml.load('./SwaggerDocs.yaml');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/task', TaskRouter);
app.use('/api/dept', DeptRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

mongoose.connect('mongodb://localhost:27017/Onboarding', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', async () => {
  console.log('connected to mongo');
});

app.listen('5000');
