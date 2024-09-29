import { useAddProductMutation } from "../services/productsApi"

const Cart = () => {
    const res = useAddProductMutation()
    console.log(res)
  return (
    <div>Cart</div>
  )
}

export default Cart