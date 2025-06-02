import { useState } from 'react';

type ProductGalleryProps = {
    images: string[];
};

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const handlePrevious = () => {
        if (selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (selectedIndex < images.length - 1) {
        setSelectedIndex((prev) => prev + 1);
        }
    };

    return (
        <section className="flex flex-wrap gap-5 max-md:max-w-full">
            <div className="flex flex-col">
                <button onClick={handlePrevious} disabled={selectedIndex === 0} aria-label="Previous image" className="w-full flex justify-center">
                <svg className="w-6 h-6 text-gray-600 hover:text-gray-700 hover:bg-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                </button>

                {images.map((src, i) => (
                <button
                    key={i}
                    aria-label={`Select thumbnail ${i + 1}`}
                    className={`mt-4 rounded-lg border-1 transition ${
                    i === selectedIndex ? 'border-blue-600' : 'border-transparent'
                    } hover:border-blue-400`}
                    onClick={() => setSelectedIndex(i)}
                >
                    <img
                    src={src}
                    className="object-contain aspect-square w-[87px] hover:brightness-95 transition"
                    alt={`Thumbnail ${i + 1}`}
                    />
                </button>
                ))}

                <button onClick={handleNext} disabled={selectedIndex === images.length - 1} aria-label="Next image" className="mt-4 w-full flex justify-center">
                <svg className="w-6 h-6 text-gray-600 hover:text-gray-700 hover:bg-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                </button>
            </div>

            <div className="relative flex-col grow shrink-0 py-4 pr-4 min-h-full w-fit max-md:max-w-full">
                <img src={images[selectedIndex]} className="object-cover absolute inset-0 size-full" alt="Main product" />
            </div>
        </section>
    );
}
