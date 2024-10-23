'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import wait from '@/lib/wait';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
}

interface ProductCarouselProps {
    products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        wait(1000).then(() => {
            setLoading(false);
        });
    }, []);

    // Rendering skeleton cards while loading
    if (loading) {
        return (
            <section className="my-16 py-8 px-4 overflow-hidden">
                <h2 className="text-3xl font-bold text-center">Top Frozen Products</h2>
                <div className="flex space-x-4 mt-6 overflow-x-auto w-full">
                    {Array.from({ length: 4 }).map((_, index: number) => (
                        <Skeleton
                            key={index}
                            className='h-72 min-w-full sm:min-w-1/2 md:min-w-1/3 lg:min-w-1/4 rounded-lg border border-border'
                        />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="my-16 py-8 px-4 overflow-hidden">
            <h2 className="text-3xl font-bold text-center">Top Frozen Products</h2>

            {/* Swiper Carousel */}
            <Swiper
                effect={'coverflow'}
                spaceBetween={30}
                coverflowEffect={{
                    rotate: 20,
                    // stretch: 0,
                    depth: 50,
                    // modifier: 1,
                    // slideShadows: true,
                }}
                loop={true}
                speed={2000}
                centeredSlides={true}
                // rewind={true}
                autoplay={{
                    delay: 100,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectCoverflow]}
                className="mt-6"
                breakpoints={{
                    // Define responsive breakpoints
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: products?.length < 2 ? 3 : 2,
                    },
                    1024: {
                        slidesPerView: products?.length < 3 ? 4 : 3,
                    },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        {/* Shadcn Card Component */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="rounded-lg border border-border"
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={640}
                                height={360}
                                className="w-full h-48 object-cover rounded-lg mix-blend-multiply"
                            />
                            <div className="mt-4 p-4">
                                <h3 className="text-xl font-bold">{product.name}</h3>
                                <p className="text-blue-500 dark:text-blue-300 mt-2">${product.price}</p>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ProductCarousel;
