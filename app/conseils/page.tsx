'use client'
import React from 'react'
import { 
  ShieldCheck, 
  TrafficCone, 
  Bike, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  ChevronLeft,
  PhoneCall,
  UserCheck,
  Zap,
  Eye,
  ThermometerSun,
  HandMetal,
  Smartphone,
  Wrench
} from 'lucide-react'

const sections = [
  {
    id: 'traffic',
    title: 'قواعد المرور والقانون',
    icon: <TrafficCone className="w-8 h-8 text-[#39e600]" />,
    description: 'المعلومات القانونية الأساسية لتفادي المخالفات وضمان سياقة مطابقة للقانون الجزائري.',
    items: [
      'رخص السياقة: صنف (أ1) للدراجات من 50 إلى 125سم³، وصنف (أ) للأكثر من 125سم³.',
      'نظام ABS: إلزامي قانوناً لكل الدراجات التي تتجاوز قوتها 73.6 كيلوواط.',
      'الخوذة إجبارية: غياب الخوذة للسائق أو المرافق يعتبر مخالفة خطيرة تسحب على إثرها الرخصة.',
      'تأمين الدراجة: لا تقد أبداً بدون لويحة الترقيم (البلاك) وشهادة التأمين سارية المفعول.'
    ]
  },
  {
    id: 'safety',
    title: 'تجهيزات السلامة',
    icon: <ShieldCheck className="w-8 h-8 text-[#39e600]" />,
    description: 'تجهيز نفسك بالمعدات الصحيحة هو ما ينقذك في حالة السقوط (لا قدر الله).',
    items: [
      'خوذة الرأس الكاملة (Full-face): توفر حماية قصوى للفك والوجه مقارنة بالأنواع الأخرى.',
      'السترة والقفازات: يجب أن تحتوي على واقيات (Paddings) في المفاصل والظهر.',
      'الرؤية الليلية: سترة عاكسة للضوء (Gilet Flash) ضرورية جداً ليرى السائقون وجودك.',
      'حالة الإطارات: تأكد من ضغط الهواء وسلامة "البنوا" من التشققات قبل كل سفرية.'
    ]
  },
  {
    id: 'new-riders',
    title: 'نصائح للمبتدئين',
    icon: <Bike className="w-8 h-8 text-[#39e600]" />,
    description: 'تقنيات القيادة الصحيحة التي تجعلك سائقاً محترفاً ومسيطراً على دراجتك.',
    items: [
      'توجيه النظرة: انظر دائماً بعيداً في اتجاه المنعطف، الدراجة ستتبع نظرك تلقائياً.',
      'تسخين الإطارات: كن حذراً في الكيلومترات الأولى، الإطار البارد لا يتماسك جيداً بالأرض.',
      'قبضة المقود: حافظ على استرخاء يديك وأكتافك، التوتر يقلص من قدرتك على المناورة.',
      'استخدام الفرامل: تعلم الجمع بين الفرامل الأمامية والخلفية بنسبة 70% مقابل 30%.'
    ]
  },
  {
    id: 'useful-apps',
    title: 'تطبيقات مفيدة',
    icon: <Smartphone className="w-8 h-8 text-[#39e600]" />,
    description: 'تطبيقات ذكية تساعدك أثناء القيادة لتسهيل رحلتك.',
    items: [
      'Google Maps: لتحديد الطريق وتجنب الازدحام المروري.',
      'تطبيقات الطقس: لمعرفة حالة الجو المناسبة قبل الخروج.',
      'تطبيقات GPS المخصصة للدراجات النارية.'
    ]
  },
  {
    id: 'maintenance',
    title: 'الصيانة الأساسية',
    icon: <Wrench className="w-8 h-8 text-[#39e600]" />,
    description: 'الحفاظ على دراجتك يضمن لك سياقة آمنة وعمراً أطول للمحرك.',
    items: [
      'تحقق من مستوى الزيت بانتظام.',
      'افحص ضغط العجلات (Pression).',
      'تأكد من سلامة الفرامل واستجابتها.',
      'نظف وشحم السلسلة (Chain) دورياً.',
      'راقب حالة وشحن البطارية.'
    ]
  }
]

