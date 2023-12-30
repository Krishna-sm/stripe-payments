"use client";
import Image from 'next/image'
import Products from '@/api/product.json'
import axios from 'axios';
import { redirect } from 'next/navigation';

const ProductCard = ({cur}:any)=>{

  const Checkout = async()=>{

    try {
      const {data:{url}} =await axios.post("/api/payment",{
        name:cur.title,
        price:cur.price
      })
      // console.log({ data });
       window.location.href=url;
      redirect(url);
      
    } catch (error:any) {
      console.log(error.message);
      
    }
  }

  return (
    <div className="sm:w-1/3 mb-10 px-4">
      <div className="rounded-lg h-64 overflow-hidden">
        <img
          alt="content"
          className="object-cover object-center h-full w-full"
          src={cur.image}
        />
      </div>
      <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
        {cur.title}
      </h2>
      <p className="leading-relaxed text-base">{cur.description}</p>
      <button
        onClick={Checkout}
        className="flex  mt-6 text-white bg-black border-0 py-2 px-5 focus:outline-none hover:bg-black rounded"
      >
        pay &#8377;{cur.price}
      </button>
    </div>
  );
}
export default function Home() {
  return (
    <section className="text-gray-600 body-font w-[90%] mx-auto">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -mx-4 -mb-10 text-center">
      {
        Products.map((cur,i)=>{
          return <ProductCard cur={cur} key={i} />;
     
        })
      }
    </div>
  </div>
</section>

  )
}
