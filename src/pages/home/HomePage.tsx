import AdvertisingBox from "../../components/HomePage/AdvertisingBox";
import { ArticlesSection } from "../../components/HomePage/ArticlesSection";
import BrandCarousel from "../../components/HomePage/BrandCarousel";
import CategoriesSection from "../../components/HomePage/CategoriesSection";
import DeliverySection from "../../components/HomePage/DeliverySection";
import EventsSection from "../../components/HomePage/EventsSection";
import RecommendedProducts from "../../components/Product/RecommendedProducts";

const HomePage = () => {
    return (
        <div className="w-full mx-auto">
            <BrandCarousel />
            <RecommendedProducts />
            <AdvertisingBox title="-20%" description="on power tools" buttonText="Check offer" />
            <CategoriesSection />
            <ArticlesSection />
            <DeliverySection />
            <EventsSection />
        </div>
    );
};

export default HomePage;
