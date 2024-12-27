"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import messages from "@/messages.json"
  import { Message } from "./model/user";
 
import Autoplay from "embla-carousel-autoplay";
import { Card, CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";

const autoplayOptions = {
  delay: 1000, 
  stopOnInteraction: true, 
  startOnLoad: true,
};
export default function Home() {
  return (
    <>
   
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-geist-sans)]">
  <section className="text-center">
    <h1 className="text-3xl font-semibold text-gray-900 mb-4">
      Drive into The World Of Anonymous Conversations.
    </h1>
    <p className="text-lg text-gray-600">
      Explore Mystery Message - where Your Identity remains a secret..
    </p>
  </section>
  
  <Carousel
  plugins={[Autoplay(autoplayOptions)]} className="w-full max-w-xs">
      <CarouselContent>
      {messages.map((message, index) => (
        <CarouselItem key={index}>
          <div className="p-4"> 
            <CardHeader className="text-xl font-semibold text-gray-800 mb-2"> 
              {message.title}
            </CardHeader>
            <Card className="shadow-lg rounded-lg">
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-2xl font-semibold text-gray-900"> 
                  {message.content}
                </span>
              </CardContent>
            </Card>
          </div>  </CarouselItem> ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

</main>
</>
  );
}
   