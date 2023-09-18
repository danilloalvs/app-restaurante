import { execQuery } from "./dbConnection"

export async function getProducts(filter) {
  let query = "SELECT * FROM tbProducts"

  if (filter) {
    query += " WHERE category_id=? "
  }

  query += " ORDER BY category_id ASC, is_deleted ASC;"
  let response = await execQuery(query, filter ? [filter] : [])

  let products = []

  for (let n = 0; n < response.rows.length; n++) {
    products.push(response.rows.item(n))
  }

  return products
}

export async function createProduct(product) {
  const query =
    "insert into tbProducts (name, description, price, category_id) values (?, ?, ?, ?)"
  await execQuery(query, [
    product.name,
    product.description,
    product.price,
    product.category_id
  ])

  return
}

export async function updateProduct(product) {
  const query =
    "update tbProducts set name=?, description=?, price=?, category_id=?, is_deleted=? where id=?"
  await execQuery(query, [
    product.name,
    product.description,
    product.price,
    product.category_id,
    product.is_deleted,
    product.id
  ])

  return
}

export async function deleteProduct(id) {
  const query = "update tbProducts set is_deleted=? where id=?"
  await execQuery(query, [true, id])

  return
}
