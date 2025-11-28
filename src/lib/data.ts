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
  name: { en: 'Crocodile Cream', ar: 'كريم التمساح الاصلي' },
  description: { en: 'Boost your stamina and performance', ar: 'عزز قدرتك على الصلابة والانتصاب' },
  longDescription: {
    en: 'Crocodile Cream is a premium vitality elixir formulated with a blend of natural ingredients to boost your stamina, enhance performance, and support overall male wellness. Experience a new level of confidence. Benefits: Helps improve control and increase ability during relationship, supports greater strength and stability thanks to blood circulation activation, provides clearer sense of energy and vitality, helps reduce stress and boost self-confidence, improves sensation and pleasure for both parties with smooth and comfortable texture.',
    ar: 'كريم التمساح الاصلي هو مستحضر حيوي فاخر مصنوع من مزيج من المكونات الطبيعية لتعزيز قدرتك على التحمل، وتحسين الأداء، ودعم الصحة الذكورية العامة. فوائد المنتج: يساعد في تحسين التحكم ورفع القدرة أثناء العلاقة. يدعم قوة وثبات أكبر بفضل تنشيط الدورة الدموية. يمنح إحساسًا أوضح بالطاقة والحيوية والنشاط. يساعد على تخفيف التوتر ورفع الثقة بالنفس. يحسّن الإحساس والمتعة للطرفين بفضل ملمس ناعم ومريح. مكوّن من أعشاب وزيوت طبيعية آمنة على كل أنواع البشرة. مناسب لكل الأعمار ولا يتعارض مع حالات القلب والضغط والسكري. طبيعي 100%. آمن على البشرة الحساسة. بدون أدوية – بدون جراحة – بدون مجهود. نتائج ملحوظة خلال أسابيع قليلة.',
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
  name: { en: 'XXXL Product', ar: 'منتج XXXL' },
  description: { en: 'Natural male enhancement solution', ar: 'حل طبيعي لتعزيز الرجولة' },
  longDescription: {
    en: 'XXXL Product is the strongest solution for supporting masculinity and enhancing performance naturally and safely. Its advanced formula is specifically designed for men looking for real change and clear results without fatigue or chemicals. Benefits: Significantly enhances male strength, increases size through natural mechanism, improves blood flow to the area, boosts sexual energy, increases desire and improves mood, gentle on skin, safe and suitable for all men.',
    ar: 'منتج XXXL هو الحل الأقوى لدعم الرجولة وتعزيز الأداء بشكل طبيعي وآمن. تركيبته المتطورة مصممة خصيصًا للرجال الذين يبحثون عن تغيير حقيقي ونتائج واضحة بدون تعب أو مواد كيميائية. فوائد المنتج: تعزيز القوة الرجالية بشكل ملحوظ: يعمل XXXL على دعم الأنسجة الرجالية بتركيبة مركّزة تساعد في زيادة قدرة الجسم على الاستجابة، وتحسين التحكم، وإعطاء ثبات أعلى أثناء العلاقة. زيادة الحجم بآلية طبيعية: المنتج يدعم تمدد أنسجة العضو ويحفّز امتلاءها بالدم، مما يساعد مع الوقت في ظهور فرق في الطول والعرض بشكل تدريجي ومحسوس. تحسين تدفق الدم للمنطقة: بفضل النباتات النشطة الموجودة فيه، يساعد XXXL على توسيع الشرايين الدقيقة وتنشيط الدورة الدموية، مما يمنح قوة وثباتًا أكبر. رفع الطاقة الجنسية: المنتج يزوّد الجسم بطاقة ونشاط طبيعيين، فيجعل الأداء أعلى والشعور أقوى أثناء العلاقة. زيادة الرغبة وتحسين المزاج: المكونات العشبية تحسّن الحالة النفسية وتقلل التوتر، مما يساعد على علاقة بدون قلق ومع ثقة أكبر. تأثير لطيف على البشرة: تركيبته ناعمة وسهلة الامتصاص وتمنح ملمسًا مريحًا يزيد الإحساس والمتعة للطرفين. آمن ومناسب لكل الرجال: طبيعي 100%، لا يسبب تهيجًا، مناسب للبشرة الحساسة، ولا يتعارض مع أمراض القلب أو الضغط أو السكري.',
  },
  images: [findImage('product-3')],
  prices: { sar: 122, aed: 119, kwd: 9.99 },
},
{
  id: 'prod-004',
  name: { en: 'Dragon Cream', ar: 'كريم درافون' },
  description: { en: 'Enhanced sensation and pleasure for both', ar: 'زيادة الإحساس والمتعة للطرفين' },
  longDescription: {
    en: 'Dragon Cream is an advanced formula specifically designed for men who need real support in performance and strength. The cream works to improve the body natural response and raises efficiency and energy during relationships without any effort or medications. Benefits: Strong control support during relationship, significantly strengthens erection, improves tissue fullness, enhances sensation and pleasure for both, raises mood and desire, safe on skin with natural formula free of irritants.',
    ar: 'كريم درافون هو تركيبة متقدمة مصممة خصيصًا للرجال الذين يحتاجون دعمًا حقيقيًا في الأداء والقوة. يعمل الكريم على تحسين استجابة الجسم طبيعيًا ويرفع الكفاءة والطاقة أثناء العلاقة بدون أي مجهود أو أدوية. فوائد كريم درافون: دعم قوي للتحكم أثناء العلاقة: الكريم يهدئ الإحساس الزائد الذي قد يسبب قذفًا سريعًا، مما يمنح وقتًا أطول وثباتًا أكبر. تقوية الانتصاب بشكل ملحوظ: يساعد درافون على تحسين تدفق الدم للأنسجة الرجالية، مما يؤدي إلى قوة وثبات أعلى مع كل استخدام. تحسين امتلاء الأنسجة: يدعم امتلاء العضو بالدم بشكل أفضل، مما يجعل الحجم وقت العلاقة أكبر وأوضح مع إحساس أعلى بالقوة. زيادة الإحساس والمتعة للطرفين: قوامه ناعم وسهل الامتصاص ويترك طبقة خفيفة مريحة تحسّن الاحتكاك والمتعة بشكل كبير. يرفع الحالة المزاجية والرغبة: بعض المكونات العشبية تساعد في تقليل التوتر وزيادة الثقة والرغبة. آمن على البشرة: تركيبة طبيعية خالية من المواد المهيّجة ومناسبة حتى للبشرة الحساسة وبدون آثار جانبية.',
  },
  images: [findImage('product-4')],
  prices: { sar: 139, aed: 137, kwd: 11.5 },
},
{
  id: 'prod-005',
  name: { en: 'Big Penis Pills', ar: 'حبوب بيج بينس' },
  description: { en: 'Advanced male enhancement formula', ar: 'تركيبة متطورة لتعزيز الرجولة' },
  longDescription: {
    en: 'Big Penis Pills are an advanced American formula that works to enlarge and enhance the size of the male organ and boost sexual strength. They also help increase semen volume and improve performance during intercourse thanks to their effective natural ingredients. The product is effective in treating sexual weakness and premature ejaculation, providing strong hardness and high stability without any side effects.',
    ar: 'حبوب بيج بينس هي تركيبة أمريكية متطورة تعمل على تكبير وتضخيم حجم العضو الذكري وتعزيز القوة الجنسية، كما تساعد على زيادة السائل المنوي وتحسين الأداء أثناء الجماع بفضل مكوناتها الطبيعية الفعالة. المنتج فعال في علاج الضعف الجنسي والقذف المبكر ويوفر صلابة قوية وثبات عالي بدون أي آثار جانبية.',
  },
  images: [findImage('product-5')],
  prices: { sar: 144, aed: 145, kwd: 12 },
},
{
  id: 'prod-006',
  name: { en: 'Big Shark Oil', ar: 'زيت بيج شارك' },
  description: { en: 'Natural size enhancement and performance booster', ar: 'زيادة الحجم الطبيعي وتعزيز الأداء' },
  longDescription: {
    en: 'Big Shark Oil is a powerful men oil with 100% natural formula that works to naturally increase size, improve erection strength, enhance sexual ability and energy, support erectile dysfunction treatment, activate blood flow to organs, improve sensation and pleasure, and boost confidence during relationships. With a safe, fast-absorbing formula suitable for all men without any side effects.',
    ar: 'زيت بيج شارك هو زيت رجالي قوي بتركيبة طبيعية 100% يعمل على زيادة الحجم بشكل طبيعي، تحسين قوة الانتصاب، رفع القدرة الجنسية والطاقة، دعم علاج ضعف الانتصاب، تنشيط تدفق الدم للأعضاء، تحسين الإحساس والمتعة، رفع الثقة أثناء العلاقة، بتركيبة آمنة سريعة الامتصاص ومناسبة لكل الرجال بدون أي آثار جانبية.',
  },
  images: [findImage('product-6')],
  prices: { sar: 125, aed: 135, kwd: 11 },
},
{
  id: 'prod-007',
  name: { en: 'Vega Black Spray', ar: 'بخاخ فيجا الأسود' },
  description: { en: 'Natural delay and performance enhancer', ar: 'تأخير طبيعي وتحسين الأداء' },
  longDescription: {
    en: 'Vega Black Spray is specially formulated to naturally delay ejaculation, strengthen erection, increase semen volume, and improve sexual ability without any side effects. Made with safe ingredients suitable for patients with blood pressure and diabetes.',
    ar: 'بخاخ فيجا الأسود لتأخير القذف بشكل طبيعي، تقوية الانتصاب، زيادة السائل المنوي، وتحسين القدرة على الجماع بدون أي آثار جانبية وبمكونات آمنة لمرضى الضغط والسكر.',
  },
  images: [findImage('product-7')],
  prices: { sar: 125, aed: 135, kwd: 11 },
},
{
  id: 'prod-008',
  name: { en: 'Handsome Pump Device', ar: 'جهاز هاندسوم' },
  description: { en: 'Professional enlargement pump', ar: 'مضخة تكبير احترافية' },
  longDescription: {
    en: 'Handsome Pump is a professional enlargement device that works with safe suction mechanism to increase blood flow to male tissues, helping to improve size, strengthen erection, and increase stability during relationship. It comes with three different silicon cups to ensure comfort and is one of the most famous devices for obtaining natural results without medications or side effects.',
    ar: 'جهاز هاندسوم أب هو مضخة تكبير احترافية تعمل بآلية الشفط الآمن لزيادة تدفّق الدم للأنسجة الرجالية مما يساعد على تحسين الحجم وتقوية الانتصاب وزيادة الثبات أثناء العلاقة، ويأتي مع ثلاث كبسات سيليكون مختلفة لضمان الراحة ويُعد من أشهر الأجهزة للحصول على نتائج طبيعية بدون أدوية أو آثار جانبية، حيث يعمل على تحسين الحجم طبيعيًا، تقوية الانتصاب، زيادة تدفّق الدم، رفع الثقة، آمن وخالٍ من المواد الكيميائية، مزوّد بـ3 كبسات للراحة ومناسب للمبتدئين وسهل الاستخدام جداً.',
  },
  images: [findImage('product-8')],
  prices: { sar: 125, aed: 135, kwd: 11 },
},  // المنتجات الجديدة المضافة
{
  id: 'prod-009',
  name: { en: 'Jaguar Power Cream', ar: 'كريم جاكور' },
  description: { en: 'Instant power and size enhancement', ar: 'قوة فورية وزيادة في الحجم والأداء' },
  longDescription: {
    en: 'Jaguar Power Cream is one of the most powerful men creams, working to activate blood circulation, strengthen erection, and gradually increase size with use. Its high absorption capacity gives fast and safe results without any side effects.',
    ar: '⭐ كريم جاكور للرجال – قوة فورية وزيادة في الحجم والأداء. كريم جاكور هو واحد من أقوى الكريمات الرجالية، لأنه بيشتغل على تنشيط الدورة الدموية، وتقوية الانتصاب، وزيادة الحجم تدريجيًا مع الاستخدام. قدرته العالية في الامتصاص بتخليه يعطي نتيجة سريعة وآمنة بدون أي آثار جانبية. ✔ فوائد كريم جاكور: تقوية الانتصاب بشكل ملحوظ من أول استعمال. زيادة الحجم والطول تدريجيًا مع الاستخدام المنتظم. تأخير القذف لمدة أطول أثناء العلاقة. تحسين الإحساس وزيادة المتعة. ترطيب وتنعيم الجلد بدون لزوجة أو ريحة مزعجة. ✔ مميزات كريم جاكور: مكونات طبيعية 100%. آمن ومناسب لكل الأعمار. امتصاص سريع بدون أي تهيج. يعطي نتيجة فورية وثابتة. مناسب للاستخدام اليومي وأثناء العلاقة. ✔ النتائج المتوقعة: انتصاب أقوى وثابت. زيادة تدريجية في الحجم والسمك. تأخير في القذف وتحكم أكبر. أداء أفضل وثقة أعلى. فرق واضح خلال 7–14 يوم من الاستخدام المنتظم.',
  },
  images: [findImage('product-9')],
  prices: { sar: 165, aed: 162, kwd: 13.5 },
},
{
  id: 'prod-010',
  name: { en: 'Black Mamba Spray', ar: 'قطرة Spanish Fly' },
  description: { en: 'Fast-acting confidence spray', ar: 'لزيادة الرغبة وتحسين الإثارة عند النساء' },
  longDescription: {
    en: 'Quick and discreet spray that provides instant confidence boost when you need it most. Easy to use and highly effective.',
    ar: '⭐️ قطرة Spanish Fly الأصلية – لزيادة الرغبة وتحسين الإثارة عند النساء. قطرة سبانش فلاي تعتبر من أشهر المنتجات المخصّصة للنساء، لأنها بتساعد على تحسين المزاج، رفع الإحساس، وزيادة الاستجابة خلال العلاقة بشكل طبيعي وآمن. مصممة مخصوص للنساء اللي بيعانوا من برود، توتر، أو ضعف الرغبة. ✔️ فوائد Spanish Fly للنساء: زيادة الرغبة الأنثوية بشكل طبيعي. رفع الإحساس والاستجابة أثناء العلاقة. تحسين المزاج وتقليل التوتر قبل العلاقة. إحساس بالنشاط والراحة. مناسبة للزوجات اللي بيعانوا من قلة الرغبة نتيجة ضغط، إرهاق، أو قلق. ✔️ مميزات قطرة سبانش فلاي: سريعة المفعول. طعم خفيف غير ملحوظ. آمنة عند الاستخدام الصحيح. تناسب جميع الأعمار فوق 18 سنة. تُضاف بسهولة لأي مشروب. ✔️ طريقة الاستخدام: 1. ضيفي 5–7 نقاط في أي مشروب (عصير – مياه – شاي). 2. تُستخدم قبل العلاقة بـ 20–30 دقيقة. 3. لا تُستخدم أكتر من مرة في اليوم. ✔️ النتائج المتوقعة: رغبة أعلى. استجابة أفضل. مزاج أفضل وقابلية أعلى للتفاعل. راحة واسترخاء أثناء العلاقة.',
  },
  images: [findImage('product-10')],
  prices: { sar: 160, aed: 158, kwd: 13.2 },
},
{
  id: 'prod-011',
  name: { en: 'Maral Gel Cream', ar: 'كريم ميرال' },
  description: { en: 'Ultimate performance enhancer', ar: 'قوة وصلابة وزيادة في الحجم' },
  longDescription: {
    en: 'Advanced formula for maximum performance and endurance. Experience unmatched vitality and confidence with every use. Maral Gel is the strongest solution for improving male performance as it works to activate blood circulation in the member, increase flow, improve strength and hardness, while simultaneously helping to increase size with continuous use.',
    ar: '⭐️ كريم ميرال للرجال – قوة وصلابة وزيادة في الحجم بشكل طبيعي، كريم ميرال للرجال هو الحل الأقوى لتحسين الأداء الرجالي لأنه بيشتغل على تنشيط الدورة الدموية في العضو وزيادة التدفق وتحسين القوة والصلابة وفي نفس الوقت يساعد على زيادة الحجم مع الاستخدام المستمر، ✔️ فوائده: تقوية الانتصاب وتحسين الصلابة وزيادة الحجم والطول تدريجيًا مع الاستخدام المنتظم وتحسين الإحساس والأداء أثناء العلاقة وتأخير القذف بشكل طبيعي بدون تخدير قوي، ✔️ مميزاته: مكونات طبيعية وآمنة وامتصاص سريع بدون لزوجة ومناسب للاستخدام اليومي ويعطي نتيجة تدريجية وثابتة مع الاستمرار وآمن تمامًا ومش بيعمل حرقان أو تهيج، ✔️ النتائج المتوقعة: انتصاب أقوى وثابت وزيادة في الحجم بمرور الوقت وأداء أعلى وثقة أكبر وفرق واضح مع الاستخدام.',
  },
  images: [findImage('product-11')],
  prices: { sar: 130, aed: 135, kwd: 10 },
},
{
  id: 'prod-012',
  name: { en: 'Al Jabrout Cream', ar: 'كريم الجبروت' },
  description: { en: 'Super power and higher performance', ar: 'قوة خارقة وأداء أعلى من أي وقت' },
  longDescription: {
    en: 'Al Jabrout Cream is the latest men cream with a powerful formula that helps strengthen erection immediately, gradually increase thickness and length, while delaying ejaculation and significantly improving sensation. Specially designed for men who want confidence and higher performance in relationships without medications or injections.',
    ar: '⭐ كريم الجبروت للرجال – قوة خارقة وأداء أعلى من أي وقت. كريم الجبروت هو أحدث كريم رجالي بتركيبة قوية بتساعد على تقوية الانتصاب فورًا، وزيادة السمك والطول تدريجيًا، مع تأخير القذف وتحسين الإحساس بشكل كبير. مصمم مخصوص للرجال اللي عايزين ثقة وأداء أعلى في العلاقة بدون أدوية ولا حقن. ✔ فوائد كريم الجبروت: تقوية الانتصاب بقوة من أول استخدام. زيادة الحجم والسمك تدريجيًا ومع الاستمرار. تأخير القذف بشكل طبيعي بدون تخدير قوي. رفع الإحساس والمتعة أثناء العلاقة. تحسين التدفق الدموي للعضو لثبات أطول. ترطيب وتنعيم الجلد بدون أي لزوجة. ✔ مميزات كريم الجبروت: تركيبة طبيعية آمنة على الجلد. امتصاص سريع، مفيش لزقة ولا ريحة. مناسب للاستخدام اليومي ووقت العلاقة. نتائجه بتثبت مع الاستمرار. آمن ومش بيسبب حرقان أو احمرار.',
  },
  images: [findImage('product-12')],
  prices: { sar: 150, aed: 148, kwd: 12.3 },
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