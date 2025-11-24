import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';
import { BadgeCheck, Package, ShieldCheck, Truck } from 'lucide-react';

type LanguageString = {
  en: string;
  ar: string;
};

export interface Product {
  id: string;
  name: LanguageString;
  description: LanguageString;
  longDescription: LanguageString;
  images: ImagePlaceholder[];
  prices: {
    sar: number;
    aed: number;
    kwd: number;
  };
}
export interface Feature {
  icon: React.ElementType;
  title: LanguageString;
  description: LanguageString;
}

export interface Review {
  name: string;
  location: string;
  review: LanguageString;
  rating: number;
  avatar: ImagePlaceholder;
}

export interface FAQ {
  question: LanguageString;
  answer: LanguageString;
}

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) throw new Error(`Image with id "${id}" not found.`);
  return image;
};

export const products: Product[] = [
  {
    id: 'prod-001',
    name: { en: 'Vimax Cream', ar: 'كريم التمساح الاصلي' },
    description: { en: 'Boost your stamina and performance.', ar: 'عزز قدرتك على الصلابة والانتصاب.' },
    longDescription: {
      en: 'A premium vitality elixir formulated with a blend of natural ingredients to boost your stamina, enhance performance, and support overall male wellness. Experience a new level of confidence.',
      ar: ' فوائد المنتج يساعد في تحسين التحكم ورفع القدرة أثناء العلاقة. يدعم قوة وثبات أكبر بفضل تنشيط الدورة الدموية. يمنح إحساسًا أوضح بالطاقة والحيوية والنشاط. يساعد على تخفيف التوتر ورفع الثقة بالنفس. يحسّن الإحساس والمتعة للطرفين بفضل ملمس ناعم ومريح. مكوّن من أعشاب وزيوت طبيعية آمنة على كل أنواع البشرة. مناسب لكل الأعمار ولا يتعارض مع حالات القلب والضغط والسكري. طبيعي 100%. آمن على البشرة الحساسة. بدون أدوية – بدون جراحة – بدون مجهود. نتائج ملحوظة خلال أسابيع قليلة.',
    },
  images: [findImage('product-2')],  
  prices: { sar: 135, aed: 131, kwd: 11 },
  },
  {
    id: 'prod-002',
    name: { en: 'Vimax Cream', ar: 'كريم فيماكس ' },
    description: { en: 'Reach your peak potential.', ar: 'تصل إلى أقصى إمكاناتك.' },
    longDescription: {
      en: 'A powerful male enhancement cream designed to improve performance, increase stamina, and support long-term vitality. Made with safe herbal ingredients.',
      ar: 'كريم فيماكس - Vimax Cream الأمريكي الأصلي للرجال وهو من خلاصة (النباتات, وزيت سمك القرش الطبيعي), والتي تعمل على "تكبير وإطالة وتضخيم وتعريض, وزيادة انتصاب القضيب لزيادة المتعة الجنسية, وسوف تلاخظ التأثير من أول استخدام, وهو من أفضل الكريمات (الفريدة, والفعَالة, والقوية جداً) من نوعها التي خلصت الملايين من الرجال الذين يشعرون (بالضعف, وبالعجز) الجنسي بسبب (حجم القضيب, وسرعة القذف) وعلماً بأنه من المراهم التي مكوناتها تحتوي على تركيبة من (الأعشاب والمواد الطبيعية 100%) الفريدة التي عرفت بفعاليتها في زيادة (حجم, ووزن) العضو الذكري, وإطالته بشكل أفضل من (2 - 6) سم, وتقويتة أكثر (قوة, وأمان) لتكون صلباً مثل الحجر! لن تقلق ثانية لأن انتصابك سيبقى لفترة طويلة ستكون مسيطراً تماماً.',
    },
images: [findImage('product-1')],
    prices: { sar: 124, aed: 121, kwd: 10 },
  },
  {
    id: 'prod-003',
    name: { en: 'Aura of Confidence', ar: '⭐️ منتج XXXL ' },
    description: { en: 'Natural spray for lasting confidence.', ar: 'بخاخ طبيعي لثقة تدوم.' },
    longDescription: {
      en: 'An innovative, easy-to-use spray that provides a quick and discreet boost of confidence when you need it most. Its fast-acting formula is made from natural extracts.',
      ar: ' ⭐ منتج XXXL – هو الحل الأقوى لدعم الرجولة وتعزيز الأداء بشكل طبيعي وآمن. تركيبته المتطورة مصممة خصيصًا للرجال الذين يبحثون عن تغيير حقيقي ونتائج واضحة بدون تعب أو مواد كيميائية. 🔥 فوائد المنتج: ✔️ تعزيز القوة الرجالية بشكل ملحوظ: يعمل XXXL على دعم الأنسجة الرجالية بتركيبة مركّزة تساعد في زيادة قدرة الجسم على الاستجابة، وتحسين التحكم، وإعطاء ثبات أعلى أثناء العلاقة. ✔️ زيادة الحجم بآلية طبيعية: المنتج يدعم تمدد أنسجة العضو ويحفّز امتلاءها بالدم، مما يساعد مع الوقت في ظهور فرق في الطول والعرض بشكل تدريجي ومحسوس. ✔️ تحسين تدفق الدم للمنطقة: بفضل النباتات النشطة الموجودة فيه، يساعد XXXL على توسيع الشرايين الدقيقة وتنشيط الدورة الدموية، مما يمنح قوة وثباتًا أكبر. ✔️ رفع الطاقة الجنسية: المنتج يزوّد الجسم بطاقة ونشاط طبيعيين، فيجعل الأداء أعلى والشعور أقوى أثناء العلاقة. ✔️ زيادة الرغبة وتحسين المزاج: المكونات العشبية تحسّن الحالة النفسية وتقلل التوتر، مما يساعد على علاقة بدون قلق ومع ثقة أكبر. ✔️ تأثير لطيف على البشرة: تركيبته ناعمة وسهلة الامتصاص وتمنح ملمسًا مريحًا يزيد الإحساس والمتعة للطرفين. ✔️ آمن ومناسب لكل الرجال: طبيعي 100%، لا يسبب تهيجًا، مناسب للبشرة الحساسة، ولا يتعارض مع أمراض القلب أو الضغط أو السكري.',
    },
images: [findImage('product-3')],
    prices: { sar: 122, aed: 119, kwd: 9.99 },
  },
  {
    id: 'prod-004',
    name: { en: 'Aura of Confidence', ar: '⭐️ كريم درافون ' },
    description: { en: 'Natural spray for lasting confidence.', ar: 'زيادة الإحساس والمتعة للطرفين .' },
    longDescription: {
      en: 'An innovative, easy-to-use spray that provides a quick and discreet boost of confidence when you need it most. Its fast-acting formula is made from natural extracts.',
      ar: ' ⭐ كريم درافون هو تركيبة متقدمة مصممة خصيصًا للرجال الذين يحتاجون دعمًا حقيقيًا في الأداء والقوة. يعمل الكريم على تحسين استجابة الجسم طبيعيًا ويرفع الكفاءة والطاقة أثناء العلاقة بدون أي مجهود أو أدوية. 🔥 فوائد كريم درافون: ✔️ دعم قوي للتحكم أثناء العلاقة: الكريم يهدئ الإحساس الزائد الذي قد يسبب قذفًا سريعًا، مما يمنح وقتًا أطول وثباتًا أكبر. ✔️ تقوية الانتصاب بشكل ملحوظ: يساعد درافون على تحسين تدفق الدم للأنسجة الرجالية، مما يؤدي إلى قوة وثبات أعلى مع كل استخدام. ✔️ تحسين امتلاء الأنسجة: يدعم امتلاء العضو بالدم بشكل أفضل، مما يجعل الحجم وقت العلاقة أكبر وأوضح مع إحساس أعلى بالقوة. ✔️ زيادة الإحساس والمتعة للطرفين: قوامه ناعم وسهل الامتصاص ويترك طبقة خفيفة مريحة تحسّن الاحتكاك والمتعة بشكل كبير. ✔️ يرفع الحالة المزاجية والرغبة: بعض المكونات العشبية تساعد في تقليل التوتر وزيادة الثقة والرغبة. ✔️ آمن على البشرة: تركيبة طبيعية خالية من المواد المهيّجة ومناسبة حتى للبشرة الحساسة وبدون آثار جانبية توسيع الشرايين الدقيقة وتنشيط الدورة الدموية، مما يمنح قوة وثباتًا أكبر. ✔️ رفع الطاقة الجنسية: المنتج يزوّد الجسم بطاقة ونشاط طبيعيين، فيجعل الأداء أعلى والشعور أقوى أثناء العلاقة. ✔️ زيادة الرغبة وتحسين المزاج: المكونات العشبية تحسّن الحالة النفسية وتقلل التوتر، مما يساعد على علاقة بدون قلق ومع ثقة أكبر. ✔️ تأثير لطيف على البشرة: تركيبته ناعمة وسهلة الامتصاص وتمنح ملمسًا مريحًا يزيد الإحساس والمتعة للطرفين. ✔️ آمن ومناسب لكل الرجال: طبيعي 100%، لا يسبب تهيجًا، مناسب للبشرة الحساسة، ولا يتعارض مع أمراض القلب أو الضغط أو السكري.',
    },
    images: [findImage('product-4')],
    prices: { sar: 139, aed: 137, kwd: 11.5 },
  },
  {
    id: 'prod-005',
    name: { en: 'Royal Oud Essence', ar: 'حبوب Big PENIS' },
    description: { en: 'A captivating scent with hidden benefits.', ar: 'متعة بلا حدود' },
    longDescription: {
      en: 'More than just a fragrance, this Royal Oud Essence is infused with potent extracts known for their invigorating properties. A truly majestic experience for body and mind.',
      ar: ' حبوب بيج بينس هي تركيبة أمريكية متطورة تعمل على تكبير وتضخيم حجم العضو الذكري وتعزيز القوة الجنسية، كما تساعد على زيادة السائل المنوي وتحسين الأداء أثناء الجماع بفضل مكوناتها الطبيعية الفعالة. المنتج فعال في علاج الضعف الجنسي والقذف المبكر ويوفر صلابة قوية وثبات عالي بدون أي آثار جانبية.',
    },
images: [findImage('product-5')],
    prices: { sar: 144, aed: 145, kwd: 12 },
  },
  {
    id: 'prod-006',
    name: { en: 'Nightfall Vigor', ar: 'زيت Big shark' },
    description: { en: 'Unleash your nocturnal energy.', ar: 'تنشيط الدورة الدموية ودعم امتلاء الأنسجة  .' },
    longDescription: {
      en: 'Specially designed for the night, this product helps you unleash your nocturnal energy and vigor. Prepare for unforgettable nights filled with passion and power.',
      ar: ' زيت Big Shark هو زيت رجالي قوي بتركيبة طبيعية 100% يعمل على زيادة الحجم بشكل طبيعي، تحسين قوة الانتصاب، رفع القدرة الجنسية والطاقة، دعم علاج ضعف الانتصاب، تنشيط تدفق الدم للأعضاء، تحسين الإحساس والمتعة، رفع الثقة أثناء العلاقة، بتركيبة آمنة سريعة الامتصاص ومناسبة لكل الرجال بدون أي آثار جانبية .',
    },
images: [findImage('product-6')],
    prices: { sar: 125, aed: 135, kwd: 11 },
  },
   {
    id: 'prod-007',
    name: { en: 'Desert Falcon Power', ar: 'Vega black' },
    description: { en: 'Harness the power of the wild.', ar: 'استغل قوة البرية.' },
    longDescription: {
      en: 'Inspired by the resilience and power of the desert falcon, this formula is designed to give you unparalleled strength and endurance. Soar to new heights of performance.',
      ar: ' ✔️ بخاخ فيجا الأسود لتأخير القذف بشكل طبيعي، تقوية الانتصاب، زيادة السائل المنوي، وتحسين القدرة على الجماع بدون أي آثار جانبية وبمكونات آمنة لمرضى الضغط والسكر .',
    },
images: [findImage('product-7')],
    prices: { sar: 125, aed: 135, kwd: 11 },
  },
  {
    id: 'prod-008',
    name: { en: 'Oasis Vital Drops', ar: 'جهاز هاندسوم' },
    description: { en: 'Pure revitalization in every drop.', ar: 'تنشيط خالص في كل قطرة.' },
    longDescription: {
      en: 'A concentrated elixir offering pure revitalization. Each drop is packed with essential nutrients and potent herbs to rejuvenate your body and sharpen your senses.',
      ar: '  جهاز هاندسوم أب هو مضخة تكبير احترافية تعمل بآلية الشفط الآمن لزيادة تدفّق الدم للأنسجة الرجالية مما يساعد على تحسين الحجم وتقوية الانتصاب وزيادة الثبات أثناء العلاقة، ويأتي مع ثلاث كبسات سيليكون مختلفة لضمان الراحة ويُعد من أشهر الأجهزة للحصول على نتائج طبيعية بدون أدوية أو آثار جانبية، حيث يعمل على تحسين الحجم طبيعيًا، تقوية الانتصاب، زيادة تدفّق الدم، رفع الثقة، آمن وخالٍ من المواد الكيميائية، مزوّد بـ3 كبسات للراحة ومناسب للمبتدئين وسهل الاستخدام جداً..',
    },
images: [findImage('product-8')],
    prices: { sar: 125, aed: 135, kwd: 11 },
  },
];

