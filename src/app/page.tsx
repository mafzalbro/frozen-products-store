import * as motion from "framer-motion/client";
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import homepageData from '@/store/home.json';
import wait from "@/lib/wait";
import ProductCarousel from "@/components/layout/home/slider";
import TestimonialSlider from "@/components/layout/home/testimonials";

export default async function Home() {
  if (!homepageData && await wait(500)) {
    return <Skeleton className="h-40 w-full" />;
  }

  // Extracting the homepage data directly from JSON
  const { hero, products, categories, testimonials, contact } = homepageData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-800 dark:to-blue-900 text-white px-4 sm:px-6 lg:px-8 py-10 sm:p-14`}>
        <div className="mx-auto flex flex-col sm:flex-row items-center justify-between sm:gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="sm:w-1/2">
            <h1 className="text-3xl lg:text-4xl font-bold">{hero?.title}</h1>
            <p className="mt-4 text-base">{hero?.subtitle}</p>
            <Link href="/products" passHref>
              <Button className="mt-8 hover:shadow-xl transition-shadow duration-200">
                {hero?.buttonText}
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="sm:w-1/2 h-full"
          >
            <Image src={hero?.image || '/placeholders/no-image.jpg'} alt="Frozen Products" width={640} height={360} className="rounded-lg sm:h-auto w-full object-cover" />
          </motion.div>
        </div>
      </section>


      {/* Product Carousel */}
      <ProductCarousel products={products} />

      {/* Testimonials Section */}
      <section className="my-16 py-8 px-4">
        <h2 className="text-3xl font-bold text-center">What Our Customers Say</h2>
        <TestimonialSlider testimonials={testimonials} /> {/* Add the testimonial slider component */}
      </section>

      {/* Categories Section */}
      <section className="my-16 py-8 px-4">
        <h2 className="text-3xl font-bold text-center">Explore Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.link}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center p-6 rounded-lg border border-border"
              >
                <Image height={360} width={640} src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded-full mr-4" />
                <div>
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
      <section className="relative my-16 py-8 px-4 flex items-center justify-between">
        <div className="w-1/2">
          <Image src={contact.image} alt="Contact Us" width={640} height={360} className="rounded-lg object-contain h-64 w-full" />
        </div>
        <div className="w-1/2 pl-8">
          <h2 className="text-3xl font-bold mb-4">{contact.title}</h2>
          <p className="mb-4">{contact.description}</p>
          <Link href={contact.link} passHref>
            <Button className="mt-4">{contact.buttonText}</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
