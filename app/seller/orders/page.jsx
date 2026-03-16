'use client'
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

const Orders = () => {

  const { currency } = useAppContext()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSellerOrders = async () => {
    setOrders(orderDummyData)
    setLoading(false)
  }

  useEffect(() => {
    fetchSellerOrders()
  }, [])

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">

      {loading ? <Loading /> :

        <div className="md:p-10 p-4 space-y-6">

          <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Orders
          </h2>

          <div className="max-w-4xl rounded-xl glass overflow-hidden">

            {orders.map((order, index) => (

              <div key={index} className="flex flex-col md:flex-row gap-6 justify-between p-6 border-t border-white/10">

                <div className="flex-1 flex gap-4 max-w-80">
                  <Image
                    className="max-w-14 max-h-14 object-cover"
                    src={assets.box_icon}
                    alt="box_icon"
                  />

                  <p className="flex flex-col gap-2">
                    <span className="font-medium text-gray-200">
                      {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                    </span>

                    <span className="text-gray-400">Items : {order.items.length}</span>
                  </p>

                </div>

                <div className="text-gray-400">

                  <p>
                    <span className="font-medium text-gray-200">{order.address.fullName}</span>
                    <br />
                    {order.address.area}
                    <br />
                    {order.address.city}, {order.address.state}
                    <br />
                    {order.address.phoneNumber}
                  </p>

                </div>

                <p className="font-medium my-auto text-emerald-400">
                  {currency}{order.amount}
                </p>

                <div className="text-gray-400">

                  <p className="flex flex-col">
                    <span>Method : COD</span>
                    <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                    <span className="text-yellow-400">Payment : Pending</span>
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      }

      <Footer />

    </div>
  )
}

export default Orders