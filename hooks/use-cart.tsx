"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  description?: string
  quantity: number
  testsIncluded?: string[]
  preparationRequired?: boolean
  fastingRequired?: boolean
  sampleType?: string
  reportDeliveryTime?: string
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isLoading: boolean
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getItem: (id: string) => CartItem | undefined
  isInCart: (id: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("labify-cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        setItems(Array.isArray(parsedCart) ? parsedCart : [])
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("labify-cart", JSON.stringify(items))
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }
    }
  }, [items, isLoading])

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity">) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.id === newItem.id)

        if (existingItem) {
          // Update quantity if item already exists
          const updatedItems = currentItems.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
          )

          toast({
            title: "Item Updated",
            description: `${newItem.name} quantity increased to ${existingItem.quantity + 1}`,
          })

          return updatedItems
        } else {
          // Add new item
          const itemWithQuantity = { ...newItem, quantity: 1 }

          toast({
            title: "Added to Cart",
            description: `${newItem.name} has been added to your cart`,
          })

          return [...currentItems, itemWithQuantity]
        }
      })
    },
    [toast],
  )

  const removeItem = useCallback(
    (id: string) => {
      setItems((currentItems) => {
        const itemToRemove = currentItems.find((item) => item.id === id)
        const updatedItems = currentItems.filter((item) => item.id !== id)

        if (itemToRemove) {
          toast({
            title: "Item Removed",
            description: `${itemToRemove.name} has been removed from your cart`,
          })
        }

        return updatedItems
      })
    },
    [toast],
  )

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(id)
        return
      }

      setItems((currentItems) => {
        const updatedItems = currentItems.map((item) => (item.id === id ? { ...item, quantity } : item))

        const updatedItem = updatedItems.find((item) => item.id === id)
        if (updatedItem) {
          toast({
            title: "Quantity Updated",
            description: `${updatedItem.name} quantity updated to ${quantity}`,
          })
        }

        return updatedItems
      })
    },
    [removeItem, toast],
  )

  const clearCart = useCallback(() => {
    setItems([])
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    })
  }, [toast])

  const getItem = useCallback(
    (id: string) => {
      return items.find((item) => item.id === id)
    },
    [items],
  )

  const isInCart = useCallback(
    (id: string) => {
      return items.some((item) => item.id === id)
    },
    [items],
  )

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItem,
    isInCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
