import express from 'express'

import { profileHandler } from '../profile/profile.controller'
import { productsHandler } from '../products/products.controller'
import { authHandler } from '../auth/auth.controller'

const router = express.Router()

router.get('/api/profile/cart', profileHandler)
router.put('/api/profile/cart', profileHandler)
router.delete('/api/profile/cart', profileHandler)
router.post('/api/profile/cart/checkout', profileHandler)

router.get('/api/products', productsHandler)
router.get('/api/products/:productId', productsHandler)

router.get('/api/auth/register', authHandler)
router.get('/api/auth/login', authHandler)

export default router

