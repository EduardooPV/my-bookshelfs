"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BookPlus, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AddBook() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [bookStatus, setBookStatus] = useState("want-to-read")

  // Mock search function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // This would normally call an API
    if (searchQuery.trim()) {
      setSearchResults([
        {
          id: 1,
          title: "Project Hail Mary",
          author: "Andy Weir",
          cover: "/placeholder.svg?height=200&width=140",
          publishedDate: "2021-05-04",
          description: "Ryland Grace is the sole survivor on a desperate, last-chance mission...",
        },
        {
          id: 2,
          title: "The Martian",
          author: "Andy Weir",
          cover: "/placeholder.svg?height=200&width=140",
          publishedDate: "2014-02-11",
          description: "Six days ago, astronaut Mark Watney became one of the first people to walk on Mars...",
        },
        {
          id: 3,
          title: "Artemis",
          author: "Andy Weir",
          cover: "/placeholder.svg?height=200&width=140",
          publishedDate: "2017-11-14",
          description:
            "Jazz Bashara is a criminal. Well, sort of. Life on Artemis, the first and only city on the moon...",
        },
      ])
    }
  }

  const handleSelectBook = (book: any) => {
    setSelectedBook(book)
    setSearchResults([])
  }

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault()
    // This would normally save the book to the user's collection
    console.log("Adding book:", selectedBook, "with status:", bookStatus)
    // Redirect to dashboard or book page
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BookPlus className="h-6 w-6" />
          Add Book
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium">Search for a Book</h2>
              <p className="text-sm text-muted-foreground">Search by title, author, or ISBN</p>
            </div>

            <form onSubmit={handleSearch} className="space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search books..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            {searchResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Search Results</h3>
                <div className="space-y-2">
                  {searchResults.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center gap-4 rounded-lg border p-3 cursor-pointer hover:bg-muted"
                      onClick={() => handleSelectBook(book)}
                    >
                      <Image
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        width={50}
                        height={75}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {book.author} • {book.publishedDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {selectedBook ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Book Details</h2>
                <p className="text-sm text-muted-foreground">Review and add this book to your collection</p>
              </div>

              <div className="flex gap-4">
                <Image
                  src={selectedBook.cover || "/placeholder.svg"}
                  alt={selectedBook.title}
                  width={100}
                  height={150}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{selectedBook.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedBook.author} • {selectedBook.publishedDate}
                  </p>
                  <p className="mt-2 text-sm">{selectedBook.description}</p>
                </div>
              </div>

              <form onSubmit={handleAddBook} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Book Status</Label>
                  <Select value={bookStatus} onValueChange={setBookStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="want-to-read">Want to Read</SelectItem>
                      <SelectItem value="reading">Currently Reading</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reading status doesn't need additional fields */}

                {bookStatus === "read" && (
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Input id="rating" type="number" min="1" max="5" />

                    <Label htmlFor="review">Review (Optional)</Label>
                    <Textarea id="review" placeholder="Write your review..." />
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Add to Collection
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No book selected</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Search for a book and select it to add to your collection
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

