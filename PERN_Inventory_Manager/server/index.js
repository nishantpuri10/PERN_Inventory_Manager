const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require("./db");

///Middleware
app.use(cors());
app.use(express.json());   //// this middleware enables us to use req.body


////ROUTE-1////
////SIGN-UP////////

app.post('/register', async (req, res) => {
  const { username, email , password } = req.body;
  const query = 'INSERT INTO users (username, email , password) VALUES ($1, $2 , $3) RETURNING userid';
  const values = [username, email , password];
  try {
    const result = await pool.query(query, values);
    res.json({ userid: result.rows[0].userid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


/////ROUTE-2/////
/////LOGIN/////////////
app.post('/login', async (req, resp) => {
    const { email, password } = req.body;
  
    // Check if email and password are provided
    if (email && password) {
      // Find user by email and password
      const query = 'SELECT  userid FROM users WHERE email = $1 AND password = $2';
      const values = [email, password];
      const result = await pool.query(query, values);
     
  
      if (result.rows.length) {
        // Remove password before sending response
        delete result.password;
  
        resp.json({ userid: result.rows[0].userid });
        
      } else {
        resp.send({ result: 'No user found' });
      }
    } else {
      resp.send({ result: 'No user found' });
    }
  });


////ROUTE-3/////
////ADD PRODUCTS PAGE/////
app.post('/add-products', async (req, res) => {
    const product = req.body;
  
    // Insert product into database
    const query = 'INSERT INTO product (userid , name,  price , category , company) VALUES ($1, $2, $3 ,$4 , $5) RETURNING userid, name, price , category,company';
    const values = [product.userid, product.name, product.price , product.category , product.company];
    const { rows } = await pool.query(query, values);
    const result = rows[0];
  
    res.send(result);
  });


///ROUTE-4////   When we need to get some data from database we use GET // I have used here post as i wanted to recieve a request from front-end with userId in it.
////Product List/////
app.post('/products', async (req, res) => {
    const { userId } = req.body;
  
    // Find products by user ID
    const query = 'SELECT productid ,  name,  price , category , company FROM product WHERE userid = $1';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    const products = rows;
  
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send('No product found');
    }
  });
  
/////ROUTE-5/////
////DELETE PRODUCTS/////
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
  
    // Delete product from database
    const query = 'DELETE FROM product WHERE productid = $1';
    const values = [productId];
    const { rowCount } = await pool.query(query, values);
  
    if (rowCount > 0) {
      res.send('Product deleted successfully');
    } else {
      res.send('No product found with that ID');
    }
  });

////ROUTE -6///
///GET ONE product USING IT'S productId///
app.get('/products/:id' , async(req , res)=>{
    try {
        const {id} = req.params;   ////req.params refers to the id in /products/:id
        const product = await pool.query("SELECT * FROM product WHERE productId = $1" , [id]);
        res.json(product.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
})

////ROUTE-7/////
////To get the product data to be updated so as to fill the input fields with it///
app.get("/product/:id" , async(req , res)=>{
  const productId = req.params.id;
  let result = await pool.query('SELECT name , price , category , company FROM product WHERE productid = $1', [productId]);
  res.send(result);

})

////ROUTE-8////
////UPDATE////
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
  
    // Update product in database
    const query = 'UPDATE product SET name = $1, price = $2, category = $3 , company = $4 WHERE productid = $5';
    const values = [productData.name,  productData.price, productData.category,productData.company, productId];
    const { rowCount } = await pool.query(query, values);
  
    if (rowCount > 0) {
      res.send('Product updated successfully');
    } else {
      res.send('Product not found');
    }
  });
  

/////ROUTE-9///////////
/////SEARCHING////////////
app.post('/search/:key', async (req, res) => {
  const { key } = req.params;
  const { userId } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM product WHERE (name ILIKE $1 OR CAST(price AS VARCHAR(20)) ILIKE $1 OR category ILIKE $1 OR company ILIKE $1) AND userid = $2`,
      [`%${key}%`, userId]
    );

    res.send(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

////ROUTE-10////////
/////PROFILE/////PERSON'S DETAILS////
app.post("/profile" , async(req , res)=>{
  const {userId} = req.body;
  const {rows} = await pool.query("SELECT username , email FROM users WHERE userid = $1" , [userId]);
  const result = rows[0];
  res.send(result);
})

////ROUTE-11////
////COUNT NUMBER OF PRODUCTS/////
app.post("/count" , async(req,res)=>{
  const {userId} = req.body;
  const {rows} = await pool.query("SELECT COUNT(*) , SUM(price) FROM product WHERE userid=$1",[userId]);
  const result = rows[0];
  res.send(result);
})

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
  
  