const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require("./db");
const multer = require('multer');
const path = require('path');

///Middleware
app.use(cors());
app.use(express.json());   //// TO GET REACT DATA IN NODEJS APPLICATION i.e. to use req.body 
app.use('/uploads', express.static('uploads'));




// set up multer for photo upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only image files are allowed!'));
    }
  }
});

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

/////ROUTE-3///////
/////ADD PRODUCTS//////
app.post('/add-products', upload.single('photo'), async (req, res) => {
  try {
    const {userid, name, price, quantity, company } = req.body;
    const photo = req.file.filename;

    console.log('uploaded file path:', req.file.path);

    const newProduct = await pool.query(
      'INSERT INTO product (userid , name, price, quantity, quantitySold ,  company, photo) VALUES ($1, $2, $3, $4,0, $5 , $6) RETURNING *',
      [userid ,name, price, quantity, company, photo]
    );

    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


///ROUTE-4////   When we need to get some data from database we use GET // I have used here post as i wanted to recieve a request from front-end with userId in it.
////Product List/////

app.post('/products', async (req, res) => {
  try {
    const { userId } = req.body;
    const allProducts = await pool.query('SELECT productid, name, price , quantity, company , photo FROM product where userid = $1' , [userId]);
    
    const productsWithPhoto = allProducts.rows.map((product) => ({
      productid: product.productid,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      company: product.company,
      photo: `http://localhost:5000/uploads/${product.photo}`,
    }));
    
    res.json(productsWithPhoto);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

  
/////ROUTE-5/////
////DELETE PRODUCTS/////
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;

    // Delete product from product table
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
        const product = await pool.query("SELECT * FROM product WHERE productid = $1" , [id]);
        res.json(product.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
})

////ROUTE-7/////
////To get the product data to be updated so as to fill the input fields with it///
// app.get("/product/:id" , async(req , res)=>{
//   const productId = req.params.id;
//   let result = await pool.query('SELECT name , price , quantity , company FROM product WHERE productid = $1', [productId]);
//   res.send(result);

// })

////ROUTE-8////
////UPDATE////
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
  
    // Update product in database
    const query = 'UPDATE product SET name = $1, price = $2, quantity = $3 , company = $4 WHERE productid = $5';
    const values = [productData.name,  productData.price, productData.quantity,productData.company, productId];
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
    const allProducts = await pool.query(
      `SELECT  name , price , quantity ,company , photo  FROM product WHERE (name ILIKE $1 OR CAST(price AS VARCHAR(20)) ILIKE $1 OR CAST(quantity AS VARCHAR(10)) ILIKE $1 OR company ILIKE $1) AND userid = $2`,
      [`%${key}%`, userId]
    );

    const productsWithPhoto = allProducts.rows.map((product) => ({
      productid: product.productid,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      company: product.company,
      photo: `http://localhost:5000/uploads/${product.photo}`,
    }));
    
    res.json(productsWithPhoto);

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
  const {rows} = await pool.query("SELECT SUM(quantity) AS totalcount , SUM( price * quantity ) AS totalprice FROM product WHERE userid=$1",[userId]);
  const result = rows[0];
  res.send(result);
})



///////////////////////BUYER'S ROUTER//////////////////////

///Add buyer////

app.post("/addbuyer" , async(req,res)=>{
  const {userid , bname, bemail, address } = req.body;
   
  const response = await pool.query("INSERT INTO buyer (userid , name , bemail, address ) VALUES($1 , $2 , $3 , $4  ) RETURNING * " , 
  [userid , bname,bemail, address ])

  res.json(response.rows[0].buyerid);
 

})

///ADD productid to cart corresponding to buyerId////
app.post("/addtocart" , async(req,res)=>{
  const {productid , buyerid} = req.body;

  const response = await pool.query("INSERT INTO CART (buyer_id , product_id) VALUES($1 , $2) RETURNING *", [buyerid,productid]);
  res.json(response.rows[0]);
})

///////////////////GENERATE BILL/////////////////

///Show buyer's details////
app.post("/buyerdetails" ,async(req,res)=>{
  const {buyerid} = req.body;

  const resp = await pool.query("SELECT * FROM buyer WHERE buyerid = $1" , [buyerid]);
  res.json(resp.rows[0]);
})


////Show cart i.e. products bought by the buyer////
app.post("/showcart", async (req, res) => {
  const { buyerid } = req.body;

  const query = `
    SELECT product.name AS productname, product.company, product.quantitySold ,  (product.price * product.quantitySold) AS productPrice
    FROM buyer
    JOIN cart ON buyer.buyerid = cart.buyer_id
    JOIN product ON cart.product_id = product.productid
    WHERE buyer.buyerid = $1
  `;

  try {
    const { rows } = await pool.query(query, [buyerid]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ error: "Error fetching cart details" });
  }
});

///Show total price of the products bought by buyer//////
app.post("/calculateTotalPrice", async (req, res) => {
  const { buyerid } = req.body;

  const query = `
    SELECT SUM(product.price * product.quantitysold) AS total_price
    FROM buyer
    JOIN cart ON buyer.buyerid = cart.buyer_id
    JOIN product ON cart.product_id = product.productid
    WHERE buyer.buyerid = $1
  `;

  try {
    const { rows } = await pool.query(query, [buyerid]);
    const totalPrice = rows[0].total_price || 0;
    res.json(totalPrice);
  } catch (error) {
    console.error("Error calculating total price:", error);
    res.status(500).json({ error: "Error calculating total price" });
  }
});

////Show buyer name  and products he bought and price /////
app.post('/showBuyerAndProducts', async (req, res) => {
  try {
    const { userid } = req.body;

    const query = `
      SELECT buyer.name AS buyer_name, ARRAY_AGG(product.name) AS product_names, ARRAY_AGG(product.quantitysold) AS quantities_sold, SUM(product.price * product.quantitysold) AS total_price
      FROM buyer
      INNER JOIN cart ON buyer.buyerid = cart.buyer_id
      INNER JOIN product ON cart.product_id = product.productid
      WHERE buyer.userid = $1
      GROUP BY buyer.buyerid, buyer.name
    `;
    const result = await pool.query(query, [userid]);
    const data = result.rows;

    res.json( data );
  } catch (error) {
    console.error('Error retrieving buyers and products:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

   /////ADD QUANTITY SOLD IN PRODUCT TABLE//////
    app.post('/quantitysold' , async(req,res)=>{
      const {quantitySold , productid} = req.body;
      const response = await pool.query("UPDATE product SET quantitySold = $1 WHERE productid = $2", [quantitySold,productid]);
      const updateQuantityQuery =await pool.query( "UPDATE product SET quantity = quantity - $1 WHERE productid = $2" , [quantitySold , productid]);
      res.json(response);
    })



  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
  
  