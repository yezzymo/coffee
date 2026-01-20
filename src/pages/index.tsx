import { useEffect, useState, useMemo } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

enum CoffeeType {
  All = "all",
  Hot = "hot",
  Iced = "iced",
}

export interface CoffeeProps {
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  id: number;
  tags: string[];
}

const ValidImage = ({ src }: { src: string }) => {
  const [error, setError] = useState(false);
  return (
    <Image
      onError={() => setError(true)}
      className="relative aspect-square w-full object-cover"
      alt={"title"}
      src={src.startsWith("https") && !error ? src : "https://www.verizon.com/learning/_next/static/images/87c8be7b206ab401b295fd1d21620b79.jpg"}
      width={500}
      height={500}
    />
  );
};

const Chip = ({ text }: { text: string }) => (
  <div className="px-2 py-1 rounded-full bg-slate-100 shadow-sm border text-sm opacity-75 text-slate-800">
    {text}
  </div>
);

export default function Home() {
  const [icedCoffee, setIcedCoffee] = useState<CoffeeProps[]>([])
  const [hotCoffee, setHotCoffee] = useState<CoffeeProps[]>([])
  const [page, setPage] = useState<CoffeeType>(CoffeeType.All);
  const coffeeList = useMemo(() => {
    const all = [...hotCoffee, ...icedCoffee];
    if (page === CoffeeType.Hot) return hotCoffee;
    if (page === CoffeeType.Iced) return icedCoffee;
    return all;
  }, [page, hotCoffee, icedCoffee]);



  useEffect(() => {
    fetch("https://cof.cny.sh/iced")
      .then((res) => res.json())
      .then((data) => setIcedCoffee(data));
    fetch("https://cof.cny.sh/hot")
      .then((res) => res.json())
      .then((data) => setHotCoffee(data));
  }, []);



  return (
    <>
      <div className="flex justify-center gap-4 my-8">
        <button type="button" onClick={() => setPage(CoffeeType.All)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">All</button>
        <button type="button" onClick={() => setPage(CoffeeType.Iced)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Iced</button>
        <button type="button" onClick={() => setPage(CoffeeType.Hot)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Hot</button>
      </div>
      <div className="grid grid-cols-2 w-[800px] mx-auto gap-4">

        {coffeeList.map((coffee) =>
          coffee && (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg"
              key={coffee.id}
            >
              <ValidImage src={coffee.image} />
              <div className="px-6 py-4">
                <p className="font-bold text-xl mb-2">{coffee.title ? coffee.title : "Unknown"}</p>
                <p className=" text-sm mb-2" dangerouslySetInnerHTML={{ __html: coffee.description }}
                ></p>

                <div className="flex gap-4">
                  {coffee.ingredients.map((ingredients) =>
                    <Chip text={ingredients}></Chip>
                  )}
                </div>



              </div>
            </div>
          )


        )}
      </div >
    </>
  )

}