export default function ConseilsPage() {
  return (
    <main dir="rtl" style={{ background: '#050505', minHeight: '100vh', paddingTop: '100px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Background Orbs */}
      <div className="orb orb-1" style={{ position: 'absolute', top: '10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(57, 230, 0, 0.15) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0, animation: 'orbFloat 20s infinite alternate' }}></div>
      <div className="orb orb-2" style={{ position: 'absolute', top: '40%', right: '-10%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(51, 102, 255, 0.1) 0%, transparent 70%)', filter: 'blur(120px)', zIndex: 0, animation: 'orbFloat 25s infinite alternate-reverse' }}></div>
      <div className="orb orb-3" style={{ position: 'absolute', bottom: '10%', left: '20%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, animation: 'orbFloat 18s infinite alternate' }}></div>

      {/* Hero Section */}
      <section className="hero-stripes" style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <span className="animate-fadeInUp" style={{ 
            display: 'inline-block', 
            padding: '8px 20px', 
            background: 'rgba(57, 230, 0, 0.1)', 
            border: '2px solid rgba(57, 230, 0, 0.3)', 
            borderRadius: '50px', 
            color: '#39e600',
            fontSize: '0.9rem',
            fontWeight: 800,
            marginBottom: '24px',
            textShadow: '0 0 20px rgba(57,230,0,0.5)'
          }}>
            الدليل القانوني والتقني للدراج في الجزائر 🇩🇿
          </span>
          <h1 className="animate-fadeInUp" style={{ 
            fontSize: 'clamp(3rem, 10vw, 5.5rem)', 
            fontWeight: 900, 
            lineHeight: 1,
            marginBottom: '32px',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-2px'
          }}>
            سُق <span style={{ color: 'rgba(255,255,255,0.9)' }}>بذكاء</span>، <br/>
            <span className="text-gradient-green" style={{ filter: 'drop-shadow(0 0 30px rgba(57,230,0,0.4))' }}>وعد بسلامة</span>
          </h1>
          <p className="animate-fadeInUp" style={{ 
            fontSize: '1.3rem', 
            color: '#a0a0a0', 
            maxWidth: '750px', 
            margin: '0 auto 40px',
            lineHeight: 1.6,
            fontWeight: 300
          }}>
            جمعنا لك أهم القوانين والنصائح التقنية التي تضمن لك التمتع بقيادة دراجتك مع الالتزام التام بمعايير السلامة والقانون الجزائري.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section style={{ padding: '40px 24px 100px', maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="grid-3d">
          {sections.map((section, idx) => (
            <div 
              key={section.id} 
              className="glass-3d card-3d animate-fadeInUp" 
              style={{ 
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              <div className="card-content">
                <div className="icon-3d-wrapper">
                  <div className="icon-3d-glow"></div>
                  {section.icon}
                </div>
                
                <h2 className="section-title-3d">
                  {section.title}
                </h2>
                
                <p style={{ color: '#888', lineHeight: 1.6, fontSize: '1rem' }}>
                  {section.description}
                </p>

                <div className="items-list-3d">
                  {section.items.map((item, i) => (
                    <div key={i} className="item-3d">
                      <CheckCircle2 size={18} className="text-[#39e600]" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Traffic Signs Section */}
      <section id="signs" style={{ padding: '120px 24px', maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="section-title-3d" style={{ fontSize: '3.5rem', textAlign: 'center' }}>إشارات المرور الرسمية</h2>
          <div style={{ width: '80px', height: '4px', background: '#39e600', margin: '20px auto', borderRadius: '2px', boxShadow: '0 0 15px rgba(57,230,0,0.5)' }}></div>
          <p style={{ color: '#888', marginTop: '20px', fontSize: '1.2rem' }}>فهم الإشارات هو المفتاح لقيادة آمنة وقانونية. إليك أهم الأصناف الرسمية:</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px', justifyContent: 'center' }}>
          {[
            { 
              title: 'تنبيه: خطر الطريق', 
              color: '#ff3b3b', 
              type: 'warning',
              shape: 'triangle',
              icon: <div style={{ borderBottom: '60px solid #000', borderLeft: '35px solid transparent', borderRight: '35px solid transparent', height: 0, width: 0, marginTop: '20px' }}></div>
            },
            { 
              title: 'ممنوع مرور الدراجات', 
              color: '#ff3b3b', 
              type: 'prohibition',
              shape: 'circle',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5.5 17.5L2 14l3.5-3.5h7L16 14l-3.5 3.5h-7z" />
                  <circle cx="18" cy="19" r="2" />
                  <circle cx="6" cy="19" r="2" />
                </svg>
              )
            },
            { 
              title: 'تحديد السرعة القصوى (50)', 
              color: '#ff3b3b', 
              type: 'prohibition',
              shape: 'circle',
              text: '50'
            },
            { 
              title: 'مسلك إجباري للدراجات', 
              color: '#0055ff', 
              type: 'mandatory',
              shape: 'circle',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                   <path d="M5.5 17.5L2 14l3.5-3.5h7L16 14l-3.5 3.5h-7z" />
                   <circle cx="18" cy="19" r="2" fill="white" />
                   <circle cx="6" cy="19" r="2" fill="white" />
                </svg>
              )
            },
            { 
              title: 'موقف (P)', 
              color: '#0055ff', 
              type: 'info',
              shape: 'square',
              text: 'P'
            }
          ].map((sign, idx) => (
            <div 
              key={idx} 
              className="sign-3d-wrapper animate-fadeInUp" 
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`sign-3d-plate ${sign.shape} ${sign.type}`}>
                {/* Plate Thickness / Side */}
                <div className="plate-edge"></div>
                
                {/* Main Reflective Surface */}
                <div className="plate-front">
                   <div className="reflective-layer"></div>
                   
                   {sign.shape === 'triangle' && <div className="triangle-border"></div>}
                   {sign.type === 'prohibition' && <div className="circle-border"></div>}

                   <div className="sign-symbol-box">
                      {sign.text ? (
                        <span className="sign-symbol-text">{sign.text}</span>
                      ) : (
                        <div className="sign-symbol-icon">{sign.icon}</div>
                      )}
                   </div>
                </div>
              </div>
              <p className="sign-caption">{sign.title}</p>
            </div>
          ))}
        </div>
      </section>



      {/* Emergency Call Section */}
      <section style={{ padding: '120px 24px', maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="glass-3d" style={{ 
          padding: '80px 60px', 
          borderRadius: '50px', 
          border: '1px solid rgba(57, 230, 0, 0.3)',
          background: 'linear-gradient(135deg, rgba(10,10,10,0.8) 0%, rgba(5,5,5,0.95) 100%)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '60px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8), inset 0 0 50px rgba(57,230,0,0.05)'
        }}>
          <div style={{ flex: '1 1 500px' }}>
            <h3 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '24px', fontFamily: 'Outfit' }}>أرقام النجدة في الجزائر <span style={{ textShadow: '0 0 20px rgba(255,0,0,0.4)' }}>🚨</span></h3>
            <p style={{ color: '#888', fontSize: '1.4rem', maxWidth: '600px', lineHeight: 1.6, fontWeight: 300 }}>
              احفظ هذه الأرقام في هاتفك، فقد تنقذ حياة إنسان في أي وقت. <br/>
              <span style={{ color: '#39e600', fontWeight: 600 }}>الوقاية دائماً خير من العلاج.</span>
            </p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
            {[
              { label: 'الحماية المدنية', num: '14', color: '#ff4444' },
              { label: 'الشرطة', num: '17', color: '#3366ff' },
              { label: 'الدرك الوطني', num: '1055', color: '#39e600' }
            ].map((item, i) => (
              <div key={i} className="emergency-card-3d">
                <p style={{ color: item.color, fontWeight: 900, fontSize: '0.9rem', marginBottom: '15px', letterSpacing: '2px' }}>{item.label}</p>
                <p style={{ fontSize: '4.5rem', fontWeight: 900, fontFamily: 'Outfit', lineHeight: 1 }}>{item.num}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section style={{ textAlign: 'center', padding: '0 24px 150px' }}>
        <p className="animate-float" style={{ 
          fontSize: '2.5rem', 
          fontWeight: 900, 
          color: '#39e600', 
          fontFamily: 'Outfit',
          textShadow: '0 0 40px rgba(57,230,0,0.3)',
          fontStyle: 'italic'
        }}>
          "السياقة مسؤولية.. ماشي مجرد سرعة" ✌️
        </p>
      </section>

      <style jsx>{`
        .grid-3d {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 40px;
          perspective: 1500px;
        }

        .glass-3d {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .card-3d {
          padding: 50px 40px;
          border-radius: 35px;
          transform-style: preserve-3d;
          height: 100%;
          cursor: default;
        }

        .card-3d:hover {
          transform: translateY(-10px) rotateX(5deg) rotateY(2deg);
          border-color: rgba(57, 230, 0, 0.3);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(57, 230, 0, 0.05);
        }

        .icon-3d-wrapper {
          width: 80px;
          height: 80px;
          background: rgba(57, 230, 0, 0.1);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(40px);
          animation: iconFloat 6s ease-in-out infinite;
        }

        .icon-3d-glow {
          position: absolute;
          inset: -10px;
          background: rgba(57, 230, 0, 0.3);
          filter: blur(20px);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.5s;
        }

        .card-3d:hover .icon-3d-glow {
          opacity: 1;
        }

        .section-title-3d {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 20px;
          font-family: 'Outfit', sans-serif;
          transform: translateZ(30px);
          background: linear-gradient(to bottom, #fff, #bbb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .items-list-3d {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 30px;
          transform: translateZ(20px);
        }

        .item-3d {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          background: rgba(255, 255, 255, 0.02);
          padding: 18px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s;
          color: #ddd;
        }

        .item-3d:hover {
          background: rgba(57, 230, 0, 0.08);
          border-color: rgba(57, 230, 0, 0.2);
          transform: translateX(-8px) translateZ(10px);
          color: #fff;
        }

        .emergency-card-3d {
          background: rgba(255, 255, 255, 0.02);
          padding: 40px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
          min-width: 200px;
          transition: all 0.4s;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .emergency-card-3d:hover {
          transform: translateY(-15px) scale(1.05);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 20px 50px rgba(0,0,1,0.5);
        }

        @keyframes orbFloat {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(100px, 50px) scale(1.1); }
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateZ(40px) translateY(0); }
          50% { transform: translateZ(60px) translateY(-10px); }
        }

        /* Sign 3D Styles */
        /* Realistic 3D Signs */
        .sign-3d-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          perspective: 1000px;
        }

        .sign-3d-plate {
          position: relative;
          width: 160px;
          height: 160px;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
        }

        .sign-3d-wrapper:hover .sign-3d-plate {
          transform: rotateX(15deg) rotateY(15deg) translateZ(20px);
        }

        .plate-edge {
          position: absolute;
          inset: 0;
          background: #444; /* Metallic edge */
          transform: translateZ(-8px);
          box-shadow: 
            0 5px 15px rgba(0,0,0,0.5),
            0 15px 35px rgba(0,0,0,0.3);
        }

        .circle .plate-edge { border-radius: 50%; }
        .square .plate-edge { border-radius: 12px; }
        .triangle .plate-edge {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          background: #333;
        }

        .plate-front {
          position: absolute;
          inset: 0;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateZ(2px);
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.1);
        }

        .circle .plate-front { border-radius: 50%; }
        .square .plate-front { border-radius: 12px; }
        .triangle .plate-front {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        /* Category Backgrounds */
        .warning .plate-front { background: #ffd700; } /* Yellow for danger */
        .mandatory .plate-front, .info .plate-front { 
          background: #0055ff; 
        }

        .reflective-layer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.1) 0%,
            transparent 50%,
            rgba(0,0,0,0.05) 100%
          );
          pointer-events: none;
        }

        .circle-border {
          position: absolute;
          inset: 0;
          border: 12px solid #ff3b3b;
          border-radius: 50%;
          pointer-events: none;
        }

        .triangle-border {
          position: absolute;
          inset: 0;
          background: #ff3b3b;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          mask: polygon(50% 15%, 15% 90%, 85% 90%) exclude, polygon(0 0, 100% 0, 100% 100%, 0 100%);
          -webkit-mask: polygon(50% 15%, 15% 90%, 85% 90%) exclude, polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        
        /* Simpler Triangle Border for compatibility */
        .triangle .plate-front::after {
          content: '';
          position: absolute;
          inset: 0;
          border-left: 80px solid transparent;
          border-right: 80px solid transparent;
          border-bottom: 140px solid #ff3b3b;
          transform: scale(1.1);
          z-index: -1;
          display: none; /* Fallback if needed */
        }

        .sign-symbol-box {
          position: relative;
          z-index: 2;
          transform: translateZ(10px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .triangle .sign-symbol-box {
          margin-top: 25px;
        }

        .sign-symbol-text {
          font-size: 3.8rem;
          font-weight: 900;
          color: #000;
          font-family: 'Outfit', sans-serif;
          letter-spacing: -2px;
        }

        .info .sign-symbol-text {
          color: #fff;
          font-size: 5rem;
        }

        .sign-symbol-icon {
          width: 85px;
          height: 85px;
          color: #000;
        }

        .mandatory .sign-symbol-icon {
          color: #fff;
          width: 95px;
          height: 95px;
        }

        .sign-caption {
          margin-top: 30px;
          font-weight: 700;
          font-size: 1.15rem;
          color: #fff;
          text-align: center;
          max-width: 220px;
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .grid-3d {
            grid-template-columns: 1fr;
          }
          .sign-3d-plate:hover {
            transform: none !important;
          }
        }
      `}</style>
    </main>
  )
}
