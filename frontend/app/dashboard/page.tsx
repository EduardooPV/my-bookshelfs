import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, BookMarked, BookText, Plus, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function Dashboard() {
  // Sample data for recently added books
  const recentBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "/placeholder.svg?height=200&width=140",
      status: "want-to-read",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/placeholder.svg?height=200&width=140",
      status: "reading",
    },
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "/placeholder.svg?height=200&width=140",
      status: "read",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Want to Read</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Books in your reading list</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Reading</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Books in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read</CardTitle>
            <BookText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Books completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Reading Activity</CardTitle>
            <CardDescription>Your reading progress over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/40 rounded-md">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-8 w-8" />
                <p>Reading activity chart will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recently Added</CardTitle>
            <CardDescription>Books you've recently added to your shelves</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBooks.map((book) => (
                <div key={book.id} className="flex items-center gap-4">
                  <Image
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    width={50}
                    height={75}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <div>
                    {book.status === "want-to-read" && <BookMarked className="h-4 w-4 text-muted-foreground" />}
                    {book.status === "reading" && <BookOpen className="h-4 w-4 text-muted-foreground" />}
                    {book.status === "read" && <BookText className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

