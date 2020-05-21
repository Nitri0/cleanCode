// eslint-disable-next-line no-unused-vars
const ProductDetailStructure = {
  storeRetreat: true || false,
  brand: '',
  itemNumber: '',
  description: '',
  content: '',
  sellingFormatType: '', // 'nx$' | 'precioBase' | 'rebaja' | 'compraMasPorMenos',
  nx$Detail: {
    factorMultiplier: '',
    promotionPrice: '',
    unitPrice: '',
    amountSaved: '',
    unitOfMeasurement: ''
  },
  precioBaseDetail: {
    unitPrice: '', // 1.300
    unitOfMeasurement: '' // unid || pack || caja || ...
  },
  rebajaDetail: {
    unitPrice: '', // 1.200
    unitOfMeasurement: ''
  },
  compraMasPagaMenosDetail: [
    {
      descriptor: '',
      unitPrice: '', // 1.500
      unitOfMeasurement: '', // unid || pack || caja || ...
      highlighted: true || false
    }
  ],
  offer: true || false,
  minimumQuantity: 0,
  maximumQuantity: 0, // 0 = ilimitado
  message1: '', // debajo de boton agregar
  message2: '' // encima de boton agregar
}

const getDataObject = (product) => {
  const productDetail = {
    brand: product.brand,
    itemNumber: product.item_nbr,
    content: product.content,
    upcNumber: product.upc_nbr,
    description: product.description.trim(),
    storeRetreat: false,
    message1: '',
    message2: '',
    sellingFormat: {
      type: '',
      offer: false,
      nx$Detail: {},
      rebajaDetail: {},
      compraMasPagaMenosDetail: [],
      precioBaseDetail: {},
      minimumQuantity: 0,
      maximumQuantity: 0
    }
  }
  return productDetail
}

export default {
  getDataObject,
  ProductDetailStructure
}
