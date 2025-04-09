"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Testimonial = {
  id: number
  quote: string
  author: string
  title: string
  avatar: string
}

const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in vel massa donec sit. Nulla amet suscipit sit lectus tortor. Dolor non eget suspendisse leo scelerisque sed d. Dolor non eget suspendisse leo scelerisque sed d. Nulla amet suscipit sit lectus tortor. Dolor non eget suspendisse leo scelerisque sed d.",
      author: "Alice Smith",
      title: "Founder of Wonderland",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in vel massa donec sit. Nulla amet suscipit sit lectus tortor. Dolor non eget suspendisse leo scelerisque sed d. Dolor non eget suspendisse leo scelerisque sed d. Nulla amet suscipit sit lectus tortor. Dolor non eget suspendisse leo scelerisque sed d.",
      author: "Bob Johnson",
      title: "CTO of TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in vel massa donec sit. Nulla amet suscipit sit lectus tortor. Dolor non eget suspendisse leo scelerisque sed d. Dolor non eget suspendisse leo scelerisque sed d. Nulla amet suscipit sit lectus tortor. Dolor non eget suspendisse leo scelerisque sed d.",
      author: "Catherine Lee",
      title: "Marketing Director at Creative Co.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in vel massa donec sit. Nulla amet suscipit sit lectus tortor. Dolor non eget suspendisse leo scelerisque sed d. Dolor non eget suspendisse leo scelerisque sed d. Nulla amet suscipit sit lectus tortor. Dolor non eget suspendisse leo scelerisque sed d.",
      author: "David Brown",
      title: "Product Manager at Innovate Inc.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ];

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }

    if (touchEndX - touchStartX > 50) {
      // Swipe right
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    }
  }

  const autoAdvance = useCallback(() => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }, [])

  useEffect(() => {
    const interval = setInterval(autoAdvance, 5000)
    return () => clearInterval(interval)
  }, [autoAdvance])

  const getVisibleTestimonials = () => {
    const result = []
    const prev = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1
    const next = activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1

    result.push({ ...testimonials[prev], position: "left" })
    result.push({ ...testimonials[activeIndex], position: "center" })
    result.push({ ...testimonials[next], position: "right" })

    return result
  }

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-white to-slate-50">
      <h1 className="text-4xl font-bold text-center mb-12">Testimonials</h1>

      <div
        className="relative flex justify-center items-center w-full max-w-6xl mx-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-[400px]">
          {getVisibleTestimonials().map((testimonial, index) => {
            const position = testimonial.position as "left" | "center" | "right"

            return (
              <Card
                key={`${testimonial.id}-${position}`}
                className={cn(
                  "absolute transition-all duration-500 ease-in-out p-6 max-w-md",
                  position === "left" && "left-0 opacity-50 scale-90 z-10",
                  position === "center" && "left-1/2 -translate-x-1/2 opacity-100 scale-100 z-20 shadow-lg",
                  position === "right" && "right-0 opacity-50 scale-90 z-10",
                )}
              >
                <CardContent className="p-0 flex flex-col items-center text-center">
                  <blockquote className="text-sm text-gray-600 mb-6">"{testimonial.quote}"</blockquote>
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-2">
                    <h3 className="font-semibold">{testimonial.author}</h3>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn("w-3 h-3 rounded-full transition-all", activeIndex === index ? "bg-black" : "bg-gray-300")}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