export const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: { en: 'Total Privacy & Secrecy', ar: 'خصوصية وسرية تامة' },
    description: {
      en: 'Your orders are your secret. We guarantee 100% confidentiality.',
      ar: 'طلباتك هي سرك الخاص. نضمن لك السرية التامة بنسبة 100٪.',
    },
  },
  {
    icon: Truck,
    title: { en: 'Fast Shipping to GCC', ar: 'شحن سريع لدول الخليج' },
    description: {
      en: 'Receive your order quickly and discreetly anywhere in the Gulf.',
      ar: 'استلم طلبك بسرعة وسرية في أي مكان في الخليج.',
    },
  },
  {
    icon: BadgeCheck,
    title: { en: 'Authentic & Trusted Products', ar: 'منتجات أصلية وموثوقة' },
    description: {
      en: 'Only original, lab-tested products for your peace of mind.',
      ar: 'فقط المنتجات الأصلية والمختبرة معمليًا لراحة بالك.',
    },
  },
  {
    icon: Package,
    title: { en: 'Discreet Packaging', ar: 'تغليف غير ظاهر للمحتويات' },
    description: {
      en: 'Our packaging is plain and unmarked, ensuring your privacy is respected.',
      ar: 'تغليفنا بسيط وغير مميز، مما يضمن احترام خصوصيتك.',
    },
  },
];

