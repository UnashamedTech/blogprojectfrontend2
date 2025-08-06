import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, MessageSquare } from 'lucide-react';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: 'Blog - 1',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna...',
    date: 'September 17, 2021',
    category: 'Faith',
    image: '/images/blog-1.jpg',
    location: 'Georgia',
    comments: 52,
  },
  {
    id: 2,
    title: 'Blog - 2',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna...',
    date: 'September 17, 2021',
    category: 'Faith',
    image: '/images/blog-2.jpg',
    location: 'Georgia',
    comments: 52,
  },
  {
    id: 3,
    title: 'Blog - 3',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna...',
    date: 'September 17, 2021',
    category: 'Faith',
    image: '/images/blog-3.jpg',
    location: 'Georgia',
    comments: 52,
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 md:py-16 relative overflow-hidden bg-[#F7FAFF]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/Background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4 md:px-28 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['EBGaramond']">
            Latest Blogs
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-['EBGaramond']">
            Explore my latest thoughts, experiences, and insights as I share my
            journey with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-64 md:h-64 lg:h-72">
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  fill
                  className="object-center object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 text-white text-sm font-medium px-4 py-1 rounded-lg font-['EBGaramond']">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="border-l-4 border-black pl-3 mt-2 py-1">
                <p className="text-sm font-medium font-['EBGaramond']">
                  {post.date}
                </p>
              </div>
              <div className="p-4 min-h-[180px] flex flex-col ">
                <h3 className="text-xl font-bold font-['EBGaramond']">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-2 text-base flex-grow font-['EBGaramond']">
                  {post.excerpt}
                </p>

                <Link
                  href={`/user/blogs/${post.id}`}
                  className="flex pb-2 items-center text-black font-bold hover:underline mb-6 font-['EBGaramond']"
                >
                  <p> Continue Reading </p>{' '}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600 font-['EBGaramond']">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{post.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 font-['EBGaramond']">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>Comment ({post.comments})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/user/blogs"
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition-colors font-['EBGaramond']"
          >
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
