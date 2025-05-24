const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(bodyParser.json());

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/products', require('./routes/product.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
