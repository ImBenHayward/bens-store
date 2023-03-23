import gateway from './epccGateway'
import ProductList from './ProductList'

const resourcePage = await gateway.ShopperCatalog.Products.With(['main_image']).All()

function ProductsView() {
  return (
    <div>
      <ProductList resourcePage={resourcePage} />
    </div>
  )
}

export default ProductsView
