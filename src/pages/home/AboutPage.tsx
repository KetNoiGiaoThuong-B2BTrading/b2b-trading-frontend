import React, { useState, useEffect, useRef } from 'react';
import { Users, Target, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  const services = [
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Kết nối doanh nghiệp",
      description: "Nền tảng kết nối hàng ngàn doanh nghiệp B2B, tạo cơ hội hợp tác kinh doanh và mở rộng thị trường một cách hiệu quả."
    },
    {
      icon: <Target className="w-12 h-12 text-blue-500" />,
      title: "Giải pháp thương mại",
      description: "Cung cấp các công cụ và giải pháp thương mại điện tử B2B toàn diện, giúp tối ưu hóa quy trình mua bán và quản lý đối tác."
    },
    {
      icon: <Award className="w-12 h-12 text-blue-500" />,
      title: "Hỗ trợ chuyên nghiệp",
      description: "Đội ngũ chuyên gia hỗ trợ 24/7, tư vấn chiến lược kinh doanh và đồng hành cùng doanh nghiệp phát triển bền vững."
    }
  ];

  const testimonials = [
    {
      image: '/people/p3.jpg',
      quote: 'B2B - Kết nối giao thương đã giúp chúng tôi kết nối với hơn 200 đối tác mới trong 6 tháng. Đây là cầu nối quan trọng cho sự phát triển của doanh nghiệp.',
      name: 'Nguyễn Thị Minh',
      title: 'Giám đốc điều hành, Công ty TNHH ABC',
    },
    {
      image: '/people/p1.jpg',
      quote: 'Nhờ B2B - Kết nối giao thương, chúng tôi đã tối ưu hóa quy trình tìm kiếm nhà cung cấp, tiết kiệm thời gian và chi phí đáng kể.',
      name: 'Trần Văn Long',
      title: 'Giám đốc mua hàng, Tập đoàn XYZ',
    },
    {
      image: '/people/p2.jpg',
      quote: 'Một nền tảng đáng tin cậy giúp mở rộng mạng lưới kinh doanh B2B không chỉ trong nước mà còn ra quốc tế.',
      name: 'Lê Thị Hằng',
      title: 'Trưởng phòng phát triển, Công ty CP Giao Thương Việt',
    },
  ];

  const stats = [
    { number: 50000, label: "Doanh nghiệp kết nối", sublabel: "Trên khắp Việt Nam và khu vực" },
    { number: 1000, label: "Giao dịch thành công", sublabel: "Mỗi tháng qua nền tảng" },
    { number: 3, label: "Nền tảng B2B", sublabel: "Hàng đầu tại Việt Nam" }
  ];

  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounts();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounts = () => {
    stats.forEach((stat, i) => {
      let current = 0;
      const duration = 2000;
      const steps = 60;
      const increment = stat.number / steps;

      const interval = setInterval(() => {
        current += increment;
        setAnimatedNumbers((prev) => {
          const updated = [...prev];
          updated[i] = Math.min(Math.floor(current), stat.number);
          return updated;
        });

        if (current >= stat.number) clearInterval(interval);
      }, duration / steps);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="py-26 bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/home/i1.jfif')" }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Về chúng tôi
          </h1>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Nền tảng thương mại điện tử B2B hàng đầu, kết nối hàng ngàn doanh nghiệp
            trên toàn quốc, tạo cơ hội hợp tác và phát triển kinh doanh bền vững.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Chúng tôi xây dựng hệ sinh thái kết nối doanh nghiệp
            thông qua công nghệ và hiểu biết sâu sắc
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Tại đây, chúng tôi tin rằng sức mạnh kết nối sẽ tạo nên những giá trị bền vững. 
            Với kinh nghiệm phong phú và hiểu biết sâu sắc về thị trường B2B Việt Nam, 
            chúng tôi giúp các doanh nghiệp tìm kiếm đối tác phù hợp, mở rộng thị trường và 
            đạt được những thành công vượt bậc trong kinh doanh.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-15 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dịch vụ tích hợp với văn hóa doanh nghiệp</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-30 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tạo tác động sáng tạo, <br /><span className="text-blue-600">toàn cầu</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Tầm nhìn toàn cầu và chuyên môn địa phương giúp chúng tôi cung cấp các giải pháp kết nối doanh nghiệp tạo giá trị bền vững.
            </p>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-xl h-64 w-full">
            <img
              src="/home/i7.jfif"
              alt="Impact"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 group-hover:bg-opacity-50 transition duration-500"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-medium transition duration-500 transform group-hover:scale-105">
              <div className="bg-opacity-10 group-hover:bg-opacity-90 p-4 rounded-lg text-center transition duration-500">
                <div className="text-4xl font-bold mb-2">2025</div>
                <div className="text-lg">Mở rộng toàn cầu</div>
                <div className="text-sm">Thị trường mới, cơ hội vô tận</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-10 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">Khách hàng nói gì về chúng tôi</h2>

          {/* Slider logic */}
          {(() => {
            const [current, setCurrent] = useState(0);
            const total = testimonials.length;

            // Tự động chuyển slide sau 5s
            useEffect(() => {
              const timer = setInterval(() => {
                setCurrent((prev) => (prev + 1) % total);
              }, 6000);
              return () => clearInterval(timer);
            }, [current]);

            return (
              <div className="relative">
                {/* Nút điều hướng trái */}
                <button
                  onClick={() => setCurrent((current - 1 + total) % total)}
                  className="absolute left-0 top-1/3 transform -translate-y-1/2 text-blue-400 hover:text-blue-500 px-4 text-lg"
                >
                  ← Trước
                </button>

                {/* Hiển thị đánh giá hiện tại */}
                <div className="transition duration-500 ease-in-out px-35">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
                  />
                  <blockquote className="text-2xl font-light leading-relaxed mb-6">
                    “{testimonials[current].quote}”
                  </blockquote>
                  <div className="font-semibold">{testimonials[current].name}</div>
                  <div className="text-gray-400">{testimonials[current].title}</div>
                </div>

                {/* Nút điều hướng phải */}
                <button
                  onClick={() => setCurrent((current + 1) % total)}
                  className="absolute right-0 top-1/3 transform -translate-y-1/2 text-blue-400 hover:text-blue-500 px-4 text-lg"
                >
                  Tiếp →
                </button>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`w-3 h-3 rounded-full ${
                        idx === current ? "bg-blue-500" : "bg-gray-600"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-30 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="group">
            <img src="/home/i3.jfif" alt="Technology" className="rounded-2xl shadow-xl w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Chương trình công nghệ tiên tiến
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chúng tôi ứng dụng công nghệ tiên tiến và phương pháp đổi mới để giải quyết các thách thức 
                kinh doanh phức tạp. Các chương trình công nghệ của chúng tôi được thiết kế để tăng tốc 
                chuyển đổi số và thúc đẩy hiệu quả hoạt động. 
            </p>
          </div>
        </div>
      </section>

      {/* Social Responsibility */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto px-30 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trách nhiệm xã hội<br/>doanh nghiệp
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chúng tôi tin tượng việc tạo ra tác động tích cực đối với xã hội và môi trường. 
                Các sáng kiến CSR của chúng tôi tập trung vào giáo dục, phát triển bền vững 
                và phát triển cộng đồng để tạo ra một tương lai tốt đẹp hơn cho tất cả.
            </p>
          </div>
          <div className='group'>
            <img src="/home/i4.jfif" alt="Social Responsibility" className="rounded-2xl shadow-xl w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-30 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className='group'>
            <img src="/home/i5.jfif" alt="Innovation" className="rounded-2xl shadow-xl w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Đổi mới giải quyết &<br/>Tăng tốc</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Các phòng thí nghiệm đổi mới và trung tâm nghiên cứu của chúng tôi làm việc không ngừng 
                để phát triển các giải pháp đột phá giải quyết những thách thức của ngày mai. 
                Chúng tôi nuôi dưỡng văn hóa sáng tạo và cải tiến liên tục. 
            </p>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto px-30 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Quan hệ đầu tư phát triển</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chúng tôi duy trì mối quan hệ vững chắc với các nhà đầu tư và bên liên quan, 
                cung cấp thông tin minh bạch và tạo giá trị nhất quán. Cam kết về tăng trưởng 
                và đổi mới của chúng tôi thúc đẩy lợi nhuận bền vững và quan hệ đối tác lâu dài.
            </p>
          </div>
          <div className='group'>
            <img src="/home/i6.jfif" alt="Investment" className="rounded-2xl shadow-xl w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-blue-100" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-20">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-medium mb-4">B2B - Kết nối giao thương <span className="font-bold">qua các con số</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-8">
                <div className="text-5xl font-bold text-blue-600 mb-4">
                  {stat.number === 3 ? (
                    <>Top {animatedNumbers[index]}</>
                  ) : (
                    <>
                      {animatedNumbers[index].toLocaleString()}
                      {'+'}
                    </>
                  )}
                </div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;