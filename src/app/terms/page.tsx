import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-background text-foreground" dir="rtl">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <div className="mb-8">
            <Button asChild variant="ghost">
                <Link href="/">
                    <ArrowLeft className="ms-2 h-4 w-4" />
                    العودة إلى الرئيسية
                </Link>
            </Button>
        </div>

        <div className="bg-card text-card-foreground rounded-xl shadow-lg p-6 md:p-10">
          <header className="text-center mb-8 pb-6 border-b border-border">
            <h1 className="text-3xl md:text-4xl font-headline text-primary mb-2">الشروط والأحكام</h1>
            <p className="text-muted-foreground">مرحباً بكم في موقع منتجات الرجالي - يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع</p>
          </header>

          <div className="text-left text-sm text-muted-foreground mb-6 p-3 bg-muted/50 rounded-md">
            آخر تحديث: ١ نوفمبر ٢٠٢٣
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 pb-2 border-b border-border">١. القبول بالشروط</h2>
            <p>باستخدامك لهذا الموقع أو تقديم أي طلب من خلاله، فإنك توافق على الالتزام بهذه الشروط والأحكام بالكامل. إذا كنت لا توافق على أي جزء من هذه الشروط، فيرجى عدم استخدام الموقع أو تقديم أي طلبات.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 pb-2 border-b border-border">٢. المنتجات والخدمات</h2>
            <p>جميع المنتجات المعروضة على الموقع مخصصة للاستخدام الشخصي فقط وتقدّم للأغراض المعلنة:</p>
            <ul className="list-disc space-y-2 pr-5 mb-4">
                <li>جميع المنتجات مصنوعة من مكونات طبيعية وآمنة</li>
                <li>المنتجات مخصصة للبالغين فقط (أكثر من 18 سنة)</li>
                <li>يجب استشارة الطبيب قبل استخدام أي من المنتجات في حال وجود أمراض مزمنة</li>
                <li>الأسعار المعروضة تشمل الضريبة ولا تشمل رسوم الشحن</li>
            </ul>
            
            <div className="bg-accent/20 border-r-4 border-accent text-accent-foreground p-4 rounded-md my-6">
                <p><strong>ملاحظة هامة:</strong> النتائج قد تختلف من شخص لآخر حسب الحالة الصحية والالتزام بالجرعات الموصى بها.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 pb-2 border-b border-border">٣. الطلبات والدفع</h2>
            <p>عند تقديم طلب عبر الموقع، فإنك توافق على:</p>
            <ul className="list-disc space-y-2 pr-5 mb-4">
                <li>تقديم معلومات دقيقة وكاملة عن هويتك وعنوانك</li>
                <li>الدفع الكامل للمبلغ قبل معالجة الطلب</li>
                <li>قبول أن بعض المنتجات قد تحتاج إلى وقت للتجهيز قبل الشحن</li>
                <li>الالتزام بقوانين واستخدام المنتجات في بلدك</li>
            </ul>
            <p>نحن نحتفظ بالحق في رفض أو إلغاء أي طلب لأي سبب، بما في ذلك حدود الكميات المتاحة، أو المشاكل في طريقة الدفع.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 pb-2 border-b border-border">٤. الشحن والتسليم</h2>
            <p>نحن نقدم خدمة الشحن لجميع دول الخليج العربي:</p>
            <ul className="list-disc space-y-2 pr-5 mb-4">
                <li>مدة الشحن المتوقعة: من ٢ إلى ٧ أيام عمل</li>
                <li>التكلفة والتوقيت قد يختلفان حسب العنوان وطريقة الشحن المختارة</li>
                <li>التغليف يتم بطريقة تحافظ على الخصوصية والسرية التامة</li>
                <li>المسؤولية عن المنتج تنتقل إليك بعد استلام الطرد</li>
            </ul>
            <p>في حال تأخر الشحن عن المدة المحددة، يرجى التواصل مع خدمة العملاء لمتابعة الطلب.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 pb-2 border-b border-border">٥. سياسة الإرجاع والاستبدال</h2>
            <p>نحن نضمن رضاكم عن منتجاتنا ونقدم السياسة التالية للإرجاع:</p>
            <ul className="list-disc space-y-2 pr-5 mb-4">
                <li>يمكن إرجاع المنتجات غير المستخدمة خلال ١٤ يوماً من تاريخ الاستلام</li>
                <li>يجب أن تكون المنتجات المرتجعة في حالتها الأصلية مع العبوة والفاتورة</li>
                <li>سيتم خصم رسوم الشحن من مبلغ الاسترجاع</li>
                <li>لا يمكن إرجاع المنتجات المستخدمة أو المفتوحة لأسباب صحية</li>
                <li>في حال وجود عيب في المنتج، يرجى التواصل خلال ٤٨ ساعة من الاستلام</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 pb-2 border-b border-border">٦. الخصوصية والبيانات</h2>
            <p>نحن نحمي بياناتك الشخصية ونلتزم بسرية تامة:</p>
            <ul className="list-disc space-y-2 pr-5 mb-4">
                <li>جميع البيانات الشخصية محمية ولا يتم مشاركتها مع أطراف ثالثة</li>
                <li>نستخدم معلوماتك فقط لمعالجة الطلبات وتحسين الخدمة</li>
                <li>لديك الحق في طلب حذف بياناتك الشخصية في أي وقت</li>
                <li>نستخدم تقنيات تشفير لحماية معلوماتك المالية</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 pb-2 border-b border-border">٧. المسؤولية والضمان</h2>
            <p>باستخدامك للموقع والمنتجات، فإنك توافق على:</p>
            <ul className="list-disc space-y-2 pr-5 mb-4">
                <li>الاستخدام المسؤول للمنتجات وقراءة التعليمات بعناية</li>
                <li>استشارة الطبيب قبل الاستخدام في حال وجود حالات صحية</li>
                <li>عدم استخدام المنتجات بجرعات أعلى من الموصى بها</li>
                <li>عدم مساءلتنا عن أي أضرار ناتجة عن سوء الاستخدام</li>
            </ul>
            <div className="bg-accent/20 border-r-4 border-accent text-accent-foreground p-4 rounded-md my-6">
                <p><strong>تحذير:</strong> هذه المنتجات هي مكملات غذائية وليست بديلاً عن النظام الغذائي المتوازن أو العلاج الطبي.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 pb-2 border-b border-border">٨. الملكية الفكرية</h2>
            <p>جميع المحتويات الموجودة على الموقع محمية بحقوق الملكية الفكرية:</p>
            <ul className="list-disc space-y-2 pr-5 mb-4">
                <li>جميع النصوص والصور والشعارات محمية بحقوق الطبع والنشر</li>
                <li>لا يسمح بنسخ أو توزيع أي محتوى دون إذن كتابي مسبق</li>
                <li>أسماء المنتجات والعناوين التجارية مسجلة ومحمية</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 pb-2 border-b border-border">٩. التعديلات على الشروط</h2>
            <p>نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة وسيصبح تاريخ التحديث سارياً فور النشر. يرجى مراجعة هذه الصفحة بشكل دوري للاطلاع على أي تحديثات.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 pb-2 border-b border-border">١٠. القانون الحاكم</h2>
            <p>تخضع هذه الشروط والأحكام وتفسر وفقاً لقوانين المملكة العربية السعودية. أي نزاعات تنشأ عن هذه الشروط ستخضع للاختصاص الحصري للمحاكم في المملكة العربية السعودية.</p>
          </section>

          <div className="bg-secondary/20 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-bold text-primary mb-4">للاستفسارات والشكاوى</h3>
            <p className="mb-4">نرحب باستفساراتكم وملاحظاتكم عبر:</p>
            <ul className="list-disc space-y-2 pr-5">
                <li>البريد الإلكتروني: info@elegance.sa</li>
                <li>الهاتف: +966 11 123 4567</li>
                <li>ساعات العمل: من الأحد إلى الخميس، ٩ صباحاً - ٥ مساءً</li>
            </ul>
          </div>

          <footer className="text-center mt-10 pt-6 border-t border-border text-sm text-muted-foreground">
            <p>جميع الحقوق محفوظة &copy; 2024 قوة الصقر</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
