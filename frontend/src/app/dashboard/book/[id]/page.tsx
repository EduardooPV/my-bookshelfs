'use client';

import { CardFooter } from '@/components/ui/card';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  BookOpen,
  BookText,
  BookMarked,
  Star,
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Edit,
  Share,
  Check,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BookDetail({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('details');
  const [review, setReview] = useState('');
  const [bookStatus, setBookStatus] = useState('read');

  // This would normally be fetched from an API based on the ID
  const book = {
    id: params.id,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: '/placeholder.svg?height=500&width=300',
    rating: 5,
    status: 'read',
    dateFinished: '2023-10-20',
    publishedDate: '2021-05-04',
    publisher: 'Ballantine Books',
    genres: ['Science Fiction', 'Space', 'Adventure'],
    description:
      "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it. All he knows is that he's been asleep for a very, very long time. And he's just been awakened to find himself millions of miles from home, with nothing but two corpses for company.",
    notes: [
      { id: 1, text: 'Interesting concept about the Astrophage', date: '2023-09-15' },
      { id: 2, text: 'The communication method is brilliant', date: '2023-09-28' },
    ],
  };

  const handleStatusChange = (value: string) => {
    setBookStatus(value);
    // In a real app, this would update the book status in the database
    console.log(`Book status changed to: ${value}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{book.title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="sticky top-20 space-y-4">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
              <Image
                src={book.cover || '/placeholder.svg'}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex justify-between">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < book.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Book Status</CardTitle>
                <CardDescription>Update your reading status</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={bookStatus}
                  onValueChange={handleStatusChange}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="want-to-read" id="want-to-read" />
                    <Label
                      htmlFor="want-to-read"
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <BookMarked className="h-4 w-4" />
                      Want to Read
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reading" id="reading" />
                    <Label htmlFor="reading" className="flex cursor-pointer items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Currently Reading
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="read" id="read" />
                    <Label htmlFor="read" className="flex cursor-pointer items-center gap-2">
                      <BookText className="h-4 w-4" />
                      Read
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1">
                  <Check className="h-4 w-4" />
                  Save Status
                </Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full gap-1">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" className="w-full gap-1">
                <Share className="h-4 w-4" />
                Share
              </Button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Author</p>
                  <p className="text-muted-foreground">{book.author}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Published</p>
                  <p className="text-muted-foreground">{book.publishedDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Tag className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Genres</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {book.genres.map((genre) => (
                      <span
                        key={genre}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div>
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="mt-2 text-muted-foreground">{book.description}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Publisher Information</h2>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Publisher</p>
                    <p className="text-muted-foreground">{book.publisher}</p>
                  </div>
                  <div>
                    <p className="font-medium">Publication Date</p>
                    <p className="text-muted-foreground">{book.publishedDate}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Reading Notes</h2>
                <Button size="sm">Add Note</Button>
              </div>
              {book.notes.length > 0 ? (
                <div className="space-y-4">
                  {book.notes.map((note) => (
                    <div key={note.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{note.date}</p>
                      </div>
                      <p className="mt-2">{note.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="font-medium">No notes yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add notes while reading to keep track of your thoughts
                  </p>
                  <Button className="mt-4" size="sm">
                    Add Your First Note
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="review" className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold">Your Review</h2>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 cursor-pointer ${
                      i < book.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Write your review here..."
                  className="min-h-[150px]"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <Button>Save Review</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
