'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/Components/Common/ui/button'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 rounded-full p-2 sm:p-3"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      )}
    </>
  )
}

