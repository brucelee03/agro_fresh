import express, { json } from 'express'
import { join } from 'path'
import { open } from 'sqlite'
import { Database } from 'sqlite3'

const app = express()
app.use(json())

const dbPath = join(__dirname, 'products.db')
let db = null

const initializeDBServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: Database,
    })

    // Create products table if it doesn't exist
    const createProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      productUrl TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buyer_name TEXT NOT NULL,
      buyer_contact TEXT NOT NULL,
      delivery_address TEXT NOT NULL,
      items TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending'
    );
    `
    await db.run(createProductsTableQuery)

    app.listen(3000, () => {
      console.log('Server is Running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initializeDBServer()

// Helper function to convert DB object to response object
const convertDbObjectToResponseObject = (dbObject) => {
  return {
    id: dbObject.id,
    name: dbObject.name,
    price: dbObject.price,
    productUrl: dbObject.productUrl,
    description: dbObject.description,
  }
}

// GET all products
app.get('/products/', async (request, response) => {
  const getProductsQuery = `
    SELECT *
    FROM products;
  `
  const productsArray = await db.all(getProductsQuery)
  response.send(productsArray.map(product => convertDbObjectToResponseObject(product)))
})

// GET product by id
app.get('/products/:productId/', async (request, response) => {
  const { productId } = request.params
  const getProductQuery = `
    SELECT *
    FROM products
    WHERE id = ${productId};
  `
  const product = await db.get(getProductQuery)
  if (product) {
    response.send(convertDbObjectToResponseObject(product))
  } else {
    response.status(404).send({ error: "Product not found" })
  }
})

// POST add new product
app.post('/products/', async (request, response) => {
  const { name, price, productUrl, description } = request.body
  const addProductQuery = `
    INSERT INTO products (name, price, productUrl, description)
    VALUES ('${name}', ${price}, '${productUrl}', '${description}');
  `
  const dbResponse = await db.run(addProductQuery)
  const productId = dbResponse.lastID
  response.send({ message: "Product Successfully Added", productId })
})

// PUT update product by id
app.put('/products/:productId/', async (request, response) => {
  const { productId } = request.params
  const { name, price, productUrl, description } = request.body
  const updateProductQuery = `
    UPDATE products
    SET 
      name = '${name}',
      price = ${price},
      productUrl = '${productUrl}',
      description = '${description}'
    WHERE id = ${productId};
  `
  await db.run(updateProductQuery)
  response.send({ message: "Product Details Updated" })
})

// DELETE product by id
app.delete('/products/:productId/', async (request, response) => {
  const { productId } = request.params
  const deleteProductQuery = `
    DELETE FROM products
    WHERE id = ${productId};
  `
  await db.run(deleteProductQuery)
  response.send({ message: "Product Removed" })
})

// POST place a new order
app.post('/orders/', async (request, response) => {
  const { buyer_name, buyer_contact, delivery_address, items } = request.body
  const addOrderQuery = `
    INSERT INTO orders (buyer_name, buyer_contact, delivery_address, items, status)
    VALUES ('${buyer_name}', '${buyer_contact}', '${delivery_address}', '${JSON.stringify(items)}', 'Pending');
  `
  const dbResponse = await db.run(addOrderQuery)
  const orderId = dbResponse.lastID
  response.send({ message: "Order Successfully Placed", orderId })
})

// GET order by id
app.get('/orders/:orderId/', async (request, response) => {
  const { orderId } = request.params
  const getOrderQuery = `
    SELECT *
    FROM orders
    WHERE id = ${orderId};
  `
  const order = await db.get(getOrderQuery)
  if (order) {
    order.items = JSON.parse(order.items)
    response.send(order)
  } else {
    response.status(404).send({ error: "Order not found" })
  }
})

// GET all orders (admin)
app.get('/orders/', async (request, response) => {
  const getOrdersQuery = `
    SELECT *
    FROM orders;
  `
  const ordersArray = await db.all(getOrdersQuery)
  ordersArray.forEach(order => {
    order.items = JSON.parse(order.items)
  })
  response.send(ordersArray)
})

// PUT update order status by id (admin)
app.put('/orders/:orderId/', async (request, response) => {
  const { orderId } = request.params
  const { status } = request.body
  const updateOrderStatusQuery = `
    UPDATE orders
    SET status = '${status}'
    WHERE id = ${orderId};
  `
  await db.run(updateOrderStatusQuery)
  response.send({ message: "Order Status Updated" })
})

export default app
