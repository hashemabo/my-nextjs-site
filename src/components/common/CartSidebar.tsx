'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingCart, MessageCircle, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/data';
import { dictionary } from '@/lib/dictionary';
import { useLanguage } from '@/contexts/LanguageContext';

type LocalizedProduct = Omit<Product, 'name' | 'description' | 'longDescription'> & { name: string, description: string, longDescription: string };

interface CartSidebarProps {
  dealProduct?: LocalizedProduct | null;
}

interface LocationState {
    latitude: number | null;
    longitude: number | null;
}

const saudiPhoneRegex = /^(05|5)(5|0|3|6|4|9|8|7)([0-9]{7})$/;

const CartSidebar: React.FC<CartSidebarProps> = ({ dealProduct }) => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, getOrderData } = useCart();
  const { language } = useLanguage();
  const { toast } = useToast();
  const t = (key: keyof typeof dictionary) => dictionary[key]?.[language] || key;
  const [location, setLocation] = useState<LocationState>({ latitude: null, longitude: null });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
       if (dealProduct && item.id === dealProduct.id) {
        return sum + (item.prices.sar * 0.8) * item.quantity;
      }
      return sum + item.prices.sar * item.quantity;
    }, 0);
  };
  
  const subtotalSAR = calculateSubtotal();

  const formSchema = z.object({
    name: z.string().min(2, { message: t('validationNameRequired') }),
    address: z.string().min(10, { message: t('validationAddressRequired') }),
    phone: z.string().regex(saudiPhoneRegex, { message: t('validationPhoneInvalid') }),
    notes: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      notes: '',
    },
  });
  
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'غير مدعوم',
        description: 'تحديد الموقع الجغرافي غير مدعوم في هذا المتصفح.',
        variant: 'destructive',
      });
      return;
    }

    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        toast({
          title: 'تم تحديد الموقع',
          description: 'تم تسجيل موقعك بنجاح.',
        });
        setIsFetchingLocation(false);
      },
      (error) => {
        let title = 'خطأ في تحديد الموقع';
        let description = 'يرجى التأكد من تفعيل خدمة تحديد المواقع والمحاولة مرة أخرى.';

        switch(error.code) {
            case error.PERMISSION_DENIED:
                description = "لقد رفضت الإذن بالوصول إلى موقعك. يرجى تفعيله من إعدادات المتصفح.";
                break;
            case error.POSITION_UNAVAILABLE:
                description = "معلومات موقعك غير متاحة حاليًا. حاول التحقق من اتصال جهازك.";
                break;
            case error.TIMEOUT:
                description = "استغرق طلب تحديد الموقع وقتًا طويلاً. يرجى المحاولة مرة أخرى.";
                break;
        }

        toast({
          title: title,
          description: description,
          variant: 'destructive',
        });
        setIsFetchingLocation(false);
      }
    );
  };

  const handleWhatsAppCheckout = () => {
    const WHATSAPP_NUMBER = "966572033884";

    // ✅ التحقق من وجود الدالة قبل استخدامها
    if (!getOrderData || typeof getOrderData !== 'function') {
      toast({
        title: 'خطأ في النظام',
        description: 'يرجى تحديث الصفحة والمحاولة مرة أخرى',
        variant: 'destructive',
      });
      return;
    }

    const orderData = getOrderData();
    
    if (orderData.items.length === 0) {
      toast({ 
        title: "السلة فارغة", 
        description: "أضف منتجات إلى السلة قبل إرسال الطلب",
        variant: "destructive" 
      });
      return;
    }

    const values = form.getValues();

    if (!values.name || !values.phone || !values.address) {
      toast({
        title: "الرجاء تعبئة جميع بيانات الطلب",
        description: "يجب تعبئة الاسم، الهاتف، والعنوان",
        variant: "destructive"
      });
      return;
    }

    let message = `🛒 *طلب جديد من متجر قوة الصقر*\n\n`;
    message += `👤 *معلومات العميل:*\n`;
    message += `   📋 الاسم: ${values.name}\n`;
    message += `   📞 الهاتف: ${values.phone}\n`;
    message += `   📍 العنوان: ${values.address}\n`;
    if (values.notes) {
      message += `   📝 الملاحظات: ${values.notes}\n`;
    }
    if (location.latitude) {
      message += `   🗺️ الموقع: ${location.latitude}, ${location.longitude}\n`;
    }
    message += `\n`;
    
    message += `📦 *المنتجات المطلوبة:*\n`;
    message += `────────────────────\n`;

    orderData.items.forEach((item) => {
      message += `   🏷️ ${item.name}\n`;
      message += `   📊 الكمية: ${item.quantity}\n`;
      message += `   💰 السعر: ${item.price.toFixed(2)} ${item.currency.toUpperCase()}\n`;
      message += `   💵 الإجمالي: ${(item.price * item.quantity).toFixed(2)} ${item.currency.toUpperCase()}\n`;
      message += `────────────────────\n`;
    });

    message += `\n`;
    message += `💰 *المجموع النهائي: ${orderData.total.toFixed(2)} ${orderData.currency.toUpperCase()}*\n\n`;
    message += `🕒 ${new Date().toLocaleString('ar-SA')}`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    window.open(url, "_blank");

    setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      form.reset();
      setLocation({ latitude: null, longitude: null });
    }, 1000);
  };

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const orderDetails = {
      ...values,
      cart,
      total: subtotalSAR,
      location: location.latitude ? location : null
    };
    
    try {
        const response = await fetch('/api/telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        });

        const result = await response.json();

        if (result.ok) {
            toast({ title: t('telegramSuccessTitle'), description: t('telegramSuccessDesc') });
            form.reset();
            setLocation({ latitude: null, longitude: null });
            clearCart();
            setIsCartOpen(false);
        } else {
            throw new Error(result.error || 'Failed to submit order.');
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
        toast({ title: t('telegramErrorTitle'), description: errorMessage, variant: 'destructive' });
    }
  };

  // ✅ دالة زيادة الكمية
  const handleIncreaseQuantity = (productId: string) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  // ✅ دالة تقليل الكمية
  const handleDecreaseQuantity = (productId: string) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      if (item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
      } else {
        removeFromCart(productId);
        toast({
          title: t("removeFromCartSuccess"),
          description: t("productRemovedFromCart"),
        });
      }
    }
  };

  // ✅ مكون النموذج المشترك
  const OrderForm = () => (
    <Form {...form}>
      <div className="space-y-4 pt-4">
        <FormField name="name" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>{t('formName')}</FormLabel>
            <FormControl><Input placeholder={t('formNamePlaceholder')} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField name="address" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>{t('formAddress')}</FormLabel>
            <FormControl><Textarea placeholder={t('formAddressPlaceholder')} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
         
         <FormField name="phone" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>{t('formPhone')}</FormLabel>
            <FormControl><Input type="tel" placeholder={t('formPhonePlaceholder')} {...field} /></FormControl>
             <FormMessage />
          </FormItem>
        )} />
         
         <FormField name="notes" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>{t('formNotes')}</FormLabel>
            <FormControl><Textarea placeholder={t('formNotesPlaceholder')} {...field} /></FormControl>
          </FormItem>
        )} />
        
        <Button
          type="button"
          variant={location.latitude ? "secondary" : "outline"}
          className="w-full"
          onClick={handleGetLocation}
          disabled={isFetchingLocation}
        >
          <MapPin className="me-2" />
          {isFetchingLocation
            ? 'جاري تحديد الموقع...'
            : location.latitude
            ? 'تم تحديد الموقع بنجاح'
            : 'تحديد الموقع الحالي'}
        </Button>
      </div>
    </Form>
  );

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="p-0 sm:max-w-lg">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle>{t('cartTitle')} ({cart.reduce((s, i) => s + i.quantity, 0)})</SheetTitle>
        </SheetHeader>
        
        {cart.length > 0 ? (
          <div className="flex flex-col h-[calc(100%-72px)]">
            <ScrollArea className="flex-grow">
                <div className="px-6 divide-y divide-border">
                  {cart.map((item) => {
                     const isDeal = dealProduct && item.id === dealProduct.id;
                     const originalPrice = item.prices.sar;
                     const finalPrice = isDeal ? originalPrice * 0.8 : originalPrice;

                    return (
                    <div key={item.id} className="flex items-center gap-4 py-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.images[0].imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        {isDeal ? (
                           <div>
                              <p className="text-sm text-destructive line-through">SAR {originalPrice.toFixed(2)}</p>
                              <p className="text-sm font-bold text-primary">SAR {finalPrice.toFixed(2)}
                                <span className="ms-2 text-xs font-normal text-destructive-foreground bg-destructive rounded-full px-2 py-0.5">{t('dealOfTheDayTitle')}</span>
                              </p>
                           </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">SAR {item.prices.sar.toFixed(2)}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleDecreaseQuantity(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleIncreaseQuantity(item.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground self-start"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                    </div>
                  )})}
                </div>
            </ScrollArea>
            
            <div className="flex-shrink-0 border-t bg-background">
               <div className="px-6 py-4">
                    <div className="flex justify-between font-bold text-lg mb-4">
                      <span>{t('cartSubtotal')}</span>
                      <span>SAR {subtotalSAR.toFixed(2)}</span>
                    </div>
                </div>

                <Tabs defaultValue="whatsapp" className="w-full px-6 pb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="whatsapp">{t('checkoutWhatsAppTab')}</TabsTrigger>
                    <TabsTrigger value="form">{t('checkoutFormTab')}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="whatsapp">
                    <OrderForm />
                    <div className="pt-4">
                      <Button onClick={handleWhatsAppCheckout} className="w-full text-lg py-6 bg-green-600 hover:bg-green-700">
                        <MessageCircle className="me-2" />
                        {t('cartWhatsApp')}
                      </Button>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        {t('cartWhatsAppDescription')}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="form">
                    <OrderForm />
                    <div className="pt-4">
                      <Button 
                        onClick={form.handleSubmit(onFormSubmit)} 
                        className="w-full text-lg py-6" 
                        disabled={form.formState.isSubmitting}
                      >
                        <Send className="me-2" />
                        {form.formState.isSubmitting ? t('formSubmitting') : t('formSubmitDirect')}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold">{t('emptyCart')}</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;