export const reviews: Review[] = [
  {
    name: 'Ahmed A.',
    location: 'Riyadh, KSA',
    review: {
      en: 'Excellent service and complete privacy. The product quality is unmatched. I highly recommend it.',
      ar: 'خدمة ممتازة وخصوصية تامة. جودة المنتج لا مثيل لها. أنصح به بشدة.',
    },
    rating: 5,
    avatar: findImage('avatar-1'),
  },
  {
    name: 'Mohamed S.',
    location: 'Dubai, UAE',
    review: {
      en: 'Fast shipping and the packaging was very discreet. I am a repeat customer for a reason!',
      ar: 'صراحة أفضل تجربة شراء، التوصيل سريع والمنتج فعّال جداً. ما توقعت النتيجة تكون كذا!',
    },
    rating: 5,
    avatar: findImage('avatar-2'),
  },
  {
    name: 'Fahad K.',
    location: 'Kuwait City, KW',
    review: {
      en: 'The results are noticeable and the products are clearly authentic. Finally, a trusted source.',
      ar: 'الموقع موثوق 100% والتعامل راقي. المنتج أعطاني فرق واضح من أول أسبوع.',
    },
    rating: 5,
    avatar: findImage('avatar-3'),
  },
  {
    name: 'Yousef N.',
    location: 'Doha, QA',
    review: {
      en: 'Impressive results and customer service was very helpful with my questions.',
      ar: 'النتائج مبهرة وخدمة العملاء كانت متعاونة جدًا مع استفساراتي.',
    },
    rating: 4.5,
    avatar: findImage('avatar-4'),
  },
  {
    name: 'Abdullah M.',
    location: 'Jeddah, KSA',
    review: {
      en: 'This is my third time ordering. The quality is consistent and the delivery is always on time.',
      ar: 'هذي ثالث مرة أطلب منهم، كل مرة يوصل المنتج أسرع من المتوقع والجودة ثابتة.',
    },
    rating: 5,
    avatar: findImage('avatar-5'),
  },
  {
    name: 'Hassan T.',
    location: 'Manama, BH',
    review: {
      en: 'Really noticed a difference within a few weeks. Thank you for the quality and customer care.',
      ar: 'فعلاً فرق معي خلال أسابيع. شكراً لكم على الجودة والاهتمام بالعميل.',
    },
    rating: 5,
    avatar: findImage('avatar-6'),
  },
  {
    name: 'Saud G.',
    location: 'Muscat, OM',
    review: {
      en: 'Excellent transaction, very high privacy, and respectful packaging. I recommend it without hesitation.',
      ar: 'تعامل ممتاز، خصوصية عالية جداً، والتغليف محترم. أنصح فيه بدون تردد.',
    },
    rating: 5,
    avatar: findImage('avatar-7'),
  },
];

