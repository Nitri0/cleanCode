import fs from 'fs'

import HandlerBusinessLogic from './handlerBusiness'

describe('Business logic', () => {
  let compreMasPorMenos
  let nx$
  let precioBase
  let rebaja

  let example1
  let example2
  let example3
  let example4
  let handlerBussinesLogic

  beforeEach(async () => {
    const dir1 = `${__dirname}/test_data/format_sale_mooks`
    compreMasPorMenos = JSON.parse(
      await fs.readFileSync(`${dir1}/compreMasPorMenos.data.txt`).toString()
    )
    nx$ = JSON.parse(await fs.readFileSync(`${dir1}/nx$.data.txt`).toString())
    precioBase = JSON.parse(
      await fs.readFileSync(`${dir1}/precioBase.data.txt`).toString()
    )
    rebaja = JSON.parse(
      await fs.readFileSync(`${dir1}/rebaja.data.txt`).toString()
    )

    const dir2 = `${__dirname}/test_data/unit_medition_mooks`
    example1 = JSON.parse(
      await fs.readFileSync(`${dir2}/example1.data.txt`).toString()
    )
    example2 = JSON.parse(
      await fs.readFileSync(`${dir2}/example2.data.txt`).toString()
    )
    example3 = JSON.parse(
      await fs.readFileSync(`${dir2}/example3.data.txt`).toString()
    )
    example4 = JSON.parse(
      await fs.readFileSync(`${dir2}/example4.data.txt`).toString()
    )
    handlerBussinesLogic = new HandlerBusinessLogic()
  })

  describe('Validation definition of selling format (promotions) calculatePrice', () => {
    test('Give_Nx$_with_quantity_0_1_4_5_6_When_calculatePrice_Then_it_should_a_valid_price', () => {
      const mock = [
        {
          result: {
            valid: false,
            price: null,
            sellingTypeMessage: '',
            errorMessages: ['Cantidad invalida']
          },
          quantity: 0
        },
        {
          quantity: 1,
          result: {
            valid: true,
            price: 429,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 4,
          result: {
            valid: true,
            price: 1716,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 5,
          result: {
            valid: true,
            price: 2000,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 6,
          result: {
            valid: true,
            price: 2429,
            sellingTypeMessage: '',
            errorMessages: []
          }
        }
      ]

      const case0 = handlerBussinesLogic.calculatePrice(nx$, mock[0].quantity)
      expect(case0).toStrictEqual(mock[0].result)
      const case1 = handlerBussinesLogic.calculatePrice(nx$, mock[1].quantity)
      expect(case1).toStrictEqual(mock[1].result)
      const case2 = handlerBussinesLogic.calculatePrice(nx$, mock[2].quantity)
      expect(case2).toStrictEqual(mock[2].result)
      const case3 = handlerBussinesLogic.calculatePrice(nx$, mock[3].quantity)
      expect(case3).toStrictEqual(mock[3].result)
      const case4 = handlerBussinesLogic.calculatePrice(nx$, mock[4].quantity)
      expect(case4).toStrictEqual(mock[4].result)
    })
    test('Give_PrecioBase_with_quantity_0_1_2_3_4_5_When_calculatePrice_Then_it_should_a_valid_price', () => {
      const mock = [
        {
          quantity: 0,
          result: {
            valid: false,
            price: null,
            sellingTypeMessage: '',
            errorMessages: ['Cantidad invalida']
          }
        },
        {
          quantity: 1,
          result: {
            valid: true,
            price: 490,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 2,
          result: {
            valid: true,
            price: 980,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 3,
          result: {
            valid: true,
            price: 1470,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 4,
          result: {
            valid: true,
            price: 1960,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 5,
          result: {
            valid: true,
            price: 2450,
            sellingTypeMessage: '',
            errorMessages: []
          }
        }
      ]

      mock.forEach((mockObject) => {
        const result = handlerBussinesLogic.calculatePrice(
          precioBase,
          mockObject.quantity
        )
        expect(result).toStrictEqual(mockObject.result)
      })
    })
    test('Give_Rebaja_with_quantity_0_1_2_3_4_5_When_calculatePrice_Then_it_should_a_valid_price', () => {
      const mock = [
        {
          quantity: 0,
          result: {
            valid: false,
            price: null,
            sellingTypeMessage: '',
            errorMessages: ['Cantidad invalida']
          }
        },
        {
          quantity: 1,
          result: {
            valid: false,
            price: null,
            sellingTypeMessage: '',
            errorMessages: ['Cantidad minima 3']
          }
        },
        {
          quantity: 2,
          result: {
            valid: false,
            price: null,
            sellingTypeMessage: '',
            errorMessages: ['Cantidad minima 3']
          }
        },
        {
          quantity: 3,
          result: {
            valid: true,
            price: 3255,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 4,
          result: {
            valid: true,
            price: 4340,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 5,
          result: {
            valid: true,
            price: 5425,
            sellingTypeMessage: '',
            errorMessages: []
          }
        }
      ]

      mock.forEach((mockObject) => {
        const result = handlerBussinesLogic.calculatePrice(
          rebaja,
          mockObject.quantity
        )
        expect(result).toStrictEqual(mockObject.result)
      })
    })
    test('Give_CompraMasPorMenos_with_quantity_0_1_2_3_4_119_120_121_479_480_481_When_calculatePrice_Then_it_should_a_valid_price', () => {
      const mock = [
        {
          quantity: 0,
          result: {
            valid: false,
            price: null,
            sellingTypeMessage: '',
            errorMessages: ['Cantidad invalida']
          }
        },
        {
          quantity: 1,
          result: {
            valid: false,
            price: null,
            sellingTypeMessage: '',
            errorMessages: ['Cantidad minima 3']
          }
        },
        {
          quantity: 2,
          result: {
            valid: false,
            price: null,
            sellingTypeMessage: '',
            errorMessages: ['Cantidad minima 3']
          }
        },
        {
          quantity: 3,
          result: {
            valid: true,
            price: 7350,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 4,
          result: {
            valid: true,
            price: 9800,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 119,
          result: {
            valid: true,
            price: 291550,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 120,
          result: {
            valid: true,
            price: 288000,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 121,
          result: {
            valid: true,
            price: 290400,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 479,
          result: {
            valid: true,
            price: 1149600,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 480,
          result: {
            valid: true,
            price: 1128000,
            sellingTypeMessage: '',
            errorMessages: []
          }
        },
        {
          quantity: 481,
          result: {
            valid: true,
            price: 1130350,
            sellingTypeMessage: '',
            errorMessages: []
          }
        }
      ]
      mock.forEach((mockObject) => {
        const result = handlerBussinesLogic.calculatePrice(
          compreMasPorMenos,
          mockObject.quantity
        )
        expect(result).toStrictEqual(mockObject.result)
      })
    })
    test('Give_PrecioBase_with_packItem_with_quantity_0_and_1_When_calculatePrice_Then_it_should_a_valid_price', () => {
      const mock = [
        {
          quantity: 0,
          result: {
            valid: false,
            price: null,
            sellingTypeMessage: '',
            errorMessages: ['Cantidad invalida']
          }
        },
        {
          quantity: 1,
          result: {
            valid: true,
            price: 19500,
            sellingTypeMessage: '',
            errorMessages: []
          }
        }
      ]
      mock.forEach((mockObject) => {
        const result = handlerBussinesLogic.calculatePrice(
          example2,
          mockObject.quantity
        )
        expect(result).toStrictEqual(mockObject.result)
      })
    })
  })

  describe('Validation unit medition logic', () => {
    test('Testing get correct unit medition', () => {
      const moock = [
        { clase: compreMasPorMenos, quantity: 10, result: 'unidades' },
        { clase: compreMasPorMenos, quantity: 1, result: 'unidad' },

        { clase: example1, quantity: 1, result: 'unidad' },
        { clase: example1, quantity: 10, result: 'unidades' },

        { clase: example2, quantity: 1, result: 'caja' },
        { clase: example2, quantity: 10, result: 'cajas' },

        { clase: example3, quantity: 1, result: 'pack' },
        { clase: example3, quantity: 10, result: 'packs' },

        { clase: example4, quantity: 1, result: 'kilo' },
        { clase: example4, quantity: 10, result: 'kilos' },

        { clase: nx$, quantity: 10, result: 'unidades' },
        { clase: nx$, quantity: 1, result: 'unidad' },

        { clase: precioBase, quantity: 10, result: 'unidades' },
        { clase: precioBase, quantity: 1, result: 'unidad' },

        { clase: rebaja, quantity: 10, result: 'unidades' },
        { clase: rebaja, quantity: 1, result: 'unidad' }
      ]

      for (const moockObj of moock) {
        const result = handlerBussinesLogic.getMeditionUnitQuantity(
          moockObj.clase,
          moockObj.quantity
        )
        expect(result).toBe(moockObj.result)
      }
    })
  })

  describe('Restrictions busines validations', () => {
    let limitMap
    beforeEach(() => {
      limitMap = {
        939: {
          223524: {
            item_nbr: '223524',
            upc: '7801620015800',
            item1_desc: 'AGUA MINERAL CON GAS 500CC CACHANTUN',
            max_quantity: '48'
          }
        }
      }
    })
    test('Max limit quantity products from list of products', () => {
      const quantity1 = 50
      const resultMock1 = {
        valid: false,
        price: null,
        sellingTypeMessage: '',
        errorMessages: ['Maxima cantidad permitida 48']
      }

      const handlerBussinesLogic = new HandlerBusinessLogic({
        restrictionMaxQuantityMap: limitMap
      })
      const result1 = handlerBussinesLogic.calculatePrice(example1, quantity1)
      expect(result1).toStrictEqual(resultMock1)

      const quantity2 = 1
      const resultMock2 = {
        valid: true,
        price: 490,
        sellingTypeMessage: '',
        errorMessages: []
      }

      const result2 = handlerBussinesLogic.calculatePrice(example1, quantity2)
      expect(result2).toStrictEqual(resultMock2)
    })
    test('Setting StoreRetreat', () => {
      const quantity1 = 50
      const resultMock1 = {
        valid: false,
        price: null,
        sellingTypeMessage: '',
        errorMessages: ['Maxima cantidad permitida 48']
      }

      const handlerBussinesLogic = new HandlerBusinessLogic({
        restrictionMaxQuantityMap: limitMap
      })
      const result1 = handlerBussinesLogic.calculatePrice(example1, quantity1)
      expect(result1).toStrictEqual(resultMock1)

      const quantity2 = 1
      const resultMock2 = {
        valid: true,
        price: 490,
        sellingTypeMessage: '',
        errorMessages: []
      }

      const result2 = handlerBussinesLogic.calculatePrice(example1, quantity2)
      expect(result2).toStrictEqual(resultMock2)
    })
  })

  describe('Items information for list of products', () => {
    test('get item information for format type compraMasPagaMenos', () => {
      const handlerBussinesLogic = new HandlerBusinessLogic()
      const compreMasPorMenosFormat = handlerBussinesLogic.getItemDetail(
        compreMasPorMenos
      )
      const compreMasPorMenosFormatMock = {
        storeRetreat: false,
        upcNumber: '780650079420',
        brand: 'BABYSEC',
        itemNumber: 426565,
        description: 'PA§AL PREMIUM G',
        content: '20UN',
        sellingFormat: {
          type: 1,
          nx$Detail: {},
          precioBaseDetail: {},
          rebajaDetail: {},
          compraMasPagaMenosDetail: [
            {
              descriptor: 'Desde 3 unidades',
              unitPrice: '2.450',
              unitOfMeasurement: 'unid',
              highlighted: false
            },
            {
              descriptor: 'Desde 120 unidades',
              unitPrice: '2.400',
              unitOfMeasurement: 'unid',
              highlighted: false
            },
            {
              descriptor: 'Desde 480 unidades',
              unitPrice: '2.350',
              unitOfMeasurement: 'unid',
              highlighted: true
            }
          ],
          offer: false,
          minimumQuantity: 3,
          maximumQuantity: 0
        },
        message1: '', // debajo de boton agregar
        message2: '' // encima de boton agregar
      }
      expect(compreMasPorMenosFormat).toStrictEqual(compreMasPorMenosFormatMock)
    })
    test('get item information for format type product nx$', () => {
      const handlerBussinesLogic = new HandlerBusinessLogic()
      const nx$Format = handlerBussinesLogic.getItemDetail(nx$)
      const nx$FormatMock = {
        storeRetreat: false,
        upcNumber: '7809367',
        brand: 'CHANDELLE',
        itemNumber: 423381,
        description: 'CHANDELLE CHOCOLATE',
        content: '130GR',
        sellingFormat: {
          type: 5,
          nx$Detail: {
            factorMultiplier: 5,
            promotionPrice: '2.000',
            unitPrice: '429',
            // amountSaved: '',
            unitOfMeasurement: 'unid'
          },
          precioBaseDetail: {
            // unitPrice: '',
            // unitOfMeasurement: '',
          },
          rebajaDetail: {
            // unitPrice: '',
            // unitOfMeasurement: '',
          },
          compraMasPagaMenosDetail: [],
          minimumQuantity: 1,
          maximumQuantity: 0,
          offer: false
        },
        message1: '', // debajo de boton agregar
        message2: '' // encima de boton agregar
      }
      expect(nx$Format).toStrictEqual(nx$FormatMock)
    })
    test('get item information for format type product rebaja format', () => {
      const handlerBussinesLogic = new HandlerBusinessLogic()
      const rebajaFormat = handlerBussinesLogic.getItemDetail(rebaja)
      const rebajaFormatMock = {
        storeRetreat: false,
        brand: 'NESTLE',
        upcNumber: '780223007002',
        itemNumber: 423251,
        description: 'CHOCOLATE TRENCITO',
        content: '150GR',
        sellingFormat: {
          type: 2,
          nx$Detail: {},
          precioBaseDetail: {},
          rebajaDetail: {
            unitPrice: '1.085',
            unitOfMeasurement: 'unid'
          },
          compraMasPagaMenosDetail: [],
          offer: false,
          minimumQuantity: 3,
          maximumQuantity: 0
        },
        message1: '', // debajo de boton agregar
        message2: 'Mínimo requerido: 3 unidades' // encima de boton agregar
      }
      expect(rebajaFormat).toStrictEqual(rebajaFormatMock)
    })
    test('get item information for format type product precioBase format', () => {
      const handlerBussinesLogic = new HandlerBusinessLogic()
      const precioBaseFormat = handlerBussinesLogic.getItemDetail(precioBase)
      const precioBaseFormatMock = {
        storeRetreat: false,
        upcNumber: '471095559392',
        brand: 'HAUS',
        itemNumber: 223524,
        description: 'FRASCO 1LT',
        content: '1UN',
        sellingFormat: {
          type: 3,
          nx$Detail: {},
          precioBaseDetail: {
            unitPrice: '490',
            unitOfMeasurement: 'unid'
          },
          rebajaDetail: {},
          compraMasPagaMenosDetail: [],
          offer: false,
          minimumQuantity: 1,
          maximumQuantity: 0
        },
        message1: '', // debajo de boton agregar
        message2: '' // encima de boton agregar
      }
      expect(precioBaseFormat).toStrictEqual(precioBaseFormatMock)
    })
  })

  describe('Testing Factory Items', () => {
    test('Get list detail items', () => {
      const hbl = new HandlerBusinessLogic()
      const items = [compreMasPorMenos, nx$, rebaja, precioBase]

      const resultMock = [
        {
          storeRetreat: false,
          brand: 'BABYSEC',
          upcNumber: '780650079420',
          itemNumber: 426565,
          description: 'PA§AL PREMIUM G',
          content: '20UN',
          sellingFormat: {
            type: 1,
            nx$Detail: {},
            precioBaseDetail: {},
            rebajaDetail: {},
            compraMasPagaMenosDetail: [
              {
                descriptor: 'Desde 3 unidades',
                unitPrice: '2.450',
                unitOfMeasurement: 'unid',
                highlighted: false
              },
              {
                descriptor: 'Desde 120 unidades',
                unitPrice: '2.400',
                unitOfMeasurement: 'unid',
                highlighted: false
              },
              {
                descriptor: 'Desde 480 unidades',
                unitPrice: '2.350',
                unitOfMeasurement: 'unid',
                highlighted: true
              }
            ],
            offer: false,
            minimumQuantity: 3,
            maximumQuantity: 0
          },
          message1: '', // debajo de boton agregar
          message2: '' // encima de boton agregar
        },
        {
          storeRetreat: false,
          brand: 'CHANDELLE',
          itemNumber: 423381,
          upcNumber: '7809367',
          description: 'CHANDELLE CHOCOLATE',
          content: '130GR',
          sellingFormat: {
            type: 5,
            nx$Detail: {
              factorMultiplier: 5,
              promotionPrice: '2.000',
              unitPrice: '429',
              // amountSaved: '',
              unitOfMeasurement: 'unid'
            },
            precioBaseDetail: {
              // unitPrice: '',
              // unitOfMeasurement: '',
            },
            rebajaDetail: {
              // unitPrice: '',
              // unitOfMeasurement: '',
            },
            compraMasPagaMenosDetail: [],
            minimumQuantity: 1,
            maximumQuantity: 0,
            offer: false
          },
          message1: '', // debajo de boton agregar
          message2: '' // encima de boton agregar
        },
        {
          storeRetreat: false,
          brand: 'NESTLE',
          itemNumber: 423251,
          upcNumber: '780223007002',
          description: 'CHOCOLATE TRENCITO',
          content: '150GR',
          sellingFormat: {
            type: 2,
            nx$Detail: {},
            precioBaseDetail: {},
            rebajaDetail: {
              unitPrice: '1.085',
              unitOfMeasurement: 'unid'
            },
            compraMasPagaMenosDetail: [],
            offer: false,
            minimumQuantity: 3,
            maximumQuantity: 0
          },
          message1: '', // debajo de boton agregar
          message2: 'Mínimo requerido: 3 unidades' // encima de boton agregar
        },
        {
          storeRetreat: false,
          brand: 'HAUS',
          upcNumber: '471095559392',
          itemNumber: 223524,
          description: 'FRASCO 1LT',
          content: '1UN',
          sellingFormat: {
            type: 3,
            nx$Detail: {},
            precioBaseDetail: {
              unitPrice: '490',
              unitOfMeasurement: 'unid'
            },
            rebajaDetail: {},
            compraMasPagaMenosDetail: [],
            offer: false,
            minimumQuantity: 1,
            maximumQuantity: 0
          },
          message1: '', // debajo de boton agregar
          message2: '' // encima de boton agregar
        }
      ]

      const itemsDetail = hbl.getItemsDetails(items)
      expect(itemsDetail).toStrictEqual(resultMock)
    })
  })
})
