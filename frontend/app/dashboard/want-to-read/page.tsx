import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookMarked, Plus } from "lucide-react"
import Image from "next/image"

export default function WantToRead() {
  // Sample data for books in "Want to Read" category
  const books = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "/placeholder.svg?height=300&width=200",
      addedDate: "2023-10-15",
    },
    {
      id: 2,
      title: "Dune",
      author: "Frank Herbert",
      cover: "/placeholder.svg?height=300&width=200",
      addedDate: "2023-09-22",
    },
    {
      id: 3,
      title: "The Song of Achilles",
      author: "Madeline Miller",
      cover: "/placeholder.svg?height=300&width=200",
      addedDate: "2023-11-05",
    },
    {
      id: 4,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "/placeholder.svg?height=300&width=200",
      addedDate: "2023-08-30",
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      cover: "/placeholder.svg?height=300&width=200",
      addedDate: "2023-10-02",
    },
    {
      id: 6,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "/placeholder.svg?height=300&width=200",
      addedDate: "2023-11-12",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookMarked className="h-6 w-6" />
            Want to Read
          </h1>
          <p className="text-muted-foreground">Books you want to read in the future</p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover transition-all hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <div className="space-y-1 text-white">
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-sm">{book.author}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="w-full">
                      Start Reading
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold truncate">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <div className="mt-2 flex items-center text-muted-foreground text-sm">
                  <span>Added on {new Date(book.addedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