export const faqs: FAQ[] = [
  {
    question: { en: 'How discreet is the shipping?', ar: 'ما مدى سرية الشحن؟' },
    answer: {
      en: 'Completely discreet. The package will arrive in a plain box with no branding or indication of the contents. Your privacy is our top priority.',
      ar: '"تعامل ممتاز، خصوصية عالية جداً، والتغليف محترم. أنصح فيه بدون تردد.".',
    },
  },
  {
    question: { en: 'Which countries do you ship to?', ar: 'إلى أي دول تقومون بالشحن؟' },
    answer: {
      en: 'We ship to all countries in the Gulf Cooperation Council (GCC): Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman.',
      ar: '"هذي ثالث مرة أطلب منهم، كل مرة يوصل المنتج أسرع من المتوقع والجودة ثابتة." .',
    },
  },
  {
    question: { en: 'Are the products authentic?', ar: 'هل المنتجات أصلية؟' },
    answer: {
      en: 'Yes, all our products are 100% authentic and sourced from official manufacturers. We guarantee their quality and effectiveness.',
      ar: '"النتايج فعلاً حقيقية، مو زي باقي المواقع. شكرًا لكم على الالتزام والصدق." .',
    },
  },
  {
    question: { en: 'How do I place an order?', ar: 'كيف يمكنني تقديم طلب؟' },
    answer: {
      en: 'Simply fill out the "Order Now" form on our website. Enter your name, phone number, country, desired product, and quantity. Our team will contact you via WhatsApp or Telegram to confirm.',
      ar: '"فعلاً فرق معي خلال أسابيع. شكراً لكم على الجودة والاهتمام بالعميل." .',
    },
  },
];
